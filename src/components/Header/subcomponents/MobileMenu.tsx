import { NavHashLink } from "react-router-hash-link";
import { CloseIcon } from "./HeaderIcons";
import UserMenu from "./UserMenu";
import { useRef, useEffect } from "react";

interface NavItem {
  path: string;
  name: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  navLinkClasses: (path: string) => string;
  logoSrc: string;
  isAuthenticated: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  navItems,
  navLinkClasses,
  logoSrc,
  isAuthenticated,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={menuRef}
      className={`fixed top-0 left-0 h-full w-full max-w-xs bg-gray-100 dark:bg-black shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center h-28 px-4 gap-4">
          <button onClick={onClose} className="text-texto-principal z-50">
            <CloseIcon />
          </button>
          <NavHashLink
            to="/#"
            smooth
            onClick={onClose}
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
              onClick={onClose}
            >
              {item.name}
            </NavHashLink>
          ))}

          <div className="w-full px-8 pt-2">
            <UserMenu isMobile={true} isAuthenticated={isAuthenticated} />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
