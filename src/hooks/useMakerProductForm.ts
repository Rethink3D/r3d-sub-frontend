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
import {
  Image,
  Category,
  Maker,
  ProductTypeEnum,
  MaterialTypeEnum,
} from "../types/types";
import { useToast } from "../context/ToastContext";
import {
  MAX_FILE_SIZE_MB,
  ALLOWED_TYPES,
  PRODUCT_LIMITS,
} from "../constants/InputsLimits";

export interface ProductFormSchema {
  name: string;
  description: string;
  material: MaterialTypeEnum;
  price: string;
  discountPercentage: string;
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
    material: MaterialTypeEnum.PLA,
    price: "",
    discountPercentage: "",
    isPersonalizable: false,
    type: ProductTypeEnum.STANDARD,
  });
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set()
  );
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );

  const [serverImages, setServerImages] = useState<Image[]>([]);
  const [localImages, setLocalImages] = useState<File[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);

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
        discountPercentage: String(product.discountPercentage || ""),
        isPersonalizable: product.isPersonalizable,
        type: product.type || ProductTypeEnum.STANDARD,
      });

      setSelectedCategories(new Set(product.categories.map((c) => c.id)));
      setServerImages(product.images || []);
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Erro",
        message: "Não foi possível carregar o produto.",
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

  const validateFile = (file: File): boolean => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      addToast({
        type: "warning",
        title: "Arquivo Inválido",
        message: `O formato ${file.type} não é suportado. Use JPG, PNG ou WEBP.`,
      });
      return false;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      addToast({
        type: "warning",
        title: "Arquivo Grande",
        message: `A imagem deve ter no máximo ${MAX_FILE_SIZE_MB}MB.`,
      });
      return false;
    }
    return true;
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const currentTotal = serverImages.length + localImages.length;
      const newFiles = Array.from(e.target.files);

      if (currentTotal + newFiles.length > PRODUCT_LIMITS.MAX_IMAGES) {
        addToast({
          type: "warning",
          title: "Limite Excedido",
          message: `Você só pode adicionar até ${
            PRODUCT_LIMITS.MAX_IMAGES
          } imagens. Restam ${PRODUCT_LIMITS.MAX_IMAGES - currentTotal} slots.`,
        });
        return;
      }

      const validFiles = newFiles.filter(validateFile);
      if (validFiles.length > 0) {
        setLocalImages((prev) => [...prev, ...validFiles]);
      }

      e.target.value = "";
    }
  };

  const removeLocalImage = (indexToRemove: number) => {
    setLocalImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const markServerImageForDeletion = (imageId: string) => {
    const totalVisibleImages = serverImages.length + localImages.length;
    if (totalVisibleImages <= 1 && localImages.length === 0) {
      addToast({
        type: "warning",
        title: "Ação Bloqueada",
        message:
          "O produto não pode ficar sem imagens. Adicione uma nova antes de excluir a última.",
      });
      return;
    }

    setImagesToDelete((prev) => [...prev, imageId]);
    setServerImages((prev) => prev.filter((img) => img.id !== imageId));
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

    const totalImages = serverImages.length + localImages.length;
    if (totalImages === 0) {
      return addToast({
        type: "warning",
        title: "Imagens necessárias",
        message: "Adicione pelo menos uma imagem.",
      });
    }

    const priceValue = parseFloat(formData.price);
    if (isNaN(priceValue) || priceValue < 0) {
      return addToast({
        type: "warning",
        title: "Preço Inválido",
        message: "Insira um preço válido.",
      });
    }

    let discountValue = 0;
    if (formData.type !== ProductTypeEnum.STANDARD) {
      discountValue = parseFloat(formData.discountPercentage);
      if (isNaN(discountValue) || discountValue < 0 || discountValue > 100) {
        return addToast({
          type: "warning",
          title: "Desconto Inválido",
          message: "O desconto deve ser entre 0% e 100%.",
        });
      }
    }

    setIsSubmitting(true);
    let targetProductId = productId;

    const payload = {
      ...formData,
      price: String(priceValue),
      discountPercentage:
        formData.type !== ProductTypeEnum.STANDARD ? discountValue : 0,
      categoryIds: Array.from(selectedCategories),
    };

    try {
      if (isEditing && targetProductId) {
        await updateMyProduct(targetProductId, payload);
        if (imagesToDelete.length > 0) {
          await Promise.all(imagesToDelete.map((id) => deleteMyImage(id)));
        }
      } else {
        const newProduct = await createMyProduct(payload);
        targetProductId = newProduct.id;
      }

      if (localImages.length > 0 && targetProductId) {
        await Promise.all(
          localImages.map((file) =>
            uploadMyProductImage(targetProductId!, file)
          )
        );
      }

      addToast({
        type: "success",
        title: "Sucesso",
        message: isEditing
          ? "Produto atualizado com sucesso!"
          : "Produto criado com sucesso!",
      });
      navigate("/maker/produtos");
    } catch (err: any) {
      console.error(err);
      if (!isEditing && targetProductId) {
        try {
          console.warn(
            "Falha no processo. Revertendo criação...",
            targetProductId
          );
          await deleteMyProduct(targetProductId);
        } catch (rollbackErr) {
          console.error("Falha no rollback", rollbackErr);
        }
      }

      const msg =
        err.response?.data?.message || err.message || "Erro desconhecido";
      addToast({
        type: "error",
        title: "Erro ao salvar",
        message: Array.isArray(msg) ? msg.join(", ") : msg,
      });
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
    serverImages,
    localImages,
    loading,
    isSubmitting,
    handleFileSelect,
    removeLocalImage,
    markServerImageForDeletion,
    handleSubmit,
    isEditing,
  };
};
