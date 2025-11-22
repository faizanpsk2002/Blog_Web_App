"use client";
import { useEffect, useState } from "react";
import SectionTitle from "@/components/common/SectionTitle";
import Image from "next/image";
import Link from "next/link";
import WeeklySidebar from "../home-three/WeeklySidebar";

const WeeklyPost = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog?limit=5`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        const data = await res.json();
        if (data?.status && Array.isArray(data.data)) {
          setBlogs(data.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="weekly-post-area-two pt-60 pb-30">
      <div className="container">
        <div className="weekly-post-inner-wrap">
          <div className="row justify-content-center">
            <div className="col-70">
              <SectionTitle title="Weekly Best News" />

              <div className="weekly-post-item-wrap-two">
                {blogs.map((item) => (
                  <div
                    key={item.id}
                    className="weekly-post-item weekly-post-two"
                  >
                    <div className="weekly-post-thumb">
                      <Link href={`/blog-details/${item.slug}`}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                          alt={item.title}
                          width={400}
                          height={250}
                        />
                      </Link>
                    </div>
                    <div className="weekly-post-content">
                      <Link href="/blog" className="post-tag">
                        {item.blogcategory?.category_name}
                      </Link>
                      <h2 className="post-title">
                        <Link href={`/blog-details/${item.slug}`}>
                          {item.title}
                        </Link>
                      </h2>
                      <div className="blog-post-meta">
                        <ul className="list-wrap">
                          <li>
                            <i className="flaticon-calendar"></i>
                            {item.publish_date}
                          </li>
                          <li>
                            <Link href={`/author/by-username/${item.author?.author_user_name}`}>
                              {item.author?.author_name}
                            </Link>
                          </li>
                        </ul>
                      </div>
                      <p>{item.short_description_two}</p>
                      <div className="view-all-btn">
                        <Link
                          href={`/blog-details/${item.slug}`}
                          className="link-btn"
                        >
                          Read More
                          <span className="svg-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 10 10"
                            >
                              <path
                                d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                fill="currentColor"
                              />
                            </svg>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <WeeklySidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeeklyPost;
