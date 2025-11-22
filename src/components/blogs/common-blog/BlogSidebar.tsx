"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const BlogSidebar = () => {
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchRecentBlogs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog?limit=3`, {
          cache: "no-store"
        });
        const data = await res.json();
        if (data.status) {
          setRecentBlogs(data.data);
        }
      } catch (err) {
        console.error("Failed to fetch recent blogs:", err);
      }
    };

    fetchRecentBlogs();
  }, []);

  return (
    <div className="col-30">
      <div className="sidebar-wrap">
        <div className="sidebar-widget">
          <div className="sidebar-search">
            <form onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Search . . ." />
              <button type="submit"><i className="flaticon-search"></i></button>
            </form>
          </div>
        </div>

        <div className="sidebar-widget sidebar-widget-two">
        </div>

        <div className="sidebar-widget sidebar-widget-two">
          <div className="widget-title mb-30">
            <h6 className="title">Recent News</h6>
            <div className="section-title-line"></div>
          </div>
          <div className="hot-post-wrap">
            {recentBlogs.map((blog) => (
              <div key={blog.id} className="hot-post-item">
                {blog.image && (
                  <div className="hot-post-thumb">
                    <Link href={`/blog-details/${blog.slug}`}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${blog.image}`}
                        alt={blog.title}
                        width={80}
                        height={80}
                      />
                    </Link>
                  </div>
                )}
                <div className="hot-post-content">
                  <Link href={`/blog?category=${blog.blogcategory.id}`} className="post-tag">
                    {blog.blogcategory.category_name}
                  </Link>
                  <h4 className="post-title">
                    <Link href={`/blog-details/${blog.slug}`}>{blog.title}</Link>
                  </h4>
                  <div className="blog-post-meta">
                    <ul className="list-wrap">
                      <li><i className="flaticon-calendar"></i>{new Date(blog.publish_date).toLocaleDateString()}</li>
                      <li><i className="flaticon-history"></i>{blog.views} Views</li>
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogSidebar;
