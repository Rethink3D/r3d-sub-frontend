import { Link, useOutletContext, useParams } from "react-router-dom";
import {
  Maker,
  ProductTypeEnum,
  MaterialTypeEnum,
} from "../../../../types/types";
import { LoadingSpinner } from "../../../Catalog/components/Icons";
import { CAMPAIGN_CONFIG } from "../../../../config/campaign";
import { useMakerProductForm } from "../../../../hooks/useMakerProductForm";
import { PRODUCT_LIMITS } from "../../../../constants/InputsLimits";

export const MakerProductForm: React.FC = () => {
  const maker = useOutletContext<Maker>();
  const { id } = useParams<{ id: string }>();

  const {
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
  } = useMakerProductForm(maker, id);

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (val < 0) return;
    updateField("price", e.target.value);
  };

  if (!maker || loading) return <LoadingSpinner className="w-12 h-12" />;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-texto-principal dark:text-white">
          {isEditing ? "Editar Produto" : "Novo Produto"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Seção 1: Detalhes */}
        <section className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-sm border border-borda dark:border-gray-700">
          <h2 className="text-xl font-semibold text-texto-principal dark:text-white mb-6 border-b border-borda dark:border-gray-700 pb-3">
            Detalhes do Produto
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-texto-principal dark:text-gray-200 mb-2">
                Nome do Produto
              </label>
              <input
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
                maxLength={PRODUCT_LIMITS.NAME}
                placeholder="Ex: Action Figure Cyberpunk"
                className="w-full px-4 py-3 border border-borda rounded-lg bg-white dark:bg-gray-900 text-texto-principal dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-texto-secundario dark:text-gray-500">
                  {formData.name.length}/{PRODUCT_LIMITS.NAME}
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-texto-principal dark:text-gray-200 mb-2">
                Tipo de Anúncio
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  updateField("type", e.target.value as ProductTypeEnum)
                }
                className="w-full px-4 py-3 border border-borda rounded-lg bg-white dark:bg-gray-900 text-texto-principal dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
                disabled={
                  !CAMPAIGN_CONFIG.isActive &&
                  formData.type !== ProductTypeEnum.PROMOTIONAL
                }
              >
                <option value={ProductTypeEnum.STANDARD}>Produto Padrão</option>
                {(CAMPAIGN_CONFIG.isActive ||
                  formData.type === ProductTypeEnum.PROMOTIONAL) && (
                  <option value={ProductTypeEnum.PROMOTIONAL}>
                    {CAMPAIGN_CONFIG.isActive
                      ? `Produto ${CAMPAIGN_CONFIG.label}`
                      : "Produto Promocional (Campanha Encerrada)"}
                  </option>
                )}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-texto-principal dark:text-gray-200 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                required
                rows={4}
                placeholder="Descreva os detalhes, dimensões e acabamento do produto."
                maxLength={PRODUCT_LIMITS.DESCRIPTION}
                className="w-full px-4 py-3 border border-borda rounded-lg bg-white dark:bg-gray-900 text-texto-principal dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:border-gray-700"
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-texto-secundario dark:text-gray-500">
                  {formData.description.length}/{PRODUCT_LIMITS.DESCRIPTION}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-texto-principal dark:text-gray-200 mb-2">
                Material Principal
              </label>
              <select
                value={formData.material}
                onChange={(e) =>
                  updateField("material", e.target.value as MaterialTypeEnum)
                }
                required
                className="w-full px-4 py-3 border border-borda rounded-lg bg-white dark:bg-gray-900 text-texto-principal dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
              >
                {Object.values(MaterialTypeEnum).map((mat) => (
                  <option key={mat} value={mat}>
                    {mat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-texto-principal dark:text-gray-200 mb-2">
                Preço (R$)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max={PRODUCT_LIMITS.MAX_PRICE}
                value={formData.price}
                onChange={handlePriceChange}
                required
                placeholder="0.00"
                className="w-full px-4 py-3 border border-borda rounded-lg bg-white dark:bg-gray-900 text-texto-principal dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
              />
            </div>

            <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
              <label className="flex items-center gap-3 cursor-pointer w-full text-texto-principal dark:text-gray-200">
                <input
                  type="checkbox"
                  checked={formData.isPersonalizable}
                  onChange={(e) =>
                    updateField("isPersonalizable", e.target.checked)
                  }
                  className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                />
                <span className="font-medium text-blue-900 dark:text-blue-200">
                  Este produto aceita personalização?
                </span>
              </label>
              <p className="text-sm text-blue-700 ml-8 mt-1 dark:text-blue-400">
                Marque se o cliente pode solicitar alterações (cor, nome,
                tamanho) neste item.
              </p>
            </div>
          </div>
        </section>

        {/* Seção 2: Categorias */}
        <section className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-sm border border-borda dark:border-gray-700">
          <h2 className="text-xl font-semibold text-texto-principal dark:text-white mb-6 border-b border-borda dark:border-gray-700 pb-3">
            Categorias
          </h2>

          <div className="flex flex-wrap gap-2">
            {availableCategories.map((cat) => {
              const isSelected = selectedCategories.has(cat.id);
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => handleCategoryToggle(cat.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all
                    ${
                      isSelected
                        ? "bg-blue-600 border-blue-600 text-white shadow-md"
                        : "bg-white dark:bg-gray-800 border-borda dark:border-gray-600 text-texto-principal dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }
                  `}
                >
                  {isSelected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {cat.name}
                </button>
              );
            })}
          </div>
          {selectedCategories.size === 0 && (
            <p className="text-red-500 text-sm mt-3 font-medium">
              * Selecione pelo menos uma categoria.
            </p>
          )}
        </section>

        {/* Seção 3: Imagens */}
        <section className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-sm border border-borda dark:border-gray-700">
          <h2 className="text-xl font-semibold text-texto-principal dark:text-white mb-6 border-b border-borda dark:border-gray-700 pb-3">
            Galeria de Imagens
          </h2>

          <div className="mb-6">
            <label
              className={`
                flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer transition-colors
                ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed border-gray-300 bg-gray-50"
                    : "border-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/10 dark:border-blue-800 dark:hover:bg-blue-900/20"
                }
              `}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-blue-500 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="mb-1 text-sm text-gray-600 dark:text-gray-300 font-semibold">
                  Clique para fazer upload
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG ou WEBP (Máx. 10 imagens)
                </p>
              </div>
              <input
                type="file"
                multiple
                hidden
                onChange={handleFileSelect}
                accept="image/png, image/jpeg, image/webp, image/jpg"
                disabled={isSubmitting}
              />
            </label>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {/* Imagens Salvas (Server) */}
            {serverImages.map((img) => (
              <div key={img.id} className="relative group aspect-square">
                <img
                  src={img.url}
                  alt="Produto Salvo"
                  className="w-full h-full object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => markServerImageForDeletion(img.id)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
                    title="Remover imagem"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            {/* Imagens Novas (Local) */}
            {localImages.map((file, idx) => (
              <div
                key={`local-${idx}`}
                className="relative group aspect-square animate-fade-in"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="Nova Imagem"
                  className="w-full h-full object-cover rounded-lg border-2 border-blue-500 shadow-sm"
                />
                <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md">
                  NOVO
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => removeLocalImage(idx)}
                    className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 transition-colors shadow-lg"
                    title="Remover da fila"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {serverImages.length === 0 && localImages.length === 0 && (
            <p className="text-red-500 text-sm mt-4 font-medium text-center">
              * O produto precisa de pelo menos uma imagem.
            </p>
          )}
        </section>

        {/* Footer com Ações */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-4 border-t border-borda dark:border-gray-700">
          <Link
            to="/maker/produtos"
            className={`
              px-6 py-3 rounded-lg font-bold text-center transition-colors
              text-texto-secundario hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white
              ${isSubmitting ? "pointer-events-none opacity-50" : ""}
            `}
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-all transform active:scale-95 disabled:opacity-50 disabled:transform-none shadow-lg shadow-green-200 dark:shadow-none flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner className="w-5 h-5 text-white" /> Salvando...
              </>
            ) : (
              "Salvar Produto"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
