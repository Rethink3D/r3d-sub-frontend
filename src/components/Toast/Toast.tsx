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

const containerStyles = {
  success: "border-l-green-500 dark:border-l-green-500",
  error: "border-l-red-500 dark:border-l-red-500",
  warning: "border-l-yellow-500 dark:border-l-yellow-500",
  info: "border-l-blue-500 dark:border-l-blue-500",
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
        relative w-full p-4 rounded-lg shadow-lg border-l-4 border-y border-r border-gray-100 dark:border-gray-700
        bg-white dark:bg-[#1a1a1a] 
        text-gray-900 dark:text-gray-100
        flex flex-col gap-2
        pointer-events-auto
        transform transition-all duration-300 ease-out
        ${containerStyles[type]}
        ${
          isClosing
            ? "opacity-0 translate-y-2 md:translate-x-full"
            : "opacity-100 translate-y-0 md:translate-x-0 animate-fade-in-up"
        }
      `}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 pt-0.5">{icons[type]}</div>

        <div className="flex-1 pr-6">
          {title && <h3 className="font-bold text-sm mb-1">{title}</h3>}
          <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
            {message}
          </p>
        </div>

        {!isActionable && (
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-1 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {isActionable && (
        <div className="flex justify-end gap-3 mt-2 pl-9">
          <button
            onClick={handleClose}
            className="px-3 py-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {cancelLabel}
          </button>
          <button
            onClick={handleConfirm}
            className={`px-3 py-1.5 text-sm rounded-md font-bold text-white shadow-sm transition-opacity hover:opacity-90
              ${type === "error" ? "bg-red-600" : "bg-blue-600"}
            `}
          >
            {confirmLabel}
          </button>
        </div>
      )}

      {!isActionable && !isClosing && duration > 0 && (
        <div className="absolute bottom-0 left-0 h-1 w-full rounded-b-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
          <div
            className={`h-full origin-left animate-toast-progress ${
              type === "error"
                ? "bg-red-500"
                : type === "success"
                ? "bg-green-500"
                : type === "warning"
                ? "bg-yellow-500"
                : "bg-blue-500"
            }`}
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      )}
    </div>
  );
};
