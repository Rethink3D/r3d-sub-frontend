import { useState } from "react";
import { SearchIcon } from "../../../Catalog/components/Icons";

interface HomeSearchProps {
  onSearch: (searchTerm: string) => void;
}

const HomeSearch: React.FC<HomeSearchProps> = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon />
      </span>
      <input
        type="text"
        placeholder="Busque por produtos ou makers..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="bg-gray-100 dark:bg-[#1a1a1a] w-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
      />
    </form>
  );
};

export default HomeSearch;
