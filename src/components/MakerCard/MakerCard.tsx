import React from 'react';

// --- Ícones ---
const StoreIcon = () => (
  <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
);

// Ícone da Varinha Mágica para a tag "Personalizado"
const WandIcon = () => (
  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" />
  </svg>
);


// --- Interface de Props ---
interface MakerCardProps {
  maker: {
    name: string;
    storeName: string;
    location: string;
    avatarUrl?: string; // Avatar é opcional
    offersCustomization?: boolean; // Nova propriedade para personalização
  };
}

// --- Componente ---
const MakerCard: React.FC<MakerCardProps> = ({ maker }) => {
  return (
    <div className="bg-white rounded-lg p-6 flex flex-col items-center text-center h-full shadow-md">
      <img
        src={maker.avatarUrl || `https://ui-avatars.com/api/?name=${maker.name}&background=random`}
        alt={`Foto de ${maker.name}`}
        className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-200"
      />
      <h3 className="text-2xl font-bold text-gray-900">{maker.name}</h3>
      <p className="text-md text-purple-600 font-semibold">{maker.storeName}</p>
      <p className="text-sm text-gray-500 mb-6">{maker.location}</p>

      {/* Tag "Pedidos Personalizados" que aparece condicionalmente */}
      {maker.offersCustomization && (
        <div className="mb-6">
          <span className="flex items-center gap-2 text-purple-700 bg-purple-100 font-bold text-xs py-1 px-3 rounded-full">
            <WandIcon />
            Pedidos Personalizados
          </span>
        </div>
      )}

      <div className="border-t border-gray-200 w-full pt-6 mt-auto">
        <button className="flex items-center justify-center w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors">
          <StoreIcon />
          Ver Loja do Maker
        </button>
      </div>
    </div>
  );
};

export default MakerCard;
