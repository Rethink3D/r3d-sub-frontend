import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Product, Category, Maker } from "../../../types/types";
import { getProducts, getMakers } from "../../../services/api";

const ITEMS_PER_PAGE = 20;

export const useCatalog = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [allMakers, setAllMakers] = useState<Maker[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("price-asc");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [animateGrid, setAnimateGrid] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const makerQueryParam = searchParams.get("maker");
  const [searchInput, setSearchInput] = useState(makerQueryParam || "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, makersData] = await Promise.all([
          getProducts(),
          getMakers(),
        ]);

        const productCountsByMakerId = new Map<string, number>();
        productsData.forEach((product) => {
          const makerId = product.maker.id;
          const currentCount = productCountsByMakerId.get(makerId) || 0;
          productCountsByMakerId.set(makerId, currentCount + 1);
        });

        const makersWithProductCount = makersData.map((maker) => ({
          ...maker,
          productCount: productCountsByMakerId.get(maker.id) || 0,
        }));

        const categoriesFromProducts = new Map<string, Category>();
        productsData.forEach((product) => {
          product.categories.forEach((category) => {
            categoriesFromProducts.set(category.id, category);
          });
        });

        const uniqueCategories = Array.from(categoriesFromProducts.values());
        uniqueCategories.sort((a, b) => a.name.localeCompare(b.name));

        setProducts(productsData);
        setAllMakers(makersWithProductCount);
        setAllCategories(uniqueCategories);
      } catch (err: any) {
        console.error("Erro ao buscar dados do catálogo:", err);
        setError(err.message || "Não foi possível carregar o catálogo.");
      } finally {
        setIsLoading(false);
      }
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
      const lowercasedInput = searchInput.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lowercasedInput) ||
          p.maker.name.toLowerCase().includes(lowercasedInput)
      );
    }

    if (selectedCategoryIds.length > 0) {
      result = result.filter((p) =>
        p.categories.some((cat) => selectedCategoryIds.includes(cat.id))
      );
    }

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
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

  const handleMakerSearch = (makerName: string) => {
    setSearchInput(makerName);
    setSelectedCategoryIds([]);
    setSearchParams({ maker: makerName });
  };

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
    handleMakerSearch,
  };
};
