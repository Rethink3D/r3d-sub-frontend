import { ElfHat } from "../../../effects/ElfHat";
import { Maker } from "../../../types/types";

interface DemandMakerCardProps {
    maker: Maker;
    onSelect: (maker: Maker) => void;
}

const DemandMakerCard: React.FC<DemandMakerCardProps> = ({
    maker,
    onSelect,
}) => {
    return (
        <div
            onClick={() => onSelect(maker)}
            className="flex flex-col bg-fundo-secundario p-4 rounded-lg border border-borda hover:border-blue-500 transition-colors duration-300 cursor-pointer"
        >
            <div className="flex items-start gap-4">
                <div className="relative inline-block">
                    <img
                        src={
                            maker.profileImage?.url ||
                            `https://ui-avatars.com/api/?name=${maker.name.replace(
                                " ",
                                "+"
                            )}&background=random&color=fff`
                        }
                        alt={`Perfil de ${maker.name}`}
                        className="w-20 h-20 rounded-md object-cover bg-gray-300 dark:bg-gray-700 flex-shrink-0"
                    />
                    <ElfHat className="absolute -top-4 -left-6 w-17 h-auto  z-10 pointer-events-none drop-shadow-md" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-texto-principal truncate">
                        {maker.name}
                    </h3>
                    <p className="text-sm text-texto-secundario mt-1 line-clamp-3 break-words">
                        {maker.description}
                    </p>
                </div>
            </div>
            {maker.categories && maker.categories.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {maker.categories.slice(0, 3).map((category) => (
                        <span
                            key={category.id}
                            className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 font-semibold px-2 py-1 rounded-full"
                        >
                            {category.name}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DemandMakerCard;
