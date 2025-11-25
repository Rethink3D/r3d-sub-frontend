import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { ToastOptions, ToastState } from "../types/toast";
import { Toast } from "../components/Toast/Toast";

export interface ToastContextData {
  addToast: (options: ToastOptions) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextData | null>(null);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((state) => state.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(({ id, ...options }: ToastOptions) => {
    const toastId = id || uuidv4();

    const newToast: ToastState = {
      id: toastId,
      ...options,
    };

    setToasts((state) => [newToast, ...state]);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <div className="fixed z-[9999] flex flex-col gap-3 w-full max-w-md p-4 pointer-events-none transition-all duration-300 bottom-0 left-1/2 -translate-x-1/2 md:translate-x-0 md:bottom-auto md:left-auto md:top-4 md:right-4 items-center md:items-end">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onRemove={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextData => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }

  return context;
};
