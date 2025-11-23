import { Link } from "react-router-dom";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { LoadingSpinner } from "./Icons";
import { Product } from "../../../types/types";
import styles from "../Catalogo.module.css";

interface ProductGridProps {
    products: Product[];
    lastProductElementRef: (node: HTMLDivElement) => void;
    isLoadingMore: boolean;
    animate: boolean;
    onOpenRequestDrawer: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({
    products,
    lastProductElementRef,
    isLoadingMore,
    animate,
    onOpenRequestDrawer,
}) => (
    <>
        <div
            className={`grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6 ${
                animate ? styles.gridFadeIn : ""
            }`}
        >
            {products.map((product, index) => {
                const productLink = `/catalogo/produto/${product.id}`;
                const card = (
                    <ProductCard
                        imageUrl={product.images?.[0]?.url || ""}
                        title={product.name}
                        price={product.price}
                        isCustomizable={product.isPersonalizable}
                        description={product.description || ""}
                        type={product.type}
                    />
                );

                if (products.length === index + 1) {
                    return (
                        <div ref={lastProductElementRef} key={product.id}>
                            <Link to={productLink}>{card}</Link>
                        </div>
                    );
                }
                return (
                    <Link to={productLink} key={product.id}>
                        {card}
                    </Link>
                );
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
                    Não encontrou o que queria? Solicite uma impressão sob
                    demanda.
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
