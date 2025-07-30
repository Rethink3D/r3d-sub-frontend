import React from "react";
import { NavLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import styles from "./Header.module.css";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export const handleNavClick = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const Header: React.FC = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-2xl font-light transition-colors duration-300 ${
      isActive ? styles.active : "dark:text-white hover:text-gray-300"
    }`;

  return (
    <header className="bg-white dark:bg-[#141414] border-b border-gray-200 dark:border-gray-800 transition-colors sticky top-0 z-50">
      <div className="container mx-auto flex w-full items-center h-28 px-4">
        <div className="flex items-center gap-4 text-4xl font-semibold">
          <NavLink
            to="/"
            className="flex items-baseline"
            onClick={handleNavClick}
          >
            <span className={styles.logoText}>R3D</span>
            <span className={styles.webText}>/ Web</span>
          </NavLink>
        </div>

        <div className="hidden md:flex items-center ml-auto gap-10">
          <nav className="flex items-center gap-10">
            <NavLink to="/" className={navLinkClasses} onClick={handleNavClick}>
              Home
            </NavLink>
            <NavLink
              to="/quem-somos"
              className={navLinkClasses}
              onClick={handleNavClick}
            >
              Quem Somos
            </NavLink>
            <NavLink
              to="/contato"
              className={navLinkClasses}
              onClick={handleNavClick}
            >
              Contato
            </NavLink>
          </nav>

          <div>
            <Link
              to="/#form-maker"
              smooth
              scroll={(el: { offsetTop: number; }) =>
                window.scrollTo({
                  top: el.offsetTop - 130,
                  behavior: "smooth",
                })
              }
              className={`${styles.ctaButtonWithBorder} font-semibold text-xl rounded-2xl px-7 py-3 transition-transform duration-200 hover:scale-105 inline-block text-center`}
            >
              Seja um Maker
            </Link>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
