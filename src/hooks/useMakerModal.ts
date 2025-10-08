import { useState, useEffect } from "react";
import { useLocation, useNavigate, matchPath } from "react-router-dom";
import { useCatalogContext } from "../context/CatalogContext";
import { getMakerById } from "../services/api";
import type { Maker } from "../types/types";

export const useMakerModal = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { allMakers } = useCatalogContext();

  const match = matchPath("/catalogo/maker/:makerId", location.pathname);
  const makerId = match?.params?.makerId;

  const [maker, setMaker] = useState<Maker | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchModalData = async () => {
      if (!makerId) {
        setMaker(null);
        return;
      }

      if (maker?.id === makerId) return;

      setIsLoading(true);
      try {
        const makerFromContext = allMakers.find((m) => m.id === makerId);
        if (makerFromContext) {
          setMaker(makerFromContext);
        } else {
          const fetchedMaker = await getMakerById(makerId);
          if (isMounted) {
            setMaker(fetchedMaker);
          }
        }
      } catch (error) {
        console.error("Falha ao buscar dados do maker para o modal:", error);
        navigate("/catalogo", { replace: true });
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchModalData();

    return () => {
      isMounted = false;
    };
  }, [makerId, navigate, allMakers, maker?.id]);

  const handleCloseModal = () => {
    if (location.pathname.startsWith("/catalogo/maker/")) {
      navigate("/catalogo");
    }
  };

  return {
    maker,
    isLoading,
    handleCloseModal,
  };
};
