import React from 'react';
import { Maker } from '../../../types/types';

interface DemandMakerCardProps {
  maker: Maker;
}

const DemandMakerCard: React.FC<DemandMakerCardProps> = ({ maker }) => {
  return (
    <div className="flex flex-col bg-fundo-secundario p-4 rounded-lg border border-borda hover:border-blue-500 transition-colors duration-300 cursor-pointer">
      <div className="flex items-start gap-4">
        {/* Imagem do Maker */}
        <img
          src={maker.profileImage?.url || `https://ui-avatars.com/api/?name=${maker.name.replace(" ", "+")}&background=random&color=fff`}
          alt={`Perfil de ${maker.name}`}
          className="w-20 h-20 rounded-md object-cover bg-gray-300 dark:bg-gray-700 flex-shrink-0" // Adicionado flex-shrink-0 para segurança
        />
        {/* Informações do Maker */}
        <div className="flex-1 min-w-0"> {/* <-- CORREÇÃO 1: Adicionado min-w-0 para permitir que o flex item encolha */}
          <h3 className="text-lg font-bold text-texto-principal truncate">{maker.name}</h3>
          <p className="text-sm text-texto-secundario mt-1 line-clamp-3 break-words"> {/* <-- CORREÇÃO 2: Adicionado break-words para forçar a quebra de linhas longas */}
            {maker.description}
          </p>
        </div>
      </div>
      {/* Tags de Categoria */}
      {maker.categories && maker.categories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {maker.categories.slice(0, 3).map((category) => (
            <span
              key={category.id}
              className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 font-semibold px-2 py-1 rounded-full"
            >
              {category.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default DemandMakerCard;