import { useState } from "react";

interface MakerDescriptionProps {
  description: string;
}

const MakerDescription: React.FC<MakerDescriptionProps> = ({ description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLongDescription = description.length > 200;

  return (
    <div className="text-center md:text-left w-full">
      <p
        className={`text-gray-700 dark:text-gray-300 transition-all duration-300 break-all whitespace-pre-wrap ${
          !isExpanded && isLongDescription ? "line-clamp-3" : ""
        }`}
      >
        {description}
      </p>
      {isLongDescription && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 hover:text-blue-400 font-semibold text-sm mt-2"
        >
          {isExpanded ? "Ver menos" : "Ver mais"}
        </button>
      )}
    </div>
  );
};

export default MakerDescription;
