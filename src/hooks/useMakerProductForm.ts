import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProductById,
  createMyProduct,
  updateMyProduct,
  uploadMyProductImage,
  deleteMyImage,
  deleteMyProduct,
  getCategories,
} from "../services/api";
import { Image, Category, Maker, ProductTypeEnum } from "../types/types";
import { useToast } from "../context/ToastContext";

export interface ProductFormSchema {
  name: string;
  description: string;
  material: string;
  price: string;
  isPersonalizable: boolean;
  type: ProductTypeEnum;
}

export const useMakerProductForm = (
  maker: Maker | null,
  productId?: string
) => {
  const isEditing = Boolean(productId);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState<ProductFormSchema>({
    name: "",
    description: "",
    material: "",
    price: "",
    isPersonalizable: false,
    type: ProductTypeEnum.STANDARD,
  });

  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );
  const [productImages, setProductImages] = useState<Image[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof ProductFormSchema>(
    field: K,
    value: ProductFormSchema[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      setAvailableCategories(data);
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Erro",
        message: "Não foi possível carregar as categorias.",
      });
    }
  }, [addToast]);

  const fetchProduct = useCallback(async () => {
    if (!productId) return;
    try {
      const product = await getProductById(productId);
      setFormData({
        name: product.name,
        description: product.description,
        material: product.material,
        price: String(product.price),
        isPersonalizable: product.isPersonalizable,
        type: product.type || ProductTypeEnum.STANDARD,
      });
      setSelectedCategories(new Set(product.categories.map((c) => c.id)));
      setProductImages(product.images || []);
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Erro",
        message: "Não foi possível carregar os dados do produto.",
      });
      navigate("/maker/produtos");
    }
  }, [productId, addToast, navigate]);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchCategories();
      if (isEditing) await fetchProduct();
      setLoading(false);
    };
    init();
  }, [fetchCategories, fetchProduct, isEditing]);

  const handleCategoryToggle = (id: string) => {
    const newSet = new Set(selectedCategories);
    newSet.has(id) ? newSet.delete(id) : newSet.add(id);
    setSelectedCategories(newSet);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFilesToUpload((prev) => [
        ...prev,
        ...Array.from(e.target.files || []),
      ]);
    }
  };

  const removeFileFromUploadQueue = (fileToRemove: File) => {
    setFilesToUpload((prev) => prev.filter((f) => f !== fileToRemove));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && productId) {
      const file = e.target.files[0];
      const uploadToastId = "upload-toast";

      try {
        addToast({
          type: "info",
          message: "Enviando imagem...",
          id: uploadToastId,
          duration: 2000,
        });
        await uploadMyProductImage(productId, file);
        await fetchProduct();
        addToast({
          type: "success",
          message: "Imagem adicionada!",
          duration: 3000,
        });
      } catch (err: any) {
        const msg = err.response?.data?.message || err.message;
        addToast({
          type: "error",
          title: "Erro no upload",
          message: msg,
        });
      }
    }
  };

  const handleImageDelete = (imageId: string) => {
    if (!productId) return;

    addToast({
      type: "warning",
      title: "Excluir imagem?",
      message: "Esta ação não pode ser desfeita.",
      confirmLabel: "Sim, excluir",
      cancelLabel: "Cancelar",
      onConfirm: async () => {
        try {
          await deleteMyImage(imageId);
          await fetchProduct();
          addToast({
            type: "success",
            message: "Imagem removida.",
            duration: 3000,
          });
        } catch (err: any) {
          addToast({
            type: "error",
            message: "Erro ao deletar imagem: " + err.message,
          });
        }
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedCategories.size === 0) {
      return addToast({
        type: "warning",
        title: "Atenção",
        message: "Selecione pelo menos uma categoria.",
      });
    }

    if (!isEditing && filesToUpload.length === 0) {
      return addToast({
        type: "warning",
        title: "Imagens necessárias",
        message: "Adicione pelo menos uma imagem para criar o produto.",
      });
    }

    setIsSubmitting(true);
    let createdProductId: string | null = null;

    const payload = {
      ...formData,
      price: String(parseFloat(formData.price) || 0),
      categoryIds: Array.from(selectedCategories),
    };

    try {
      if (isEditing && productId) {
        await updateMyProduct(productId, payload);

        if (filesToUpload.length) {
          await Promise.all(
            filesToUpload.map((f) => uploadMyProductImage(productId, f))
          );
        }

        addToast({
          type: "success",
          title: "Sucesso",
          message: "Produto atualizado!",
        });
      } else {
        const newProduct = await createMyProduct(payload);
        createdProductId = newProduct.id;

        if (filesToUpload.length) {
          await Promise.all(
            filesToUpload.map((f) => uploadMyProductImage(newProduct.id, f))
          );
        }

        addToast({
          type: "success",
          title: "Sucesso",
          message: "Produto criado!",
        });
      }

      navigate("/maker/produtos");
    } catch (err: any) {
      console.error(err);

      if (!isEditing && createdProductId) {
        try {
          console.warn(
            "Falha no upload. Revertendo criação...",
            createdProductId
          );
          await deleteMyProduct(createdProductId);

          addToast({
            type: "error",
            title: "Erro no Upload",
            message:
              "Falha ao enviar imagens. A criação do produto foi cancelada.",
            duration: 6000,
          });
        } catch (rollbackErr) {
          console.error("CRÍTICO: Falha no rollback.", rollbackErr);
          addToast({
            type: "error",
            title: "Erro Crítico",
            message:
              "Ocorreu um erro e o produto pode ter ficado incompleto. Contate o suporte.",
            duration: 8000,
          });
        }
      } else {
        const responseMsg = err.response?.data?.message;
        const msg = Array.isArray(responseMsg)
          ? responseMsg.join(", ")
          : responseMsg || err.message;

        addToast({
          type: "error",
          title: "Erro ao salvar",
          message: msg,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    updateField,
    selectedCategories,
    handleCategoryToggle,
    availableCategories,
    productImages,
    filesToUpload,
    removeFileFromUploadQueue,
    loading,
    isSubmitting,
    handleFileSelect,
    handleImageUpload,
    handleImageDelete,
    handleSubmit,
    isEditing,
  };
};
