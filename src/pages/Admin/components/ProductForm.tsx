import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
    getProductById,
    createProduct,
    updateProduct,
    uploadProductImage,
    getMakers,
    getCategories,
    CropData,
} from "../../../services/api";
import { Maker, Image, Category } from "../../../types/types";

import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    rectSortingStrategy,
} from "@dnd-kit/sortable";

import ReactCrop, {
    type Crop,
    centerCrop,
    makeAspectCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

import { SortableImage, DisplayImage } from "./SortableImage";

function getCroppedPreview(
    image: HTMLImageElement,
    crop: Crop
): Promise<string> {
    return new Promise((resolve) => {
        const canvas = document.createElement("canvas");
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;

        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext("2d");

        if (!ctx) {
            throw new Error("No 2d context");
        }

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );

        canvas.toBlob(
            (blob) => {
                if (!blob) {
                    console.error("Canvas is empty");
                    return;
                }
                const previewUrl = window.URL.createObjectURL(blob);
                resolve(previewUrl);
            },
            "image/webp",
            0.9
        );
    });
}

const ProductForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [material, setMaterial] = useState("");
    const [price, setPrice] = useState("");
    const [isPersonalizable, setIsPersonalizable] = useState(false);
    const [makerId, setMakerId] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
        new Set()
    );

    const [availableMakers, setAvailableMakers] = useState<Maker[]>([]);
    const [availableCategories, setAvailableCategories] = useState<Category[]>(
        []
    );

    const [displayImages, setDisplayImages] = useState<DisplayImage[]>([]);
    const [imagesToDelete, setImagesToDelete] = useState<Set<string>>(
        new Set()
    );

    const [croppingFile, setCroppingFile] = useState<DisplayImage | null>(null);
    const [crop, setCrop] = useState<Crop>();

    const imgRef = useRef<HTMLImageElement>(null);

    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        const fetchInitialData = async () => {
            setLoading(true);
            try {
                const [makersData, categoriesData] = await Promise.all([
                    getMakers(),
                    getCategories(),
                ]);
                setAvailableMakers(makersData);
                setAvailableCategories(categoriesData);

                if (isEditing && id) {
                    const productData = await getProductById(id);
                    setName(productData.name);
                    setDescription(productData.description);
                    setMaterial(productData.material);
                    setPrice(String(productData.price));
                    setIsPersonalizable(productData.isPersonalizable);
                    setMakerId(productData.maker?.id || "");
                    setSelectedCategories(
                        new Set(productData.categories.map((cat) => cat.id))
                    );
                    setDisplayImages(
                        productData.images.sort(
                            (a, b) => (a.position ?? 0) - (b.position ?? 0)
                        ) || []
                    );
                }
            } catch (err: any) {
                setError("Erro ao carregar dados. " + err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchInitialData();
    }, [id, isEditing]);

    const handleCategoryToggle = (categoryId: string) => {
        const newSelection = new Set(selectedCategories);
        newSelection.has(categoryId)
            ? newSelection.delete(categoryId)
            : newSelection.add(categoryId);
        setSelectedCategories(newSelection);
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files);
            const newDisplayImages: DisplayImage[] = newFiles.map((file) => ({
                id: `${file.name}-${Date.now()}`,
                originalUrl: URL.createObjectURL(file), // MUDANÇA AQUI
                file,
                isNew: true,
            }));
            setDisplayImages((prevImages) => [
                ...prevImages,
                ...newDisplayImages,
            ]);
        }
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setDisplayImages((items) => {
                const oldIndex = items.findIndex(
                    (item) => item.id === active.id
                );
                const newIndex = items.findIndex((item) => item.id === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const handleImageDelete = (imageToDelete: DisplayImage) => {
        if (window.confirm("Tem certeza que deseja remover esta imagem?")) {
            if (imageToDelete.isNew) {
                setDisplayImages((prev) =>
                    prev.filter((img) => img.id !== imageToDelete.id)
                );
            } else {
                setImagesToDelete((prev) =>
                    new Set(prev).add(imageToDelete.id)
                );
                setDisplayImages((prev) =>
                    prev.filter((img) => img.id !== imageToDelete.id)
                );
            }
        }
    };

    const openCropModal = (imageToCrop: DisplayImage) => {
        setCrop(undefined);
        setCroppingFile(imageToCrop);
    };

    // const handleSaveCrop = async (completedCrop: Crop) => {
    //     if (
    //         croppingFile &&
    //         completedCrop?.width &&
    //         completedCrop?.height &&
    //         imgRef.current
    //     ) {
    //         try {
    //             const croppedPreviewUrl = await getCroppedPreview(
    //                 imgRef.current,
    //                 completedCrop
    //             );

    //             const scaleX =
    //                 imgRef.current.naturalWidth / imgRef.current.width;
    //             const scaleY =
    //                 imgRef.current.naturalHeight / imgRef.current.height;

    //             const finalCropData: CropData = {
    //                 x: completedCrop.x * scaleX,
    //                 y: completedCrop.y * scaleY,
    //                 width: completedCrop.width * scaleX,
    //                 height: completedCrop.height * scaleY,
    //             };

    //             setDisplayImages((prev) =>
    //                 prev.map((img) => {
    //                     if (img.id !== croppingFile.id) {
    //                         return img;
    //                     }
    //                     if (img.isNew) {
    //                         return {
    //                             ...img,
    //                             cropData: finalCropData,
    //                             croppedUrl: croppedPreviewUrl,
    //                         };
    //                     }
    //                     return { ...img, cropData: finalCropData };
    //                 })
    //             );
    //         } catch (error) {
    //             console.error(
    //                 "Erro ao gerar preview da imagem cortada:",
    //                 error
    //             );
    //         }
    //     }
    // };

    const handleSaveCrop = async (cropToSave: Crop) => {
        if (
            !croppingFile ||
            !cropToSave?.width ||
            !cropToSave?.height ||
            !imgRef.current
        ) {
            return;
        }

        try {
            const scaleX = imgRef.current.naturalWidth / imgRef.current.width;
            const scaleY = imgRef.current.naturalHeight / imgRef.current.height;
            const finalCropData: CropData = {
                x: cropToSave.x * scaleX,
                y: cropToSave.y * scaleY,
                width: cropToSave.width * scaleX,
                height: cropToSave.height * scaleY,
            };

            const croppedPreviewUrl = await getCroppedPreview(
                imgRef.current,
                cropToSave
            );

            setDisplayImages((prev) =>
                prev.map((img) => {
                    if (img.id !== croppingFile.id) {
                        return img;
                    }

                    if (img.isNew) {
                        return {
                            ...img,
                            cropData: finalCropData,
                            croppedUrl: croppedPreviewUrl,
                        };
                    }

                    return {
                        ...img,
                        cropData: finalCropData,
                        urlThumbnail: croppedPreviewUrl,
                        needsRecrop: true,
                    };
                })
            );
        } catch (error) {
            console.error("Erro ao gerar preview do corte:", error);
            setError("Falha ao gerar preview do corte.");
        } finally {
            setCroppingFile(null);
        }
    };

    function onImageLoadInModal(e: React.SyntheticEvent<HTMLImageElement>) {
        const { width, height } = e.currentTarget;
        const newCrop = centerCrop(
            makeAspectCrop({ unit: "%", width: 90 }, 1 / 1, width, height),
            width,
            height
        );
        setCrop(newCrop);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!makerId) {
            setError("Por favor, selecione um maker.");
            return;
        }
        setIsSubmitting(true);
        setError("");

        try {
            const newQueuedFiles = displayImages.filter(
                (img): img is Extract<DisplayImage, { isNew: true }> =>
                    img.isNew
            );
            const existingImages = displayImages.filter(
                (img) => !img.isNew
            ) as Image[];

            if (isEditing && id) {
                const imageOrderPayload = existingImages.map(
                    (image, index) => ({
                        id: image.id,
                        position: index,
                    })
                );
                const imagesToRecropPayload = displayImages
                    .filter((img) => img.needsRecrop && img.cropData)
                    .map((img) => ({
                        id: img.id,
                        ...img.cropData,
                    }));

                const productData = {
                    name,
                    description,
                    material,
                    price,
                    isPersonalizable,
                    makerId,
                    categoryIds: Array.from(selectedCategories),
                    imageIdsToDelete: Array.from(imagesToDelete),
                    imageOrder: imageOrderPayload,
                    imagesToRecrop: imagesToRecropPayload,
                };
                await updateProduct(id, productData as any);

                if (newQueuedFiles.length > 0) {
                    const uploadPromises = newQueuedFiles.map((qf, index) =>
                        uploadProductImage(id, qf.file, qf.cropData, index)
                    );
                    await Promise.all(uploadPromises);
                }
            } else {
                const newProductData = {
                    name,
                    description,
                    material,
                    price,
                    isPersonalizable,
                    makerId,
                    categoryIds: Array.from(selectedCategories),
                };
                const newProduct = await createProduct(newProductData);

                const newQueuedFiles = displayImages.filter(
                    (img): img is Extract<DisplayImage, { isNew: true }> =>
                        img.isNew
                );

                if (newQueuedFiles.length > 0) {
                    const uploadPromises = newQueuedFiles.map((qf) => {
                        const finalPosition = displayImages.findIndex(
                            (item) => item.id === qf.id
                        );
                        return uploadProductImage(
                            newProduct.id,
                            qf.file,
                            qf.cropData,
                            finalPosition
                        );
                    });

                    await Promise.all(uploadPromises);
                }
            }
            navigate("/admin/products");
        } catch (err: any) {
            setError("Erro ao salvar o produto: " + err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return <p>Carregando formulário...</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                {isEditing ? "Editar Produto" : "Novo Produto"}
            </h1>
            <div className="bg-white p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {error && <p className="text-red-500 mb-4">{error}</p>}

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                            Detalhes do Produto
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                    htmlFor="name"
                                >
                                    Nome do Produto
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg text-gray-900"
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                    htmlFor="maker"
                                >
                                    Maker Responsável
                                </label>
                                <select
                                    id="maker"
                                    value={makerId}
                                    onChange={(e) => setMakerId(e.target.value)}
                                    required
                                    className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-white"
                                >
                                    <option value="" disabled>
                                        Selecione um maker
                                    </option>
                                    {availableMakers.map((maker) => (
                                        <option key={maker.id} value={maker.id}>
                                            {maker.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="md:col-span-2">
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                    htmlFor="description"
                                >
                                    Descrição
                                </label>
                                <textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 border rounded-lg text-gray-900"
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                    htmlFor="material"
                                >
                                    Material Principal
                                </label>
                                <input
                                    type="text"
                                    id="material"
                                    value={material}
                                    onChange={(e) =>
                                        setMaterial(e.target.value)
                                    }
                                    required
                                    className="w-full px-3 py-2 border rounded-lg text-gray-900"
                                />
                            </div>
                            <div>
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                    htmlFor="price"
                                >
                                    Preço (R$)
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                    min="0"
                                    step="0.01"
                                    placeholder="Ex: 49.90"
                                    className="w-full px-3 py-2 border rounded-lg text-gray-900"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="flex items-center gap-2 cursor-pointer text-gray-900 w-fit">
                                    <input
                                        type="checkbox"
                                        checked={isPersonalizable}
                                        onChange={(e) =>
                                            setIsPersonalizable(
                                                e.target.checked
                                            )
                                        }
                                        className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                                    />
                                    Este produto aceita personalização
                                </label>
                            </div>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                            Categorias
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {availableCategories.map((cat) => (
                                <label
                                    key={cat.id}
                                    className="flex items-center gap-2 cursor-pointer text-gray-900"
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

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                            Imagens do Produto (Arraste para reordenar)
                        </h2>
                        <div>
                            <label
                                htmlFor="images"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                {isEditing
                                    ? "Carregar Novas Imagens"
                                    : "Carregar Imagens"}
                            </label>
                            <input
                                type="file"
                                id="images"
                                multiple
                                onChange={handleFileSelect}
                                accept="image/png, image/jpeg"
                                className="w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>

                        {displayImages.length > 0 && (
                            <DndContext
                                sensors={sensors}
                                collisionDetection={closestCenter}
                                onDragEnd={handleDragEnd}
                            >
                                <div className="mt-6">
                                    <SortableContext
                                        items={displayImages}
                                        strategy={rectSortingStrategy}
                                    >
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                            {displayImages.map((img) => (
                                                <SortableImage
                                                    key={img.id}
                                                    image={img}
                                                    onDelete={() =>
                                                        handleImageDelete(img)
                                                    }
                                                    onCrop={() =>
                                                        openCropModal(img)
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </SortableContext>
                                </div>
                            </DndContext>
                        )}
                    </section>

                    <div className="flex items-center gap-4 pt-4 border-t">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            {isSubmitting
                                ? "Salvando..."
                                : isEditing
                                ? "Salvar Alterações"
                                : "Criar Produto"}
                        </button>
                        <Link
                            to="/admin/products"
                            className="text-gray-600 hover:underline"
                        >
                            Cancelar
                        </Link>
                    </div>
                </form>
            </div>

            {croppingFile && (
                <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
                    <div className="bg-white p-4 rounded-lg max-w-lg w-full">
                        <h3 className="font-bold mb-4 text-black">
                            Ajuste a Imagem do Produto
                        </h3>
                        <ReactCrop
                            crop={crop}
                            onChange={(c) => setCrop(c)}
                            aspect={4 / 3}
                        >
                            <img
                                ref={imgRef}
                                src={
                                    "originalUrl" in croppingFile
                                        ? croppingFile.originalUrl
                                        : croppingFile.urlDisplay
                                }
                                alt="Crop Preview"
                                style={{ maxHeight: "70vh" }}
                                onLoad={onImageLoadInModal}
                                crossOrigin="anonymous"
                            />
                        </ReactCrop>
                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                onClick={() => setCroppingFile(null)}
                                className="text-gray-600 hover:underline"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    if (crop) {
                                        handleSaveCrop(crop);
                                    }
                                }}
                                className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductForm;
