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
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 text-texto-principal">
        {isEditing ? "Editar Produto" : "Novo Produto"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Seção 1: Detalhes */}
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
                onChange={(e) => updateField("name", e.target.value)}
                required
                maxLength={PRODUCT_LIMITS.NAME}
                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-texto-secundario">
                  {formData.name.length}/{PRODUCT_LIMITS.NAME}
                </span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-texto-principal mb-2">
                Tipo de Anúncio
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  updateField("type", e.target.value as ProductTypeEnum)
                }
                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <label className="block text-sm font-medium text-texto-principal mb-2">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                required
                rows={4}
                maxLength={PRODUCT_LIMITS.DESCRIPTION}
                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-texto-secundario">
                  {formData.description.length}/{PRODUCT_LIMITS.DESCRIPTION}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-texto-principal mb-2">
                Material
              </label>
              <select
                value={formData.material}
                onChange={(e) =>
                  updateField("material", e.target.value as MaterialTypeEnum)
                }
                required
                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.values(MaterialTypeEnum).map((mat) => (
                  <option key={mat} value={mat}>
                    {mat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-texto-principal mb-2">
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
                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center gap-3 cursor-pointer text-texto-principal w-fit">
                <input
                  type="checkbox"
                  checked={formData.isPersonalizable}
                  onChange={(e) =>
                    updateField("isPersonalizable", e.target.checked)
                  }
                  className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                />
                <span className="font-medium">Aceita personalização?</span>
              </label>
            </div>
          </div>
        </section>

        {/* Seção 2: Categorias */}
        <section className="bg-fundo-principal p-6 rounded-lg shadow-sm border border-borda">
          <h2 className="text-xl font-semibold text-texto-principal mb-6 border-b border-borda pb-3">
            Categorias
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {availableCategories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 cursor-pointer text-texto-principal hover:opacity-80 transition-opacity"
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

        {/* Seção 3: Imagens */}
        <section className="bg-fundo-principal p-6 rounded-lg shadow-sm border border-borda">
          <h2 className="text-xl font-semibold text-texto-principal mb-6 border-b border-borda pb-3">
            Imagens
          </h2>

          <div className="mb-4">
            <label
              className={`cursor-pointer bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-md hover:bg-blue-100 transition-colors inline-block ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Selecionar Imagens
              <input
                type="file"
                multiple
                hidden
                onChange={handleFileSelect}
                accept="image/png, image/jpeg, image/webp, image/jpg"
                disabled={isSubmitting}
              />
            </label>
            <p className="text-sm text-texto-secundario mt-2">
              Formatos aceitos: PNG, JPG, WEBP. Máx: 5MB.{" "}
              <strong>Máx: 10 imagens.</strong>
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {/* 1. Imagens Salvas (Server) */}
            {serverImages.map((img) => (
              <div key={img.id} className="relative group aspect-square">
                <img
                  src={img.url}
                  alt="Produto Salvo"
                  className="w-full h-full object-cover rounded-md border border-green-500/30"
                  title="Imagem salva no servidor"
                />
                <button
                  type="button"
                  onClick={() => markServerImageForDeletion(img.id)}
                  className="absolute top-1 right-1 bg-red-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity shadow-sm z-10"
                  title="Remover (será apagada ao salvar)"
                >
                  &#10005;
                </button>
              </div>
            ))}

            {/* 2. Imagens Novas (Local) */}
            {localImages.map((file, idx) => (
              <div
                key={`local-${idx}`}
                className="relative group aspect-square"
              >
                <img
                  src={URL.createObjectURL(file)}
                  alt="Nova Imagem"
                  className="w-full h-full object-cover rounded-md border-2 border-blue-500/50"
                  title="Nova imagem (será enviada ao salvar)"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-blue-600/90 text-white text-[10px] font-bold text-center py-1 rounded-b-sm">
                  NOVO
                </div>

                <button
                  type="button"
                  onClick={() => removeLocalImage(idx)}
                  className="absolute top-1 right-1 bg-gray-600 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity shadow-sm z-10"
                  title="Remover da fila"
                >
                  &#10005;
                </button>
              </div>
            ))}
          </div>

          {serverImages.length === 0 && localImages.length === 0 && (
            <p className="text-red-400 text-sm mt-4 font-medium">
              * Nenhuma imagem selecionada. O produto precisa de pelo menos uma
              imagem.
            </p>
          )}
        </section>

        <div className="flex items-center gap-4 pt-4 border-t border-borda">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting && <LoadingSpinner className="w-5 h-5" />}
            {isSubmitting ? "Salvando..." : "Salvar Produto"}
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
