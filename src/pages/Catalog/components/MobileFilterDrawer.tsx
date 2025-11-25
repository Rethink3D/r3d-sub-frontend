import CategorySidebar from "./CategorySideBar";
import { Category } from "../../../types/types";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  allCategories: Category[];
  categoryCounts: { [key: string]: number };
  selectedCategoryIds: string[];
  filterPersonalizable: boolean;
  filterPromotional: boolean;
  onCategoryClick: (id: string) => void;
  onTogglePersonalizable: (value: boolean) => void;
  onTogglePromotional: (value: boolean) => void;
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  ...sidebarProps
}) => {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      <div
        className={`
          fixed top-0 left-0 h-full w-full max-w-xs bg-white dark:bg-gray-900 z-50 
          transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <CategorySidebar
          inDrawer={true}
          onClose={onClose}
          isCollapsed={false}
          {...sidebarProps}
        />
      </div>
    </>
  );
};

export default MobileFilterDrawer;
