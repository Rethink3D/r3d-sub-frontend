import React from "react";

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
      className="relative hover:z-10 p-0.5 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 cursor-pointer transform hover:scale-105 transition-transform duration-300 h-full"
    >
      <div className="bg-white dark:bg-[#1a1a1a] dark:bg-opacity-100 h-full rounded-[14px] p-4 flex flex-col text-gray-900 dark:text-gray-50">
        <div className="bg-gray-100 dark:bg-gray-700/50 rounded-lg mb-4 relative">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-40 object-contain rounded-lg p-2"
          />

          {isCustomizable && (
            <div
              tabIndex={0}
              onClick={(e) => e.stopPropagation()}
              className="group absolute bottom-2 right-2 flex items-center gap-1.5 bg-purple-600/80 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <WandIcon />
              <span>Custom</span>
              <div
                className="
                  absolute z-20 bottom-full mb-2 left-1/2 -translate-x-1/2 
                  w-32 text-center       
                  bg-gray-900 text-white text-xs rounded-md px-2 py-1
                  opacity-0 group-hover:opacity-100 group-focus:opacity-100
                  transition-opacity duration-300 pointer-events-none 
                "
              >
                Este produto pode ser personalizado!
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col flex-grow">
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">
            {description}
          </p>
          <div className="flex justify-between items-end mt-auto pt-2">
            <div className="text-right ml-auto">
              <span className="text-xs text-gray-500 dark:text-gray-400 block">
                preço sugerido
              </span>
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
