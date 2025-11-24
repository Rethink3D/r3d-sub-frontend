import { NavHashLink } from "react-router-hash-link";
import { HashLink } from "react-router-hash-link";
import styles from "../Header.module.css";
import UserMenu from "./UserMenu";

interface NavItem {
  path: string;
  name: string;
}

interface DesktopNavProps {
  navItems: NavItem[];
  navLinkClasses: (path: string) => string;
  isCatalogPage: boolean;
  onOpenRequestDrawer: () => void;
  isAuthenticated: boolean;
}

const DesktopNav: React.FC<DesktopNavProps> = ({
  navItems,
  navLinkClasses,
  isCatalogPage,
  onOpenRequestDrawer,
  isAuthenticated,
}) => {
  return (
    <div className="flex items-center gap-2 md:gap-2 lg:gap-4 h-full">
      <nav className="hidden md:flex items-center md:gap-2 lg:gap-6 xl:gap-8">
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

      <div className="hidden md:block w-px h-6 bg-borda mx-2"></div>

      {!isAuthenticated && (
        <div className="flex items-center mt-1">
          {isCatalogPage ? (
            <button
              onClick={onOpenRequestDrawer}
              className={`${styles.ctaButtonWithBorder} font-semibold text-texto-principal text-sm rounded-xl px-4 py-2 md:px-2 md:py-2 lg:px-6 lg:py-3 transition-transform duration-200 hover:scale-105 inline-block text-center`}
            >
              <div className="flex flex-col items-center leading-tight lg:flex-row lg:gap-1.5 lg:whitespace-nowrap">
                <span>Solicitar Impressão</span>
              </div>
            </button>
          ) : (
            <HashLink
              to="/catalogo"
              className={`${styles.ctaButtonWithBorder} font-semibold text-texto-principal text-sm rounded-xl px-4 py-2 md:px-2 md:py-2 lg:px-6 lg:py-3 transition-transform duration-200 hover:scale-105 inline-block text-center`}
            >
              <div className="flex flex-col items-center leading-tight lg:flex-row lg:gap-1.5 lg:whitespace-nowrap">
                <span>Ver Catálogo </span>
              </div>
            </HashLink>
          )}
        </div>
      )}

      <div className="hidden md:flex pl-2 items-center">
        <UserMenu isMobile={false} isAuthenticated={isAuthenticated} />
      </div>
    </div>
  );
};

export default DesktopNav;
