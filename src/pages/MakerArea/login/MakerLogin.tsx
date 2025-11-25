import { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../Catalog/components/Icons";
import { useMakerLogin } from "../../../hooks/useMakerLogin";
import { GoogleIcon, EyeIcon } from "../components/Icons";

export const MakerLogin: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleGoogleLogin,
    handleSubmit,
  } = useMakerLogin();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-fundo-principal text-texto-principal p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-fundo-secundario shadow-lg rounded-2xl p-8 md:p-10 border border-borda">
          <h1 className="text-3xl font-bold text-center mb-6">
            Acessar sua Conta
          </h1>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex justify-center items-center gap-3 px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            <GoogleIcon />
            <span className="font-medium">Entrar com Google</span>
          </button>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-borda"></div>
            <span className="flex-shrink mx-4 text-xs text-texto-secundario uppercase">
              ou
            </span>
            <div className="flex-grow border-t border-borda"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu.email@exemplo.com"
                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Sua senha"
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="w-full px-4 py-3 pr-12 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />

                {passwordFocused && (
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Ocultar senha" : "Mostrar senha"
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                )}
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <div className="text-right">
              <Link
                to="/maker/recuperar-senha"
                className="text-sm text-blue-500 hover:underline"
              >
                Esqueceu a senha?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner className="w-5 h-5" /> : "Entrar"}
            </button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-borda">
            <p className="text-texto-secundario">
              Não tem uma conta?{" "}
              <Link
                to="/maker/register"
                className="font-bold text-blue-500 hover:underline"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
