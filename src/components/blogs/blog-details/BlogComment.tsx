"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CommentType {
  id: number;
  blog_id: number;
  name: string;
  email: string;
  contact: string;
  comment: string;
  created_at: string;
  parent_id: number | null;
  replies: CommentType[];
}

interface BlogCommentProps {
  blogId: number;
  onCountUpdate?: (count: number) => void; // ✅ Pass total comment count to parent
  reloadKey?: number; // bump to refetch
}

const BlogComment = ({ blogId, onCountUpdate, reloadKey }: BlogCommentProps) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!blogId) return;

    const fetchComments = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/comment?blog_id=${blogId}`,
          { cache: "no-store" }
        );
        const json = await res.json();
        console.log("📌 Comments API response:", json);

        // Normalize various API shapes
        const raw: CommentType[] = Array.isArray(json?.data)
          ? json.data
          : Array.isArray(json?.data?.data)
          ? json.data.data
          : Array.isArray(json?.comments)
          ? json.comments
          : [];

        // Build threaded structure if API returns a flat list
        const byId = new Map<number, CommentType>();
        const roots: CommentType[] = [];
        raw.forEach((c) => {
          byId.set(c.id, { ...c, replies: Array.isArray(c.replies) ? c.replies : [] });
        });
        raw.forEach((c) => {
          const node = byId.get(c.id)!;
          if (c.parent_id) {
            const parent = byId.get(c.parent_id);
            if (parent) {
              parent.replies = parent.replies || [];
              parent.replies.push(node);
            } else {
              roots.push(node); // parent missing, treat as root
            }
          } else {
            roots.push(node);
          }
        });

        // If API already returned nested replies, the above won't duplicate children (since they are not in raw).
        // Compute total count including nested replies.
        const countTree = (items: CommentType[]): number =>
          items.reduce((acc, item) => acc + 1 + (item.replies ? countTree(item.replies) : 0), 0);

        setComments(roots);
        const countAll = countTree(roots);
        setTotalCount(countAll);
        onCountUpdate && onCountUpdate(countAll);
      } catch (error) {
        console.error("❌ Error fetching comments:", error);
        setComments([]);
        setTotalCount(0);
        onCountUpdate && onCountUpdate(0);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [blogId, onCountUpdate, reloadKey]);

  const renderReplies = (replies: CommentType[]) => (
    <ul className="children">
      {replies.map((reply) => (
        <li key={reply.id}>
          <div className="comments-box">
            <div className="comments-avatar">
              <Image
                src="/images/default-avatar.png"
                alt={reply.name}
                width={50}
                height={50}
              />
            </div>
            <div className="comments-text">
              <div className="avatar-name">
                <h6 className="name">{reply.name}</h6>
                <span className="date">
                  {new Date(reply.created_at).toLocaleDateString()}
                </span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: reply.comment }} />
              <Link href="#" className="reply-btn">
                Reply
              </Link>
            </div>
          </div>
          {reply.replies?.length > 0 && renderReplies(reply.replies)}
        </li>
      ))}
    </ul>
  );

  return (
    <div id="comments" className="comments-wrap">
      <h3 className="comments-wrap-title">
        {loading ? "Loading Comments..." : `${totalCount} ${totalCount === 1 ? "Comment" : "Comments"}`}
      </h3>

      <div className="latest-comments">
        {comments.length === 0 && !loading ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="list-wrap">
            {comments.map((comment) => (
              <li key={comment.id}>
                <div className="comments-box">
                  <div className="comments-avatar">
                    <Image
                      src="/images/default-avatar.png"
                      alt={comment.name}
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="comments-text">
                    <div className="avatar-name">
                      <h6 className="name">{comment.name}</h6>
                      <span className="date">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: comment.comment }} />
                    <Link href="#" className="reply-btn">
                      Reply
                    </Link>
                  </div>
                </div>
                {comment.replies?.length > 0 && renderReplies(comment.replies)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default BlogComment;
