import { useState } from "react";
import { Step1Props } from "../../../../types/registration";
import { isValidEmail } from "../../../../utils/isValidEmail";
import { GoogleIcon, EyeIcon } from "../../components/Icons";

export const Step1Account: React.FC<Step1Props> = ({
  formData,
  updateFormData,
  nextStep,
  handleGoogleLogin,
  isSubmitting,
}) => {
  const [localError, setLocalError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmFocused, setConfirmFocused] = useState(false);

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
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-texto-principal mb-2"
        >
          Senha
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={formData.password}
            onChange={(e) => updateFormData("password", e.target.value)}
            required
            disabled={isSubmitting}
            placeholder="Mínimo 6 caracteres"
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
            className="w-full px-4 py-3 pr-12 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {passwordFocused && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <EyeIcon open={showPassword} />
            </button>
          )}
        </div>
      </div>
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-texto-principal mb-2"
        >
          Confirmar Senha
        </label>
        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => updateFormData("confirmPassword", e.target.value)}
            required
            disabled={isSubmitting}
            placeholder="Repita sua senha"
            onFocus={() => setConfirmFocused(true)}
            onBlur={() => setConfirmFocused(false)}
            className="w-full px-4 py-3 pr-12 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {confirmFocused && (
            <button
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setShowConfirm((s) => !s)}
              aria-label={showConfirm ? "Ocultar senha" : "Mostrar senha"}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <EyeIcon open={showConfirm} />
            </button>
          )}
        </div>
      </div>
      {localError && (
        <p className="text-red-500 text-sm text-center">{localError}</p>
      )}
      <div className="flex justify-end pt-4">
        <button
          type="button"
          onClick={handleNext}
          disabled={isSubmitting}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Próximo →
        </button>
      </div>
    </div>
  );
};
