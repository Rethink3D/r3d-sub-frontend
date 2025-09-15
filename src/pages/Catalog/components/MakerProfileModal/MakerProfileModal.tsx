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
      trackEvent('Visualização de Produto (Modal)', {
        'label': `productId:${featuredProduct.id}|makerId:${maker.id}`
      });
    }
  }, [featuredProduct, maker.id]);
  
  const handleModalContentClick = (e: React.MouseEvent) => e.stopPropagation();

  const handleViewAllClick = () => {
    onViewAllProducts(maker.name);
    onClose();
  };

  const hasFeaturedProduct = !!featuredProduct;

  const renderLoadingState = () => (
    <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
      <LoadingSpinner className="w-12 h-12" />
      <p className="text-gray-400">Carregando perfil do maker...</p>
    </div>
  );

  const renderContentWithProduct = () => (
    <>
      <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8">
        <div className="flex flex-col mb-8 md:mb-0">
          <MakerHeader maker={maker} />
          <MakerCategories maker={maker} />
          <MakerDescription description={maker.description} />
          <div className="mt-auto pt-4 text-center">
            <button
              onClick={handleViewAllClick}
              className={`${styles.viewAllButton} font-bold py-3 px-6 rounded-lg bg-gray-800 text-white dark:bg-[#00c6ff] dark:text-gray-900`}
            >
              Ver Todos os Produtos de {maker.name}
            </button>
          </div>
        </div>
        <div className="flex flex-col bg-gray-100 dark:bg-black/30 rounded-lg p-6 md:order-first">
          <h2 className="font-bold text-xl mb-4 text-center sm:text-left">
            Produto em Destaque
          </h2>
          <FeaturedProductCarousel product={featuredProduct!} />
        </div>
      </div>
      <ContactList maker={maker} />
    </>
  );

  const renderContentWithoutProduct = () => (
    <>
      <div className="flex flex-col items-center md:items-start text-center md:text-left">
        <MakerHeader maker={maker} />
        <MakerCategories maker={maker} />
      </div>
      <div className="my-6">
        <MakerDescription description={maker.description} />
      </div>
      <div className="text-center mb-6">
        <button
          onClick={handleViewAllClick}
          className={`${styles.viewAllButton} font-bold py-3 px-6 rounded-lg bg-gray-800 text-white dark:bg-[#00c6ff] dark:text-gray-900`}
        >
          Ver Todos os Produtos de {maker.name}
        </button>
      </div>
      <ContactList maker={maker} />
    </>
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      <div
        id="maker-modal-scroll-container"
        onClick={handleModalContentClick}
        className={`${styles["animate-fade-in-scale"]} ${styles["no-scrollbar"]} relative bg-white dark:bg-[#121212] text-gray-900 dark:text-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <CloseIcon className="w-8 h-8" />
        </button>
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
