"use client";
import { useEffect, useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import AdBannerThree from "./AdBannerThree"

const RecentPost = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog?limit=4`,
          {
            headers: { accept: "application/json" },
          }
        );
        const result = await res.json();
        if (result?.status && result?.data) {
          setBlogs(result.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="recent-post-wrap">
      <AdBannerThree />
      <SectionTitle title="Recent Posts" />
      <div className="row">
        <div className="col-54">
          {blogs.slice(0, 1).map((item) => (
            <div key={item.id} className="overlay-post-two">
              <div className="overlay-post-thumb">
                <Link href={`/blog-details/${item.slug}`}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                    alt={item.title}
                    width={500}
                    height={300}
                  />
                </Link>
              </div>
              <div className="overlay-post-content">
                <Link
                  href={`/blog`}
                  className="post-tag"
                >
                  {item.blogcategory?.category_name}
                </Link>
                <h2 className="post-title">
                  <Link href={`/blog-details/${item.slug}`}>{item.title}</Link>
                </h2>
                <div className="blog-post-meta white-blog-meta">
                  <ul className="list-wrap">
                    <li>
                      <i className="flaticon-user"></i>by{" "}
                      <Link href={`/author/by-username/${item.author?.author_user_name}`}>
                        {item.author?.author_name}
                      </Link>
                    </li>
                    <li>
                      <i className="flaticon-calendar"></i>
                      {item.publish_date}
                    </li>
                    <li>
                      <i className="flaticon-history"></i>
                      {item.views} views
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-46">
          {blogs.slice(1, 4).map((item) => (
            <div key={item.id} className="horizontal-post-two">
              <div className="horizontal-post-thumb">
                <Link href={`/blog/${item.slug}`}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                    alt={item.title}
                    width={150}
                    height={100}
                  />
                </Link>
              </div>
              <div className="horizontal-post-content">
                <Link
                  href={`/blog`}
                  className="post-tag"
                >
                  {item.blogcategory?.category_name}
                </Link>
                <h2 className="post-title">
                  <Link href={`/blog-details/${item.slug}`}>{item.title}</Link>
                </h2>
                <div className="blog-post-meta">
                  <ul className="list-wrap">
                    <li>
                      <i className="flaticon-calendar"></i>
                      {item.publish_date}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentPost;
