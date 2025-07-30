import React from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";

const Footer: React.FC = () => {
  const handleServiceClick = (serviceName: string) => {
    alert(`Você clicou em: ${serviceName}`);
  };

  return (
    <footer className="bg-black dark:bg-[#141414] text-gray-400 py-12">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 text-center sm:text-left">
          <div className="flex items-center gap-3 mb-4">
            <h3 className={`${styles.logoGradient} text-4xl font-semibold`}>
              Rethink3D
            </h3>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xl mb-4">Navegação</h4>
            <ul className="space-y-3 text-lg">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/quem-somos"
                  className="hover:text-white transition-colors"
                >
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="hover:text-white transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xl mb-4">Serviços</h4>
            <ul className="space-y-3 text-lg">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Impressão 3D
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Projetos Personalizados
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Consultoria Técnica
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xl mb-4">Contato</h4>
            <ul className="space-y-3 text-lg">
              <li>
                <a
                  href="mailto:rethink3dbr@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  rethink3dbr@gmail.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  _rethink3d
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 dark:border-gray-800 pt-8 text-center text-sm">
          <p>
            Copyright {new Date().getFullYear()} Rethink3D. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
