import { useState, useEffect } from "react";
import { Product } from "../../types/types";
import { useCatalogContext } from "../../context/CatalogContext";
import { sortOptions } from "../../utils/mockData";
import { FilterIcon, LoadingSpinner } from "./components/Icons";
import CategorySidebar from "./components/CategorySideBar";
import CatalogHeader from "./components/CatalogHeader";
import ProductGrid from "./components/ProductGrid";
import MobileFilterDrawer from "./components/MobileFilterDrawer";
import { useDebounce } from "../../hooks/useDebounce";

interface CatalogProps {
  onOpenRequestDrawer: () => void;
  onProductCardClick: (product: Product) => void;
}

const Catalog: React.FC<CatalogProps> = ({
  onOpenRequestDrawer,
  onProductCardClick,
}) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const {
    isLoading,
    error,
    productsToShow,
    allCategories,
    categoryCounts,
    searchInput: contextSearchInput,
    sortBy,
    selectedCategoryIds,
    isLoadingMore,
    animateGrid,
    setSearchInput,
    setSortBy,
    handleCategoryClick,
    lastProductElementRef,
  } = useCatalogContext();

  const [localSearchInput, setLocalSearchInput] = useState(contextSearchInput);
  const debouncedSearchTerm = useDebounce(localSearchInput, 1000);

  useEffect(() => {
    if (debouncedSearchTerm !== contextSearchInput) {
      setSearchInput(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, setSearchInput, contextSearchInput]);

  useEffect(() => {
    setLocalSearchInput(contextSearchInput);
  }, [contextSearchInput]);

  useEffect(() => {
    return () => {
      setSearchInput("");
    };
  }, [setSearchInput]);

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
              searchInput={localSearchInput}
              onSearchChange={setLocalSearchInput}
              sortBy={sortBy}
              onSortChange={setSortBy}
              sortOptions={sortOptions}
            />
            <ProductGrid
              products={productsToShow}
              onCardClick={onProductCardClick}
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
    </>
  );
};

export default Catalog;
