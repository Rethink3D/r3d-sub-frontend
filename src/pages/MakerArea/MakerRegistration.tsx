import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MakerPayload, Category } from "../../types/types";
import { Stepper } from "./Stepper";
import { Step1Account } from "./steps/Step1Account";
import { Step2Profile } from "./steps/Step2Profile";
import { Step3Contacts } from "./steps/Step3Contacts";
import { Step4Categories } from "./steps/Step4Categories";
import { MakerStatusEnum } from "../../types/types"; 
import { 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
} from "firebase/auth";
import { auth } from "../../firebase-config";

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
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationForm>({
    // Step 1
    email: "",
    password: "",
    confirmPassword: "",
    // Step 2
    name: "",
    description: "",
    acceptsPersonalization: false,
    profileImageFile: null,
    // Step 3
    contacts: [{ type: "EMAIL", contactInfo: "" }],
    // Step 4
    categoryIds: new Set<string>(),
  });

  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nextStep = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = (
    field: keyof RegistrationForm,
    value: any
  ) => {
    setError(null); 
    setFormData((prev) => {
      if (field === "email" && prev.contacts.length === 1 && prev.contacts[0].contactInfo === "") {
        return {
          ...prev,
          [field]: value,
          contacts: [{ type: "EMAIL", contactInfo: value }],
        };
      }
      return { ...prev, [field]: value };
    });
  };

  const handleGoogleLoginAndRegister = async () => {
    setIsSubmitting(true);
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      
      if (result.user.email) {
        updateFormData("email", result.user.email);
      }
      if (result.user.displayName) {
        updateFormData("name", result.user.displayName);
      }
      
      //console.log("Usuário autenticado com Google:", result.user.uid);
      
      nextStep(); 
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
    let user: any; 

    try {
      if (auth.currentUser && auth.currentUser.email === formData.email) {
        console.log("Usuário já logado com Google. Pegando token...");
        user = auth.currentUser;
        token = await user.getIdToken();
      } else {
        console.log("Criando novo usuário com Email/Senha...");
        userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        user = userCredential.user;
        token = await user.getIdToken();
      }
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

      // ... (TODO da imagem de perfil)

      localStorage.setItem("makerAuthToken", token);
      setIsSubmitting(false);
      alert("Cadastro realizado com sucesso!");
      navigate("/maker/dashboard");

    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      
      if (userCredential) {
        console.warn("Rollback: Deletando usuário órfão do Firebase...");
        await userCredential.user.delete();
      }

      if (error.code === 'auth/email-already-in-use') {
        setError("Este email já está em uso.");
        setCurrentStep(1);
      } else if (error.code === 'auth/weak-password') {
        setError("A senha é muito fraca.");
        setCurrentStep(1);
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
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Torne-se um Maker
        </h1>
        
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