"use client";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import AuthorInfo from "./AuthorInfo";

type Blog = {
  id: number | string;
  title: string;
  slug?: string;
  image?: string;
  thumb?: string;
  featured_image?: string;
  short_description_one?: string;
  publish_date?: string;
};

const AuthorArea = ({ username }: { username: string }) => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 6;
  const [itemOffset, setItemOffset] = useState(0);

  const truncateWords = (html: string, wordLimit: number) => {
    // Remove HTML tags
    const text = html.replace(/<[^>]+>/g, "");
    const words = text.split(" ");
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  useEffect(() => {
    let cancelled = false;
    const fetchBlogs = async () => {
      if (!username) return; // don't fetch without a valid username
      setLoading(true);
      setError(null);
      try {
        // 1) Look up author by username to obtain numeric id
        const authorRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/author/by-username/${username}`,
          { cache: "no-store" }
        );
        if (!authorRes.ok) {
          throw new Error(`Failed to find author for username: ${username}`);
        }
        const authorJson = await authorRes.json();
        const authorId: number | string | undefined = authorJson?.data?.id;

        if (!authorId) {
          if (!cancelled) {
            setBlogs([]);
            setError("Author not found");
          }
          return;
        }

        // 2) Fetch blogs by numeric id (backend endpoint expects id)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/author/${authorId}/blogs`,
          { cache: "no-store" }
        );

        if (!res.ok) {
          console.warn(`No blogs found for author ${username} (id: ${authorId})`);
          if (!cancelled) setBlogs([]);
          return;
        }

        const json = await res.json();
        if (!cancelled) {
          const candidate = Array.isArray(json?.data)
            ? json.data
            : Array.isArray(json?.blogs)
            ? json.blogs
            : Array.isArray(json?.data?.blogs)
            ? json.data.blogs
            : [];
          // Debug one-time log to help verify payload shape in dev tools
          if (candidate.length === 0) {
            console.debug("Author blogs API returned unexpected shape", json);
          }
          setBlogs(candidate);
        }
      } catch (e) {
        console.error("Error fetching author blogs:", e);
        if (!cancelled) {
          setBlogs([]);
          setError("Failed to load author's posts");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchBlogs();
    return () => {
      cancelled = true;
    };
  }, [username]);

  const pageCount = Math.max(1, Math.ceil(blogs.length / itemsPerPage));
  const currentItems = useMemo(() => {
    const start = Math.min(
      itemOffset,
      Math.max(blogs.length - itemsPerPage, 0)
    );
    return blogs.slice(start, start + itemsPerPage);
  }, [blogs, itemOffset]);

  const handlePageClick = (event: { selected: number }) => {
    setItemOffset(event.selected * itemsPerPage);
  };

  if (loading) return <p>Loading blogs…</p>;

  return (
    <section className="author-area pt-60 pb-60">
      <div className="container">
        <div className="author-inner-wrap">
          <div className="row justify-content-center">
            <div className="col-70">
              <AuthorInfo username={username} />

              {!blogs.length ? (
                <p>{error ?? "No posts found for this author."}</p>
              ) : (
                <div className="weekly-post-item-wrap">
                  {currentItems.map((item) => {
                    const img =
                      item.image ?? item.thumb ?? item.featured_image ?? "";
                    const href = item.slug
                      ? `/blog-details/${item.slug}`
                      : `/blog-details/${item.slug}`;
                    return (
                      <div
                        key={item.id}
                        className="weekly-post-item weekly-post-four"
                      >
                        <div className="weekly-post-thumb">
                          <Link href={href}>
                            <Image
                              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${img}`}
                              alt={item.title || "Blog cover image"}
                              width={400}
                              height={250}
                            />
                          </Link>
                        </div>
                        <div className="weekly-post-content">
                          <h2 className="post-title">
                            <Link href={href}>{item.title}</Link>
                          </h2>
                          <div className="blog-post-meta">
                            <ul className="list-wrap">
                              {item.publish_date && (
                                <li>
                                  <i className="flaticon-calendar"></i>
                                  {item.publish_date}
                                </li>
                              )}
                            </ul>
                          </div>
                          {item.short_description_one && (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: truncateWords(
                                  item.short_description_one,
                                  30
                                ),
                              }}
                            />
                          )}

                          <div className="view-all-btn">
                            <Link href={"/blog-details"} className="link-btn">
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
                                </svg>
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {blogs.length > 0 && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorArea;