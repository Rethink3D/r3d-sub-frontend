import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./Header.module.css";
import { useTheme } from "../../context/ThemeContext";
import { auth } from "../../firebase-config";
import { MenuIcon } from "./subcomponents/HeaderIcons";
import DesktopNav from "./subcomponents/DesktopNav";
import MobileMenu from "./subcomponents/MobileMenu";

const navItems = [
  { path: "/", name: "Home" },
  { path: "/catalogo", name: "Catálogo" },
  { path: "/saiba-mais", name: "Saiba Mais" },
  { path: "/contato", name: "Contato" },
];

interface HeaderProps {
  onOpenRequestDrawer: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenRequestDrawer }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();
  const [user] = useAuthState(auth);
  const isAuthenticated = !!user;

  const isCatalogPage = location.pathname === "/catalogo";

  const currentPageName =
    navItems.find((item) => location.pathname === item.path)?.name ||
    navItems.find(
      (item) => location.pathname.startsWith(item.path) && item.path !== "/",
    )?.name ||
    "Home";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinkClasses = (itemPath: string) => {
    const baseClasses =
      "text-xl md:text-lg lg:text-xl font-light text-texto-principal transition-colors duration-300";

    if (itemPath === "/#faq") return `${baseClasses} hover:text-gray-500`;
    const isActive = location.pathname === itemPath;
    return `${baseClasses} ${isActive ? styles.active : "hover:text-gray-500"}`;
  };

  const logoSrc =
    theme === "light"
      ? "/Full-name-2-thin black.png"
      : "/Full-name-2-thin 1.png";

  return (
    <header className="bg-fundo-principal border-b border-gray-300 dark:border-gray-700 sticky top-0 z-40 transition-colors">
      <div className="container mx-auto flex w-full items-center justify-between h-28 px-4">
        <div className="flex items-center gap-4">
          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className={`text-texto-principal z-50 md:hidden transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <MenuIcon />
          </button>

          {/* Logo Desktop */}
          <div className="hidden md:flex items-center">
            <NavHashLink
              to="/#"
              smooth
              className="flex items-center flex-nowrap"
            >
              <img
                className="w-32 sm:w-40 md:w-36 lg:w-52 transition-all duration-300"
                src={logoSrc}
                alt="Logo Rethink3D"
              />
              <span className="text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-[#ffffff]">
                / Web
              </span>
            </NavHashLink>
          </div>

          {/* Mobile title */}
          <div className={`md:hidden relative ${styles.activeMobile}`}>
            <span className="text-lg sm:text-xl font-medium text-gray-800 dark:text-[#ffffff]">
              {currentPageName}
            </span>
          </div>
        </div>

        <DesktopNav
          navItems={navItems}
          navLinkClasses={navLinkClasses}
          isCatalogPage={isCatalogPage}
          onOpenRequestDrawer={onOpenRequestDrawer}
          isAuthenticated={isAuthenticated}
        />
      </div>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navItems={navItems}
        navLinkClasses={navLinkClasses}
        logoSrc={logoSrc}
        isAuthenticated={isAuthenticated}
      />
    </header>
  );
};

export default Header;
