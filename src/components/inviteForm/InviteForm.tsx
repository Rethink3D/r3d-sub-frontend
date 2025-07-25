import React, { useState } from 'react';

const CubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-12 h-12 text-gray-500 mb-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
    />
  </svg>
);

const InviteForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Novo parceiro em potencial:', { name, email });
    alert(`Obrigado, ${name}! Recebemos seu contato e em breve nossa equipe falará com você.`);
    setName('');
    setEmail('');
  };

  return (
    <div className="w-full max-w-lg mx-auto border border-gray-700 bg-[#1F1F24] rounded-lg p-8 shadow-lg">
      <div className="flex flex-col items-center text-center mb-8">
        <CubeIcon />
        <h2 className="text-4xl font-bold text-white tracking-tight">
          Exponha sua Arte na Rethink3D
        </h2>
        <p className="text-gray-400 mt-4 max-w-md">
          Buscamos artistas e estúdios 3D para expandir nosso catálogo. Se você cria, nós ajudamos a divulgar.
        </p>
      </div>

      <hr className="border-gray-700 my-8" />

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
            Seu Nome ou Nome do Estúdio
          </label>
          <input
            type="text"
            id="name"
            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-3 transition-colors duration-300"
            placeholder="Como podemos te chamar?"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
            Seu Melhor E-mail
          </label>
          <input
            type="email" 
            id="email"
            className="bg-gray-800 border border-gray-600 text-white text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-3 transition-colors duration-300"
            placeholder="exemplo@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 text-white font-bold rounded-lg text-base px-5 py-3 text-center transition-all duration-300 ease-in-out
                     bg-[linear-gradient(90deg,#ff00aa_0%,#8000ff_100%)]
                     hover:scale-105 hover:shadow-xl hover:shadow-pink-500/20"
        >
          Quero Ser um Parceiro
        </button>
      </form>
    </div>
  );
};

export default InviteForm;