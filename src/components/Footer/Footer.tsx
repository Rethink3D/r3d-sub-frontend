import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    // ANTES: bg-black dark:bg-[#141414] text-gray-400
    // AGORA: Define um fundo claro e texto escuro para o modo padrão (claro)
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 py-12">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10 text-center sm:text-left">
          <div className="flex justify-center sm:justify-normal gap-4 text-4xl font-semibold">
            <Link
              to="/"
              className="flex items-baseline w-56 sm:w-48"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img src="/Full-name-2-thin 1.png" alt="Logo Rethink 3D" />
            </Link>
          </div>

          {/* Navegação */}
          <div>
            {/* ANTES: text-white */}
            {/* AGORA: Define texto escuro para o modo claro e branco para o modo escuro */}
            <h4 className="font-semibold text-gray-900 dark:text-white text-xl mb-4">Navegação</h4>
            <ul className="space-y-3 text-lg">
              <li>
                <Link
                  to="/"
                  // ANTES: hover:text-white
                  // AGORA: Define hover escuro para modo claro e hover claro para modo escuro
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/quem-somos"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-xl mb-4">Contato</h4>
            <ul className="space-y-3 text-lg">
              <li>
                <a
                  href="mailto:rethink3dbr@gmail.com"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  rethink3dbr@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/_rethink3d/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  @_rethink3d
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha divisória e Copyright */}
        {/* ANTES: border-gray-700 dark:border-gray-800 */}
        {/* AGORA: Define uma borda clara para o modo claro e escura para o modo escuro */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-8 text-center text-sm">
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