interface DataType {
   id: number;
   title: string;
   class_name: string;
   footer_link: {
      link: string;
      title: string;
   }[];
}[];

const footer_data: DataType[] = [
   {
      id: 1,
      title: "Company",
      class_name: "col-lg-2 col-md-5",
      footer_link: [
         { link: "/", title: "Home" },
         { link: "/about", title: "About Us" },
         { link: "/blog", title: "Blog" },
         { link: "/categories", title: "Categories" },
         { link: "/contact", title: "Contact" },
      ]
   },
   {
      id: 2,
      title: "Blogs",
      class_name: "col-lg-3 col-md-4",
      footer_link: [
         { link: "", title: "Apps & Software" },
         { link: "", title: "Gaming Apps" },
         { link: "", title: "Social Media Apps" },
         { link: "", title: "Hardware & Gadgets" },
         { link: "", title: "Mobile App Development" },
      ]
   },
   {
      id: 3,
      title: "Categories",
      class_name: "col-lg-4 col-md-4",
      footer_link: [
         { link: "", title: "Tech Tips & Hacks" },
         { link: "", title: "Tech Lifestyle" },
         { link: "", title: "Artificial Intelligence & Machine Learning" },
         { link: "", title: "Future Tech & Innovations" },
         { link: "", title: "Networking & Connectivity" },
      ]
   },
   
];

export default footer_data;