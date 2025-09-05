import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import { Product, Category, Maker } from "../../../types/types";

//import { getProducts, getCategories, getMakers } from "../services/apiService";
import { makersMock, mockProducts } from "../../../utils/mockData";

const ITEMS_PER_PAGE = 20;

export const useCatalog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [allMakers, setAllMakers] = useState<Maker[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("price-asc");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [animateGrid, setAnimateGrid] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // ==========================================================
      // === BLOCO DE DADOS VINDOS DA API (COMENTADO POR AGORA) ===
      // ==========================================================
      /*
      try {
        console.log("Buscando dados da API...");
        // Busca todos os dados necessários em paralelo para mais eficiência
        const [productsData, categoriesData, makersData] = await Promise.all([
          getProducts(),
          getCategories(),
          getMakers() 
        ]);

        setProducts(productsData);
        setAllCategories(categoriesData);
        setAllMakers(makersData);

      } catch (err: any) {
        console.error("Erro ao buscar dados do catálogo:", err);
        setError(err.message || "Não foi possível carregar o catálogo.");
      } finally {
        // Garante que o estado de loading seja desativado, com ou sem erro
        setIsLoading(false);
      }
      */

      // ========================================================
      // === BLOCO DE DADOS MOCKADOS (ATIVO ATUALMENTE) ========
      // ========================================================

      console.log("Usando dados mockados para desenvolvimento...");
      setTimeout(() => {
        setProducts(mockProducts);
        setAllMakers(makersMock);
        const categoriesFromProducts = new Map<string, Category>();
        mockProducts.forEach((p) =>
          p.categories.forEach((c) => categoriesFromProducts.set(c.id, c))
        );
        setAllCategories(Array.from(categoriesFromProducts.values()));

        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = { Todos: products.length };
    products.forEach((p) => {
      p.categories.forEach((cat) => {
        counts[cat.id] = (counts[cat.id] || 0) + 1;
      });
    });
    return counts;
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
    if (searchInput) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    if (selectedCategoryIds.length > 0) {
      result = result.filter((p) =>
        p.categories.some((cat) => selectedCategoryIds.includes(cat.id))
      );
    }
    switch (sortBy) {
      case "popularity":
        result.sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
        break;
      case "recent":
        result.sort(
          (a, b) =>
            new Date(b.dateAdded ?? 0).getTime() -
            new Date(a.dateAdded ?? 0).getTime()
        );
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
    }
    return result;
  }, [searchInput, selectedCategoryIds, sortBy, products]);

  const productsToShow = filteredAndSortedProducts.slice(0, visibleCount);

  const handleCategoryClick = (categoryId: string) => {
    if (categoryId === "Todos") {
      setSelectedCategoryIds([]);
      return;
    }
    setSelectedCategoryIds((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };
  const loadMoreProducts = useCallback(() => {
    if (isLoadingMore || visibleCount >= filteredAndSortedProducts.length) {
      return;
    }
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 500);
  }, [isLoadingMore, visibleCount, filteredAndSortedProducts.length]);
  const observer = useRef<IntersectionObserver>();

  const lastProductElementRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoadingMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          productsToShow.length < filteredAndSortedProducts.length
        ) {
          loadMoreProducts();
        }
      });

      if (node) observer.current.observe(node);
    },
    [
      isLoadingMore,
      loadMoreProducts,
      productsToShow.length,
      filteredAndSortedProducts.length,
    ]
  );

  useEffect(() => {
    setAnimateGrid(false);
    setTimeout(() => setAnimateGrid(true), 50);
    setVisibleCount(ITEMS_PER_PAGE);
    if (!isLoading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchInput, selectedCategoryIds, sortBy]);

  return {
    isLoading,
    error,
    searchInput,
    sortBy,
    selectedCategoryIds,
    productsToShow,
    allCategories,
    allMakers,
    categoryCounts,
    isLoadingMore,
    animateGrid,
    setSearchInput,
    setSortBy,
    handleCategoryClick,
    lastProductElementRef,
    hasMoreProducts: productsToShow.length < filteredAndSortedProducts.length,
  };
};
