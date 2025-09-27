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

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        placeholder="Busque por produtos ou makers..."
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="bg-gray-100 dark:bg-[#1a1a1a] w-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-3 pl-4 pr-10 focus:outline-none focus:border-[#00c6ff] hover:shadow-[0_0_15px_rgba(0,198,255,0.5)] focus:shadow-[0_0_15px_rgba(0,198,255,0.5)] transition-all duration-300"
      />
      <button
        type="submit"
        aria-label="Buscar"
        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-[#00c6ff] transition-colors"
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default HomeSearch;
