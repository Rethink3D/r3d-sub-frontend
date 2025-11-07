import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  getProductById,
  createProduct,
  updateProduct,
  uploadProductImage,
  deleteImage,
  getCategories,
} from "../../services/api";
import { Image, Category } from "../../types/types";
import { LoadingSpinner } from "../Catalog/components/Icons";

// --- (PROTÓTIPO) ---
const MOCK_MAKER_ID = "cd392e02-7237-4386-a818-bf215d58f8ac";
// ---------------------

export const MakerProductForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [material, setMaterial] = useState("");
  const [price, setPrice] = useState("");
  const [isPersonalizable, setIsPersonalizable] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [productImages, setProductImages] = useState<Image[]>([]);
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Lógica de busca de dados (copiada do form admin)
  const fetchProductData = async (productId: string) => { 
    try {
      const productData = await getProductById(productId);
      setName(productData.name);
      setDescription(productData.description);
      setMaterial(productData.material);
      setPrice(String(productData.price));
      setIsPersonalizable(productData.isPersonalizable);
      setSelectedCategories(new Set(productData.categories.map((cat) => cat.id)));
      setProductImages(productData.images || []);
    } catch (err: any) {
      setError("Erro ao recarregar dados do produto: " + err.message);
    }
  };

  // Lógica de dados iniciais (copiada do form admin, mas sem 'getMakers')
  useEffect(() => {
    const fetchInitialData = async () => { 
      setLoading(true);
      try {
        const categoriesData = await getCategories();
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

  // Lógica de toggle de categoria (copiada)
  const handleCategoryToggle = (categoryId: string) => { 
    const newSelection = new Set(selectedCategories);
    if (newSelection.has(categoryId)) {
      newSelection.delete(categoryId);
    } else {
      newSelection.add(categoryId);
    }
    setSelectedCategories(newSelection);
  };

  // Lógica de upload/delete de imagens (copiada)
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => { 
    if (event.target.files) {
      setFilesToUpload(Array.from(event.target.files));
    }
  };
  const handleRemoveQueuedFile = (fileToRemove: File) => { 
    setFilesToUpload(filesToUpload.filter((file) => file !== fileToRemove));
  };
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0] && id) {
      const file = event.target.files[0];
      try {
        await uploadProductImage(id, file);
        await fetchProductData(id);
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
  
  // Lógica de Submit (copiada e adaptada)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação
    if (selectedCategories.size === 0) {
      setError("Selecione pelo menos uma categoria.");
      return;
    }
    if (isEditing && productImages.length === 0 && filesToUpload.length === 0) {
      setError("O produto deve ter pelo menos uma imagem.");
      return;
    }
    if (!isEditing && filesToUpload.length === 0) {
      setError("Por favor, adicione pelo menos uma imagem.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    
    // O makerId agora é o MOCK_MAKER_ID, não vem do state
    const makerId = MOCK_MAKER_ID; 

    try {
      const productData = {
        name,
        description,
        material,
        price: price,
        isPersonalizable,
        makerId,
        categoryIds: Array.from(selectedCategories),
      };

      if (isEditing && id) {
        await updateProduct(id, productData);
      } else {
        const newProduct = await createProduct(productData);
        if (filesToUpload.length > 0) {
          const uploadPromises = filesToUpload.map((file) =>
            uploadProductImage(newProduct.id, file)
          );
          await Promise.all(uploadPromises);
        }
      }
      navigate("/maker/produtos");
    } catch (err: any) {
      setError("Erro ao salvar o produto: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner className="w-12 h-12" />;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-texto-principal">
        {isEditing ? "Editar Produto" : "Novo Produto"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* --- Card 1: Detalhes do Produto --- */}
        <section className="bg-fundo-principal p-6 rounded-lg shadow-sm border border-borda">
          <h2 className="text-xl font-semibold text-texto-principal mb-6 border-b border-borda pb-3">
            Detalhes do Produto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-texto-principal mb-2">
                Nome do Produto
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-texto-principal mb-2">
                Descrição
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="material" className="block text-sm font-medium text-texto-principal mb-2">
                Material Principal
              </label>
              <input
                type="text"
                id="material"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                required
                placeholder="Ex: Resina, PLA, ABS..."
                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-texto-principal mb-2">
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
                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer text-texto-principal w-fit">
                <input
                  type="checkbox"
                  checked={isPersonalizable}
                  onChange={(e) => setIsPersonalizable(e.target.checked)}
                  className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="font-medium">Este produto aceita personalização</span>
              </label>
            </div>
          </div>
        </section>

        {/* --- Card 2: Categorias --- */}
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
                  onChange={() => handleCategoryToggle(cat.id)}
                  className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                />
                {cat.name}
              </label>
            ))}
          </div>
        </section>

        {/* --- Card 3: Imagens --- */}
        <section className="bg-fundo-principal p-6 rounded-lg shadow-sm border border-borda">
          <h2 className="text-xl font-semibold text-texto-principal mb-6 border-b border-borda pb-3">
            Imagens do Produto
          </h2>
          
          <label htmlFor="images" className="block text-sm font-medium text-texto-principal mb-2">
            {isEditing ? "Carregar Novas Imagens" : "Carregar Imagens"}
          </label>
          <input
            type="file"
            id="images"
            multiple
            onChange={isEditing ? handleImageUpload : handleFileSelect}
            accept="image/png, image/jpeg"
            className="w-full text-texto-principal file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 dark:file:bg-blue-900/50 dark:file:text-blue-300 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-texto-secundario mt-2">Você pode enviar várias imagens. A primeira será a capa.</p>

          {/* Fila de Upload (só para 'Novo Produto') */}
          {!isEditing && filesToUpload.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-medium text-texto-principal mb-2">Imagens na fila:</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {filesToUpload.map((file, index) => (
                  <div key={index} className="relative group aspect-square">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveQueuedFile(file)}
                      className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs opacity-0 group-hover:opacity-100"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Imagens Existentes (só para 'Editar') */}
          {isEditing && (
            <div className="mt-6">
              <p className="text-sm font-medium text-texto-principal mb-2">Imagens existentes:</p>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {productImages.map((img) => (
                  <div key={img.id} className="relative group aspect-square">
                    <img
                      src={img.url}
                      alt="Produto"
                      className="w-full h-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(img.id)}
                      className="absolute top-1 right-1 bg-red-600 text-white w-5 h-5 flex items-center justify-center rounded-full text-xs opacity-0 group-hover:opacity-100"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* --- Ações --- */}
        <div className="flex items-center gap-4 pt-4 border-t border-borda">
          <button
            type="submit"
            disabled={isSubmitting || loading}
            className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <LoadingSpinner className="w-5 h-5" /> 
            ) : isEditing ? (
              "Salvar Alterações"
            ) : (
              "Criar Produto"
            )}
          </button>
          <Link
            to="/maker/produtos" // Volta para a lista do maker
            className="text-texto-secundario hover:underline"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};