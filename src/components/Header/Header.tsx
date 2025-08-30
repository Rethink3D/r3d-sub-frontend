import React, { useState, useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import { NavHashLink } from 'react-router-hash-link';
import styles from './Header.module.css';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { useTheme } from '../../context/ThemeContext';

const MenuIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>;

const CloseIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>;


const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => { setIsMenuOpen(!isMenuOpen) };
  useEffect(() => {
    if (isMenuOpen) { document.body.style.overflow = 'hidden'; } 
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);


  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-xl lg:text-2xl font-light transition-colors duration-300 ${
      isActive
        ? styles.active
        : 'text-texto-principal hover:text-gray-500' 
    }`;

  const { theme } = useTheme();

  const logoSrc = theme === 'light' ? '/Full-name-2-thin black.png' : '/Full-name-2-thin 1.png';
  
  return (
    <header className="bg-fundo-principal border-b border-borda sticky top-0 z-50 transition-colors">
      <div className="container mx-auto flex w-full items-center justify-between h-28 px-4">
        
        <div className="flex items-center gap-4">
          <button onClick={toggleMenu} className="text-texto-principal z-50 md:hidden">
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>

          <div>
            <NavHashLink to="/#" smooth className="flex items-center">
              <img className="w-32 sm:w-40 lg:w-52 transition-all duration-300" src={ logoSrc } alt="Logo Rethink3D" />
              <span className="text-lg sm:text-xl lg:text-2xl text-gray-800 dark:text-[#ffffff]">/ Web</span>
            </NavHashLink>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <nav className="hidden md:flex items-center md:gap-3 lg:gap-6 xl:gap-8">
            <NavHashLink to="/#" smooth className={navLinkClasses}>Home</NavHashLink>
            <NavHashLink to="/quem-somos#" smooth className={navLinkClasses}>Quem Somos</NavHashLink>
            <NavHashLink to="/catalogo" className={navLinkClasses}>Catálogo</NavHashLink>
            <NavHashLink to="/contato#" smooth className={navLinkClasses}>Contato</NavHashLink>
          </nav>
          
          <div className="hidden md:block w-px h-6 bg-borda"></div>

          <HashLink 
            to="/#form-maker" 
            smooth
            className={`${styles.ctaButtonWithBorder} font-semibold text-texto-principal text-sm rounded-xl px-4 py-2 md:px-2 md:py-1 lg:px-6 lg:py-3 transition-transform duration-200 hover:scale-105 inline-block text-center`}
          >
              <div className="flex flex-col items-center leading-tight whitespace-nowrap lg:flex-row lg:gap-1.5">
                <span>Seja um </span>
                <span className="font-bold">Maker</span>
              </div>
          </HashLink>
          
          <div className='hidden md:flex'>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div 
        className={`fixed top-0 left-0 h-full w-full max-w-xs bg-fundo-principal shadow-lg transform transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          <NavHashLink to="/#" smooth className={navLinkClasses} onClick={toggleMenu}>Home</NavHashLink>
          <NavHashLink to="/quem-somos#" smooth className={navLinkClasses} onClick={toggleMenu}>Quem Somos</NavHashLink>
          {/* BOTÃO ADICIONADO AQUI (MOBILE) */}
          <NavHashLink to="/catalogo" className={navLinkClasses} onClick={toggleMenu}>Catálogo</NavHashLink>
          <NavHashLink to="/contato#" smooth className={navLinkClasses} onClick={toggleMenu}>Contato</NavHashLink>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;