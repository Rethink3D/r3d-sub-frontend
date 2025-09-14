import { Maker } from "../../../../../types/types";

interface MakerCategoriesProps {
  maker: Maker;
}

const MakerCategories: React.FC<MakerCategoriesProps> = ({ maker }) => {
  if (!maker.categories || maker.categories.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
      {maker.categories.map((category) => (
        <span
          key={category.id}
          className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full"
        >
          {category.name}
        </span>
      ))}
    </div>
  );
};

export default MakerCategories;
