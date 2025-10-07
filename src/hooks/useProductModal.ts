import { useState, useEffect } from "react";
import { useLocation, useNavigate, matchPath } from "react-router-dom";
import { useCatalogContext } from "../context/CatalogContext";
import { getProductById, getMakerById } from "../services/api";
import type { Maker, Product } from "../types/types";

export const useProductModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { allMakers } = useCatalogContext();
  const match = matchPath("/catalogo/produto/:productId", location.pathname);
  const productId = match?.params?.productId;
  const [maker, setMaker] = useState<Maker | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchModalData = async () => {
      if (!productId) {
        setMaker(null);
        setProduct(null);
        return;
      }

      if (product?.id === productId) return;

      setIsLoading(true);
      try {
        const fetchedProduct = await getProductById(productId);
        if (!isMounted) return;

        if (fetchedProduct && fetchedProduct.maker) {
          setProduct(fetchedProduct);

          const makerFromContext = allMakers.find(
            (m) => m.id === fetchedProduct.maker.id
          );

          if (makerFromContext) {
            setMaker(makerFromContext);
          } else {
            const fullMaker = await getMakerById(fetchedProduct.maker.id);
            if (isMounted) setMaker(fullMaker);
          }
        } else {
          navigate("/catalogo", { replace: true });
        }
      } catch (error) {
        console.error("Falha ao buscar dados para o modal:", error);
        navigate("/catalogo", { replace: true });
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchModalData();

    return () => {
      isMounted = false;
    };
  }, [productId, navigate, allMakers, product?.id]);

  const handleCloseModal = () => {
    if (location.pathname.startsWith("/catalogo/produto/")) {
      navigate("/catalogo");
    }
  };

  return {
    maker,
    product,
    isLoading,
    handleCloseModal,
  };
};
