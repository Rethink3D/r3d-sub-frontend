import ProductCard from "./ProductCard/ProductCard";
import { LoadingSpinner } from "./Icons";
import { Product } from "../../../types/types";
import styles from "../Catalogo.module.css";

interface ProductGridProps {
  products: Product[];
  onCardClick: (product: Product) => void;
  lastProductElementRef: (node: HTMLDivElement) => void;
  isLoadingMore: boolean;
  animate: boolean;
  onOpenRequestDrawer: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onCardClick,
  lastProductElementRef,
  isLoadingMore,
  animate,
  onOpenRequestDrawer
}) => (
  <>
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 ${
        animate ? styles.gridFadeIn : ""
      }`}
    >
      {products.map((product, index) => {
        const card = (
          <ProductCard
            key={product.id}
            imageUrl={product.images?.[0]?.url || ""}
            title={product.name}
            price={product.price}
            isCustomizable={product.isPersonalizable}
            description={product.description || ""}
            onCardClick={() => onCardClick(product)}
          />
        );

        if (products.length === index + 1) {
          return (
            <div ref={lastProductElementRef} key={product.id}>
              {card}
            </div>
          );
        }
        return card;
      })}
    </div>

    {products.length === 0 && !isLoadingMore && (
      <div className="text-center py-16 col-span-full">
        <p className="text-xl text-gray-500 dark:text-gray-400">
          Nenhum produto encontrado.
        </p>
        <button
          onClick={onOpenRequestDrawer}
          className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
        >
          Não encontrou o que queria? Solicite uma impressão sob demanda.
        </button>
      </div>
    )}
    {isLoadingMore && (
      <div className="flex justify-center items-center py-8">
        <LoadingSpinner />
      </div>
    )}
  </>
);

export default ProductGrid;
