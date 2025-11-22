"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import BlogSidebar from "../common-blog/BlogSidebar";

interface StyleType {
  style: boolean;
}

const BlogArea = ({ style }: StyleType) => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);

  // 🔹 fetch API data
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog`);
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        setBlogs(data?.data || []); // ✅ API gives blogs inside `data`
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  // pagination logic
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = blogs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(blogs.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % blogs.length;
    setItemOffset(newOffset);
  };

  if (loading) {
    return <p className="text-center py-10">Loading blogs...</p>;
  }

  return (
    <section className="blog-area pt-60 pb-60">
      <div className="container">
        <div
          className={`${
            style ? "author-inner-wrap" : "author-inner-wrap blog-inner-wrap"
          }`}
        >
          <div className="row justify-content-center">
            <div className={style ? "col-70" : "col-70 order-0 order-xl-2"}>
              <div className="weekly-post-item-wrap">
                {currentItems.map((item) => (
                  <div
                    key={item.id}
                    className="weekly-post-item weekly-post-four"
                  >
                    <div className="weekly-post-thumb">
                      <Link href={`/blog-details/${item.slug}`}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                          alt={item.title || ""}
                          width={300}
                          height={200}
                        />
                      </Link>
                    </div>
                    <div className="weekly-post-content">
                      <Link href="/blog" className="post-tag">
                        {item.blogcategory?.category_name || "Uncategorized"}
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
                        </ul>
                      </div>
                      {/* short_description_one is HTML so render safely */}
                      <p
                        dangerouslySetInnerHTML={{
                          __html: item.short_description_one?.slice(0, 150) + "..."
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
                              fill="none"
                            >
                              <path
                                d="M1.07692 10L0 8.92308L7.38462 1.53846H0.769231V0H10V9.23077H8.46154V2.61538L1.07692 10Z"
                                fill="currentColor"
                              />
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

              <div className="pagination-wrap mt-60">
                <nav aria-label="Page navigation example">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=""
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel=""
                    renderOnZeroPageCount={null}
                    className="pagination list-wrap"
                  />
                </nav>
              </div>
            </div>

            <BlogSidebar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogArea;
