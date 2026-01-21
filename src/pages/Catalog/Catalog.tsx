import { useState, useEffect } from "react";
import { useCatalogContext } from "../../context/CatalogContext";
import { sortOptions } from "../../utils/mockData";
import { FilterIcon, LoadingSpinner } from "./components/Icons";
import CategorySidebar from "./components/CategorySideBar";
import CatalogHeader from "./components/CatalogHeader";
import ProductGrid from "./components/ProductGrid";
import MobileFilterDrawer from "./components/MobileFilterDrawer";

interface CatalogProps {
  onOpenRequestDrawer: () => void;
}

const Catalog: React.FC<CatalogProps> = ({ onOpenRequestDrawer }) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const {
    isLoading,
    error,
    productsToShow,
    allCategories,
    categoryCounts,
    searchInput: contextSearchInput,
    sortBy,
    selectedCategoryIds,
    filterPersonalizable,
    filterPromotional,
    isLoadingMore,
    animateGrid,
    setSearchInput,
    setSortBy,
    handleCategoryClick,
    setFilterPersonalizable,
    setFilterPromotional,
    lastProductElementRef,
  } = useCatalogContext();

  const [localSearchInput, setLocalSearchInput] = useState(contextSearchInput);

  useEffect(() => {
    if (contextSearchInput !== localSearchInput) {
      setLocalSearchInput(contextSearchInput);
    }
  }, [contextSearchInput]);

  const handleSearchSubmit = () => {
    setSearchInput(localSearchInput);
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
        <div className="flex flex-col lg:flex-row gap-8">
          <aside
            className={`hidden lg:block transition-all duration-300 ${
              isSidebarCollapsed ? "w-16" : "w-1/4 min-w-[280px]"
            }`}
          >
            <CategorySidebar
              allCategories={allCategories}
              categoryCounts={categoryCounts}
              selectedCategoryIds={selectedCategoryIds}
              filterPersonalizable={filterPersonalizable}
              filterPromotional={filterPromotional}
              onCategoryClick={handleCategoryClick}
              onTogglePersonalizable={setFilterPersonalizable}
              onTogglePromotional={setFilterPromotional}
              isCollapsed={isSidebarCollapsed}
              onToggleCollapse={() =>
                setIsSidebarCollapsed(!isSidebarCollapsed)
              }
            />
          </aside>

          <main
            className={`flex-1 w-full ${
              isSidebarCollapsed ? "lg:w-[calc(100%-4rem)]" : "lg:w-3/4"
            }`}
          >
            <CatalogHeader
              searchInput={localSearchInput}
              onSearchChange={setLocalSearchInput}
              onSearchSubmit={handleSearchSubmit}
              sortBy={sortBy}
              onSortChange={setSortBy}
              sortOptions={sortOptions}
            />
            <ProductGrid
              products={productsToShow}
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
        filterPersonalizable={filterPersonalizable}
        filterPromotional={filterPromotional}
        onCategoryClick={handleCategoryClick}
        onTogglePersonalizable={setFilterPersonalizable}
        onTogglePromotional={setFilterPromotional}
      />

      <button
        onClick={() => setIsMobileFiltersOpen(true)}
        className="lg:hidden fixed bottom-6 left-6 bg-blue-600 text-white p-4 rounded-full shadow-lg z-30"
      >
        <FilterIcon />
      </button>
    </>
  );
};

export default Catalog;
