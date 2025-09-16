import { createContext, useContext } from "react";
import { Product, Category, Maker } from "../types/types";

export interface CatalogContextType {
  isLoading: boolean;
  error: string | null;
  searchInput: string;
  sortBy: string;
  selectedCategoryIds: string[];
  productsToShow: Product[];
  allCategories: Category[];
  allMakers: Maker[];
  categoryCounts: { [key: string]: number };
  isLoadingMore: boolean;
  animateGrid: boolean;
  hasMoreProducts: boolean;
  setSearchInput: (value: string) => void;
  setSortBy: (value: string) => void;
  handleCategoryClick: (categoryId: string) => void;
  lastProductElementRef: (node: HTMLDivElement) => void;
  handleMakerSearch: (makerName: string) => void;
  clearAllFilters: () => void;
}

export const CatalogContext = createContext<CatalogContextType | null>(null);

export const useCatalogContext = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error(
      "useCatalogContext deve ser usado dentro de um CatalogProvider"
    );
  }
  return context;
};
