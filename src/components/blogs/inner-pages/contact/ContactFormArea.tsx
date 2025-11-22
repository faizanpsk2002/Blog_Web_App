"use client";
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setResponseMessage("Message sent successfully!");
        setFormData({ name: "", email: "", contact: "", message: "" });
      } else {
        setResponseMessage(data.message || "Something went wrong.");
      }
    } catch (error) {
      setResponseMessage("Error sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-form">
      <h3 className="title">Get in Touch</h3>
      <p>We’d love to hear from you! Please fill out this form.</p>
      <form onSubmit={handleSubmit}>
        <div className="form-grp">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-grp">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-grp">
          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-grp">
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
        <p
          className={`ajax-response mb-0 ${
            responseMessage.includes("successfully")
              ? "success"
              : responseMessage
              ? "error"
              : ""
          }`}
        >
          {responseMessage}
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
