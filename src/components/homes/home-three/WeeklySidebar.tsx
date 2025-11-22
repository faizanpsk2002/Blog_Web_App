"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const WeeklySidebar = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog?limit=5`
        );
        const data = await res.json();
        if (data?.status) {
          setBlogs(data.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="col-30">
      <div className="sidebar-wrap no-sticky">
        <div className="sidebar-widget sidebar-widget-two"></div>

        <div className="sidebar-widget sidebar-widget-two">
          <div className="widget-title mb-30">
            <h6 className="title">Popular Tech</h6>
            <div className="section-title-line"></div>
          </div>

          {/* First Featured Blog */}
          {blogs.length > 0 && (
            <div className="sidebar-overlay-post">
              <div className="so-post-thumb">
                <Link href={`/blog-details/${blogs[0].slug}`}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blogs[0].image}`}
                    alt={blogs[0].title}
                    width={300}
                    height={200}
                  />
                </Link>
              </div>
              <div className="so-post-content">
                <Link href={`/blog`} className="post-tag">
                  {blogs[0].blogcategory?.category_name || "Technology"}
                </Link>
                <h4 className="post-title">
                  <Link href={`/blog-details/${blogs[0].slug}`}>
                    {blogs[0].title}
                  </Link>
                </h4>
                <div className="blog-post-meta white-blog-meta">
                  <ul className="list-wrap">
                    <li>
                      <i className="flaticon-calendar"></i>{" "}
                      {blogs[0].publish_date}
                    </li>
                    <li>
                      <i className="flaticon-history"></i>20 Mins
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Other Blogs */}
          {blogs.slice(1).map((item) => (
            <div key={item.id} className="popular-post">
              <div className="thumb">
                <Link href={`/blog-details/${item.slug}`}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                    alt={item.title}
                    width={100}
                    height={80}
                  />
                </Link>
              </div>
              <div className="content">
                <Link
                  href={`/blog`}
                  className="post-tag-two"
                >
                  {item.blogcategory?.category_name || "Category"}
                </Link>
                <h2 className="post-title">
                  <Link href={`/blog-details/${item.slug}`}>
                    {item.title}
                  </Link>
                </h2>
                <div className="blog-post-meta">
                  <ul className="list-wrap">
                    <li>
                      <i className="flaticon-calendar"></i> {item.publish_date}
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

export default WeeklySidebar;
