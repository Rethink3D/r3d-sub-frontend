import { Maker } from "../../../../../types/types";
import { LocationIcon, BoxIcon, InformationIcon } from "../../Icons";
import styles from "../MakerProfileModal.module.css";

interface MakerHeaderProps {
  maker: Maker;
}

const MakerHeader: React.FC<MakerHeaderProps> = ({ maker }) => (
  <div className="flex flex-col md:flex-row items-center md:items-start gap-6 w-full">
    <div className={`${styles.avatarRing} p-1 flex-shrink-0 mb-4 md:mb-0`}>
      <img
        src={
          maker.profileImage?.url ||
          `https://ui-avatars.com/api/?name=${maker.name.replace(
            " ",
            "+"
          )}&background=random&color=fff`
        }
        alt={maker.name}
        className="w-28 h-28 rounded-full object-cover"
      />
    </div>
    <div className="flex-grow flex flex-col items-center md:items-start">
      <h1 className="text-3xl font-bold">{maker.name}</h1>

      <div className="flex flex-col items-center md:items-start gap-2 text-gray-600 dark:text-gray-400 text-sm mt-2">
        <div className="flex flex-wrap justify-center md:justify-start items-center gap-x-3 gap-y-1">
          {maker.location && (
            <span className="flex items-center gap-1">
              <LocationIcon /> {maker.location}
            </span>
          )}
          {maker.location && maker.productCount > 0 && (
            <span className="hidden sm:inline">•</span>
          )}
          {maker.productCount > 0 && (
            <span className="flex items-center gap-1">
              <BoxIcon />
              {maker.productCount}{" "}
              {maker.productCount === 1 ? "produto" : "produtos"}
            </span>
          )}
        </div>

        {maker.acceptsPersonalization && (
          <div className="group relative flex items-center gap-2 px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 border border-purple-300">
            <InformationIcon className="flex-shrink-0 w-5 h-5" />
            <h3 className="font-semibold text-sm">
              Aceita Pedidos Sob Demanda
            </h3>
            <div className="absolute z-20 top-full mt-2 left-1/2 -translate-x-1/2 w-64 text-center bg-gray-900 text-white text-xs rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              Este Maker aceita pedidos sob demanda nas categorias em que
              trabalha.
            </div>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default MakerHeader;
