import { useOutletContext } from "react-router-dom";
import { Maker } from "../../../../types/types";
import { LoadingSpinner } from "../../../Catalog/components/Icons";
import { contactDetailsMap } from "../../../Catalog/components/MakerProfileModal/utils";
import { useMakerProfileForm } from "../../../../hooks/useMakerProfileForm";

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
    <div className="max-w-4xl mx-auto animate-fade-in">
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
                    alt="Perfil"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl text-texto-secundario">?</span>
                )}
              </div>
              <label
                className={`cursor-pointer rounded-md bg-blue-50 text-blue-600 px-4 py-2 hover:bg-blue-100 transition-colors ${
                  isUploading ? "opacity-50 cursor-not-allowed" : ""
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
                className="w-full px-4 py-3 border border-borda rounded-lg bg-fundo-secundario text-texto-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-3 border border-borda rounded-lg bg-fundo-secundario text-texto-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer w-fit text-texto-principal">
              <input
                type="checkbox"
                checked={formData.acceptsPersonalization}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    acceptsPersonalization: e.target.checked,
                  })
                }
                className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
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
                    handleContactChange(index, "type", e.target.value)
                  }
                  className="w-full sm:w-auto border border-borda rounded-lg px-3 py-3 bg-fundo-secundario text-texto-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    handleContactChange(index, "contactInfo", e.target.value)
                  }
                  placeholder={
                    contact.type === "WHATSAPP" ? "DDD + Número" : "Usuário/Link"
                  }
                  maxLength={contact.type === "WHATSAPP" ? 11 : undefined}
                  required
                  className="flex-grow w-full px-3 py-3 border border-borda rounded-lg bg-fundo-secundario text-texto-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => manageContacts("remove", index)}
                  className="bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors w-full sm:w-auto"
                  disabled={contacts.length <= 1}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => manageContacts("add")}
            className="text-blue-600 font-semibold py-2 mt-4 hover:underline"
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
            <div className="flex justify-center py-4">
              <LoadingSpinner className="w-8 h-8" />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {availableCategories.map((cat) => (
                <label
                  key={cat.id}
                  className="flex items-center gap-2 cursor-pointer text-texto-principal hover:opacity-80"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.has(cat.id)}
                    onChange={() => {
                      const newSet = new Set(selectedCategories);
                      newSet.has(cat.id)
                        ? newSet.delete(cat.id)
                        : newSet.add(cat.id);
                      setSelectedCategories(newSet);
                    }}
                    className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
                  />
                  {cat.name}
                </label>
              ))}
            </div>
          )}
        </section>

        {/* Submit Button */}
        <div className="border-t border-borda pt-4 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || loadingCategories || isUploading}
            className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <LoadingSpinner className="w-5 h-5" /> Salvando...
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
