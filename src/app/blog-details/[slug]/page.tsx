import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BlogDetailsArea from "@/components/blogs/blog-details/BlogDetailsArea";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Wrapper from "@/layouts/Wrapper";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";

export const metadata: Metadata = {
  title: "Blog Details Zaira - News Magazine React Next Js Template",
};

type Props = {
  params: Promise<{ slug: string }>; // ✅ params is async
};

// ✅ Fetch blog by slug API
async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/blogs/by-slug/${slug}`,
      { cache: "no-store" }
    );

    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error("Blog fetch error:", error);
    return null;
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params; // ✅ Await params safely

  const apiResp = await getBlogBySlug(slug);
  const single_blog = apiResp?.data ?? apiResp; // ✅ normalize {data: {...}} or raw object

  if (!single_blog) {
    notFound();
  }

  return (
    <Wrapper>
      <>
        <HeaderOne />
        <main className="fix">
          <Breadcrumbs page="blogs" style={true} />
          <BlogDetailsArea
            style={false}
            single_blog={single_blog}
            key={single_blog?.id}
          />
        </main>
        <FooterOne style={false} style_2={true} />
      </>
    </Wrapper>
  );
}
