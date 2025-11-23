import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase-config";
import { LoadingSpinner } from "../Catalog/components/Icons";

export const MakerForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage({
        type: "success",
        text: "Email de recuperação enviado! Verifique sua caixa de entrada (e spam).",
      });
      setEmail(""); 
    } catch (error: any) {
      console.error("Erro ao enviar email de recuperação:", error);
      let errorMsg = "Falha ao enviar email. Tente novamente.";
      
      if (error.code === "auth/user-not-found") {
        errorMsg = "Não existe conta cadastrada com este email.";
      } else if (error.code === "auth/invalid-email") {
        errorMsg = "Email inválido.";
      }

      setMessage({
        type: "error",
        text: errorMsg,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-fundo-principal text-texto-principal p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="bg-fundo-secundario shadow-lg rounded-2xl p-8 md:p-10 border border-borda">
          <h1 className="text-3xl font-bold text-center mb-4">
            Recuperar Senha
          </h1>
          <p className="text-texto-secundario text-center mb-8">
            Digite seu email para receber um link de redefinição de senha.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-texto-principal mb-2">
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

            {message && (
              <div className={`text-sm text-center p-3 rounded ${
                message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner className="w-5 h-5" /> : "Enviar Link"}
            </button>
          </form>

          <div className="text-center mt-6 pt-4 border-t border-borda">
            <Link to="/maker/login" className="text-blue-500 hover:underline text-sm font-medium">
              &larr; Voltar para o Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
