"use client";
import { useState } from "react";

interface BlogFormProps {
  blogId: number;
  onSuccess?: () => void; // callback to refresh comments
}

const BlogForm = ({ blogId, onSuccess }: BlogFormProps) => {
  const [formData, setFormData] = useState({
    comment: "",
    name: "",
    email: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          blog_id: blogId,
          name: formData.name,
          email: formData.email,
          contact: formData.website, // optional
          comment: formData.comment,
          parent_id: null,
          captcha_a: 5,
          captcha_b: 7,
          captcha_answer: 12,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit comment");

      setMessage("✅ Comment submitted successfully!");
      setFormData({ comment: "", name: "", email: "", website: "" });

      if (onSuccess) onSuccess(); // refresh comments
    } catch (error) {
      console.error(error);
      setMessage("❌ Failed to submit comment. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="comment-respond">
      <h3 className="comment-reply-title">Post a comment</h3>
      <form onSubmit={handleSubmit} className="comment-form">
        <p className="comment-notes">
          Your email address will not be published. Required fields are marked *
        </p>
        <div className="form-grp">
          <textarea
            placeholder="Comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
          />
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="form-grp">
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-grp">
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-grp">
              <input
                type="url"
                placeholder="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="form-grp checkbox-grp">
          <input type="checkbox" id="checkbox_two" />
          <label htmlFor="checkbox_two">
            Save my name, email, and website in this browser for the next time I comment.
          </label>
        </div>
        <button type="submit" className="btn btn-two" disabled={loading}>
          {loading ? "Posting..." : "Post Comment"}
        </button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default BlogForm;
