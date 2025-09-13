import { useState, useEffect } from "react";
import { Product, Maker } from "../../types/types";
import { useCatalog } from "./Hook/useCatalog";
import { sortOptions } from "../../utils/mockData";
import { FilterIcon, LoadingSpinner } from "./components/Icons";
import CategorySidebar from "./components/CategorySideBar";
import CatalogHeader from "./components/CatalogHeader";
import ProductGrid from "./components/ProductGrid";
import MobileFilterDrawer from "./components/MobileFilterDrawer";
import MakerProfileModal from "./components/MakerProfileModal/MakerProfileModal";

interface CatalogProps {
  onOpenRequestDrawer: () => void;
}

const Catalog: React.FC<CatalogProps> = ({ onOpenRequestDrawer }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [fullMakerProfile, setFullMakerProfile] = useState<Maker | null>(null);
  const [isModalLoading, setIsModalLoading] = useState(false);

  const {
    isLoading,
    error,
    productsToShow,
    allCategories,
    allMakers,
    categoryCounts,
    searchInput,
    sortBy,
    selectedCategoryIds,
    isLoadingMore,
    animateGrid,
    setSearchInput,
    setSortBy,
    handleCategoryClick,
    lastProductElementRef,
    handleMakerSearch,
  } = useCatalog();

  useEffect(() => {
    if (selectedProduct) {
      setIsModalLoading(true);
      setFullMakerProfile(null);

      setTimeout(() => {
        const foundMaker = allMakers.find(
          (m) => m.id === selectedProduct.maker.id
        );

        if (foundMaker) {
          setFullMakerProfile(foundMaker);
        } else {
          console.warn(
            "Perfil completo do maker não encontrado na lista 'allMakers'."
          );
        }
        setIsModalLoading(false);
      }, 500);
    }
  }, [selectedProduct, allMakers]);

  useEffect(() => {
    const shouldLockScroll = !!selectedProduct || isMobileFiltersOpen;
    document.body.style.overflow = shouldLockScroll ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProduct, isMobileFiltersOpen]);

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setFullMakerProfile(null);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-[#121212]">
        <LoadingSpinner className="h-16 w-16" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-white dark:bg-[#121212] text-red-500 px-4 text-center">
        <p>Erro ao carregar o catálogo: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 md:py-2">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block lg:col-span-1">
            <CategorySidebar
              allCategories={allCategories}
              categoryCounts={categoryCounts}
              selectedCategoryIds={selectedCategoryIds}
              onCategoryClick={handleCategoryClick}
            />
          </aside>

          <main className="lg:col-span-3">
            <CatalogHeader
              searchInput={searchInput}
              onSearchChange={setSearchInput}
              sortBy={sortBy}
              onSortChange={setSortBy}
              sortOptions={sortOptions}
            />
            <ProductGrid
              products={productsToShow}
              onCardClick={setSelectedProduct}
              lastProductElementRef={lastProductElementRef}
              isLoadingMore={isLoadingMore}
              animate={animateGrid}
              onOpenRequestDrawer={onOpenRequestDrawer}
            />
          </main>
        </div>
      </div>

      <MobileFilterDrawer
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        allCategories={allCategories}
        categoryCounts={categoryCounts}
        selectedCategoryIds={selectedCategoryIds}
        onCategoryClick={handleCategoryClick}
      />

      <button
        onClick={() => setIsMobileFiltersOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-30"
      >
        <FilterIcon />
      </button>

      {fullMakerProfile && selectedProduct && (
        <MakerProfileModal
          featuredProduct={selectedProduct}
          maker={fullMakerProfile}
          isLoading={isModalLoading}
          onClose={handleCloseModal}
          onViewAllProducts={handleMakerSearch}
        />
      )}
    </>
  );
};

export default Catalog;
