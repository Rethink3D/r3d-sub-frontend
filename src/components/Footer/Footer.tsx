import { Link } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaQuestionCircle,
  FaEnvelope,
  FaInstagram,
  FaPhoneAlt,
  FaFileContract,
} from "react-icons/fa";
import { IoCubeOutline } from "react-icons/io5";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[oklch(20.5%_0_0)] dark:bg-[oklch(14.5%_0_0)] text-gray-300 py-12">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div className="flex justify-center lg:justify-start">
            <Link
              to="/"
              className="flex items-center w-48"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <img src="/Full-name-2-thin 1.png" alt="Logo Rethink 3D" />
            </Link>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-white text-xl mb-4">Navegação</h4>
            <ul className="space-y-3 text-lg">
              <li>
                <Link to="/" className="flex items-center gap-3">
                  <FaHome /> <span>Home</span>
                </Link>
              </li>
              <li>
                <Link to="/catalogo" className="flex items-center gap-3">
                  <IoCubeOutline /> <span>Catálogo</span>
                </Link>
              </li>
              <li>
                <Link to="/saiba-mais" className="flex items-center gap-3">
                  <FaInfoCircle /> <span>Saiba Mais</span>
                </Link>
              </li>
              <li>
                <Link to="/contato" className="flex items-center gap-3">
                  <FaPhoneAlt /> <span>Contato</span>
                </Link>
              </li>
              <li>
                <Link to="/#faq" className="flex items-center gap-3">
                  <FaQuestionCircle /> <span>FAQ</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-white text-xl mb-4">Contato</h4>
            <ul className="space-y-3 text-lg">
              <li>
                <a
                  href="mailto:rethink3dbr@gmail.com"
                  className="flex items-center gap-3"
                >
                  <FaEnvelope /> <span>rethink3dbr@gmail.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/_rethink3d/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3"
                >
                  <FaInstagram /> <span>@_rethink3d</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-white text-xl mb-4">Legal</h4>
            <ul className="space-y-3 text-lg">
              <li>
                <Link to="/termos" className="flex items-center gap-3">
                  <FaFileContract /> <span>Termos de Uso</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/exclusao-de-conta"
                  className="flex items-center gap-3"
                >
                  <FaFileContract /> <span>Exclusão de Conta</span>
                </Link>
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
