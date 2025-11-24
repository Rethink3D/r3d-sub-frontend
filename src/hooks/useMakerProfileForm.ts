import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  updateMyMakerProfile,
  getCategories,
  uploadMyProfileImage,
  deleteMyImage,
} from "../services/api";
import {
  Maker,
  Category,
  Image,
  MakerPayload,
  ContactTypeEnum,
  Contact,
} from "../types/types";
import { useToast } from "../context/ToastContext";
import { isValidEmail } from "../utils/isValidEmail"
import { isValidWhatsAppNumber } from "../utils/isValidWhatsappNumber";

type FormContact = Omit<Contact, "id"> & { id?: string };

export const useMakerProfileForm = (maker: Maker | null) => {
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    acceptsPersonalization: false,
  });

  const [contacts, setContacts] = useState<FormContact[]>([]);

  const [selectedCategories, setSelectedCategories] = useState(
    new Set<string>()
  );
  const [profileImage, setProfileImage] = useState<Image | null>(null);
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (maker) {
      setFormData({
        name: maker.name,
        description: maker.description,
        acceptsPersonalization: maker.acceptsPersonalization,
      });
      setContacts(
        maker.contacts.length > 0
          ? maker.contacts
          : [{ type: ContactTypeEnum.EMAIL, contactInfo: "" }]
      );
      setSelectedCategories(new Set(maker.categories.map((c) => c.id)));
      setProfileImage(maker.profileImage || null);
    }
  }, [maker]);

  useEffect(() => {
    getCategories()
      .then(setAvailableCategories)
      .catch(() =>
        addToast({
          type: "error",
          title: "Erro",
          message: "Não foi possível carregar as categorias.",
        })
      )
      .finally(() => setLoadingCategories(false));
  }, [addToast]);

  const handleContactChange = (
    index: number,
    field: keyof FormContact,
    value: string
  ) => {
    const updated = [...contacts];
    updated[index] = { ...updated[index], [field]: value };
    setContacts(updated);
  };

  const manageContacts = (action: "add" | "remove", index?: number) => {
    if (action === "add") {
      setContacts([
        ...contacts,
        { type: ContactTypeEnum.WHATSAPP, contactInfo: "" },
      ]);
    } else if (index !== undefined && contacts.length > 0) {
      setContacts(contacts.filter((_, i) => i !== index));
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !maker) return;

    setIsUploading(true);
    const toastId = "upload-avatar";

    try {
      addToast({ type: "info", message: "Enviando imagem...", id: toastId });

      if (profileImage) {
        await deleteMyImage(profileImage.id);
      }

      const newImage = await uploadMyProfileImage(maker.id, file);
      setProfileImage(newImage);

      addToast({ type: "success", message: "Imagem de perfil atualizada!" });
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message;
      addToast({
        type: "error",
        title: "Falha no upload",
        message: msg,
      });
    } finally {
      setIsUploading(false);
    }
  };

  const validateContacts = (): boolean => {
    for (const contact of contacts) {
      if (!contact.contactInfo.trim()) continue;

      if (contact.type === ContactTypeEnum.EMAIL) {
        if (!isValidEmail(contact.contactInfo)) {
          addToast({
            type: "warning",
            title: "Email Inválido",
            message: `O email "${contact.contactInfo}" não parece válido.`,
          });
          return false;
        }
      }

      if (
        contact.type === ContactTypeEnum.WHATSAPP ||
        contact.type === ContactTypeEnum.PHONE
      ) {
        if (!isValidWhatsAppNumber(contact.contactInfo)) {
          addToast({
            type: "warning",
            title: "Número Inválido",
            message: `O número "${contact.contactInfo}" deve conter DDD + Número (11 dígitos).`,
          });
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!maker) return;

    if (!validateContacts()) return;

    setIsSubmitting(true);

    const sanitizedContacts = contacts
      .filter((c) => c.contactInfo.trim() !== "")
      .map(({ type, contactInfo }) => ({
        type,
        contactInfo,
      }));

    const payload: Partial<MakerPayload> = {
      ...formData,
      contacts: sanitizedContacts,
      categoryIds: Array.from(selectedCategories),
    };

    try {
      await updateMyMakerProfile(payload);

      addToast({
        type: "success",
        title: "Perfil Salvo",
        message: "Suas alterações foram salvas com sucesso.",
        duration: 2000,
      });

      setTimeout(() => navigate(0), 1500);
    } catch (err: any) {
      const errorMessage = Array.isArray(err.message)
        ? err.message.join(", ")
        : err.message || "Erro ao salvar.";

      addToast({
        type: "error",
        title: "Erro ao salvar",
        message: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    contacts,
    handleContactChange,
    manageContacts,
    selectedCategories,
    setSelectedCategories,
    profileImage,
    handleImageUpload,
    availableCategories,
    loadingCategories,
    isUploading,
    isSubmitting,
    handleSubmit,
  };
};
