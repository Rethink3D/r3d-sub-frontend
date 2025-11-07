import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MakerPayload, Category } from "../../types/types";
import { Stepper } from "./Stepper";
import { Step1Account } from "./steps/Step1Account";
import { Step2Profile } from "./steps/Step2Profile";
import { Step3Contacts } from "./steps/Step3Contacts";
import { Step4Categories } from "./steps/Step4Categories";
import { MakerStatusEnum } from "../../types/types"; 

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config";

// Tipo para o formulário completo, incluindo auth
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
    setError(null); // Limpa o erro ao digitar
    setFormData((prev) => {
      // Pré-popula o email no campo de contato se for a primeira vez
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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);

    // --- LÓGICA FUTURA ---
    // 1. Chamar o Firebase para criar o usuário com (formData.email, formData.password)
    //    const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
    //    const token = await userCredential.user.getIdToken();

    // 2. Preparar o payload para o seu backend NestJS
    const makerApiPayload: MakerPayload = {
      name: formData.name,
      description: formData.description,
      acceptsPersonalization: formData.acceptsPersonalization,
      status: MakerStatusEnum.ACTIVE, // O admin não define, mas o backend sim
      contacts: formData.contacts.filter((c) => c.contactInfo.trim() !== ""),
      categoryIds: Array.from(formData.categoryIds),
    };

    // 3. Chamar um NOVO ENDPOINT no backend (ex: /auth/maker/register)
    //    await registerMaker(makerApiPayload, token);

    // 4. Se tiver imagem, fazer o upload
    //    if (formData.profileImageFile && newMaker.id) {
    //      await uploadMakerProfileImage(newMaker.id, formData.profileImageFile);
    //    }

    // --- PROTÓTIPO ATUAL ---
    // Apenas simula o envio e exibe os dados no console
    console.log("--- DADOS DO FORMULÁRIO PARA ENVIO ---");
    console.log("Firebase Auth:", {
      email: formData.email,
      password: formData.password,
    });
    console.log("Payload Backend NestJS:", makerApiPayload);
    console.log("Arquivo de Imagem:", formData.profileImageFile);

    setTimeout(() => {
      // Simulação de erro (exemplo)
      if (formData.name.toLowerCase() === "erro") {
        setError("Ocorreu um erro simulado ao registrar o maker.");
        setIsSubmitting(false);
        return;
      }
      
      setIsSubmitting(false);
      alert("Cadastro realizado com sucesso (simulado)!");
      navigate("/"); // Redireciona para a home
    }, 2000);
  };
  
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1Account
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
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