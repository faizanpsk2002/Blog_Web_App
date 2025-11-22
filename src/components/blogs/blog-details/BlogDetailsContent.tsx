"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import VideoPopup from "@/modals/VideoPopup";

interface BlogDetailsContentProps {
  single_blog: any;
  commentCount: number; // ✅ comment count passed from parent
}

const BlogDetailsContent = ({ single_blog, commentCount }: BlogDetailsContentProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <>
      <div className="blog-details-content">
        <div className="blog-details-content-top">
          <Link href="/blog" className="post-tag">
            {single_blog?.blogcategory?.category_name || "Uncategorized"}
          </Link>
          <h2 className="title">{single_blog?.title}</h2>
          <div className="bd-content-inner">
            <div className="blog-post-meta">
              <ul className="list-wrap">
                <li>
                  <i className="flaticon-user"></i>by{" "}
                  <Link href={`/author/by-username/${single_blog.author?.author_user_name}`}>
                    {single_blog.author?.author_name}
                  </Link>
                </li>
                <li>
                  <i className="flaticon-calendar"></i>
                  {single_blog?.publish_date}
                </li>
                <li>
                  <i className="flaticon-chat"></i>
                  <Link href="#comments">
                    {commentCount} {commentCount === 1 ? "Comment" : "Comments"}
                  </Link>
                </li>
                <li>
                  <i className="flaticon-history"></i>20 Mins
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Main blog image */}
        {single_blog?.image && (
          <div className="blog-details-thumb">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${single_blog.image}`}
              alt={single_blog.title}
              width={800}
              height={500}
            />
          </div>
        )}

        {/* Blog content sections */}
        <div
          className="first-info"
          dangerouslySetInnerHTML={{ __html: single_blog?.short_description_one || "" }}
        />
        <div dangerouslySetInnerHTML={{ __html: single_blog?.short_description_three || "" }} />

        {/* Extra image + description */}
        {single_blog?.more_images?.length > 0 && (
          <div className="blog-details-inner">
            <div className="row align-items-center">
              <div className="col-md-6">
                <div className="blog-details-inner-img">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${single_blog.more_images[0]}`}
                    alt="extra"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="blog-details-inner-content">
                  <h3 className="title-two">{single_blog?.more_images_title}</h3>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: single_blog?.more_images_description_one || "",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video */}
        {single_blog?.video && (
          <div className="blog-details-video">
            <Image
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${single_blog.video_thumbnail}`}
              alt="video"
              width={800}
              height={450}
            />
            <a
              style={{ cursor: "pointer" }}
              onClick={() => setIsVideoOpen(true)}
              className="paly-btn popup-video"
            >
              <i className="fas fa-play"></i>
            </a>
          </div>
        )}

        {/* Tags */}
        <div className="blog-details-bottom">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="post-tags">
                <h5 className="title">Tags:</h5>
                <ul className="list-wrap">
                  {single_blog?.tags?.map((tag: string, idx: number) => (
                    <li key={idx}>
                      <Link href={`/tag/${tag}`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video modal */}
      <VideoPopup
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoId={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${single_blog?.video}`}
      />
    </>
  );
};

export default BlogDetailsContent;
