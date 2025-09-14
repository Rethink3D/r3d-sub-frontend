import CategorySidebar from "./CategorySideBar";
import { Category } from "../../../types/types";

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  allCategories: Category[];
  categoryCounts: { [key: string]: number };
  selectedCategoryIds: string[];
  onCategoryClick: (id: string) => void;
}

const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  ...sidebarProps
}) => {
  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity opacity-100"
      ></div>
      <div className="fixed top-0 left-0 h-full w-full max-w-xs bg-white dark:bg-gray-900 z-50 transform transition-transform translate-x-0">
        <CategorySidebar inDrawer={true} onClose={onClose} {...sidebarProps} />
      </div>
    </div>
  );
};

export default MobileFilterDrawer;
