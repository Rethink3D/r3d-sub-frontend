import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  AuthError,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { getMyMakerProfile } from "../services/api";
import { useToast } from "../context/ToastContext";

export const useMakerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { addToast } = useToast();

  const checkProfileAndRedirect = async () => {
    try {
      await getMyMakerProfile();

      addToast({
        type: "success",
        title: "Bem-vindo de volta!",
        message: "Login realizado com sucesso.",
        duration: 3000,
      });

      navigate("/maker/dashboard");
    } catch (err) {
      addToast({
        type: "info",
        title: "Complete seu cadastro",
        message:
          "Não encontramos um perfil associado. Redirecionando para criação...",
        duration: 5000,
      });

      navigate("/maker/register", {
        state: {
          fromGoogleLogin: true,
          email: auth.currentUser?.email,
          name: auth.currentUser?.displayName,
        },
      });
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken();
      localStorage.setItem("makerAuthToken", token);

      await checkProfileAndRedirect();
    } catch (error: any) {
      if (error.code === "auth/popup-closed-by-user") {
        setIsLoading(false);
        return;
      }

      console.error("Erro no login com Google:", error);

      addToast({
        type: "error",
        title: "Erro no Login Google",
        message: "Não foi possível autenticar com o Google. Tente novamente.",
      });

      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      await checkProfileAndRedirect();
    } catch (error: any) {
      console.error("Erro no login:", error);
      const authError = error as AuthError;

      let errorMsg = "Falha ao tentar logar. Tente novamente.";

      if (
        authError.code === "auth/invalid-credential" ||
        authError.code === "auth/user-not-found" ||
        authError.code === "auth/wrong-password"
      ) {
        errorMsg = "E-mail ou senha incorretos.";
      } else if (authError.code === "auth/too-many-requests") {
        errorMsg = "Muitas tentativas. Aguarde alguns minutos.";
      }

      setError(errorMsg);

      if (
        authError.code !== "auth/invalid-credential" &&
        authError.code !== "auth/wrong-password"
      ) {
        addToast({
          type: "error",
          title: "Erro ao entrar",
          message: errorMsg,
        });
      }

      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    isLoading,
    handleGoogleLogin,
    handleSubmit,
  };
};
