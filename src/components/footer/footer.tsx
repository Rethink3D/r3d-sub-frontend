import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css'; // Importando o nosso CSS Module

const Footer: React.FC = () => {
  const handleServiceClick = (serviceName: string) => {
  alert(`Você clicou em: ${serviceName}`);
};

return (
    <footer className="bg-[#1f1f1fc9] dark:bg-[#141414] text-gray-400 py-12">
      <div className="container mx-auto px-8">
        
        {/* Seção superior com as colunas de links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 text-center sm:text-left">
          
            
            {/* NOVO: Contêiner para alinhar a imagem e o texto horizontalmente */}
            <div className="flex items-center gap-3 mb-4">
              {/* Coloque a sua imagem do logo aqui */}
              
              
              <h3 className={`${styles.logoGradient} text-4xl font-semibold`}>
                Rethink3D               
              </h3>
              
          </div>



          {/* Coluna 2: Navegação */}
          <div>
            <h4 className="font-semibold text-white text-xl mb-4">Navegação</h4>
            <ul className="space-y-3 text-lg">
              <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/quem-somos" className="hover:text-white transition-colors">Quem Somos</Link></li>
              <li><Link to="/contato" className="hover:text-white transition-colors">Contato</Link></li>
            </ul>
          </div>

          {/* Coluna 3: Serviços */}
          <div>
            <h4 className="font-semibold text-white text-xl mb-4">Serviços</h4>
            <ul className="space-y-3 text-lg">
              <li><a href="#" className="hover:text-white transition-colors">Impressão 3D</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Projetos Personalizados</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Consultoria Técnica</a></li>
            </ul>
          </div>

          {/* Coluna 4: Contato */}
          <div>
            <h4 className="font-semibold text-white text-xl mb-4">Contato</h4>
            <ul className="space-y-3 text-lg">
              <li><a href="mailto:rethink3dbr@gmail.com" className="hover:text-white transition-colors">rethink3dbr@gmail.com</a></li>
              <li><a href="#" className="hover:text-white transition-colors">_rethink3d</a></li>
              {/* Você pode adicionar ícones aqui mais tarde */}
            </ul>
          </div>
        </div>

        {/* Linha divisória e Copyright */}
        <div className="border-t border-gray-700 dark:border-gray-800 pt-8 text-center text-sm">
          <p>Copyright {new Date().getFullYear()} Rethink3D. Todos os direitos reservados.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
