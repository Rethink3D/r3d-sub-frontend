import { useState } from "react";
import { contactDetailsMap } from "../../../Catalog/components/MakerProfileModal/utils";
import { BaseRegistrationStepProps } from "../../../../types/registration";
import { Contact } from "../../../../types/types";
import { isValidEmail } from "../../../../utils/isValidEmail";
import { isValidWhatsAppNumber } from "../../../../utils/isValidWhatsappNumber";

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
        return "Insira um e-mail válido (ex: nome@dominio.com)";
      }
    }

    if (type === "WHATSAPP") {
      if (!isValidWhatsAppNumber) {
        return "O WhatsApp deve ter exatamente 11 dígitos (DDD + 9 números)";
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
    <div className="space-y-6 animate-fade-in-scale">
      <h2 className="text-2xl font-semibold text-texto-principal text-center">
        Canais de Contato
      </h2>
      <p className="text-center text-texto-secundario">
        Como seus clientes encontrarão você? (Obrigatório ao menos 1)
      </p>

      <div className="space-y-4">
        {formData.contacts.map((contact: Contact, index: number) => {
          const details =
            contactDetailsMap[contact.type as keyof typeof contactDetailsMap];
          const errorMessage = errors[index];

          return (
            <div key={index} className="flex flex-col gap-1">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <select
                  value={contact.type}
                  onChange={(e) =>
                    handleContactChange(index, "type", e.target.value)
                  }
                  className="w-full sm:w-auto border border-borda rounded-lg px-3 py-3 text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {contactOptions.map((type) => (
                    <option key={type} value={type}>
                      {contactDetailsMap[type].label}
                    </option>
                  ))}
                </select>

                <div className="relative flex-grow w-full">
                  {details?.icon && (
                    <img
                      src={details.icon}
                      alt={details.label}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 opacity-80"
                    />
                  )}
                  <input
                    type={contact.type === "EMAIL" ? "email" : "text"}
                    value={contact.contactInfo}
                    onChange={(e) =>
                      handleContactChange(index, "contactInfo", e.target.value)
                    }
                    className={`flex-grow w-full pl-10 pr-3 py-3 border rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 ${
                      errorMessage
                        ? "border-red-500 focus:ring-red-500"
                        : "border-borda focus:ring-blue-500"
                    }`}
                    placeholder={
                      contact.type === "WHATSAPP"
                        ? "11999999999 (DDD + Número)"
                        : "Seu usuário ou link"
                    }
                    maxLength={contact.type === "WHATSAPP" ? 11 : undefined}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => removeContactField(index)}
                  className="w-full sm:w-auto bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
                  disabled={formData.contacts.length === 1}
                >
                  &times;
                </button>
              </div>

              {errorMessage && (
                <span className="text-xs text-red-500 pl-1 sm:pl-36">
                  {errorMessage}
                </span>
              )}
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
          onClick={handleNextStep}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Próximo &rarr;
        </button>
      </div>
    </div>
  );
};
