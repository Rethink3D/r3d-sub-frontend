import { useState, useEffect } from "react";
import { getCategories } from "../../../../services/api";
import { Category } from "../../../../types/types";
import { LoadingSpinner } from "../../../Catalog/components/Icons";
import { Step4Props } from "../../../../types/registration";

export const Step4Categories: React.FC<Step4Props> = ({
  formData,
  updateFormData,
  prevStep,
  handleSubmit,
  isSubmitting,
  error,
}) => {
  const [availableCategories, setAvailableCategories] = useState<Category[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        setLoading(true);
        const categoriesData = await getCategories();
        setAvailableCategories(categoriesData);
      } catch (err) {
        console.error("Erro ao buscar categorias", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCats();
  }, []);

  const handleCategoryToggle = (categoryId: string) => {
    const newSelection = new Set(formData.categoryIds);
    if (newSelection.has(categoryId)) {
      newSelection.delete(categoryId);
    } else {
      newSelection.add(categoryId);
    }
    updateFormData("categoryIds", newSelection);
  };

  return (
    <div className="space-y-6 animate-fade-in-scale">
      <h2 className="text-2xl font-semibold text-texto-principal text-center">
        Suas Especialidades
      </h2>
      <p className="text-center text-texto-secundario">
        Quais categorias de produtos você oferece? (Obrigatório ao menos 1)
      </p>

      {loading ? (
        <div className="flex justify-center py-8">
          <LoadingSpinner className="w-8 h-8" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-60 overflow-y-auto custom-scrollbar p-4 border border-borda rounded-lg">
          {availableCategories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 cursor-pointer text-texto-principal bg-fundo-principal p-3 rounded-lg border border-borda hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <input
                type="checkbox"
                checked={formData.categoryIds.has(cat.id)}
                onChange={() => handleCategoryToggle(cat.id)}
                className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
              />
              {cat.name}
            </label>
          ))}
        </div>
      )}

      {error && <p className="text-red-500 text-sm text-center">{error}</p>}

      <div className="flex justify-between pt-4 border-t border-borda mt-4">
        <button
          type="button"
          onClick={prevStep}
          disabled={isSubmitting}
          className="text-texto-secundario font-bold py-3 px-6 rounded-lg hover:text-texto-principal transition-colors disabled:opacity-50"
        >
          &larr; Voltar
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || loading || formData.categoryIds.size === 0}
          className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <LoadingSpinner className="w-5 h-5" />
          ) : (
            "Finalizar Cadastro"
          )}
        </button>
      </div>
    </div>
  );
};
