import { useEffect, useState, useCallback } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
    updateMyMakerProfile,
    getCategories,
    uploadMyProfileImage,
    deleteMyImage,
} from "../../services/api";
import {
    Maker,
    Category,
    Image,
    MakerPayload,
    ContactTypeEnum,
} from "../../types/types";
import { LoadingSpinner } from "../Catalog/components/Icons";
import { contactDetailsMap } from "../Catalog/components/MakerProfileModal/utils";

const contactOptions = Object.keys(
    contactDetailsMap
) as (keyof typeof contactDetailsMap)[];

const useMakerProfileForm = (maker: Maker | null) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        acceptsPersonalization: false,
    });
    const [contacts, setContacts] = useState<
        { id?: string; type: string; contactInfo: string }[]
    >([]);
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
    const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

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
                setStatusMsg({
                    type: "error",
                    text: "Erro ao carregar categorias",
                })
            )
            .finally(() => setLoadingCategories(false));
    }, []);

    const handleContactChange = (
        index: number,
        field: string,
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

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file || !maker) return;

        setIsUploading(true);
        setStatusMsg({ type: "", text: "" });
        try {
            if (profileImage) await deleteMyImage(profileImage.id);
            const newImage = await uploadMyProfileImage(maker.id, file);
            setProfileImage(newImage);
            setStatusMsg({ type: "success", text: "Imagem atualizada!" });
        } catch (err: any) {
            const msg = err.response?.data?.message || err.message;
            setStatusMsg({
                type: "error",
                text: "Erro no upload: " + msg,
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!maker) return;
        setIsSubmitting(true);
        setStatusMsg({ type: "", text: "" });

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

            setStatusMsg({
                type: "success",
                text: "Perfil salvo com sucesso!",
            });
            setTimeout(() => navigate(0), 1000);
        } catch (err: any) {
            const errorMessage = Array.isArray(err.message)
                ? err.message.join(", ")
                : err.message || "Erro ao salvar.";

            setStatusMsg({
                type: "error",
                text: "Erro ao salvar: " + errorMessage,
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
        statusMsg,
        handleSubmit,
    };
};

// --- Componente Visual ---
export const MakerProfileEdit: React.FC = () => {
    const maker = useOutletContext<Maker>();
    const {
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
        statusMsg,
        handleSubmit,
    } = useMakerProfileForm(maker);

    if (!maker) return <LoadingSpinner className="w-12 h-12" />;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-texto-principal">
                Editar Perfil
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Perfil Público */}
                <section className="bg-fundo-principal p-6 rounded-lg shadow-sm border border-borda">
                    <h2 className="text-xl font-semibold text-texto-principal mb-6 border-b border-borda pb-3">
                        Perfil Público
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 rounded-full bg-fundo-secundario border border-borda flex items-center justify-center overflow-hidden">
                                {profileImage ? (
                                    <img
                                        src={profileImage.url}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-3xl">?</span>
                                )}
                            </div>
                            <label
                                className={`cursor-pointer rounded-md bg-blue-50 text-blue-600 px-4 py-2 hover:bg-blue-100 ${
                                    isUploading ? "opacity-50" : ""
                                }`}
                            >
                                {isUploading ? "Enviando..." : "Trocar Imagem"}
                                <input
                                    type="file"
                                    hidden
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    disabled={isUploading}
                                />
                            </label>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-texto-principal mb-1">
                                Nome
                            </label>
                            <input
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                required
                                className="w-full px-4 py-3 border border-borda rounded-lg bg-fundo-secundario text-texto-principal"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-texto-principal mb-1">
                                Bio
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        description: e.target.value,
                                    })
                                }
                                required
                                rows={4}
                                className="w-full px-4 py-3 border border-borda rounded-lg bg-fundo-secundario text-texto-principal"
                            />
                        </div>

                        <label className="flex items-center gap-3 cursor-pointer w-fit text-texto-principal">
                            <input
                                type="checkbox"
                                checked={formData.acceptsPersonalization}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        acceptsPersonalization:
                                            e.target.checked,
                                    })
                                }
                                className="h-5 w-5 rounded text-blue-600"
                            />
                            <span>Aceito pedidos sob demanda</span>
                        </label>
                    </div>
                </section>

                {/* Contatos */}
                <section className="bg-fundo-principal p-6 rounded-lg shadow-sm border border-borda">
                    <h2 className="text-xl font-semibold text-texto-principal mb-6 border-b border-borda pb-3">
                        Contatos
                    </h2>
                    <div className="space-y-4">
                        {contacts.map((contact, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row items-center gap-2"
                            >
                                <select
                                    value={contact.type}
                                    onChange={(e) =>
                                        handleContactChange(
                                            index,
                                            "type",
                                            e.target.value
                                        )
                                    }
                                    className="w-full sm:w-auto border border-borda rounded-lg px-3 py-3 bg-fundo-secundario text-texto-principal"
                                >
                                    {contactOptions.map((type) => (
                                        <option key={type} value={type}>
                                            {contactDetailsMap[type].label}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    value={contact.contactInfo}
                                    onChange={(e) =>
                                        handleContactChange(
                                            index,
                                            "contactInfo",
                                            e.target.value
                                        )
                                    }
                                    placeholder={
                                        contact.type === "WHATSAPP"
                                            ? "5599..."
                                            : "Usuário/Link"
                                    }
                                    required
                                    className="flex-grow w-full px-3 py-3 border border-borda rounded-lg bg-fundo-secundario text-texto-principal"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        manageContacts("remove", index)
                                    }
                                    className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => manageContacts("add")}
                        className="text-blue-600 font-semibold py-2 mt-4"
                    >
                        + Adicionar contato
                    </button>
                </section>

                {/* Categorias */}
                <section className="bg-fundo-principal p-6 rounded-lg shadow-sm border border-borda">
                    <h2 className="text-xl font-semibold text-texto-principal mb-6 border-b border-borda pb-3">
                        Especialidades
                    </h2>
                    {loadingCategories ? (
                        <LoadingSpinner />
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {availableCategories.map((cat) => (
                                <label
                                    key={cat.id}
                                    className="flex items-center gap-2 cursor-pointer text-texto-principal"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCategories.has(cat.id)}
                                        onChange={() => {
                                            const newSet = new Set(
                                                selectedCategories
                                            );
                                            newSet.has(cat.id)
                                                ? newSet.delete(cat.id)
                                                : newSet.add(cat.id);
                                            setSelectedCategories(newSet);
                                        }}
                                        className="h-5 w-5 rounded text-blue-600"
                                    />
                                    {cat.name}
                                </label>
                            ))}
                        </div>
                    )}
                </section>

                {/* Feedback & Submit */}
                <div className="border-t border-borda pt-4">
                    {statusMsg.text && (
                        <p
                            className={`mb-4 ${
                                statusMsg.type === "error"
                                    ? "text-red-500"
                                    : "text-green-500"
                            }`}
                        >
                            {statusMsg.text}
                        </p>
                    )}
                    <button
                        type="submit"
                        disabled={
                            isSubmitting || loadingCategories || isUploading
                        }
                        className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <LoadingSpinner className="w-5 h-5" />
                        ) : (
                            "Salvar Alterações"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
