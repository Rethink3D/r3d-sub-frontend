import { useEffect, useState, useMemo } from "react";
import { CloseIcon, LoadingSpinner } from "./Icons";
import { getMakers } from "../../../services/api";
import { Maker, MakerStatusEnum } from "../../../types/types";
import DemandMakerCard from "./DemandMakerCard";

interface RequestPrintDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onMakerSelect: (maker: Maker) => void;
}

const RequestPrintDrawer: React.FC<RequestPrintDrawerProps> = ({
  isOpen,
  onClose,
  onMakerSelect,
}) => {
  const [makers, setMakers] = useState<Maker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (makers.length === 0) {
        setIsLoading(true);
        getMakers()
          .then((data) => {
            setMakers(data);
            setError(null);
          })
          .catch(() =>
            setError("Não foi possível carregar os Makers no momento.")
          )
          .finally(() => setIsLoading(false));
      }
      const timer = setTimeout(() => setIsShowing(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsShowing(false);
    }
  }, [isOpen, makers.length]);

  const onDemandMakers = useMemo(() => {
    return makers.filter(
      (maker) => 
        maker.acceptsPersonalization && 
        maker.status === MakerStatusEnum.ACTIVE
    );
  }, [makers]);

  if (!isOpen && !isShowing) {
    return null;
  }

  const handlePanelClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div role="dialog" aria-modal="true">
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          isShowing ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      ></div>
      <div
        onClick={handlePanelClick}
        className={`fixed top-0 right-0 h-full w-full max-w-xs bg-gray-100 
        dark:bg-black text-texto-principal shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
          isShowing ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 flex-shrink-0">
            <h2 className="text-2xl font-bold text-texto-principal">
              Escolha um maker
            </h2>
            <button
              onClick={onClose}
              className="text-texto-secundario hover:text-texto-principal"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="p-4 overflow-y-auto flex-grow custom-scrollbar">
            {isLoading && (
              <div className="flex justify-center items-center h-full">
                <LoadingSpinner />
              </div>
            )}
            {error && <p className="text-red-500 text-center">{error}</p>}
            {!isLoading && !error && (
              <div className="space-y-4">
                {onDemandMakers.length > 0 ? (
                  onDemandMakers.map((maker) => (
                    <DemandMakerCard
                      key={maker.id}
                      maker={maker}
                      onSelect={onMakerSelect}
                    />
                  ))
                ) : (
                  <p className="text-texto-secundario text-center mt-8">
                    Nenhum maker ativo que aceita pedidos sob demanda foi encontrado.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestPrintDrawer;
