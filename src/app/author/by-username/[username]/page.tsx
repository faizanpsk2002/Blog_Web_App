"use client";

import React from "react";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AuthorArea from "@/components/blogs/inner-pages/author/AuthorArea";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default function AuthorByUsernamePage({ params }: PageProps) {
  const { username } = React.use(params);

  if (!username) {
    return (
      <p className="text-center py-10">
        No author selected. Please use /author/by-username/[username]
      </p>
    );
  }

  return (
    <Wrapper>
      <>
        <HeaderOne />
        <main className="fix">
          <Breadcrumbs page="Author" style={true} />
          <AuthorArea username={username} />
        </main>
        <FooterOne style={false} style_2={true} />
      </>
    </Wrapper>
  );
}
