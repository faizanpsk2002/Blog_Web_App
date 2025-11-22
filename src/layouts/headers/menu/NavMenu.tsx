import menu_data from "@/data/MenuData";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

// Define MenuItem interface (removed has_dropdown)
interface MenuItem {
    id: number;
    title: string;
    link: string;
    sub_menus?: {
        link: string;
        title: string;
        mega_dropdown: boolean;
        mega_menus?: {
            link: string;
            title: string;
        }[];
    }[];
}

const NavMenu = () => {
    const [activeMenus, setActiveMenus] = useState<{ [key: string]: boolean }>({});
    const currentRoute = usePathname();

    const isMenuItemActive = (menuLink: string) => currentRoute === menuLink;
    const isSubMenuItemActive = (subMenuLink: string) => currentRoute === subMenuLink;

    const toggleMenu = (menuTitle: string) => {
        setActiveMenus((prev) => ({
            ...prev,
            [menuTitle]: !prev[menuTitle],
        }));
    };

    const isMenuActive = (menu: MenuItem) => {
        if (isMenuItemActive(menu.link)) return true;
        if (menu.sub_menus?.some((subMenu) => isSubMenuItemActive(subMenu.link))) {
            return true;
        }
        return false;
    };

    return (
        <ul className="navigation">
            {menu_data.map((menu: MenuItem) => {
                const hasSubMenu = Array.isArray(menu.sub_menus) && menu.sub_menus.length > 0;

                return (
                    <li
                        key={menu.id}
                        className={`${hasSubMenu ? "menu-item-has-children" : ""} ${
                            isMenuActive(menu) ? "active" : ""
                        }`}
                    >
                        <Link href={menu.link}>{menu.title}</Link>

                        {hasSubMenu && (
                            <>
                                <div
                                    className="dropdown-btn"
                                    onClick={() => toggleMenu(menu.title)}
                                >
                                    <span className="fas fa-angle-down"></span>
                                </div>
                                <ul className={`sub-menu ${activeMenus[menu.title] ? "show" : ""}`}>
                                    {menu.sub_menus?.map((subMenu) => {
                                        const hasMegaMenu =
                                            Array.isArray(subMenu.mega_menus) &&
                                            subMenu.mega_menus.length > 0;

                                        return (
                                            <li
                                                key={subMenu.title}
                                                className={`${
                                                    subMenu.mega_dropdown ? "menu-item-has-children" : ""
                                                } ${
                                                    isSubMenuItemActive(subMenu.link) ? "active" : ""
                                                }`}
                                            >
                                                <Link href={subMenu.link}>
                                                    <span>{subMenu.title}</span>
                                                </Link>

                                                {subMenu.mega_dropdown && hasMegaMenu && (
                                                    <>
                                                        <div
                                                            className="dropdown-btn"
                                                            onClick={() => toggleMenu(subMenu.title)}
                                                        >
                                                            <span className="fas fa-angle-down"></span>
                                                        </div>
                                                        <ul
                                                            className={`sub-menu ${
                                                                activeMenus[subMenu.title] ? "show" : ""
                                                            }`}
                                                        >
                                                            {subMenu.mega_menus?.map((megaMenu) => (
                                                                <li
                                                                    key={megaMenu.title}
                                                                    className={`${
                                                                        isSubMenuItemActive(megaMenu.link)
                                                                            ? "active"
                                                                            : ""
                                                                    }`}
                                                                >
                                                                    <Link href={megaMenu.link}>
                                                                        <span>{megaMenu.title}</span>
                                                                    </Link>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </>
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

export default NavMenu;
