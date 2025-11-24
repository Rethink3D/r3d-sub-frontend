import { MakerPayload } from "./types";

export type RegistrationForm = Omit<MakerPayload, "status" | "categoryIds"> & {
  email: string;
  password: string;
  confirmPassword: string;
  profileImageFile: File | null;
  categoryIds: Set<string>;
  cpf: string;
};

export interface MakerRegistrationState {
  currentStep: number;
  formData: RegistrationForm;
  error: string | null;
  isSubmitting: boolean;
  isGoogleFlow: boolean;
}

export interface BaseRegistrationStepProps {
  formData: RegistrationForm;
  updateFormData: <K extends keyof RegistrationForm>(
    field: K,
    value: RegistrationForm[K]
  ) => void;
  nextStep?: () => void;
  prevStep?: () => void;
  isSubmitting?: boolean;
  error?: string | null;
}

export interface Step1Props extends BaseRegistrationStepProps {
  handleGoogleLogin: () => void;
  nextStep: () => void;
}

export interface Step4Props extends BaseRegistrationStepProps {
  handleSubmit: () => void;
}
