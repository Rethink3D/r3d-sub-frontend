import { useState, useMemo, useEffect } from "react";
import { Product, Maker } from "../types/types";
import { getProducts, getMakers } from "../services/api";

export const useHomeProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [allMakers, setAllMakers] = useState<Maker[]>([]);

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

        setProducts(productsData);
        setAllMakers(makersWithProductCount);
      } catch (err: any) {
        console.error("Erro ao buscar dados da home:", err);
        setError(err.message || "Não foi possível carregar os produtos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const showcaseProducts = useMemo(() => {
    if (products.length === 0) return [];
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(shuffled.length, 20));
  }, [products]);

  return {
    isLoading,
    error,
    products: showcaseProducts,
    allMakers,
  };
};
