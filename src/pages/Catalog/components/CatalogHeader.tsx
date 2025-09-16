import CustomSelect from "./CustomSelect";
import { SearchIcon } from "./Icons";

interface CatalogHeaderProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOptions: { value: string; label: string }[];
}

const CatalogHeader: React.FC<CatalogHeaderProps> = ({
  searchInput,
  onSearchChange,
  onSearchSubmit,
  sortBy,
  onSortChange,
  sortOptions,
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onSearchSubmit();
    }
  };

  return (
    <div className="flex flex-nowrap items-center mb-8">
      <div className="relative w-[60%] md:w-[80%]">
        <input
          type="text"
          placeholder="Buscar produtos..."
          value={searchInput}
          onChange={(e) => onSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="bg-gray-100 dark:bg-[#1a1a1a] w-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-2.5 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onSearchSubmit}
          className="absolute inset-y-0 right-0 flex items-center justify-center w-10 text-gray-500 hover:text-blue-500 dark:hover:text-blue-400"
          aria-label="Buscar"
        >
          <SearchIcon />
        </button>
      </div>
      <div className="w-[40%] md:w-[20%] ml-2">
        <CustomSelect
          options={sortOptions}
          value={sortBy}
          onChange={onSortChange}
        />
      </div>
    </div>
  );
};

export default CatalogHeader;
