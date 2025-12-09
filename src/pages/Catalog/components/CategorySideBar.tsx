import { FilterIcon, CloseIcon } from "./Icons";
import { TbDiscount } from "react-icons/tb";
import { BiEdit } from "react-icons/bi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Category } from "../../../types/types";
import { CAMPAIGN_CONFIG } from "../../../config/campaign";

interface CategorySidebarProps {
  allCategories: Category[];
  categoryCounts: { [key: string]: number };
  selectedCategoryIds: string[];
  filterPersonalizable: boolean;
  filterPromotional: boolean;
  onCategoryClick: (id: string) => void;
  onTogglePersonalizable: (value: boolean) => void;
  onTogglePromotional: (value: boolean) => void;
  inDrawer?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const CategorySidebar: React.FC<CategorySidebarProps> = ({
  allCategories,
  categoryCounts,
  selectedCategoryIds,
  filterPersonalizable,
  filterPromotional,
  onCategoryClick,
  onTogglePersonalizable,
  onTogglePromotional,
  inDrawer = false,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}) => {
  if (isCollapsed && !inDrawer) {
    return (
      <div className="bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl p-4 sticky top-28 flex flex-col items-center gap-4 transition-all duration-300 w-16">
        <button
          onClick={onToggleCollapse}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
          title="Expandir filtros"
        >
          <FaChevronRight />
        </button>
        <div className="border-t border-gray-300 dark:border-gray-700 w-full" />
        <FilterIcon className="text-gray-500 h-6 w-6" />
      </div>
    );
  }

  return (
    <div
      className={
        !inDrawer
          ? "bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl p-6 sticky top-28 transition-all duration-300"
          : "flex flex-col h-full"
      }
    >
      <div
        className={`flex items-center justify-between mb-2 ${
          !inDrawer ? "" : "p-4 border-b border-gray-200 dark:border-gray-700"
        }`}
      >
        <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
          <FilterIcon className="h-6 w-6" /> Filtros
        </h2>

        <div className="flex gap-2">
          {!inDrawer && onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="text-gray-500 dark:text-gray-400 p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
            >
              <FaChevronLeft />
            </button>
          )}
          {inDrawer && (
            <button
              onClick={onClose}
              className="text-gray-500 dark:text-gray-400"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>

      <div
        className={`flex-1 ${
          inDrawer ? "overflow-y-auto custom-scrollbar p-4" : ""
        }`}
      >
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Preferências
          </h3>
          <div className="flex flex-col gap-2">
            <label
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border ${
                filterPromotional
                  ? "bg-red-50 border-red-400 dark:bg-red-900/20 dark:border-red-600"
                  : "bg-white dark:bg-gray-800 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <input
                type="checkbox"
                checked={filterPromotional}
                onChange={(e) => {
                  onTogglePromotional(e.target.checked);
                }}
                className="w-5 h-5 rounded text-red-500 focus:ring-red-500 border-gray-300"
              />
              <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
                <TbDiscount
                  className={`h-6 w-6 ${
                    filterPromotional
                      ? "text-red-600 dark:text-red-400"
                      : "text-gray-400"
                  }`}
                />
                <span>{CAMPAIGN_CONFIG.label}</span>
              </div>
            </label>

            <label
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors border ${
                filterPersonalizable
                  ? "bg-purple-50 border-purple-400 dark:bg-purple-900/20 dark:border-purple-600"
                  : "bg-white dark:bg-gray-800 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <input
                type="checkbox"
                checked={filterPersonalizable}
                onChange={(e) => {
                  onTogglePersonalizable(e.target.checked);
                }}
                className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
              />
              <div className="flex items-center gap-2 text-gray-900 dark:text-white font-medium">
                <BiEdit
                  className={`h-6 w-6 ${
                    filterPersonalizable
                      ? "text-purple-600 dark:text-purple-400"
                      : "text-gray-400"
                  }`}
                />
                <span>Personalizável</span>
              </div>
            </label>
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700 mb-6" />

        <div>
          <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
            Categorias
          </h3>
          <ul
            className={`custom-scrollbar space-y-2 overflow-y-auto ${
              !inDrawer ? "max-h-[calc(100vh-32rem)]" : ""
            }`}
          >
            <li>
              <button
                onClick={() => {
                  onCategoryClick("Todos");
                }}
                className={`w-full flex justify-between items-center text-left py-2 px-3 rounded-lg transition-colors duration-300 ${
                  selectedCategoryIds.length === 0
                    ? "bg-blue-600 text-white font-bold"
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
                    }}
                    className={`w-full flex justify-between items-center text-left py-2 px-3 rounded-lg transition-colors duration-300 ${
                      isActive
                        ? "bg-blue-600 text-white font-bold"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span
                      className={`text-sm rounded-full px-2 py-0.5 ${
                        isActive
                          ? "bg-black/20"
                          : "bg-gray-200 dark:bg-gray-700/50"
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
      </div>
    </div>
  );
};

export default CategorySidebar;
