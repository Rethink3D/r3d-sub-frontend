import { useState, useRef, useEffect } from "react";

const ChevronIcon = ({ rotated }: { rotated: boolean }) => (
  <svg
    className={`w-5 h-5 text-black dark:text-white transition-transform ${
      rotated ? "rotate-180" : "rotate-0"
    }`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);
  const selectedOption = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={selectRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 bg-gray900 dark:bg-gray-900 text-texto-principal dark:text-white 
        hover:bg-[#8c52ff] hover:text-white cursor-pointer transition-colors 
        rounded-lg w-full flex justify-between items-center border border-gray-300 
        dark:border-gray-700 py-3"
      >
        <span className="text-sm">{selectedOption?.label}</span>
        <ChevronIcon rotated={isOpen} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 border border-borda rounded-lg shadow-lg z-10 overflow-hidden">
          <ul>
            {options.map((option) => (
              <li
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className="px-4 py-2 text-sm hover:bg-sky-700 hover:text-white cursor-pointer transition-colors"
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
