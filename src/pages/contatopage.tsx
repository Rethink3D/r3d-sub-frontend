import React from 'react';

// --- Ícones como componentes SVG ---
const MailIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
);
const GithubIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/></svg>
);
const InstagramIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const ContatoPage: React.FC = () => {
  return (
    // ATUALIZADO: Adicionadas classes para expandir e centralizar o conteúdo
    <div className="flex flex-col flex-grow justify-center py-12 text-white">
      <h1 className="text-5xl font-bold mb-10 text-center">Entre em contato</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* Coluna da Esquerda: Formulário */}
        <form className="flex flex-col gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-2">Seu nome</label>
            <input 
              type="text" 
              id="name" 
              className="w-full bg-white text-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">Seu email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full bg-white text-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-2">Sua mensagem</label>
            <textarea 
              id="message" 
              rows={5}
              className="w-full bg-white text-black rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            ></textarea>
          </div>
          <div>
            <button 
              type="submit"
              className="bg-transparent border border-gray-500 text-white rounded-lg py-2 px-8 hover:bg-white hover:text-black transition-colors duration-300"
            >
              Enviar
            </button>
          </div>
        </form>

        {/* Coluna da Direita: Cartão de Contatos */}
        <div className="bg-[#1a1a1a] border border-gray-700 rounded-2xl p-8 flex flex-col gap-6">
            <h3 className="text-3xl font-bold text-white">Nossos Canais</h3>
            <p className="text-gray-400">Prefere um contato mais direto? Encontre-nos nas seguintes plataformas.</p>
            <a href="mailto:rethink3dbr@gmail.com" className="flex items-center gap-4 text-lg text-white hover:text-blue-400 transition-colors">
              <MailIcon className="w-7 h-7 text-blue-400" />
              <span>rethink3dbr@gmail.com</span>
            </a>
            <a href="https://github.com/Rethink3D" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-lg text-white hover:text-gray-400 transition-colors">
              <GithubIcon className="w-7 h-7 text-gray-400" />
              <span>Rethink3D</span>
            </a>
            <a href="#" className="flex items-center gap-4 text-lg text-white hover:text-pink-400 transition-colors">
              <InstagramIcon className="w-7 h-7 text-pink-400" />
              <span>_rethink3d</span>
            </a>
          </div>
      </div>
    </div>
  );
};

export default ContatoPage;
