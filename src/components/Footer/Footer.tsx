import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[oklch(20.5%_0_0)] dark:bg-[oklch(14.5%_0_0)] text-gray-300 py-12">
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
                  to="/catalogo"
                  className="hover:text-white transition-colors"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  to="/saiba-mais"
                  className="hover:text-white transition-colors"
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  Saiba Mais
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

        <div className="border-t border-gray-700 pt-8 text-center text-sm">
          <p>Copyright {new Date().getFullYear()} Rethink3D.</p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
