import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getProductById,
  createProduct,
  updateProduct,
  uploadProductImage,
  deleteImage,
  getMakers,
  getCategories,
} from "../../../services/api";
import { Maker, Image, Category, MaterialTypeEnum } from "../../../types/types";
import { PRODUCT_LIMITS } from "../../../constants/InputsLimits";
import { LoadingSpinner } from "../../Catalog/components/Icons";

const ProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState<MaterialTypeEnum>(
    MaterialTypeEnum.PLA
  );
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
  const [productImages, setProductImages] = useState<Image[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const fetchProductData = async (productId: string) => {
    try {
      const productData = await getProductById(productId);
      setName(productData.name);
      setDescription(productData.description);
      setMaterial(productData.material);
      setPrice(String(productData.price));
      setIsPersonalizable(productData.isPersonalizable);
      setMakerId(productData.maker?.id || "");
      setSelectedCategories(
        new Set(productData.categories.map((cat) => cat.id))
      );
      setProductImages(productData.images || []);
    } catch (err: any) {
      setError("Erro ao recarregar dados do produto: " + err.message);
    }
  };

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
          await fetchProductData(id);
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
    if (newSelection.has(categoryId)) {
      newSelection.delete(categoryId);
    } else {
      newSelection.add(categoryId);
    }
    setSelectedCategories(newSelection);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      if (filesToUpload.length + newFiles.length > PRODUCT_LIMITS.MAX_IMAGES) {
        setError(`Limite de ${PRODUCT_LIMITS.MAX_IMAGES} imagens excedido.`);
        return;
      }

      setFilesToUpload((prev) => [...prev, ...newFiles]);
      setError("");
    }
  };
  const handleRemoveQueuedFile = (fileToRemove: File) => {
    setFilesToUpload(filesToUpload.filter((file) => file !== fileToRemove));
  };
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0 && id) {
      const newFiles = Array.from(event.target.files);
      if (productImages.length + newFiles.length > PRODUCT_LIMITS.MAX_IMAGES) {
        setError(
          `Limite de ${PRODUCT_LIMITS.MAX_IMAGES} imagens excedido. Você tem ${productImages.length} imagens.`
        );
        return;
      }

      try {
        await Promise.all(newFiles.map((file) => uploadProductImage(id, file)));
        await fetchProductData(id);
        setError("");
      } catch (err: any) {
        setError("Erro no upload da imagem: " + err.message);
      }
    }
  };

  const handleImageDelete = async (imageId: string) => {
    if (window.confirm("Tem certeza que deseja excluir esta imagem?") && id) {
      try {
        await deleteImage(imageId);
        await fetchProductData(id);
      } catch (err: any) {
        setError("Erro ao deletar imagem: " + err.message);
      }
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setPrice("");
      return;
    }

    const val = parseFloat(value);
    if (isNaN(val)) return;
    if (val < 0) return;
    if (val > PRODUCT_LIMITS.MAX_PRICE) return;

    setPrice(value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!makerId) {
      setError("Por favor, selecione um maker.");
      return;
    }
    setIsSubmitting(true);
    setError("");
    try {
      if (isEditing && id) {
        const productData = {
          name,
          description,
          material,
          price: price,
          isPersonalizable,
          makerId,
          categoryIds: Array.from(selectedCategories),
        };
        await updateProduct(id, productData);
        navigate("/admin/products");
      } else {
        const newProductData = {
          name,
          description,
          material,
          price: price,
          isPersonalizable,
          makerId,
          categoryIds: Array.from(selectedCategories),
        };
        const newProduct = await createProduct(newProductData);

        if (filesToUpload.length > 0) {
          const uploadPromises = filesToUpload.map((file) =>
            uploadProductImage(newProduct.id, file)
          );
          await Promise.all(uploadPromises);
        }

        navigate("/admin/products");
      }
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
                  maxLength={PRODUCT_LIMITS.NAME}
                  className="w-full px-3 py-2 border rounded-lg text-gray-900"
                />
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-500">
                    {name.length}/{PRODUCT_LIMITS.NAME}
                  </span>
                </div>
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
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  rows={4}
                  maxLength={PRODUCT_LIMITS.DESCRIPTION}
                  className="w-full px-3 py-2 border rounded-lg text-gray-900"
                />
                <div className="flex justify-end mt-1">
                  <span
                    className="text-xs 
text-gray-500"
                  >
                    {description.length}/{PRODUCT_LIMITS.DESCRIPTION}
                  </span>
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="material"
                >
                  Material Principal
                </label>
                <select
                  id="material"
                  value={material}
                  onChange={(e) =>
                    setMaterial(e.target.value as MaterialTypeEnum)
                  }
                  required
                  className="w-full px-3 py-2 border rounded-lg text-gray-900 bg-white"
                >
                  {Object.values(MaterialTypeEnum).map((mat) => (
                    <option key={mat} value={mat}>
                      {mat}
                    </option>
                  ))}
                </select>
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
                  onChange={handlePriceChange}
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  required
                  min="0"
                  max={PRODUCT_LIMITS.MAX_PRICE}
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
                    onChange={(e) => setIsPersonalizable(e.target.checked)}
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
                    onChange={() => handleCategoryToggle(cat.id)}
                    className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              Imagens do Produto
            </h2>

            <div>
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="images"
              >
                {isEditing ? "Carregar Novas Imagens" : "Carregar Imagens"}
              </label>
              <input
                type="file"
                id="images"
                multiple
                onChange={isEditing ? handleImageUpload : handleFileSelect}
                accept="image/png, image/jpeg, image/webp, image/jpg"
                className="w-full text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <p className="text-xs text-gray-500 mt-1">
                Formatos: PNG, JPG. Máx: {PRODUCT_LIMITS.MAX_IMAGES} imagens.
              </p>
            </div>

            {!isEditing && filesToUpload.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-bold text-gray-700 mb-2">
                  Imagens na fila:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {filesToUpload.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-32 object-cover rounded-md"
                      />

                      <button
                        type="button"
                        onClick={() => handleRemoveQueuedFile(file)}
                        className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {isEditing && (
              <div className="mt-4">
                <p className="text-sm font-bold text-gray-700 mb-2">
                  Imagens existentes:
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
                  {productImages.map((img) => (
                    <div key={img.id} className="relative group">
                      <img
                        src={img.url}
                        alt="Produto"
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => handleImageDelete(img.id)}
                        className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <div className="flex items-center gap-4 pt-4 border-t">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting && <LoadingSpinner className="w-5 h-5" />}

              {isSubmitting ? "Salvando..." : "Salvar Produto"}
            </button>
            <Link
              to="/admin/products"
              className={`text-texto-secundario hover:underline ${
                isSubmitting ? "pointer-events-none opacity-50" : ""
              }`}
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
