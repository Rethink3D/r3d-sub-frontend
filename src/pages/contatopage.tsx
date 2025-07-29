import React from 'react';

const ContatoPage: React.FC = () => {
  return (
    <div className="py-12 text-white">
      <h1 className="text-5xl font-bold mb-10">Entre em contato</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        
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

        {/* Coluna da Direita: QR Code */}
        <div className="flex flex-col items-center">

        </div>
      </div>
    </div>
  );
};

export default ContatoPage;