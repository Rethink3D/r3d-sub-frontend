import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './header.module.css'; // O nosso CSS Module para gradientes

const Header: React.FC = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `text-2xl font-light transition-colors duration-300 ${
      isActive
        ? styles.active // Aplica a classe com a animação
        : 'text-white hover:text-gray-300'
    }`;

  return (
    <header className="bg-[#141414] border-b border-gray-800">
      <div className="container mx-auto flex w-full items-center h-28 px-4">
        
        {/* Bloco do Logo Atualizado */}
        <div className="flex items-center gap-4 text-4xl font-semibold">
          
          <NavLink to="/" className="flex items-baseline">
            <span className={styles.logoText}>Rethink3D</span>
            <span className={styles.webText}>/ Web</span>
          </NavLink>
        </div>

        {/* Grupo de Itens da Direita */}
        <div className="hidden md:flex items-center ml-auto gap-10">
          <nav className="flex items-center gap-10">
            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
         {/*   <NavLink to="/catalogo" className={navLinkClasses}>Catálogo</NavLink>  */}
            <NavLink to="/quem-somos" className={navLinkClasses}>Quem Somos</NavLink>
            <NavLink to="/contato" className={navLinkClasses}>Contato</NavLink>
          </nav>
          
          <div>
            <button className={`${styles.ctaButtonWithBorder} font-semibold text-white text-xl rounded-2xl px-7 py-3 transition-transform duration-200 hover:scale-105`}>
              Seja um Maker
            </button>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
