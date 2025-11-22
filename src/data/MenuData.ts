interface MenuItem {
   id: number;
   title: string;
   link: string;
//
   sub_menus?: {
      link: string;
      title: string;
      mega_dropdown: boolean;
      mega_menus?: {
         link: string;
         title: string;
      }[];
   }[];
}[];

const menu_data: MenuItem[] = [
   {
      id: 1,
      //has_dropdown: true,
      title: "Home",
      link: "/",
   },
   {
      id: 2,
      //has_dropdown: false,
      title: "About Us",
      link: "/about",
   },
   {
      id: 3,
      //has_dropdown: true,
      title: "Blog",
      link: "/blog",
   },
   {
      id: 4,
      //has_dropdown: true,
      title: "Categories",
      link: "/blog-3",
   },
   {
      id: 5,
      //has_dropdown: false,
      title: "Contact",
      link: "/contact",
   },
];
export default menu_data;
