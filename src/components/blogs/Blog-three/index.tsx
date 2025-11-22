import Breadcrumbs from "@/components/common/Breadcrumbs"
import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import BlogArea from "./BlogArea"

const BlogThree = () => {
   return (
      <>
         <HeaderOne />
         <main className="fix">
            <Breadcrumbs page="Categories" style={false} />
            <BlogArea />
         </main>
         <FooterOne style={false} style_2={true} />
      </>
   )
}

export default BlogThree
