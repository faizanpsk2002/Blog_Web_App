import Breadcrumbs from "@/components/common/Breadcrumbs"
import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import AboutArea from "./AboutArea"
import Team from "./Team"

const About = () => {
  return (
    <>
      <HeaderOne />
      <main>
        <Breadcrumbs page="About Us" style={false} />
        <AboutArea />
        <Team />
      
      </main>
      <FooterOne style={false} style_2={true}  />
    </>
  )
}

export default About
