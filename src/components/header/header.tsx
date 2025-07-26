import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'; // O nosso CSS Module para gradientes

const Header: React.FC = () => {
  // Função para aplicar estilos aos links de navegação
  // O link ativo agora fica com a cor rosa e maior
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `font-light transition-all duration-300 ${
      isActive
        ? 'text-[#f700af] text-3xl' // Aumenta o tamanho da fonte quando ativo
        : 'text-white text-2xl hover:text-gray-300'
    }`;

  return (
    // Fundo atualizado para #141414
    <header className="bg-[#141414] border-b border-gray-800">
      <div className="container mx-auto flex w-full items-center h-28 px-4">
        
        {/* Bloco do Logo: Imagem e Título lado a lado */}
        <div className="flex items-center gap-4">
          {/* Adicionando a imagem do logo */}
          <img src="public/logo.png" alt="Logotipo Rethink3D" className="h-14 w-auto" />
          <div className={`${styles.logoText} text-4xl font-semibold`}>
            <NavLink to="/">Rethink3D</NavLink>
          </div>
        </div>

        {/* Grupo de Itens da Direita */}
        <div className="hidden md:flex items-center ml-auto gap-10">
          <nav className="flex items-center gap-10">
            <NavLink to="/" className={navLinkClasses}>Home</NavLink>
            <NavLink to="/catalogo" className={navLinkClasses}>Catálogo</NavLink>
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
