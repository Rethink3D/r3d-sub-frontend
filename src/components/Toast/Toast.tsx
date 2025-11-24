import React, { useEffect, useState } from "react";
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from "lucide-react";
import { ToastState } from "../../types/toast";

interface ToastProps {
  toast: ToastState;
  onRemove: (id: string) => void;
}

const icons = {
  success: <CheckCircle className="w-6 h-6 text-green-500" />,
  error: <AlertCircle className="w-6 h-6 text-red-500" />,
  warning: <AlertTriangle className="w-6 h-6 text-yellow-500" />,
  info: <Info className="w-6 h-6 text-blue-500" />,
};

const borderColors = {
  success: "border-green-500/50",
  error: "border-red-500/50",
  warning: "border-yellow-500/50",
  info: "border-blue-500/50",
};

export const Toast: React.FC<ToastProps> = ({ toast, onRemove }) => {
  const {
    id,
    type = "info",
    title,
    message,
    duration = 5000,
    onConfirm,
    confirmLabel = "Confirmar",
    cancelLabel = "Cancelar",
  } = toast;

  const [isClosing, setIsClosing] = useState(false);
  const isActionable = !!onConfirm;

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onRemove(id), 300);
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm();
    handleClose();
  };

  useEffect(() => {
    if (!isActionable) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, isActionable]);

  return (
    <div
      className={`
        relative w-full max-w-md p-4 rounded-lg shadow-lg border-l-4
        bg-fundo-secundario text-texto-principal border-borda
        flex flex-col gap-2
        transition-all duration-300 ease-in-out
        pointer-events-auto  {/* <--- ADICIONE ESTA LINHA AQUI */}
        ${borderColors[type]}
        ${
          isClosing
            ? "animate-out fade-out slide-out-to-right"
            : "animate-in fade-in slide-in-from-right"
        }
      `}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-0.5">{icons[type]}</div>

        <div className="flex-1 pr-6">
          {title && <h3 className="font-semibold text-sm mb-1">{title}</h3>}
          <p className="text-sm text-texto-secundario leading-relaxed">
            {message}
          </p>
        </div>

        {!isActionable && (
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1 rounded-md text-texto-secundario hover:text-texto-principal hover:bg-fundo-hover transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isActionable && (
        <div className="flex justify-end gap-3 mt-2 pl-9">
          <button
            onClick={handleClose}
            className="px-3 py-1.5 text-sm text-texto-secundario hover:text-texto-principal hover:underline transition-all"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-3 py-1.5 text-sm rounded-md font-medium text-white transition-opacity hover:opacity-90
              ${type === "error" ? "bg-red-600" : "bg-cor-primaria"}
            `}
          >
            {confirmLabel}
          </button>
        </div>
      )}

      {!isActionable && !isClosing && duration > 0 && (
        <div className="absolute bottom-0 left-0 h-1 bg-fundo-hover w-full rounded-b-lg overflow-hidden">
          <div
            className="h-full bg-cor-primaria/60 origin-left animate-toast-progress"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      )}
    </div>
  );
};
