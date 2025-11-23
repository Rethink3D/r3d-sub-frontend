import { useEffect, useState, useCallback } from "react";
import {
    useNavigate,
    useParams,
    Link,
    useOutletContext,
} from "react-router-dom";
import {
    getProductById,
    createMyProduct,
    updateMyProduct,
    uploadMyProductImage,
    deleteMyImage,
    deleteMyProduct,
    getCategories,
} from "../../services/api";
import {
    Image,
    Category,
    ProductPayload,
    Maker,
    ProductTypeEnum,
} from "../../types/types";
import { LoadingSpinner } from "../Catalog/components/Icons";
import { CAMPAIGN_CONFIG } from "../../config/campaign";

const useProductForm = (maker: Maker | null, productId?: string) => {
    const isEditing = Boolean(productId);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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
    const [error, setError] = useState("");

    const updateField = (field: string, value: any) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const fetchCategories = useCallback(async () => {
        try {
            const data = await getCategories();
            setAvailableCategories(data);
        } catch (err: any) {
            setError("Erro ao carregar categorias: " + err.message);
        }
    }, []);

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
            setError("Erro ao carregar produto: " + err.message);
        }
    }, [productId]);

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
        if (e.target.files) setFilesToUpload(Array.from(e.target.files));
    };

    const handleImageUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files?.[0] && productId) {
            try {
                await uploadMyProductImage(productId, e.target.files[0]);
                await fetchProduct();
            } catch (err: any) {
                const msg = err.response?.data?.message || err.message;
                setError("Erro no upload: " + msg);
            }
        }
    };

    const handleImageDelete = async (imageId: string) => {
        if (window.confirm("Excluir imagem?") && productId) {
            try {
                await deleteMyImage(imageId);
                await fetchProduct();
            } catch (err: any) {
                setError("Erro ao deletar: " + err.message);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCategories.size === 0)
            return setError("Selecione uma categoria.");
        if (!isEditing && filesToUpload.length === 0)
            return setError(
                "Adicione pelo menos uma imagem para criar o produto."
            );

        setIsSubmitting(true);
        setError("");

        let createdProductId: string | null = null;

        const payload: any = {
            ...formData,
            price: parseFloat(formData.price) || 0,
            categoryIds: Array.from(selectedCategories),
        };

        try {
            if (isEditing && productId) {
                await updateMyProduct(productId, payload);
                if (filesToUpload.length) {
                    await Promise.all(
                        filesToUpload.map((f) =>
                            uploadMyProductImage(productId, f)
                        )
                    );
                }
            } else {
                const newProduct = await createMyProduct(payload);
                createdProductId = newProduct.id;

                if (filesToUpload.length) {
                    await Promise.all(
                        filesToUpload.map((f) =>
                            uploadMyProductImage(newProduct.id, f)
                        )
                    );
                }
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
                    setError(
                        "Erro ao enviar as imagens. O produto não foi criado."
                    );
                } catch (rollbackErr) {
                    console.error("CRÍTICO: Falha no rollback.", rollbackErr);
                    setError(
                        "Ocorreu um erro e o produto pode ter ficado incompleto."
                    );
                }
            } else {
                const responseMsg = err.response?.data?.message;
                const msg = Array.isArray(responseMsg)
                    ? responseMsg.join(", ")
                    : responseMsg || err.message;
                setError("Erro ao salvar: " + msg);
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
        setFilesToUpload,
        loading,
        isSubmitting,
        error,
        handleFileSelect,
        handleImageUpload,
        handleImageDelete,
        handleSubmit,
        isEditing,
    };
};

export const MakerProductForm: React.FC = () => {
    const maker = useOutletContext<Maker>();
    const { id } = useParams<{ id: string }>();

    const {
        formData,
        updateField,
        selectedCategories,
        handleCategoryToggle,
        availableCategories,
        productImages,
        filesToUpload,
        setFilesToUpload,
        loading,
        isSubmitting,
        error,
        handleFileSelect,
        handleImageUpload,
        handleImageDelete,
        handleSubmit,
        isEditing,
    } = useProductForm(maker, id);

    if (!maker || loading) return <LoadingSpinner className="w-12 h-12" />;

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-texto-principal">
                {isEditing ? "Editar Produto" : "Novo Produto"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                <section className="bg-fundo-principal p-6 rounded-lg shadow-sm border border-borda">
                    <h2 className="text-xl font-semibold text-texto-principal mb-6 border-b border-borda pb-3">
                        Detalhes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-texto-principal mb-2">
                                Nome
                            </label>
                            <input
                                value={formData.name}
                                onChange={(e) =>
                                    updateField("name", e.target.value)
                                }
                                required
                                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-texto-principal mb-2">
                                Tipo de Anúncio
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) =>
                                    updateField(
                                        "type",
                                        e.target.value as ProductTypeEnum
                                    )
                                }
                                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
                                disabled={
                                    !CAMPAIGN_CONFIG.isActive &&
                                    formData.type !==
                                        ProductTypeEnum.PROMOTIONAL
                                }
                            >
                                <option value={ProductTypeEnum.STANDARD}>
                                    Produto Padrão (Consome limite de ativos)
                                </option>
                                {(CAMPAIGN_CONFIG.isActive ||
                                    formData.type ===
                                        ProductTypeEnum.PROMOTIONAL) && (
                                    <option value={ProductTypeEnum.PROMOTIONAL}>
                                        {CAMPAIGN_CONFIG.isActive
                                            ? `Produto ${CAMPAIGN_CONFIG.label} (Ilimitado)`
                                            : "Produto Promocional (Campanha Encerrada)"}
                                    </option>
                                )}
                            </select>
                            {formData.type === ProductTypeEnum.PROMOTIONAL && (
                                <p className="text-sm text-green-600 mt-1">
                                    * Este produto faz parte da campanha{" "}
                                    <strong>{CAMPAIGN_CONFIG.label}</strong> e
                                    não consome seu limite de ativos.
                                </p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-texto-principal mb-2">
                                Descrição
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) =>
                                    updateField("description", e.target.value)
                                }
                                required
                                rows={4}
                                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-texto-principal mb-2">
                                Material
                            </label>
                            <input
                                value={formData.material}
                                onChange={(e) =>
                                    updateField("material", e.target.value)
                                }
                                required
                                placeholder="Ex: PLA, Resina"
                                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-texto-principal mb-2">
                                Preço (R$)
                            </label>
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                value={formData.price}
                                onChange={(e) =>
                                    updateField("price", e.target.value)
                                }
                                required
                                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="flex items-center gap-3 cursor-pointer text-texto-principal w-fit">
                                <input
                                    type="checkbox"
                                    checked={formData.isPersonalizable}
                                    onChange={(e) =>
                                        updateField(
                                            "isPersonalizable",
                                            e.target.checked
                                        )
                                    }
                                    className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                                />
                                <span className="font-medium">
                                    Aceita personalização?
                                </span>
                            </label>
                        </div>
                    </div>
                </section>

                <section className="bg-fundo-principal p-6 rounded-lg shadow-sm border border-borda">
                    <h2 className="text-xl font-semibold text-texto-principal mb-6 border-b border-borda pb-3">
                        Categorias
                    </h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {availableCategories.map((cat) => (
                            <label
                                key={cat.id}
                                className="flex items-center gap-2 cursor-pointer text-texto-principal"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.has(cat.id)}
                                    onChange={() =>
                                        handleCategoryToggle(cat.id)
                                    }
                                    className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                                />
                                {cat.name}
                            </label>
                        ))}
                    </div>
                </section>

                <section className="bg-fundo-principal p-6 rounded-lg shadow-sm border border-borda">
                    <h2 className="text-xl font-semibold text-texto-principal mb-6 border-b border-borda pb-3">
                        Imagens
                    </h2>
                    <div className="mb-4">
                        <label
                            className={`cursor-pointer bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors ${
                                isSubmitting
                                    ? "opacity-50 cursor-not-allowed"
                                    : ""
                            }`}
                        >
                            {isEditing
                                ? "Upload Nova Imagem"
                                : "Selecionar Imagens"}
                            <input
                                type="file"
                                multiple
                                hidden
                                onChange={
                                    isEditing
                                        ? handleImageUpload
                                        : handleFileSelect
                                }
                                accept="image/*"
                                disabled={isSubmitting}
                            />
                        </label>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                        {!isEditing &&
                            filesToUpload.map((file, idx) => (
                                <div
                                    key={idx}
                                    className="relative group aspect-square"
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFilesToUpload((prev) =>
                                                prev.filter((f) => f !== file)
                                            )
                                        }
                                        className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        {isEditing &&
                            productImages.map((img) => (
                                <div
                                    key={img.id}
                                    className="relative group aspect-square"
                                >
                                    <img
                                        src={img.url}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            handleImageDelete(img.id)
                                        }
                                        className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                    </div>
                </section>

                <div className="flex items-center gap-4 pt-4 border-t border-borda">
                    <button
                        disabled={isSubmitting}
                        className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <LoadingSpinner className="w-5 h-5" />
                        ) : (
                            "Salvar"
                        )}
                    </button>
                    <Link
                        to="/maker/produtos"
                        className={`text-texto-secundario hover:underline ${
                            isSubmitting ? "pointer-events-none opacity-50" : ""
                        }`}
                    >
                        Cancelar
                    </Link>
                </div>
            </form>
        </div>
    );
};
