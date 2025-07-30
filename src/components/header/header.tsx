import React from "react";
import { NavLink } from "react-router-dom";
import { HashLink as Link } from "react-router-hash-link";
import styles from "./header.module.css";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

const Header: React.FC = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-2xl font-light transition-colors duration-300 ${
      isActive ? styles.active : "dark:text-white hover:text-gray-300"
    }`;

  return (
    <header className="bg-white dark:bg-[#141414] border-b border-gray-200 dark:border-gray-800 transition-colors sticky top-0 z-50">
      <div className="container mx-auto flex w-full items-center h-28 px-4">
        <div className="flex items-center gap-4 text-4xl font-semibold">
          <NavLink to="/" className="flex items-baseline">
            <span className={styles.logoText}>Rethink3D</span>
            <span className={styles.webText}>/ Web</span>
          </NavLink>
        </div>

        <div className="hidden md:flex items-center ml-auto gap-10">
          <nav className="flex items-center gap-10">
            <NavLink to="/" className={navLinkClasses}>
              Home
            </NavLink>
            <NavLink to="/quem-somos" className={navLinkClasses}>
              Quem Somos
            </NavLink>
            <NavLink to="/contato" className={navLinkClasses}>
              Contato
            </NavLink>
          </nav>

          <div>
            <Link
              to="/#form-maker"
              smooth
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
