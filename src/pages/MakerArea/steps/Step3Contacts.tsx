// Etapa 3: Contatos (Reúso da lógica do MakerForm)
import { contactDetailsMap } from "../../Catalog/components/MakerProfileModal/utils"; // 👈 IMPORTANTE

// Gera a lista de opções a partir do mapa que já temos
const contactOptions = Object.keys(contactDetailsMap) as (keyof typeof contactDetailsMap)[];

interface StepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  nextStep: () => void;
  prevStep?: () => void;
  isSubmitting?: boolean;
  error?: string | null;
}

export const Step3Contacts: React.FC<StepProps> = ({ formData, updateFormData, nextStep, prevStep }) => {

  const handleContactChange = (
    index: number,
    field: "type" | "contactInfo",
    value: string
  ) => {
    const newContacts = [...formData.contacts];
    newContacts[index][field] = value;
    updateFormData("contacts", newContacts);
  };

  const addContactField = () => {
    // Adiciona WhatsApp como padrão, que é mais comum
    updateFormData("contacts", [
      ...formData.contacts,
      { type: "WHATSAPP", contactInfo: "" },
    ]);
  };

  const removeContactField = (index: number) => {
    if (formData.contacts.length > 1) {
      updateFormData(
        "contacts",
        formData.contacts.filter((_: any, i: number) => i !== index)
      );
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-scale">
      <h2 className="text-2xl font-semibold text-texto-principal text-center">
        Canais de Contato
      </h2>
      <p className="text-center text-texto-secundario">
        Como seus clientes encontrarão você? (Obrigatório ao menos 1)
      </p>

      <div className="space-y-4">
        {formData.contacts.map((contact: any, index: number) => {
          // Pega os detalhes (ícone, label) do mapa
          const details = contactDetailsMap[contact.type as keyof typeof contactDetailsMap];
          
          return (
            <div key={index} className="flex flex-col sm:flex-row items-center gap-2">
              {/* 1. O Select agora é mais curto e relevante */}
              <select
                value={contact.type}
                onChange={(e) =>
                  handleContactChange(index, "type", e.target.value)
                }
                className="w-full sm:w-auto border border-borda rounded-lg px-3 py-3 text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {contactOptions.map((type) => (
                  <option key={type} value={type}>
                    {contactDetailsMap[type].label} {/* Ex: "WhatsApp", "Instagram" */}
                  </option>
                ))}
              </select>

              {/* 2. O Input agora tem o ÍCONE */}
              <div className="relative flex-grow w-full">
                {/* Ícone */}
                {details?.icon && (
                  <img
                    src={details.icon}
                    alt={details.label}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-80"
                  />
                )}
                {/* Input com padding à esquerda para o ícone */}
                <input
                  type={contact.type === 'EMAIL' ? 'email' : 'text'}
                  value={contact.contactInfo}
                  onChange={(e) =>
                    handleContactChange(index, "contactInfo", e.target.value)
                  }
                  placeholder={
                    contact.type === "WHATSAPP"
                      ? "5599912345678 (só números)"
                      : "Seu usuário ou link"
                  }
                  required
                  className="flex-grow w-full pl-10 pr-3 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              {/* 3. Botão de Remover */}
              <button
                type="button"
                onClick={() => removeContactField(index)}
                className="w-full sm:w-auto bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                disabled={formData.contacts.length === 1}
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        onClick={addContactField}
        className="text-blue-600 font-semibold py-2 transition-colors hover:text-blue-500"
      >
        + Adicionar outro contato
      </button>

      {/* Botões de Navegação */}
      <div className="flex justify-between pt-4 border-t border-borda mt-4">
        <button
          type="button"
          onClick={prevStep}
          className="text-texto-secundario font-bold py-3 px-6 rounded-lg hover:text-texto-principal transition-colors"
        >
          &larr; Voltar
        </button>
        <button
          type="button"
          onClick={nextStep}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Próximo &rarr;
        </button>
      </div>
    </div>
  );
};