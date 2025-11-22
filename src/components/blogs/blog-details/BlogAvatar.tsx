"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Author = {
  id: number;
  author_name: string;
  author_user_name: string;
  author_contact: string;
  author_email: string;
  author_image: string;
  author_info: string;
};

const AuthorInfo = ({ authorId }: { authorId: string }) => {
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuthor = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/author/${authorId}`
        );
        const json = await res.json();
        setAuthor(json.data ?? null); // store data object
      } catch (error) {
        console.error("Error fetching author:", error);
        setAuthor(null);
      } finally {
        setLoading(false);
      }
    };
    fetchAuthor();
  }, [authorId]);

  if (loading) return <p>Loading author…</p>;
  if (!author) return <p>Author not found.</p>;

  return (
    <div className="author-wrap">
      <div className="author-thumb">
        <Image
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${author.author_image}`}
          alt={author.author_name}
          width={150}
          height={150}
        />
      </div>
      <div className="author-content">
        <h4 className="name">{author.author_name}</h4>
        <div
          dangerouslySetInnerHTML={{ __html: author.author_info }}
        />
        <ul className="author-contact">
          <li>Email: {author.author_email}</li>
          <li>Phone: {author.author_contact}</li>
        </ul>
      </div>
    </div>
  );
};

export default AuthorInfo;
