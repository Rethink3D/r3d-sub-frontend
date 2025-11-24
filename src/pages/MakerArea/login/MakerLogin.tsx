import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../Catalog/components/Icons";
import { useMakerLogin } from "../../../hooks/useMakerLogin";

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
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Sua senha"
                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
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
