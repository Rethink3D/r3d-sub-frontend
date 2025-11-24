import { useState, useEffect, useMemo } from "react";
import {
  getMyProducts,
  deleteMyProduct,
  updateProductStatus,
} from "../services/api";
import { Product, ProductStatusEnum, ProductTypeEnum } from "../types/types";
import { useToast } from "../context/ToastContext";

const ACTIVE_PRODUCT_LIMIT = 3;

export const useMakerProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { addToast } = useToast();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const makerProducts = await getMyProducts();
      setProducts(makerProducts);
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Erro ao carregar",
        message: err.message || "Não foi possível buscar seus produtos.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const activeStandardCount = useMemo(
    () =>
      products.filter(
        (p) =>
          p.status === ProductStatusEnum.ACTIVE &&
          p.type === ProductTypeEnum.STANDARD
      ).length,
    [products]
  );

  const activePromoCount = useMemo(
    () =>
      products.filter(
        (p) =>
          p.status === ProductStatusEnum.ACTIVE &&
          p.type === ProductTypeEnum.PROMOTIONAL
      ).length,
    [products]
  );

  const handleDelete = (id: string) => {
    addToast({
      type: "warning",
      title: "Excluir Produto?",
      message: "Esta ação é irreversível e removerá o produto do catálogo.",
      confirmLabel: "Sim, excluir",
      cancelLabel: "Cancelar",
      onConfirm: async () => {
        try {
          await deleteMyProduct(id);
          setProducts((prev) => prev.filter((p) => p.id !== id));
          addToast({
            type: "success",
            message: "Produto excluído com sucesso.",
            duration: 3000,
          });
        } catch (err: any) {
          addToast({
            type: "error",
            title: "Erro na exclusão",
            message: err.message || "Não foi possível excluir o produto.",
          });
        }
      },
    });
  };

  const handleStatusToggle = async (product: Product) => {
    const newStatus =
      product.status === ProductStatusEnum.ACTIVE
        ? ProductStatusEnum.PAUSED
        : ProductStatusEnum.ACTIVE;

    if (newStatus === ProductStatusEnum.ACTIVE) {
      if (
        product.type === ProductTypeEnum.STANDARD &&
        activeStandardCount >= ACTIVE_PRODUCT_LIMIT
      ) {
        addToast({
          type: "warning",
          title: "Limite Atingido",
          message: `Você já possui ${ACTIVE_PRODUCT_LIMIT} produtos padrão ativos. Pause um produto existente para ativar este, ou crie um produto promocional.`,
          duration: 6000,
        });
        return;
      }
    }

    setUpdatingId(product.id);

    try {
      const updatedProduct = await updateProductStatus(product.id, newStatus);

      setProducts((prev) =>
        prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
      );

      const statusLabel =
        newStatus === ProductStatusEnum.ACTIVE ? "ativado" : "pausado";
      addToast({
        type: "success",
        message: `Produto ${statusLabel} com sucesso.`,
        duration: 2000,
      });
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Erro ao atualizar",
        message: err.message || "Não foi possível alterar o status.",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  return {
    products,
    loading,
    updatingId,
    activeStandardCount,
    activePromoCount,
    limit: ACTIVE_PRODUCT_LIMIT,
    handleDelete,
    handleStatusToggle,
  };
};
