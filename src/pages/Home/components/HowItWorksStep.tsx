import React from "react";

const HowItWorksStep: React.FC<{
  step: number;
  title: string;
  description: string;
}> = ({ step, title, description }) => {
  return (
    <div className="dark:bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 text-center">
      <div className="mb-4 text-3xl font-bold text-blue-500">0{step}</div>
      <h3 className="text-xl font-bold text-texto-principal mb-2">{title}</h3>
      <p className="text-texto-secundario">{description}</p>
    </div>
  );
};

export default HowItWorksStep;