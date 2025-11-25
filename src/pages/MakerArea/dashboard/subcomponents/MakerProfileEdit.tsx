import { useOutletContext } from "react-router-dom";
import { Maker } from "../../../../types/types";
import { LoadingSpinner } from "../../../Catalog/components/Icons";
import { contactDetailsMap } from "../../../Catalog/components/MakerProfileModal/utils";
import { useMakerProfileForm } from "../../../../hooks/useMakerProfileForm";
import { MAKER_LIMITS } from "../../../../constants/InputsLimits";

const contactOptions = Object.keys(
  contactDetailsMap
) as (keyof typeof contactDetailsMap)[];

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
    handleSubmit,
  } = useMakerProfileForm(maker);

  if (!maker) return <LoadingSpinner className="w-12 h-12" />;

  return (
    <div className="max-w-4xl mx-auto animate-fade-in pb-10">
      <h1 className="text-3xl font-bold mb-6 text-texto-principal dark:text-white">
        Editar Perfil
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-sm border border-borda dark:border-gray-700">
          <h2 className="text-xl font-semibold text-texto-principal dark:text-white mb-6 border-b border-borda dark:border-gray-700 pb-3">
            Perfil Público
          </h2>
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              <div className="relative group">
                <label
                  className={`block w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg cursor-pointer overflow-hidden bg-fundo-principal dark:bg-gray-800 relative hover:opacity-90 transition-opacity ${
                    isUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {profileImage ? (
                    <img
                      src={profileImage.url}
                      alt="Perfil"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
                      <span className="text-4xl">?</span>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-medium">
                      {isUploading ? "Enviando..." : "Alterar"}
                    </span>
                  </div>
                  <input
                    type="file"
                    hidden
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </label>
                <div className="absolute bottom-1 right-1 bg-blue-600 rounded-full p-2 border-2 border-white dark:border-gray-800 shadow-sm pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-texto-principal dark:text-gray-200 mb-2">
                Nome do Maker (ou Loja)
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
                maxLength={MAKER_LIMITS.NAME}
                className="w-full px-4 py-3 border border-borda rounded-lg bg-white dark:bg-gray-900 text-texto-principal dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700"
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-texto-secundario dark:text-gray-500">
                  {formData.name.length}/{MAKER_LIMITS.NAME}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-texto-principal dark:text-gray-200 mb-2">
                Bio (Descrição)
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
                maxLength={MAKER_LIMITS.DESCRIPTION}
                className="w-full px-4 py-3 border border-borda rounded-lg bg-white dark:bg-gray-900 text-texto-principal dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:border-gray-700"
              />
              <div className="flex justify-end mt-1">
                <span className="text-xs text-texto-secundario dark:text-gray-500">
                  {formData.description.length}/{MAKER_LIMITS.DESCRIPTION}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
              <label className="flex items-center gap-3 cursor-pointer w-full text-texto-principal dark:text-white">
                <input
                  type="checkbox"
                  checked={formData.acceptsPersonalization}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      acceptsPersonalization: e.target.checked,
                    })
                  }
                  className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                />
                <span className="font-medium text-blue-900 dark:text-blue-200">
                  Aceito pedidos sob demanda
                </span>
              </label>
              <p className="text-sm text-blue-700 ml-8 mt-1 dark:text-blue-400">
                Marque se você aceita projetos personalizados criados do zero.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-sm border border-borda dark:border-gray-700">
          <h2 className="text-xl font-semibold text-texto-principal dark:text-white mb-6 border-b border-borda dark:border-gray-700 pb-3">
            Canais de Contato
          </h2>
          <div className="space-y-4">
            {contacts.map((contact, index) => {
              const details =
                contactDetailsMap[
                  contact.type as keyof typeof contactDetailsMap
                ];
              return (
                <div
                  key={index}
                  className="p-4 rounded-xl border border-borda bg-fundo-principal dark:bg-gray-800 dark:border-gray-700 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="sm:w-1/3 min-w-[140px]">
                      <select
                        value={contact.type}
                        onChange={(e) =>
                          handleContactChange(index, "type", e.target.value)
                        }
                        className="w-full h-12 border border-borda rounded-lg px-3 text-texto-principal bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium dark:border-gray-700"
                      >
                        {contactOptions.map((type) => (
                          <option key={type} value={type}>
                            {contactDetailsMap[type].label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1 flex gap-2 items-start">
                      <div className="flex-1 relative">
                        {details?.icon && (
                          <img
                            src={details.icon}
                            alt={details.label}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                          />
                        )}
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
                              ? "DDD + 9 Números"
                              : "Usuário ou Link"
                          }
                          maxLength={contact.type === "WHATSAPP" ? 11 : 100}
                          required
                          className="w-full h-12 pl-10 pr-3 border border-borda rounded-lg bg-white dark:bg-gray-900 text-texto-principal dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors dark:border-gray-700"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => manageContacts("remove", index)}
                        disabled={contacts.length <= 1}
                        className="h-12 w-12 flex items-center justify-center rounded-lg border border-red-200 bg-white text-red-500 hover:border-red-500 hover:bg-red-50 transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:border-red-200 dark:bg-gray-900 dark:border-red-900/50 dark:hover:bg-red-900/20"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => manageContacts("add")}
            className="w-full mt-4 py-3 border-2 border-dashed border-blue-200 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center justify-center gap-2 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Adicionar outro contato
          </button>
        </section>

        <section className="bg-white dark:bg-[#1a1a1a] p-6 rounded-xl shadow-sm border border-borda dark:border-gray-700">
          <h2 className="text-xl font-semibold text-texto-principal dark:text-white mb-6 border-b border-borda dark:border-gray-700 pb-3">
            Especialidades
          </h2>
          {loadingCategories ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner className="w-8 h-8 text-blue-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto custom-scrollbar p-1">
              {availableCategories.map((cat) => {
                const isSelected = selectedCategories.has(cat.id);
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
                      onChange={() => {
                        const newSet = new Set(selectedCategories);
                        newSet.has(cat.id)
                          ? newSet.delete(cat.id)
                          : newSet.add(cat.id);
                        setSelectedCategories(newSet);
                      }}
                    />
                  </label>
                );
              })}
            </div>
          )}
        </section>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting || loadingCategories || isUploading}
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-all transform active:scale-95 flex items-center gap-2 shadow-lg shadow-green-200 dark:shadow-none"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner className="w-5 h-5 text-white" /> Salvando...
              </>
            ) : (
              "Salvar Alterações"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
