import { useState, useEffect } from "react";
import {
  getMyProducts,
  deleteMyProduct,
  updateProductStatus,
} from "../services/api";
import { Product, ProductStatusEnum } from "../types/types";
import { useToast } from "../context/ToastContext";

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
    handleDelete,
    handleStatusToggle,
  };
};
