import { useState } from "react";
import { Step1Props } from "../../../../types/registration";
import { isValidEmail } from "../../../../utils/isValidEmail";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 48 48">
    <path
      fill="#4285F4"
      d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
    ></path>
    <path
      fill="#34A853"
      d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v8.51h12.8c-.57 3.02-2.31 5.48-4.79 7.2l7.8 6.01C42.6 39.2 46.98 32.6 46.98 24.55z"
    ></path>
    <path
      fill="#FBBC05"
      d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
    ></path>
    <path
      fill="#EA4335"
      d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.8-6.01c-2.18 1.45-4.96 2.3-8.09 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
    ></path>
    <path fill="none" d="M0 0h48v48H0z"></path>
  </svg>
);

export const Step1Account: React.FC<Step1Props> = ({
  formData,
  updateFormData,
  nextStep,
  handleGoogleLogin,
  isSubmitting,
}) => {
  const [localError, setLocalError] = useState<string | null>(null);

  const handleNext = () => {
    if (!formData.email.trim()) {
      setLocalError("O campo de email é obrigatório.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setLocalError(
        "Por favor, insira um email válido (ex: nome@exemplo.com)."
      );
      return;
    }

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

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isSubmitting}
        className="w-full flex justify-center items-center gap-3 px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        <GoogleIcon />
        <span className="font-medium">Cadastrar com Google</span>
      </button>

      {/* --- Divisor "ou" --- */}
      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-borda"></div>
        <span className="flex-shrink mx-4 text-xs text-texto-secundario uppercase">
          ou
        </span>
        <div className="flex-grow border-t border-borda"></div>
      </div>

      <p className="text-center text-texto-secundario -mt-4 text-sm">
        Cadastre-se com seu email e senha.
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
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
          disabled={isSubmitting}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Próximo &rarr;
        </button>
      </div>
    </div>
  );
};
