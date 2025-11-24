import React from "react";
import styles from "../MakerRegistration.module.css";

interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isCompleted = stepNumber < currentStep;

        return (
          <React.Fragment key={stepNumber}>
            <div className="flex flex-col items-center text-center">
              <div
                className={`
                  ${styles.stepIndicator}
                  ${isActive ? styles.active : ""}
                  ${isCompleted ? styles.completed : ""}
                `}
              >
                {isCompleted ? "✔" : stepNumber}
              </div>
              <span
                className={`
                  text-xs sm:text-sm mt-2 font-medium
                  ${isActive ? "text-blue-500" : "text-texto-secundario"}
                  ${isCompleted ? "text-green-500" : ""}
                `}
              >
                {label}
              </span>
            </div>

            {stepNumber < steps.length && (
              <div
                className={`
                  ${styles.stepLine}
                  ${isCompleted ? styles.completed : ""}
                `}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
