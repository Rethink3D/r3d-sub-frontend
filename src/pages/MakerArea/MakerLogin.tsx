import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LoadingSpinner } from "../Catalog/components/Icons"; 

export const MakerLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // --- Simulação de API/Firebase (2 segundos) ---
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      // Lógica de simulação
      if (password.toLowerCase() === "erro") {
        throw new Error("Usuário ou senha inválidos. (Simulação)");
      }

      // --- SUCESSO (Simulado) ---
      console.log("Simulando login com:", { email, password });
      
      // 1. AQUI entraria a chamada do Firebase:
      //    const userCredential = await signInWithEmailAndPassword(auth, email, password);
      //    const token = await userCredential.user.getIdToken();
      
      // 2. Por enquanto, salvamos um token FALSO para proteger as rotas
      localStorage.setItem("makerAuthToken", "mock_firebase_jwt_token");

      // 3. Redireciona para o dashboard do maker
      navigate("/maker/dashboard");

    } catch (err: any) {
      // --- ERRO (Simulado) ---
      console.error(err);
      setError(err.message || "Falha ao tentar logar.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-fundo-principal text-texto-principal p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-fundo-secundario shadow-lg rounded-2xl p-8 md:p-10 border border-borda">
          <h1 className="text-3xl font-bold text-center mb-6">
            Acessar sua Conta
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu.email@exemplo.com"
                className="w-full px-4 py-3 border border-borda rounded-lg text-texto-principal bg-fundo-principal focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
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

            {/* Link "Esqueci a senha" (funcionalidade futura) */}
            <div className="text-right">
              <Link 
                to="#" 
                className="text-sm text-blue-500 hover:underline"
                onClick={(e) => { e.preventDefault(); alert("Feature: 'Esqueci a senha' - (Em breve!)"); }}
              >
                Esqueceu a senha?
              </Link>
            </div>

            {/* Botão de Entrar */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <LoadingSpinner className="w-5 h-5" />
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          {/* Link para Cadastro */}
          <div className="text-center mt-6 pt-4 border-t border-borda">
            <p className="text-texto-secundario">
              Não tem uma conta?{" "}
              <Link to="/maker/register" className="font-bold text-blue-500 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};