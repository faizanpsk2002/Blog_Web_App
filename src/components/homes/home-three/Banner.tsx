"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog?limit=4`
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
    <section className="banner-post-area-two pt-50 pb-30">
      <div className="container">
        <div className="banner-post-inner">
          <div className="row">
            <div className="col-70">
              {blogs.slice(0, 1).map((item) => (
                <div key={item.id} className="banner-post-two big-post">
                  <div className="banner-post-thumb-two">
                    <Link href={`/blog-details/${item.slug}`}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                        alt={item.title}
                        width={800}
                        height={500}
                      />
                    </Link>
                  </div>
                  <div className="banner-post-content-two">
                    <Link href="/blog" className="post-tag">
                      {item.blogcategory?.category_name}
                    </Link>
                    <h2 className="post-title bold-underline">
                      <Link href={`/blog-details/${item.slug}`}>
                        {item.title}
                      </Link>
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

            <div className="col-30">
              {blogs.slice(1, 4).map((item) => (
                <div key={item.id} className="banner-post-two small-post">
                  <div className="banner-post-thumb-two">
                    <Link href={`/blog-details/${item.slug}`}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                        alt={item.title}
                        width={400}
                        height={250}
                      />
                    </Link>
                  </div>
                  <div className="banner-post-content-two">
                    <Link href="/blog" className="post-tag">
                      {item.blogcategory?.category_name}
                    </Link>
                    <h2 className="post-title">
                      <Link href={`/blog-details/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h2>
                    <div className="blog-post-meta white-blog-meta">
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
      </div>
    </section>
  );
};

export default Banner;
