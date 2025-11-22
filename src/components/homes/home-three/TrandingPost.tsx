"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import AdBannerTwo from "./AdBannerTwo";
import RecentPost from "./RecentPost";
import Image from "next/image";
import TrandingSidebar from "./TrandingSidebar";
import SectionTitle from "@/components/common/SectionTitle";

const TrandingPost = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog?limit=4`,
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
    <section className="trending-post-area pt-60 pb-60">
      <div className="container">
        <div className="trending-post-inner">
          <div className="row justify-content-center">
            <div className="col-70">
              <RecentPost />
              <AdBannerTwo />

              <div className="trending-post-wrap">
                <SectionTitle title="Trending News" />

                <div className="row justify-content-center">
                  <div className="col-lg-12">
                    {blogs.slice(0, 1).map((item) => (
                      <div key={item.id} className="trending-post">
                        <div className="trending-post-thumb">
                          <Link href={`/blog-details/${item.slug}`}>
                            <Image
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                              alt={item.title}
                              width={800}
                              height={500}
                            />
                          </Link>
                        </div>
                        <div className="trending-post-content">
                          <Link href="/blog" className="post-tag">
                            {item.blogcategory?.category_name}
                          </Link>
                          <h2 className="post-title bold-underline">
                            <Link href={`/blog-details/${item.slug}`}>
                              {item.title}
                            </Link>
                          </h2>
                          <div className="blog-post-meta">
                            <ul className="list-wrap">
                              <li>
                                <i className="flaticon-user"></i>by
                                <Link href={`/author/by-username/${item.author?.author_user_name}`}>
                                  {item.author?.author_name}
                                </Link>
                              </li>
                              <li>
                                <i className="flaticon-calendar"></i>
                                {item.publish_date}
                              </li>
                            </ul>
                          </div>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: item.short_description_two,
                            }}
                          />
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

                  {blogs.slice(1, 4).map((item) => (
                    <div key={item.id} className="col-lg-4 col-md-6">
                      <div className="trending-post-two">
                        <div className="trending-post-thumb-two">
                          <Link href={`/blog-details/${item.slug}`}>
                            <Image
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                              alt={item.title}
                              width={400}
                              height={250}
                            />
                          </Link>
                          <Link href="/blog" className="post-tag">
                            {item.blogsubcategory?.sub_category_name}
                          </Link>
                        </div>
                        <div className="trending-post-content-two">
                          <h2 className="post-title">
                            <Link href={`/blog-details/${item.slug}`}>
                              {item.title}
                            </Link>
                          </h2>
                          <div className="blog-post-meta">
                            <ul className="list-wrap">
                              <li>
                                <i className="flaticon-user"></i>by
                                <Link href={`/author/by-username/${item.author?.author_user_name}`}>
                                  {item.author?.author_name}
                                </Link>
                              </li>
                              <li>
                                <i className="flaticon-calendar"></i>
                                {item.publish_date}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <TrandingSidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrandingPost;
