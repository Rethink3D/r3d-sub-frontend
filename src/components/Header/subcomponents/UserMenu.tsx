import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import { MakerIcon, ThemeIcon, UserProfileIcon } from "./HeaderIcons";

interface UserMenuProps {
  isMobile?: boolean;
}

const UserMenu = ({ isMobile = false }: UserMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobile) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  if (isMobile) {
    return (
      <div className="w-full flex flex-col items-center animate-fadeIn">
        <div className="w-full max-w-[200px] h-px bg-gray-300 dark:bg-gray-700 my-4"></div>

        <div className="flex flex-col gap-4 w-full items-center">
          <Link
            to="/maker/login"
            className="text-lg font-medium text-texto-principal flex items-center gap-2 hover:text-blue-500 transition-colors"
          >
            <MakerIcon /> Área Maker
          </Link>

          <button
            onClick={toggleTheme}
            className="text-lg font-medium text-texto-principal flex items-center gap-2 hover:text-blue-500 transition-colors"
          >
            <ThemeIcon theme={theme} /> Trocar de Tema
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative h-10 w-[90px] z-50 flex items-center justify-center mb-2"
      ref={menuRef}
    >
      <div
        className={`
            absolute top-0 right-0 origin-top-right
            bg-white dark:bg-[#1a1a1a]
            border border-gray-300 dark:border-gray-600
            transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            overflow-hidden shadow-xl
            ${
              isOpen
                ? "w-64 rounded-2xl"
                : "w-full rounded-full hover:shadow-md cursor-pointer"
            }
        `}
        onClick={() => !isOpen && setIsOpen(true)}
      >
        <div
          className={`
                flex items-center h-10
                transition-all duration-500
                ${
                  isOpen
                    ? "justify-end gap-3 px-6"
                    : "justify-center gap-3 px-1"
                }
            `}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className={`
                    text-gray-600 dark:text-gray-300 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-500
                    ${
                      isOpen
                        ? "rotate-90 bg-gray-100 dark:bg-gray-800"
                        : "rotate-0"
                    }
                `}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="bg-gray-500 text-white rounded-full p-1 transition-transform duration-300 hover:opacity-80"
          >
            <UserProfileIcon />
          </button>
        </div>

        <div
          className={`
                transition-all duration-500 ease-in-out
                ${isOpen ? "max-h-40 opacity-100 pb-2" : "max-h-0 opacity-0"}
            `}
        >
          <div className="flex flex-col mt-1">
            <div className="h-px bg-gray-200 dark:bg-gray-700 mx-3 mb-2"></div>

            <Link
              to="/maker/login"
              className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#252525] font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-3 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <MakerIcon /> Área Maker
            </Link>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleTheme();
              }}
              className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#252525] text-left font-medium text-gray-700 dark:text-gray-200 flex items-center gap-3 transition-colors w-full"
            >
              <ThemeIcon theme={theme} /> Trocar de Tema
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
