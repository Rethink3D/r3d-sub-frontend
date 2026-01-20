import React from "react";

const Maintenance: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-fundo-principal px-4 text-center transition-colors duration-300">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--cor-gradiente-logo-1)] to-[var(--cor-gradiente-logo-2)] rounded-full blur-xl opacity-20 animate-pulse"></div>
        <div className="relative bg-fundo-secundario p-6 rounded-full border border-borda shadow-sm">
          <svg
            className="w-12 h-12 text-texto-principal"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
            />
          </svg>
        </div>
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-texto-principal mb-4 tracking-tight">
        Estamos em Manutenção
      </h1>

      <p className="text-lg text-texto-secundario max-w-md mb-8 leading-relaxed">
        Estamos fazendo melhorias para tornar sua experiência ainda mais
        incrível. Voltaremos em breve!
      </p>

      <div className="h-1 w-24 bg-gradient-to-r from-[var(--cor-gradiente-logo-1)] to-[var(--cor-gradiente-logo-2)] rounded-full"></div>
    </div>
  );
};

export default Maintenance;
