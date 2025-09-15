interface TypeCardProps {
  image: string;
  title: string;
  definition: string;
  examples: string;
}

const TypeCard: React.FC<TypeCardProps> = ({
  image,
  title,
  definition,
  examples,
}) => {
  return (
    <div className="flex flex-col items-center text-center h-full bg-gray-100 dark:bg-[#1f1f24] p-6 sm:p-8 rounded-xl shadow-md">
      <img
        src={image}
        alt={title}
        className="w-32 h-32 object-contain mb-6 rounded-xl"
      />
      <div className="flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-base text-gray-700 dark:text-gray-300 flex-grow">
          {definition}
        </p>
        <p className="text-sm italic text-gray-500 dark:text-gray-400 mt-4">
          {examples}
        </p>
      </div>
    </div>
  );
};

export default TypeCard;
