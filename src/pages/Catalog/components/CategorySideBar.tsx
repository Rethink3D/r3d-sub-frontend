import { Category } from "../../../types/types";
import { FilterIcon, CloseIcon } from "./Icons";

interface CategorySidebarProps {
  allCategories: Category[];
  categoryCounts: { [key: string]: number };
  selectedCategoryIds: string[];
  onCategoryClick: (id: string) => void;
  inDrawer?: boolean;
  onClose?: () => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  allCategories,
  categoryCounts,
  selectedCategoryIds,
  onCategoryClick,
  inDrawer = false,
  onClose,
}) => (
  <div
    className={
      !inDrawer
        ? "bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl p-6 sticky top-28"
        : ""
    }
  >
    <div
      className={`flex items-center justify-between mb-6 ${
        !inDrawer ? "" : "p-4 border-b border-gray-200 dark:border-gray-700"
      }`}
    >
      <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
        <FilterIcon /> Categorias
      </h2>
      {inDrawer && (
        <button onClick={onClose} className="text-gray-500 dark:text-gray-400">
          <CloseIcon />
        </button>
      )}
    </div>
    <ul className={`space-y-2 ${inDrawer ? "p-4" : ""}`}>
      <li>
        <button
          onClick={() => {
            onCategoryClick("Todos");
            if (inDrawer) onClose?.();
          }}
          className={`w-full flex justify-between items-center text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
            selectedCategoryIds.length === 0
              ? "bg-blue-500 text-white font-bold"
              : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
          }`}
        >
          <span>Todos</span>
          <span
            className={`text-sm rounded-full px-2 py-0.5 ${
              selectedCategoryIds.length === 0
                ? "bg-black/20"
                : "bg-gray-200 dark:bg-gray-700/50"
            }`}
          >
            {categoryCounts["Todos"]}
          </span>
        </button>
      </li>
      {allCategories.map((category) => {
        const isActive = selectedCategoryIds.includes(category.id);
        return (
          <li key={category.id}>
            <button
              onClick={() => {
                onCategoryClick(category.id);
                if (inDrawer) onClose?.();
              }}
              className={`w-full flex justify-between items-center text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
                isActive
                  ? "bg-blue-500 text-white font-bold"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
              }`}
            >
              <span>{category.name}</span>
              <span
                className={`text-sm rounded-full px-2 py-0.5 ${
                  isActive ? "bg-black/20" : "bg-gray-200 dark:bg-gray-700/50"
                }`}
              >
                {categoryCounts[category.id] || 0}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  </div>
);

export default CategorySidebar;
