"use client";

import { useState } from "react";
import BlogDetailsContent from "./BlogDetailsContent";
import BlogAvatar from "./BlogAvatar";
import BlogPrevNext from "./BlogPrevNext";
import BlogComment from "./BlogComment";
import BlogForm from "@/components/forms/BlogForm";
import BlogSidebar from "../common-blog/BlogSidebar";

interface BlogDetailsAreaProps {
  style?: boolean;
  single_blog: any;
}

const BlogDetailsArea = ({ style, single_blog }: BlogDetailsAreaProps) => {
  const authorId = single_blog?.author_id;
  const [commentCount, setCommentCount] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);

  const blogId = single_blog?.blog_id ?? single_blog?.id;

  return (
    <section className="blog-details-area pt-60 pb-60">
      <div className="container">
        <div className="author-inner-wrap">
          <div className="row justify-content-center">
            <div className={`col-70 ${style ? "order-0 order-xl-2" : ""}`}>
              <div className="blog-details-wrap">
                {/* Blog main content with dynamic comment count */}
                <BlogDetailsContent
                  single_blog={single_blog}
                  commentCount={commentCount}
                />

                {/* Author info */}
                {authorId && <BlogAvatar authorId={authorId} />}

                {/* Previous/Next navigation */}
                <BlogPrevNext />

                {/* Comments Section */}
                <BlogComment
                  blogId={blogId}
                  onCountUpdate={setCommentCount} // Updates commentCount dynamically
                  reloadKey={reloadKey}
                />

                {/* Comment Form */}
                <BlogForm
                  blogId={blogId}
                  onSuccess={() => {
                    // Increment comment count when a new comment is added
                    setCommentCount((prev) => prev + 1);
                    // trigger reload of comments list
                    setReloadKey((prev) => prev + 1);
                  }}
                />
              </div>
            </div>

            {/* Sidebar */}
            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsArea;
