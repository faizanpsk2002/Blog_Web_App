"use client"
import Link from "next/link"

const Newsletter = () => {
   return (
      <section className="newsletter-area-three">
         <div className="container">
            <div className="row">
               <div className="col-lg-12">
                  <div className="newsletter-wrap-three">
                     <div className="newsletter-content">
                        <h2 className="title">Get Our Latest News & Update</h2>
                     </div>
                     <div className="newsletter-form">
                        <form onSubmit={(e) => e.preventDefault()}>
                           <div className="form-grp">
                              <input type="text" placeholder="Name" />
                           </div>
                           <div className="form-grp">
                              <input type="email" placeholder="E-mail" />
                           </div>
                           <button type="submit" className="btn">Submit Now</button>
                        </form>
                     </div>
                     
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Newsletter
