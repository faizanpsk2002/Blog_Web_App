import FooterOne from "@/layouts/footers/FooterOne"
import Banner from "./Banner"
import AdBanner from "../home-three/AdBanner"
import EditorPost from "./EditorPost"
import TrandingPost from "../home-three/TrandingPost"
import OverlayPost from "./OverlayPost"
import WeeklyPost from "../home-three/WeeklyPost"
import HeaderThree from "@/layouts/headers/HeaderOne"

const HomeThree = () => {
   return (
      <>
         <HeaderThree />
         <main className="fix">
            <Banner />
            <AdBanner />
            <EditorPost />
            <TrandingPost />
            
            <OverlayPost />
            <WeeklyPost />
         
         </main>
         <FooterOne style={false} style_2={true} />
      </>
   )
}

export default HomeThree
