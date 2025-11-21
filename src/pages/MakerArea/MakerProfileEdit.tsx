import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import {
  updateMaker,
  getCategories,
  uploadMakerProfileImage,
  deleteImage,
} from "../../services/api";
import {
  Maker,
  Category,
  Image,
  MakerPayload,
  ContactTypeEnum,
} from "../../types/types";
import { LoadingSpinner } from "../Catalog/components/Icons";
import { contactDetailsMap } from "../Catalog/components/MakerProfileModal/utils";

const contactOptions = Object.keys(contactDetailsMap) as (keyof typeof contactDetailsMap)[];

export const MakerProfileEdit: React.FC = () => {
  const maker = useOutletContext<Maker>();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [acceptsPersonalization, setAcceptsPersonalization] = useState(false);
  const [contacts, setContacts] = useState<any[]>([]); 
  const [selectedCategories, setSelectedCategories] = useState(new Set<string>());
  const [profileImage, setProfileImage] = useState<Image | null>(null);
  
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (maker) {
      setName(maker.name);
      setDescription(maker.description);
      setAcceptsPersonalization(maker.acceptsPersonalization);
      setContacts(maker.contacts.length > 0 ? maker.contacts : [{ type: ContactTypeEnum.EMAIL, contactInfo: "" }]);
      setSelectedCategories(new Set(maker.categories.map((c) => c.id)));
      setProfileImage(maker.profileImage || null);
    }
  }, [maker]);

  useEffect(() => {
    getCategories()
      .then(setAvailableCategories)
      .catch(() => setError("Não foi possível carregar as categorias."))
      .finally(() => setLoadingCategories(false));
  }, []);

  const handleContactChange = (
    index: number,
    field: "type" | "contactInfo",
    value: string
  ) => {
    const newContacts = [...contacts];
    if (field === "type") {
      newContacts[index].type = value as ContactTypeEnum;
    } else {
      newContacts[index].contactInfo = value;
    }
    setContacts(newContacts);
  };

  const addContactField = () => {
    setContacts([...contacts, { type: ContactTypeEnum.WHATSAPP, contactInfo: "" }]);
  };

  const removeContactField = (index: number) => {
    if (contacts.length > 0) {
      setContacts(contacts.filter((_, i) => i !== index));
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    const newSelection = new Set(selectedCategories);
    if (newSelection.has(categoryId)) {
      newSelection.delete(categoryId);
    } else {
      newSelection.add(categoryId);
    }
    setSelectedCategories(newSelection);
  };

  const clearMessages = () => {
    setError("");
    setSuccess("");
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    clearMessages();
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      if (profileImage) {
        await deleteImage(profileImage.id);
      }
      const newImage = await uploadMakerProfileImage(maker.id, file);
      setProfileImage(newImage);
      setSuccess("Imagem de perfil atualizada!");
    } catch (err: any) {
      setError("Erro no upload da imagem: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();
    setIsSubmitting(true);

    const makerData: Partial<MakerPayload> = {
      name,
      description,
      acceptsPersonalization,
      status: maker.status,
      contacts: contacts.filter((c) => c.contactInfo.trim() !== ""),
      categoryIds: Array.from(selectedCategories),
    };

    try {
      await updateMaker(maker.id, makerData);
      setSuccess("Perfil salvo com sucesso!");
      setTimeout(() => navigate(0), 1000); 
    } catch (err: any) {
      setError("Erro ao salvar o perfil: " + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!maker) {
    return <LoadingSpinner className="w-12 h-12" />;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-texto-principal">
        Editar Perfil
      </h1>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* --- Card 1: Perfil Básico --- */}
        <section className="bg-fundo-principal p-6 rounded-lg shadow-sm border border-borda">
          <h2 className="text-xl font-semibold text-texto-principal mb-6 border-b border-borda pb-3">
            Perfil Público
          </h2>
          <div className="space-y-6">
            {/* Imagem */}
            <div>
              <label className="block text-sm font-medium text-texto-principal mb-2">
                Foto de Perfil ou Logo
              </label>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-fundo-secundario border border-borda flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage.url}
                      alt="Perfil"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-texto-secundario text-3xl">?</span>
                  )}
                </div>
                <label 
                  htmlFor="profileImageUpload"
                  className={`relative cursor-pointer rounded-md bg-white dark:bg-fundo-secundario font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 p-2
                              ${isUploading ? 'opacity-50' : ''}`}
                >
                  <span>{isUploading ? "Enviando..." : "Trocar imagem"}</span>
                  <input 
                    id="profileImageUpload" 
                    name="profileImageUpload" 
                    type="file" 
                    className="sr-only" 
                    accept="image/png, image/jpeg"
                    onChange={handleFileSelect}
                    disabled={isUploading}
                  />
                </label>
                {isUploading && <LoadingSpinner className="w-5 h-5" />}
              </div>
            </div>
            {/* Nome */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-texto-principal mb-2">
                Nome do Maker (ou Loja)
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
            {/* Descrição */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-texto-principal mb-2">
                Sua Bio (Descrição)
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
            {/* Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer text-texto-principal w-fit">
              <input
                type="checkbox"
                checked={acceptsPersonalization}
                onChange={(e) => setAcceptsPersonalization(e.target.checked)}
                className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="font-medium">Aceito pedidos sob demanda</span>
            </label>
          </div>
        </section>

        {/* --- Card 2: Contatos --- */}
        <section className="bg-fundo-principal p-6 rounded-lg shadow-sm border border-borda">
          <h2 className="text-xl font-semibold text-texto-principal mb-6 border-b border-borda pb-3">
            Canais de Contato
          </h2>
          <div className="space-y-4">
            {contacts.map((contact, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center gap-2">
                <select
                  value={contact.type}
                  onChange={(e) => handleContactChange(index, "type", e.target.value)}
                  className="w-full sm:w-auto border border-borda rounded-lg px-3 py-3 text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {contactOptions.map((type) => (
                    <option key={type} value={type}>
                      {contactDetailsMap[type].label}
                    </option>
                  ))}
                </select>
                <input
                  type={contact.type === 'EMAIL' ? 'email' : 'text'}
                  value={contact.contactInfo}
                  onChange={(e) => handleContactChange(index, "contactInfo", e.target.value)}
                  placeholder={contact.type === "WHATSAPP" ? "5599912345678" : "Seu usuário ou link"}
                  required
                  className="flex-grow w-full px-3 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-secundario focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeContactField(index)}
                  className="w-full sm:w-auto bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addContactField}
            className="text-blue-600 font-semibold py-2 mt-4 transition-colors hover:text-blue-500"
          >
            + Adicionar outro contato
          </button>
        </section>

        {/* --- Card 3: Categorias --- */}
        <section className="bg-fundo-principal p-6 rounded-lg shadow-sm border border-borda">
          <h2 className="text-xl font-semibold text-texto-principal mb-6 border-b border-borda pb-3">
            Suas Especialidades
          </h2>
          {loadingCategories ? (
            <LoadingSpinner />
          ) : (
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
          )}
        </section>

        {/* --- Ações --- */}
        <div className="flex items-center gap-4 pt-4 border-t border-borda">
          <button
            type="submit"
            disabled={isSubmitting || loadingCategories || isUploading}
            className="bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? (
              <LoadingSpinner className="w-5 h-5" /> 
            ) : "Salvar Alterações"}
          </button>
        </div>
        
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {success && <p className="text-green-500 mt-4">{success}</p>}

      </form>
    </div>
  );
};