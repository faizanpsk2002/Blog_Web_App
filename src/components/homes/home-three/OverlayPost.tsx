"use client";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import React, { useEffect, useState } from "react";

const setting = {
  infinite: true,
  speed: 1000,
  slidesToShow: 4,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "0",
  dots: false,
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        arrows: false,
      },
    },
    {
      breakpoint: 575,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
      },
    },
  ],
};

const OverlayPost = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blog?limit=6`,
          {
            headers: { Accept: "application/json" },
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
    <section className="overlay-post-area fix mt-30">
      <div className="container-fluid p-0">
        <div className="overlay-post-item-wrap">
          <Slider {...setting} className="row overlay-post-active">
            {blogs.map((item) => (
              <div key={item.id} className="col-lg-3">
                <div className="overlay-post-three">
                  <div className="overlay-post-thumb-three">
                    <Link href={`/blog-details/${item.slug}`}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.image}`}
                        alt={item.title}
                        width={400}
                        height={250}
                      />
                    </Link>
                  </div>
                  <div className="overlay-post-content-three">
                    <a href="/blog" className="post-tag">
                      {item.blogcategory?.category_name}
                    </a>
                    <h2 className="post-title bold-underline">
                      <Link href={`/blog-details/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h2>
                    <div className="blog-post-meta white-blog-meta">
                      <ul className="list-wrap">
                        <li>
                          <i className="flaticon-user"></i>
                          by{" "}
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
                          {/* if you don’t have time from API, keep static like before */}
                          5 min read
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default OverlayPost;
