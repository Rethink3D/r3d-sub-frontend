import { useState, useEffect, useMemo } from "react";
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
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredCategories = availableCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedCategoriesList = useMemo(() => {
    return availableCategories.filter((cat) =>
      formData.categoryIds.has(cat.id)
    );
  }, [availableCategories, formData.categoryIds]);

  return (
    <div className="space-y-6 animate-fade-in-scale max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-texto-principal dark:text-white">
          Suas Especialidades
        </h2>
        <p className="text-texto-secundario dark:text-gray-400">
          Quais categorias de produtos você oferece?
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner className="w-10 h-10 text-blue-600" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar categoria..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-borda rounded-lg bg-fundo-principal focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
            />
          </div>

          {selectedCategoriesList.length > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800">
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 mb-2 uppercase tracking-wide">
                Selecionados ({selectedCategoriesList.length})
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedCategoriesList.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryToggle(cat.id)}
                    className="flex items-center gap-1 bg-white dark:bg-blue-900 text-blue-700 dark:text-blue-100 px-3 py-1.5 rounded-full text-sm font-medium shadow-sm border border-blue-200 dark:border-blue-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/30 dark:hover:text-red-300 transition-all group"
                  >
                    {cat.name}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-blue-400 group-hover:text-red-500 transition-colors"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-72 overflow-y-auto custom-scrollbar p-1">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((cat) => {
                const isSelected = formData.categoryIds.has(cat.id);
                return (
                  <label
                    key={cat.id}
                    className={`
                      relative flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all select-none
                      ${
                        isSelected
                          ? "bg-blue-50 border-blue-500 shadow-sm dark:bg-blue-900/30 dark:border-blue-400"
                          : "bg-white border-borda hover:border-blue-300 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-750"
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`
                        w-5 h-5 rounded border flex items-center justify-center transition-colors
                        ${
                          isSelected
                            ? "bg-blue-600 border-blue-600"
                            : "bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                        }
                      `}
                      >
                        {isSelected && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 text-white"
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
                      </div>
                      <span
                        className={`font-medium ${
                          isSelected
                            ? "text-blue-900 dark:text-blue-100"
                            : "text-texto-principal dark:text-gray-300"
                        }`}
                      >
                        {cat.name}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={isSelected}
                      onChange={() => handleCategoryToggle(cat.id)}
                    />
                  </label>
                );
              })
            ) : (
              <p className="col-span-full text-center text-texto-secundario py-8 dark:text-gray-500">
                Nenhuma categoria encontrada para "{searchTerm}"
              </p>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg animate-pulse dark:bg-red-900/10 dark:border-red-800">
          <p className="text-red-600 text-sm text-center font-medium dark:text-red-400">
            {error}
          </p>
        </div>
      )}

      <div className="flex justify-between pt-6 border-t border-borda dark:border-gray-700">
        <button
          type="button"
          onClick={prevStep}
          disabled={isSubmitting}
          className="text-texto-secundario font-bold py-3 px-6 rounded-lg hover:text-texto-principal transition-colors disabled:opacity-50 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
        >
          &larr; Voltar
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting || loading || formData.categoryIds.size === 0}
          className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-all shadow-lg shadow-green-200 dark:shadow-none transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
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
