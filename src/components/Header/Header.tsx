import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { NavHashLink } from "react-router-hash-link";
import styles from "./Header.module.css";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import { useTheme } from "../../context/ThemeContext";

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const navItems = [
  { path: "/", name: "Home" },
  { path: "/catalogo", name: "Catálogo" },
  { path: "/saiba-mais", name: "Saiba Mais" },
  { path: "/contato", name: "Contato" },
  { path: "/#faq", name: "FAQ" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const currentPageName =
    navItems.find((item) => location.pathname === item.path)?.name ||
    navItems.find(
      (item) => location.pathname.startsWith(item.path) && item.path !== "/"
    )?.name ||
    "Home";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const navLinkClasses = (itemPath: string) => {
    if (itemPath === "/#faq") {
      return "text-xl lg:text-2xl font-light text-texto-principal hover:text-gray-500 transition-colors duration-300";
    }

    const isActive = location.pathname === itemPath;

    return `text-xl lg:text-2xl font-light transition-colors duration-300 ${
      isActive ? styles.active : "text-texto-principal hover:text-gray-500"
    }`;
  };

  const { theme } = useTheme();

  const logoSrc =
    theme === "light"
      ? "/Full-name-2-thin black.png"
      : "/Full-name-2-thin 1.png";

  return (
    <header className="bg-fundo-principal border-b border-borda sticky top-0 z-40 transition-colors">
      <div className="container mx-auto flex w-full items-center justify-between h-28 px-4">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className={`text-texto-principal z-50 md:hidden transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <MenuIcon />
          </button>

          <div className="hidden md:flex items-center">
            <NavHashLink to="/#" smooth className="flex items-center">
              <img
                className="w-32 sm:w-40 lg:w-52 transition-all duration-300"
                src={logoSrc}
                alt="Logo Rethink3D"
              />
              <span className="text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-[#ffffff]">
                / Web
              </span>
            </NavHashLink>
          </div>

          <div className={`md:hidden relative ${styles.activeMobile}`}>
            <span className="text-lg sm:text-xl font-medium text-gray-800 dark:text-[#ffffff]">
              {currentPageName}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <nav className="hidden md:flex items-center md:gap-3 lg:gap-6 xl:gap-8">
            {navItems.map((item) => (
              <NavHashLink
                key={item.path}
                to={item.path === "/" ? "/#" : `${item.path}`}
                smooth
                className={navLinkClasses(item.path)}
              >
                {item.name}
              </NavHashLink>
            ))}
          </nav>
          <div className="hidden md:block w-px h-6 bg-borda"></div>
          <HashLink
            to="/catalogo"
            smooth
            className={`${styles.ctaButtonWithBorder} font-semibold text-texto-principal text-sm rounded-xl px-4 py-2 md:px-2 md:py-1 lg:px-6 lg:py-3 transition-transform duration-200 hover:scale-105 inline-block text-center`}
          >
            <div className="flex flex-col items-center leading-tight whitespace-nowrap lg:flex-row lg:gap-1.5">
              <span>Ver Catálogo </span>
            </div>
          </HashLink>
          <div className="hidden md:flex">
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-full max-w-xs bg-gray-100 dark:bg-black shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center h-28 px-4 gap-4">
            <button onClick={toggleMenu} className="text-texto-principal z-50">
              <CloseIcon />
            </button>
            <NavHashLink
              to="/#"
              smooth
              onClick={toggleMenu}
              className="flex items-center"
            >
              <img className="w-40" src={logoSrc} alt="Logo Rethink3D" />
              <span className="text-xl text-gray-800 dark:text-[#ffffff]">
                / Web
              </span>
            </NavHashLink>
          </div>

          <nav className="flex flex-col items-center pt-2 flex-grow gap-8">
            {navItems.map((item) => (
              <NavHashLink
                key={item.path}
                to={item.path}
                smooth
                className={navLinkClasses(item.path)}
                onClick={toggleMenu}
              >
                {item.name}
              </NavHashLink>
            ))}

            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
