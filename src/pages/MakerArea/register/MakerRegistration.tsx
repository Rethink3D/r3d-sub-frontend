import { Stepper } from "./subcomponents/Stepper";
import { Step1Account } from "./subcomponents/Step1Account";
import { Step2Profile } from "./subcomponents/Step2Profile";
import { Step3Contacts } from "./subcomponents/Step3Contacts";
import { Step4Categories } from "./subcomponents/Step4Categories";
import { useMakerRegistration } from "../../../hooks/useMakerRegistration";

const STEPS = ["Conta", "Perfil", "Contatos", "Categorias"];

export const MakerRegistration: React.FC = () => {
  const {
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
  } = useMakerRegistration();

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
        <div className="flex justify-center items-center mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold">Torne-se um Maker</h1>
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
