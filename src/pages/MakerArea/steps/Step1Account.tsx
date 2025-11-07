// Etapa 1: Criação da Conta (Firebase)
import { useState } from "react";

// Props genéricas para todos os steps
interface StepProps {
  formData: any;
  updateFormData: (field: string, value: any) => void;
  nextStep: () => void;
  prevStep?: () => void;
  isSubmitting?: boolean;
  error?: string | null;
}

export const Step1Account: React.FC<StepProps> = ({ formData, updateFormData, nextStep }) => {
  const [localError, setLocalError] = useState<string | null>(null);

  const handleNext = () => {
    if (formData.password !== formData.confirmPassword) {
      setLocalError("As senhas não conferem.");
      return;
    }
    if (formData.password.length < 6) {
      setLocalError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    setLocalError(null);
    nextStep();
  };

  return (
    <div className="space-y-6 animate-fade-in-scale">
      <h2 className="text-2xl font-semibold text-texto-principal text-center">
        Crie sua Conta
      </h2>
      <p className="text-center text-texto-secundario">
        Comece com seu email e senha. Este será seu login de acesso à plataforma.
      </p>

      {/* Campo de Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-texto-principal mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          required
          placeholder="seu.email@exemplo.com"
          className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Campo de Senha */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-texto-principal mb-2"
        >
          Senha
        </label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={(e) => updateFormData("password", e.target.value)}
          required
          placeholder="Mínimo 6 caracteres"
          className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Campo de Confirmar Senha */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-texto-principal mb-2"
        >
          Confirmar Senha
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) => updateFormData("confirmPassword", e.target.value)}
          required
          placeholder="Repita sua senha"
          className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {localError && (
        <p className="text-red-500 text-sm text-center">{localError}</p>
      )}

      {/* Botão de Navegação */}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={handleNext}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Próximo &rarr;
        </button>
      </div>
    </div>
  );
};