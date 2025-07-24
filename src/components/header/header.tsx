import React from 'react';
import { NavLink } from 'react-router-dom';
// Passo 2.1: Mude a importação do CSS
import styles from './Header.module.css'; // Importamos o CSS para um objeto chamado 'styles'

const Header: React.FC = () => {
  // Função para gerar as classes dos links
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    // Passo 2.2: Usamos template literals para combinar classes do Tailwind com as do nosso CSS Module
    `font-light text-white transition-colors duration-300 hover:text-[#f700af] ${isActive ? styles.active : ''}`;

  return (
    <header className="bg-[#18181d] border-b border-gray-800">
      <div className="container mx-auto flex w-full items-center h-28 px-4">
        
        {/* Passo 2.3: Acessamos a classe .logo-text através do objeto 'styles' */}
        <div className={`${styles.logoText} text-4xl font-semibold`}>
          <NavLink to="/">Rethink3D</NavLink>
        </div>

        <div className="hidden md:flex items-center ml-auto gap-8">
          <nav className="flex items-center gap-8 text-2xl">
            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
            <NavLink to="/catalogo" className={navLinkClasses}>Catálogo</NavLink>
            <NavLink to="/quem-somos" className={navLinkClasses}>Quem Somos</NavLink>
            <NavLink to="/contato" className={navLinkClasses}>Contato</NavLink>
          </nav>
          
          <div>
            {/* Passo 2.4: Acessamos a classe .cta-button */}
            <button className={`${styles.ctaButton} font-semibold text-white text-xl rounded-2xl px-7 py-3 transition-transform duration-200 hover:scale-105`}>
              Seja um Maker
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;