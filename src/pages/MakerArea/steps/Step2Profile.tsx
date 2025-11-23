import { useState, useEffect } from "react";
import { maskCPF } from "../../../utils/maskCPF";

interface StepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  nextStep: () => void;
  prevStep?: () => void;
  isSubmitting?: boolean;
  error?: string | null;
}

export const Step2Profile: React.FC<StepProps> = ({ formData, updateFormData, nextStep, prevStep }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(
    formData.profileImageFile ? URL.createObjectURL(formData.profileImageFile) : null
  );

  // Atualiza preview se a imagem mudar externamente (ex: reset)
  useEffect(() => {
      if (formData.profileImageFile) {
          setImagePreview(URL.createObjectURL(formData.profileImageFile));
      }
  }, [formData.profileImageFile]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      updateFormData("profileImageFile", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  
  return (
    <div className="space-y-6 animate-fade-in-scale">
      <h2 className="text-2xl font-semibold text-texto-principal text-center">
        Seu Perfil de Maker
      </h2>
      <p className="text-center text-texto-secundario">
        Como seus clientes verões você?
      </p>

      {/* Campo de Imagem de Perfil */}
      <div>
        <label className="block text-sm font-medium text-texto-principal mb-2">
          Foto de Perfil ou Logo
        </label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-fundo-principal border border-borda flex items-center justify-center overflow-hidden">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-texto-secundario text-3xl">?</span>
            )}
          </div>
          <input
            type="file"
            id="profileImage"
            onChange={handleFileSelect}
            accept="image/png, image/jpeg"
            className="w-full text-texto-principal file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      {/* Campo de Nome do Maker */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-texto-principal mb-2"
        >
          Nome do Maker (ou Loja)
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => updateFormData("name", e.target.value)}
          required
          placeholder="Ex: Estúdio 3D do João"
          className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Campo de CPF */}
      <div>
        <label className="block text-sm font-medium text-texto-principal mb-2">
          CPF (Para validação de identidade)
        </label>
        <input
          type="text"
          value={formData.cpf}
          onChange={(e) => updateFormData("cpf", maskCPF(e.target.value))}
          required
          placeholder="000.000.000-00"
          maxLength={14}
          className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-texto-secundario mt-1">
          Seu CPF não será exibido publicamente no perfil.
        </p>
      </div>
      
      {/* Campo de Descrição */}
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-texto-principal mb-2"
        >
          Sua Bio (Descrição)
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => updateFormData("description", e.target.value)}
          required
          rows={4}
          placeholder="Conte aos clientes sobre seu trabalho, sua especialidade e o que você ama fazer."
          className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {/* Campo de Personalização */}
      <div>
        <label className="flex items-center gap-3 cursor-pointer text-texto-principal w-fit">
          <input
            type="checkbox"
            checked={formData.acceptsPersonalization}
            onChange={(e) =>
              updateFormData("acceptsPersonalization", e.target.checked)
            }
            className="h-5 w-5 rounded text-blue-600 focus:ring-blue-500"
          />
          <span className="font-medium">Aceito pedidos sob demanda</span>
        </label>
        <p className="text-sm text-texto-secundario ml-8">
          Marque se você aceita projetos personalizados criados do zero.
        </p>
      </div>

      {/* Botões de Navegação */}
      <div className="flex justify-between pt-4">
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