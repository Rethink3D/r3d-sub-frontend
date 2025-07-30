import React from "react";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  imageUrl: string;
  title: string;
  description: string;
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  title,
  description,
  price,
}) => {
  return (
    <div
      className={`${styles.gradientBorder} rounded-2xl p-4 flex flex-col text-white transform hover:scale-105 transition-transform duration-300 min-w-80`}
    >
      <div className="bg-white rounded-lg mb-4">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-contain rounded-lg p-2"
        />
      </div>

      <div className="flex flex-col flex-grow">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{description}</p>

        <div className="text-right mt-auto">
          <span className="text-xs text-gray-500 block">preço sugerido</span>
          <p className="text-2xl font-bold text-white">R${price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
