import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  deleteUser,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { uploadMyProfileImage } from "../services/api";
import { RegistrationForm } from "../types/registration";
import { useToast } from "../context/ToastContext";
import { translateBackendError } from "../utils/translateApiRegisterError";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const STEPS_COUNT = 4;

export const useMakerRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToast();
  const { executeRecaptcha } = useGoogleReCaptcha();

  const googleState = location.state as {
    fromGoogleLogin?: boolean;
    email?: string;
    name?: string;
  } | null;

  const isGoogleFlow = !!googleState?.fromGoogleLogin;

  const [currentStep, setCurrentStep] = useState(isGoogleFlow ? 2 : 1);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<RegistrationForm>({
    email: googleState?.email || "",
    password: "",
    confirmPassword: "",
    name: googleState?.name || "",
    cpf: "",
    description: "",
    acceptsPersonalization: false,
    profileImageFile: null,
    contacts: [{ type: "EMAIL", contactInfo: googleState?.email || "" }],
    categoryIds: new Set<string>(),
  });

  useEffect(() => {
    if (
      !isGoogleFlow &&
      formData.contacts.length === 1 &&
      formData.contacts[0].type === "EMAIL"
    ) {
      setFormData((prev) => {
        if (prev.contacts[0].contactInfo !== prev.email) {
          const newContacts = [...prev.contacts];
          newContacts[0].contactInfo = prev.email;
          return { ...prev, contacts: newContacts };
        }
        return prev;
      });
    }
  }, [formData.email, isGoogleFlow]);

  const updateFormData = <K extends keyof RegistrationForm>(
    field: K,
    value: RegistrationForm[K]
  ) => {
    setError(null);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS_COUNT) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (isGoogleFlow && currentStep === 2) {
      handleCancelRegistration();
      return;
    }
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleCancelRegistration = () => {
    addToast({
      type: "warning",
      title: "Cancelar cadastro?",
      message: isGoogleFlow
        ? "Se cancelar agora, sua conta Google será desconectada e os dados perdidos."
        : "Tem certeza que deseja desistir do cadastro?",
      confirmLabel: "Sim, cancelar",
      cancelLabel: "Voltar",
      duration: 10000,
      onConfirm: async () => {
        try {
          if (isGoogleFlow && auth.currentUser) {
            await deleteUser(auth.currentUser);
            addToast({ type: "info", message: "Cadastro cancelado." });
          } else {
            await signOut(auth);
          }
        } catch (err) {
          console.error("Erro ao limpar usuário:", err);
        } finally {
          navigate("/");
        }
      },
    });
  };

  const handleGoogleLoginAndRegister = async () => {
    setIsSubmitting(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setFormData((prev) => ({
        ...prev,
        email: result.user.email || "",
        name: result.user.displayName || "",
        contacts:
          prev.contacts[0].type === "EMAIL"
            ? [
                {
                  type: "EMAIL",
                  contactInfo: result.user.email || "",
                },
              ]
            : prev.contacts,
      }));
      setCurrentStep(2);
    } catch (error: any) {
      if (error.code !== "auth/popup-closed-by-user") {
        console.error("Erro no cadastro com Google:", error);
        addToast({
          type: "error",
          title: "Erro no Google",
          message: "Falha ao conectar com o Google. Tente novamente.",
        });
        setError("Falha ao cadastrar com o Google. Tente novamente.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (): boolean => {
    if (!formData.description || formData.description.trim().length < 10) {
      const msg =
        "Por favor, escreva uma descrição com pelo menos 10 caracteres.";
      setError(msg);
      addToast({ type: "warning", title: "Descrição Curta", message: msg });
      return false;
    }
    if (formData.categoryIds.size === 0) {
      const msg = "Selecione pelo menos uma categoria de especialidade.";
      setError(msg);
      addToast({ type: "warning", title: "Categorias", message: msg });
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    if (!executeRecaptcha) {
      addToast({
        type: "warning",
        title: "Erro no Sistema",
        message: "O reCAPTCHA não foi inicializado corretamente.",
      });
      return;
    }

    setIsSubmitting(true);
    setError(null);

    let userCredential: UserCredential | null = null;
    let token: string;

    try {
      const recaptchaToken = await executeRecaptcha("maker_registration");

      if (auth.currentUser) {
        token = await auth.currentUser.getIdToken();
      } else {
        userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        token = await userCredential.user.getIdToken();
      }

      const makerApiPayload = {
        name: formData.name,
        cpf: formData.cpf,
        description: formData.description,
        acceptsPersonalization: formData.acceptsPersonalization,
        contacts: formData.contacts.filter((c) => c.contactInfo.trim() !== ""),
        categoryIds: Array.from(formData.categoryIds),
        recaptchaToken,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/auth/maker/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(makerApiPayload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        const rawMessage = Array.isArray(errorData.message)
          ? errorData.message.join(", ")
          : errorData.message;
        throw new Error(
          rawMessage || "Falha ao registrar o perfil no backend."
        );
      }

      const createdMaker = await response.json();

      if (formData.profileImageFile) {
        try {
          await uploadMyProfileImage(
            createdMaker.id,
            formData.profileImageFile
          );
        } catch (imgErr) {
          console.error("Erro ao enviar imagem de perfil:", imgErr);
          addToast({
            type: "warning",
            title: "Atenção",
            message: "Perfil criado, mas houve um erro ao enviar a foto.",
          });
        }
      }

      addToast({
        type: "success",
        title: "Bem-vindo!",
        message: "Seu cadastro de Maker foi realizado com sucesso.",
        duration: 4000,
      });
      navigate("/maker/dashboard");
    } catch (error: any) {
      console.error("Erro no cadastro:", error);

      if (auth.currentUser) {
        try {
          await deleteUser(auth.currentUser);
        } catch (delErr) {
          console.error("Falha crítica: Rollback falhou.", delErr);
        }
      }

      let errorMsg = "Ocorreu um erro ao registrar. Tente novamente.";
      if (error.code === "auth/email-already-in-use") {
        errorMsg = "Este email já está em uso.";
        if (!isGoogleFlow) setCurrentStep(1);
      } else if (error.code === "auth/weak-password") {
        errorMsg = "A senha é muito fraca.";
        if (!isGoogleFlow) setCurrentStep(1);
      } else if (error.message) {
        errorMsg = translateBackendError(error.message);
      }

      setError(errorMsg);

      addToast({
        type: "error",
        title: "Erro no Cadastro",
        message: errorMsg,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentStep,
    formData,
    error,
    isSubmitting,
    updateFormData,
    nextStep,
    prevStep,
    handleCancelRegistration,
    handleGoogleLoginAndRegister,
    handleSubmit,
  };
};
