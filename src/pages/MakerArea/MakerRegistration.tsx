import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MakerPayload, MakerStatusEnum } from "../../types/types";
import { Stepper } from "./Stepper";
import { Step1Account } from "./steps/Step1Account";
import { Step2Profile } from "./steps/Step2Profile";
import { Step3Contacts } from "./steps/Step3Contacts";
import { Step4Categories } from "./steps/Step4Categories";
import { 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  deleteUser,
  signOut
} from "firebase/auth";
import { auth } from "../../firebase-config";
import { uploadMyProfileImage } from "../../services/api"; // <--- Importar a nova função

type RegistrationForm = Omit<MakerPayload, "status" | "categoryIds"> & {
  email: string;
  password: string;
  confirmPassword: string;
  profileImageFile: File | null;
  categoryIds: Set<string>;
};

const STEPS = ["Conta", "Perfil", "Contatos", "Categorias"];

export const MakerRegistration: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const googleState = location.state as { fromGoogleLogin?: boolean; email?: string; name?: string } | null;
  const isGoogleFlow = !!googleState?.fromGoogleLogin;

  const [currentStep, setCurrentStep] = useState(isGoogleFlow ? 2 : 1);

  const [formData, setFormData] = useState<RegistrationForm>({
    email: googleState?.email || "",
    password: "",
    confirmPassword: "",
    name: googleState?.name || "",
    description: "",
    acceptsPersonalization: false,
    profileImageFile: null,
    contacts: [{ type: "EMAIL", contactInfo: googleState?.email || "" }],
    categoryIds: new Set<string>(),
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isGoogleFlow && formData.contacts.length === 1 && formData.contacts[0].type === "EMAIL") {
       setFormData(prev => {
         if (prev.contacts[0].contactInfo !== prev.email) {
            const newContacts = [...prev.contacts];
            newContacts[0].contactInfo = prev.email;
            return { ...prev, contacts: newContacts };
         }
         return prev;
       });
    }
  }, [formData.email, isGoogleFlow]);

  const nextStep = () => {
    if (currentStep < STEPS.length) setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    if (isGoogleFlow && currentStep === 2) {
        handleCancelRegistration();
        return;
    }
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
  };

  const updateFormData = (field: keyof RegistrationForm, value: any) => {
    setError(null);
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCancelRegistration = async () => {
    if (!window.confirm("Deseja cancelar o cadastro? Se você veio pelo Google, sua conta será desconectada.")) {
        return;
    }

    try {
        if (isGoogleFlow && auth.currentUser) {
            await deleteUser(auth.currentUser);
        } else {
            await signOut(auth);
        }
    } catch (err) {
        console.error("Erro ao limpar usuário:", err);
    } finally {
        navigate("/");
    }
  };

  const handleGoogleLoginAndRegister = async () => {
    setIsSubmitting(true);
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      
      setFormData(prev => ({
          ...prev,
          email: result.user.email || "",
          name: result.user.displayName || "",
          contacts: prev.contacts[0].type === "EMAIL" 
            ? [{ type: "EMAIL", contactInfo: result.user.email || "" }] 
            : prev.contacts
      }));
      
      setCurrentStep(2); 
      setIsSubmitting(false);
    } catch (error: any) {
      if (error.code === 'auth/popup-closed-by-user') {
        setIsSubmitting(false);
        return;
      }
      console.error("Erro no cadastro com Google:", error);
      setError("Falha ao cadastrar com o Google. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    const makerApiPayload: MakerPayload = {
      name: formData.name,
      description: formData.description,
      acceptsPersonalization: formData.acceptsPersonalization,
      status: MakerStatusEnum.ACTIVE,
      contacts: formData.contacts.filter((c) => c.contactInfo.trim() !== ""),
      categoryIds: Array.from(formData.categoryIds),
    };

    let userCredential: UserCredential | null = null;
    let token: string;

    try {
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

      // 1. Registra o Perfil (JSON)
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/maker/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(makerApiPayload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao registrar o perfil no backend.");
      }

      const createdMaker = await response.json();

      // 2. Salva o token (Importante para o upload funcionar)
      localStorage.setItem("makerAuthToken", token);

      // 3. Upload da Imagem (se existir)
      if (formData.profileImageFile) {
        try {
            await uploadMyProfileImage(createdMaker.id, formData.profileImageFile);
        } catch (imgErr) {
            console.error("Erro ao enviar imagem de perfil (não crítico):", imgErr);
            // Não lançamos erro aqui para não bloquear o cadastro, a imagem pode falhar mas o cadastro existir
        }
      }

      setIsSubmitting(false);
      alert("Cadastro realizado com sucesso!");
      navigate("/maker/dashboard");

    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      
      if (auth.currentUser) {
          try {
            // Se falhou o registro no SQL, deleta do Firebase para não ficar inconsistente
            // (A menos que seja um usuário Google antigo, mas aqui assumimos fluxo novo)
            await deleteUser(auth.currentUser); 
          } catch (delErr) {
            console.error("Falha crítica: Não foi possível fazer rollback do usuário Firebase.", delErr);
          }
      }

      if (error.code === 'auth/email-already-in-use') {
        setError("Este email já está em uso.");
        if (!isGoogleFlow) setCurrentStep(1);
      } else if (error.code === 'auth/weak-password') {
        setError("A senha é muito fraca.");
        if (!isGoogleFlow) setCurrentStep(1);
      } else {
        setError(error.message || "Ocorreu um erro ao registrar. Tente novamente.");
      }
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Account
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            handleGoogleLogin={handleGoogleLoginAndRegister}
            isSubmitting={isSubmitting}
          />
        );
      case 2:
        return (
          <Step2Profile
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 3:
        return (
          <Step3Contacts
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );
      case 4:
        return (
          <Step4Categories
            formData={formData}
            updateFormData={updateFormData}
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            isSubmitting={isSubmitting}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-fundo-principal text-texto-principal p-4">
      <div className="w-full max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold">
            Torne-se um Maker
            </h1>
            <button 
                onClick={handleCancelRegistration}
                className="text-sm text-red-500 hover:underline"
            >
                Cancelar
            </button>
        </div>
        
        <div className="px-4 md:px-8 mb-8">
          <Stepper steps={STEPS} currentStep={currentStep} />
        </div>

        <div className="bg-fundo-secundario shadow-lg rounded-2xl p-6 md:p-10 border border-borda">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};