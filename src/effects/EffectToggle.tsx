import React from "react";
import { useEffects } from "../context/EffectContext";
import { Wand2 } from "lucide-react"; 

interface EffectToggleProps {
  variant?: "floating" | "menuItem";
  onClick?: () => void;
}

export const EffectToggle: React.FC<EffectToggleProps> = ({ 
  variant = "floating", 
  onClick 
}) => {
  const { isSnowEnabled, toggleSnow } = useEffects();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSnow();
    if (onClick) onClick();
  };

  if (variant === "menuItem") {
    return (
      <button
        onClick={handleClick}
        className="px-4 py-2 hover:bg-gray-50 dark:hover:bg-[#252525] text-left font-medium text-gray-700 dark:text-gray-200 flex items-center gap-3 transition-colors w-full"
        role="menuitem"
      >
        <div className="relative flex items-center justify-center w-5 h-5">
           <Wand2 className={`w-5 h-5 transition-colors ${isSnowEnabled ? "text-blue-500" : "text-gray-400"}`} />
        </div>
        <span>
          {isSnowEnabled ? "Desativar Neve" : "Ativar Neve"}
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleSnow}
      className={`
        fixed bottom-6 right-6 z-30 p-3 rounded-full shadow-lg transition-all duration-300
        border border-gray-200 dark:border-gray-700
        ${isSnowEnabled 
          ? "bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/30" 
          : "bg-white dark:bg-gray-800 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        }
      `}
      title={isSnowEnabled ? "Desativar efeito de neve" : "Ativar efeito de neve"}
    >
      <div className="relative">
        <Wand2 className="w-6 h-6" />
        {!isSnowEnabled && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="relative inline-flex rounded-full h-3 w-3 bg-gray-400"></span>
          </span>
        )}
      </div>
    </button>
  );
};