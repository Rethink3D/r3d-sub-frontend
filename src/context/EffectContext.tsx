import React, { createContext, useContext, useState, useEffect } from "react";

interface EffectContextType {
  isSnowEnabled: boolean;
  toggleSnow: () => void;
}

const EffectContext = createContext<EffectContextType | undefined>(undefined);

export const EffectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSnowEnabled, setIsSnowEnabled] = useState(() => {
    const saved = localStorage.getItem("r3d_snow_enabled");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const toggleSnow = () => {
    setIsSnowEnabled((prev: boolean) => {
      const newValue = !prev;
      localStorage.setItem("r3d_snow_enabled", JSON.stringify(newValue));
      return newValue;
    });
  };

  return (
    <EffectContext.Provider value={{ isSnowEnabled, toggleSnow }}>
      {children}
    </EffectContext.Provider>
  );
};

export const useEffects = () => {
  const context = useContext(EffectContext);
  if (!context) throw new Error("useEffects must be used within EffectProvider");
  return context;
};