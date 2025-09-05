const WandIcon = () => (
  <svg
    className="w-4 h-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"
    />
  </svg>
);

interface ProductCardProps {
  imageUrl: string;
  title: string;
  description: string;
  price: string;
  isCustomizable?: boolean;
  onCardClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  description,
  price,
  isCustomizable,
  onCardClick,
}) => {
  return (
    <div
      onClick={onCardClick}
      className="p-0.5 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 cursor-pointer transform hover:scale-105 transition-transform duration-300 h-full"
    >
      {/* Container principal do card com cores para os dois temas */}
 <div className="  bg-white dark:bg-gray-800 dark:bg-opacity-100 h-full rounded-[14px] p-4 flex flex-col text-gray-900 dark:text-gray-50">
        {/* Container da imagem */}
        <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg mb-4">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-40 object-contain rounded-lg p-2"
          />
        </div>

        <div className="flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>

          {/* Descrição com cores ajustadas */}
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
            {description}
          </p>

          <div className="flex justify-between items-end mt-auto pt-2">
            {isCustomizable && (
              // Tag "Personalizável" com cores ajustadas
              <p className="flex items-center gap-1 text-purple-600 dark:text-purple-300 bg-purple-100 dark:bg-purple-900/50 font-bold text-xs py-1 px-2 rounded-md">
                <WandIcon />
                Customizável
              </p>
            )}
            <div className="text-right ml-auto">
              {/* Texto "preço sugerido" com cores ajustadas */}
              <span className="text-xs text-gray-500 dark:text-gray-400 block">
                preço sugerido
              </span>
              {/* Preço com cores ajustadas */}
              <p className="text-green-500 dark:text-green-400 text-2xl font-bold drop-shadow-md">
                R${price}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
