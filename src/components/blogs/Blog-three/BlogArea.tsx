"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import BlogSidebar from "../common-blog/BlogSidebar";

interface BlogCategory {
  id: number;
  category_name: string;
  status: string;
  created_at: string;
  updated_at: string;
  image: string | null;
  display_category: number;
}

const BlogArea = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);

  // Base URL for API images
  const imageBase = process.env.NEXT_PUBLIC_IMAGE_URL || "";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog-category`,
          {
            headers: { Accept: "application/json" },
          }
        );
        const data = await res.json();
        if (data?.status && Array.isArray(data.data)) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = categories.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(categories.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % categories.length;
    setItemOffset(newOffset);
  };

  if (loading) {
    return <p className="text-center py-10">Loading categories...</p>;
  }

  if (!categories.length) {
    return <p className="text-center py-10">No categories found.</p>;
  }

  return (
    <section className="blog-area pt-60 pb-60">
      <div className="container">
        <div className="author-inner-wrap">
          <div className="row justify-content-center">
            <div className="col-70">
              <div className="weekly-post-item-wrap-three">
                <div className="row">
                  {currentItems.map((item) => {
                    const imageUrl = item.image
                      ? `${imageBase}/${item.image}`
                      : "/no-image.jpg";

                    return (
                      <div key={item.id} className="col-md-6">
                        <div className="weekly-post-three">
                          <div className="weekly-post-thumb">
                            <Link href={`/category/${item.id}`}>
                              <Image
                                src={imageUrl}
                                alt={item.category_name}
                                width={370}
                                height={220}
                              />
                            </Link>
                            <Link
                              href={`/category/${item.id}`}
                              className="post-tag"
                            >
                              {item.category_name}
                            </Link>
                          </div>
                          <div className="weekly-post-content">
                            <h2 className="post-title">
                              <Link href={`/category/${item.id}`}>
                                {item.category_name}
                              </Link>
                            </h2>
                            <div className="blog-post-meta">
                              <ul className="list-wrap">
                                <li>
                                  <i className="flaticon-calendar"></i>
                                  {new Date(
                                    item.created_at
                                  ).toLocaleDateString()}
                                </li>
                                <li>
                                  <i className="flaticon-history"></i>
                                  {item.status}
                                </li>
                              </ul>
                            </div>
                            <p>
                              Display on homepage:{" "}
                              {item.display_category === 1 ? "✅ Yes" : "❌ No"}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="pagination-wrap mt-30">
                  <nav aria-label="Page navigation example">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel="Next >"
                      previousLabel="< Prev"
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      pageCount={pageCount}
                      renderOnZeroPageCount={null}
                      className="pagination list-wrap"
                    />
                  </nav>
                </div>
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
