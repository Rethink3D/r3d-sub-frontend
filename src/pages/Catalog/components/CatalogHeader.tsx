import CustomSelect from "./CustomSelect";
import { SearchIcon } from "./Icons";

interface CatalogHeaderProps {
  searchInput: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOptions: { value: string; label: string }[];
}

const CatalogHeader: React.FC<CatalogHeaderProps> = ({
  searchInput,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOptions,
}) => (
  <div className="flex flex-nowrap items-center mb-8">
    <div className="relative w-[60%] md:w-[80%]">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <SearchIcon />
      </span>
      <input
        type="text"
        placeholder="Buscar produtos..."
        value={searchInput}
        onChange={(e) => onSearchChange(e.target.value)}
        className="bg-gray-100 dark:bg-[#1a1a1a] w-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
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

export default CatalogHeader;
