import { useState } from "react";
import { contactDetailsMap } from "../../../Catalog/components/MakerProfileModal/utils";
import { BaseRegistrationStepProps } from "../../../../types/registration";
import { Contact } from "../../../../types/types";
import { isValidEmail } from "../../../../utils/isValidEmail";
import { isValidWhatsAppNumber } from "../../../../utils/isValidWhatsAppNumber";

const contactOptions = Object.keys(
  contactDetailsMap
) as (keyof typeof contactDetailsMap)[];

export const Step3Contacts: React.FC<BaseRegistrationStepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [errors, setErrors] = useState<Record<number, string>>({});

  const validateField = (type: string, value: string): string | null => {
    if (!value.trim()) return "Este campo é obrigatório";

    if (type === "EMAIL") {
      if (!isValidEmail(value)) {
        return "Insira um e-mail válido";
      }
    }

    if (type === "WHATSAPP") {
      if (!isValidWhatsAppNumber) {
        return "O WhatsApp deve ter 11 dígitos";
      }
    }

    return null;
  };

  const handleContactChange = (
    index: number,
    field: keyof Contact,
    value: string
  ) => {
    const newContacts = [...formData.contacts];
    let finalValue = value;

    if (field === "contactInfo" && newContacts[index].type === "WHATSAPP") {
      finalValue = value.replace(/\D/g, "");
    }

    newContacts[index] = { ...newContacts[index], [field]: finalValue };
    updateFormData("contacts", newContacts);
    if (errors[index]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
    }
  };

  const handleNextStep = () => {
    const newErrors: Record<number, string> = {};
    let hasError = false;

    formData.contacts.forEach((contact: Contact, index: number) => {
      const error = validateField(contact.type, contact.contactInfo);
      if (error) {
        newErrors[index] = error;
        hasError = true;
      }
    });

    setErrors(newErrors);

    if (!hasError) {
      nextStep();
    }
  };

  const addContactField = () => {
    updateFormData("contacts", [
      ...formData.contacts,
      { type: "WHATSAPP", contactInfo: "" },
    ]);
  };

  const removeContactField = (index: number) => {
    if (formData.contacts.length > 1) {
      updateFormData(
        "contacts",
        formData.contacts.filter((_: Contact, i: number) => i !== index)
      );
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[index];
        return newErrors;
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-scale max-w-2xl mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-texto-principal dark:text-white">
          Canais de Contato
        </h2>
        <p className="text-texto-secundario dark:text-gray-400">
          Como seus clientes encontrarão você?
        </p>
      </div>

      <div className="space-y-3">
        {formData.contacts.map((contact: Contact, index: number) => {
          const details =
            contactDetailsMap[contact.type as keyof typeof contactDetailsMap];
          const errorMessage = errors[index];

          return (
            <div
              key={index}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                errorMessage
                  ? "border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800"
                  : "border-borda bg-fundo-principal dark:bg-gray-800 dark:border-gray-700 shadow-sm"
              }`}
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="sm:w-1/3 min-w-[140px]">
                  <select
                    value={contact.type}
                    onChange={(e) =>
                      handleContactChange(index, "type", e.target.value)
                    }
                    className="w-full h-12 border border-borda rounded-lg px-3 text-texto-principal bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
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
                      type={contact.type === "EMAIL" ? "email" : "text"}
                      value={contact.contactInfo}
                      onChange={(e) =>
                        handleContactChange(
                          index,
                          "contactInfo",
                          e.target.value
                        )
                      }
                      className={`w-full h-12 pl-10 pr-3 border rounded-lg text-texto-principal bg-white dark:bg-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 transition-colors ${
                        errorMessage
                          ? "border-red-500 focus:ring-red-500"
                          : "border-borda dark:border-gray-700 focus:ring-blue-500"
                      }`}
                      placeholder={
                        contact.type === "WHATSAPP"
                          ? "DDD + 9 Números"
                          : "Seu usuário ou link"
                      }
                      maxLength={contact.type === "WHATSAPP" ? 11 : undefined}
                    />
                    {errorMessage && (
                      <p className="text-xs text-red-500 mt-1 ml-1 font-medium">
                        {errorMessage}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => removeContactField(index)}
                    disabled={formData.contacts.length === 1}
                    className="h-12 w-12 flex items-center justify-center rounded-lg border border-red-200 bg-white text-red-500 hover:border-red-500 hover:bg-red-50 transition-all disabled:opacity-30 disabled:hover:bg-white disabled:hover:border-red-200 dark:bg-gray-900 dark:border-red-900/50 dark:hover:bg-red-900/20"
                    title="Remover contato"
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
        onClick={addContactField}
        className="w-full py-3 border-2 border-dashed border-blue-200 rounded-lg text-blue-600 font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all flex items-center justify-center gap-2 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/20"
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

      <div className="flex justify-between pt-6">
        <button
          type="button"
          onClick={prevStep}
          className="text-texto-secundario font-bold py-3 px-6 rounded-lg hover:text-texto-principal transition-colors hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
        >
          &larr; Voltar
        </button>
        <button
          type="button"
          onClick={handleNextStep}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 transform active:scale-95 dark:shadow-none"
        >
          Próximo &rarr;
        </button>
      </div>
    </div>
  );
};
