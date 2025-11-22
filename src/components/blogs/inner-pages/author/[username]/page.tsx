// [username]/page.tsx
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AuthorInfo from "../AuthorInfo";

interface AuthorPageProps {
  params: { username: string };
}

export default function AuthorPage({ params }: AuthorPageProps) {
  const { username } = params;

  return (
    <>
      <HeaderOne />
      <main>
        <Breadcrumbs page="Author Page" style={false} />
        {username ? <AuthorInfo username={username} /> : <p>No author selected.</p>}
      </main>
      <FooterOne style={false} style_2={true} />
    </>
  );
}
