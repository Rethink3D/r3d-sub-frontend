import { useEffect } from "react";
import styles from "./MakerProfileModal.module.css";
import { Maker, Product } from "../../../../types/types";
import { CloseIcon, LoadingSpinner } from "../Icons";
import FeaturedProductCarousel from "./components/FeatuedProductCarousel/FeaturedProductCarousel";
import { useEscapeKey } from "./hook/useEscapeKey";
import MakerHeader from "./components/MakerHeader";
import MakerDescription from "./components/MakerDescription";
import ContactList from "./components/ContactList";
import MakerCategories from "./components/MakerCategories";
import { trackEvent } from "../../../../utils/analytics";

interface MakerProfileModalProps {
  maker: Maker;
  featuredProduct?: Product;
  onClose: () => void;
  isLoading?: boolean;
  onViewAllProducts: (makerName: string) => void;
}

const MakerProfileModal: React.FC<MakerProfileModalProps> = ({
  maker,
  featuredProduct,
  onClose,
  isLoading,
  onViewAllProducts,
}) => {
  useEscapeKey(onClose);

  useEffect(() => {
    if (featuredProduct) {
      trackEvent("Visualização de Produto (Modal)", {
        label: `productId:${featuredProduct.id}|makerId:${maker.id}`,
      });
    }
  }, [featuredProduct, maker.id]);

  useEffect(() => {
    const scrollContainer = document.getElementById(
      "maker-modal-scroll-container"
    );
    if (scrollContainer) {
      scrollContainer.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [maker.id, featuredProduct?.id]);

  const handleModalContentClick = (e: React.MouseEvent) => e.stopPropagation();

  const handleViewAllClick = () => {
    onViewAllProducts(maker.name);
    onClose();
  };

  const hasFeaturedProduct = !!featuredProduct;
  const hasSingleContact = maker.contacts.length === 1;

  const renderLoadingState = () => (
    <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
      <LoadingSpinner className="w-12 h-12" />
      <p className="text-gray-400">Carregando perfil do maker...</p>
    </div>
  );

  const renderContentWithProduct = () => (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        <div className="flex flex-col h-full">
          <FeaturedProductCarousel product={featuredProduct!} />
        </div>

        <div className="flex flex-col">
          <MakerHeader maker={maker} />

          <div className="mt-4">
            <MakerCategories maker={maker} />
          </div>

          <div className="mt-6 mb-6">
            <MakerDescription description={maker.description} />
          </div>

          <button
            onClick={handleViewAllClick}
            className={`${styles.viewAllButton} w-full font-bold py-3.5 px-6 rounded-xl bg-purple-600 hover:bg-purple-700 text-white shadow-lg transition-transform active:scale-[0.98]`}
          >
            Ver Todos os Produtos de {maker.name}
          </button>

          {hasSingleContact && (
            <ContactList
              maker={maker}
              product={featuredProduct}
              singleColumn={true}
            />
          )}
        </div>
      </div>

      {!hasSingleContact && (
        <ContactList maker={maker} product={featuredProduct} />
      )}
    </>
  );

  const renderContentWithoutProduct = () => (
    <div className="flex flex-col items-center text-center gap-8 py-4">
      <MakerHeader maker={maker} />
      <MakerCategories maker={maker} />
      <div className="max-w-2xl">
        <MakerDescription description={maker.description} />
      </div>
      <button
        onClick={handleViewAllClick}
        className={`${styles.viewAllButton} font-bold py-3 px-8 rounded-xl bg-purple-600 text-white hover:bg-purple-700`}
      >
        Ver Todos os Produtos
      </button>
      <div className="w-full max-w-3xl">
        <ContactList maker={maker} />
      </div>
    </div>
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-2 sm:p-4"
    >
      <div
        id="maker-modal-scroll-container"
        onClick={handleModalContentClick}
        className={`${styles["animate-fade-in-scale"]} ${styles["no-scrollbar"]} relative bg-white dark:bg-[#121212] text-gray-900 dark:text-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-y-auto p-6 sm:p-8 border border-gray-200 dark:border-gray-800`}
      >
        <div className="flex justify-end w-full mb-2 lg:mb-0 lg:absolute lg:top-4 lg:right-4 lg:z-10 lg:w-auto pointer-events-none">
          <button
            onClick={onClose}
            className="pointer-events-auto p-2 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>

        {isLoading || !maker
          ? renderLoadingState()
          : hasFeaturedProduct
          ? renderContentWithProduct()
          : renderContentWithoutProduct()}
      </div>
    </div>
  );
};

export default MakerProfileModal;
