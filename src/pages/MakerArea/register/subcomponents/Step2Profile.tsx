import { useState, useEffect } from "react";
import { maskCPF } from "../../../../utils/maskCPF";
import { BaseRegistrationStepProps } from "../../../../types/registration";
import { MAKER_LIMITS } from "../../../../constants/InputsLimits";

export const Step2Profile: React.FC<BaseRegistrationStepProps> = ({
  formData,
  updateFormData,
  nextStep,
  prevStep,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    formData.profileImageFile
      ? URL.createObjectURL(formData.profileImageFile)
      : null
  );

  useEffect(() => {
    if (formData.profileImageFile) {
      const newUrl = URL.createObjectURL(formData.profileImageFile);
      setImagePreview(newUrl);

      return () => URL.revokeObjectURL(newUrl);
    }
  }, [formData.profileImageFile]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      updateFormData("profileImageFile", file);
      setError(null);
    }
  };

  const handleNext = () => {
    if (!formData.profileImageFile) {
      setError("A foto de perfil ou logo é obrigatória.");
      return;
    }

    if (!formData.name.trim()) {
      setError("Por favor, informe o nome do Maker ou da Loja.");
      return;
    }

    if (!formData.cpf.trim() || formData.cpf.length < 11) {
      setError("Por favor, informe um CPF válido.");
      return;
    }

    if (!formData.description.trim()) {
      setError("A descrição do perfil é obrigatória.");
      return;
    }

    setError(null);
    if (nextStep) nextStep();
  };

  const handleChange = (field: string, value: any) => {
    setError(null);
    updateFormData(field as any, value);
  };

  return (
    <div className="space-y-6 animate-fade-in-scale max-w-lg mx-auto">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-texto-principal dark:text-white">
          Seu Perfil de Maker
        </h2>
        <p className="text-texto-secundario dark:text-gray-400">
          Como seus clientes verão você?
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="relative group">
          <label
            htmlFor="profileImage"
            className="block w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg cursor-pointer overflow-hidden bg-fundo-principal dark:bg-gray-800 relative hover:opacity-90 transition-opacity"
          >
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}

            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-medium">Alterar</span>
            </div>
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

          <input
            type="file"
            id="profileImage"
            onChange={handleFileSelect}
            accept="image/png, image/jpeg"
            className="hidden"
          />
        </div>
        <span className="text-sm text-texto-secundario dark:text-gray-400">
          Toque na imagem para enviar uma foto{" "}
          <span className="text-red-500">*</span>
        </span>
      </div>

      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-texto-principal dark:text-gray-200 mb-2"
        >
          Nome do Maker (ou Loja)
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => handleChange("name", e.target.value)}
          required
          maxLength={MAKER_LIMITS.NAME}
          placeholder="Ex: Estúdio 3D do João"
          className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
        />
        <div className="flex justify-end mt-1">
          <span className="text-xs text-texto-secundario dark:text-gray-500">
            {formData.name.length}/{MAKER_LIMITS.NAME}
          </span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-texto-principal dark:text-gray-200 mb-2">
          CPF (Para validação de identidade)
        </label>
        <input
          type="text"
          value={formData.cpf}
          onChange={(e) => handleChange("cpf", maskCPF(e.target.value))}
          required
          placeholder="000.000.000-00"
          maxLength={14}
          className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
        />
        <p className="text-xs text-texto-secundario dark:text-gray-500 mt-1">
          Seu CPF não será exibido publicamente no perfil.
        </p>
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-texto-principal dark:text-gray-200 mb-2"
        >
          Sua Bio (Descrição)
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          required
          rows={4}
          maxLength={MAKER_LIMITS.DESCRIPTION}
          placeholder="Conte aos clientes sobre seu trabalho, sua especialidade e o que você ama fazer."
          className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100"
        />
        <div className="flex justify-end mt-1">
          <span className="text-xs text-texto-secundario dark:text-gray-500">
            {formData.description.length}/{MAKER_LIMITS.DESCRIPTION}
          </span>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 dark:bg-blue-900/20 dark:border-blue-800">
        <label className="flex items-center gap-3 cursor-pointer text-texto-principal dark:text-gray-200 w-full">
          <input
            type="checkbox"
            checked={formData.acceptsPersonalization}
            onChange={(e) =>
              updateFormData("acceptsPersonalization", e.target.checked)
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

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg animate-pulse dark:bg-red-900/10 dark:border-red-800">
          <p className="text-red-600 text-sm text-center font-medium dark:text-red-400">
            {error}
          </p>
        </div>
      )}

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
          onClick={handleNext}
          className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all transform active:scale-95"
        >
          Próximo &rarr;
        </button>
      </div>
    </div>
  );
};
