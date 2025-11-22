"use client"
import Image from "next/image"
import NavMenu from "./menu/NavMenu"
import Link from "next/link"
import UseSticky from "@/hooks/UseSticky"
import HeaderTopThree from "./menu/HeaderTopThree"
import MobileMenu from "./menu/MobileMenu"
import Offcanvas from "./menu/Offcanvas"
import { useState } from "react"

import logo_1 from "@/assets/img/logo/w_logo.png";
import logo_2 from "@/assets/img/logo/logo.png";

const HeaderThree = () => {

   const { sticky } = UseSticky();
   const [mobileMenu, setMobileMenu] = useState<boolean>(false);
   const [offCanvas, setOffCanvas] = useState<boolean>(false);

   return (
      <>
         <header className="header-style-three">
            <div id="header-fixed-height" className={sticky ? "active-height" : ""}></div>
            <HeaderTopThree />

            <div id="sticky-header" className={`menu-area menu-style-three ${sticky ? "sticky-menu" : ""}`}>
               <div className="container">
                  <div className="row">
                     <div className="col-12">
                        <div className="menu-wrap">
                           <nav className="menu-nav">

                              {/* Sidebar toggle (like HeaderOne) */}
                              <div className="offcanvas-toggle d-lg-none d-xl-block">
                                 <button
                                    onClick={() => setOffCanvas(true)}
                                    className="menu-tigger"
                                    style={{ background: "none", border: "none", cursor: "pointer" }}
                                 >
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                 </button>
                              </div>

                              {/* Logo */}
                              <div className="logo">
                                 <Link href="/"><Image src={logo_2} alt="Logo" /></Link>
                              </div>
                              <div className="logo d-none">
                                 <Link href="/"><Image src={logo_1} alt="Logo" /></Link>
                              </div>

                              {/* Navigation */}
                              <div className="navbar-wrap main-menu d-none d-lg-flex">
                                 <NavMenu />
                              </div>

                              {/* Header Right */}
                              <div className="header-action d-none d-md-block">
                                 <ul className="list-wrap">
                                    
                                    <li className="header-sine-in">
                                       <Link href="/contact"><i className="flaticon-user"></i>Sign In</Link>
                                    </li>
                                 </ul>
                              </div>

                              {/* Mobile Menu Toggle */}
                              <div onClick={() => setMobileMenu(true)} className="mobile-nav-toggler">
                                 <i className="fas fa-bars"></i>
                              </div>

                           </nav>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header >

         {/* Offcanvas Sidebar */}
         <Offcanvas offCanvas={offCanvas} setOffCanvas={setOffCanvas} />

         {/* Mobile Menu */}
         <MobileMenu mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      </>
   )
}

export default HeaderThree
