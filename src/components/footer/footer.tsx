import React from "react";
import { Link } from "react-router-dom";
import styles from "./footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className="bg-black dark:bg-[#141414] text-gray-400 py-12">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-4">
            <Link
              to="/"
              className="hover:text-white transition-colors"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <h3 className={`${styles.logoGradient} text-4xl font-semibold`}>
                Rethink3D
              </h3>
            </Link>
          </div>

          <div>
            <h4 className="font-semibold text-white text-xl mb-4">Navegação</h4>
            <ul className="space-y-3 text-lg">
              <li>
                <Link
                  to="/"
                  className="hover:text-white transition-colors"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/quem-somos"
                  className="hover:text-white transition-colors"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="hover:text-white transition-colors"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Contato
                </Link>
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
                <a
                  href="https://www.instagram.com/_rethink3d/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @_rethink3d
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
