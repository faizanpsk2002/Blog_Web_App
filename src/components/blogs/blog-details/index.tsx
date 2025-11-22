"use client";

import { useEffect, useState } from "react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import BlogDetailsArea from "./BlogDetailsArea";

const BlogDetails = () => {
  const [singleBlog, setSingleBlog] = useState<any>(null);
  const blogId = 5; // Replace with dynamic ID or slug if needed

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/${blogId}`);
        const json = await res.json();
        if (json.status) {
          setSingleBlog(json.data);
        }
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [blogId]);

  if (!singleBlog) {
    return <p>Loading blog...</p>;
  }

  return (
    <>
      <HeaderOne />
      <main className="fix">
        <Breadcrumbs page="blogs" style={true} />
        <BlogDetailsArea style={false} single_blog={singleBlog} />
      </main>
      <FooterOne style={false} style_2={true} />
    </>
  );
};

export default BlogDetails;
