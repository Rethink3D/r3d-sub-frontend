import React from "react";
import { ProductTypeEnum } from "../../types/types";
import { CAMPAIGN_CONFIG } from "../../config/campaign";

const WandIcon = () => (
  <svg
    className="w-3 h-3"
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
  type?: ProductTypeEnum;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  description,
  price,
  isCustomizable,
  type,
}) => {
  const isPromotional = type === ProductTypeEnum.PROMOTIONAL;

  return (
    <div className="relative hover:z-30 p-0.5 rounded-2xl bg-gradient-to-br from-[#00c6ff] to-[#8c52ff] cursor-pointer h-full w-full transform-gpu transition-transform duration-300 hover:scale-[1.03]">
      <div className="bg-white dark:bg-[#1a1a1a] dark:bg-opacity-100 h-full rounded-[14px] flex flex-col text-gray-900 dark:text-gray-50 overflow-hidden">
        <div className="relative bg-gray-100 w-full overflow-hidden rounded-t-[14px] aspect-square">
          {isPromotional && (
            <div
              className={`absolute top-0 left-0 z-20 px-3 py-1 rounded-br-lg text-xs font-bold uppercase tracking-wide shadow-md ${CAMPAIGN_CONFIG.badgeColor}`}
            >
              {CAMPAIGN_CONFIG.label}
            </div>
          )}

          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />

          {isCustomizable && (
            <div
              tabIndex={0}
              onClick={(e) => e.stopPropagation()}
              className="group absolute bottom-1.5 right-1.5 flex items-center gap-1 bg-purple-600/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-purple-400"
            >
              <WandIcon />
              <span>Personalizável</span>
              <div className="absolute z-20 bottom-full mb-1.5 left-1/2 -translate-x-1/2 w-20 text-center bg-gray-900 text-white text-[10px] rounded-md px-1.5 py-0.5 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none">
                Este produto pode ser personalizado!
              </div>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-base sm:text-lg font-bold mb-1 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem]">
            {title}
          </h3>
          <p className="hidden sm:block text-gray-600 dark:text-gray-300 text-sm mt-1 mb-2 sm:line-clamp-3 sm:h-[3.75rem] overflow-hidden">
            {description}
          </p>
          <div className="flex justify-between items-end mt-auto pt-1">
            <div className="text-right ml-auto">
              <span className="text-xs text-gray-500 dark:text-gray-400 block">
                a partir de
              </span>
              <p className="text-green-500 dark:text-green-400 text-xl sm:text-2xl font-bold drop-shadow-md">
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
