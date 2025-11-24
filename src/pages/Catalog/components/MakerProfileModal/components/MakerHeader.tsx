import { Maker } from "../../../../../types/types";
import { LocationIcon, BoxIcon, InformationIcon } from "../../Icons";
import styles from "../MakerProfileModal.module.css";

interface MakerHeaderProps {
  maker: Maker;
}

const MakerHeader: React.FC<MakerHeaderProps> = ({ maker }) => (
  <div className="flex flex-row items-center gap-5 w-full">
    <div className={`${styles.avatarRing} p-1 flex-shrink-0`}>
      <img
        src={
          maker.profileImage?.url ||
          `https://ui-avatars.com/api/?name=${maker.name.replace(
            " ",
            "+"
          )}&background=random&color=fff`
        }
        alt={maker.name}
        className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover"
      />
    </div>

    <div className="flex flex-col items-start gap-1">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-none">
        {maker.name}
      </h1>

      <div className="flex flex-col items-start gap-1.5 text-gray-600 dark:text-gray-400 text-sm mt-1">
        <div className="flex flex-wrap items-center gap-x-3">
          {maker.location && (
            <span className="flex items-center gap-1">
              <LocationIcon className="w-4 h-4" /> {maker.location}
            </span>
          )}
          {maker.location &&
            maker.productCount !== undefined &&
            maker.productCount > 0 && (
              <span className="hidden sm:inline text-gray-400">•</span>
            )}
          {maker.productCount !== undefined && maker.productCount > 0 && (
            <span className="flex items-center gap-1">
              <BoxIcon className="w-4 h-4" />
              {maker.productCount}{" "}
              {maker.productCount === 1 ? "produto" : "produtos"}
            </span>
          )}
        </div>

        {maker.acceptsPersonalization && (
          <div className="flex items-center gap-1.5 bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 px-2 py-0.5 rounded-md border border-purple-200 dark:border-purple-800">
            <InformationIcon className="w-3.5 h-3.5" />
            <span className="text-xs font-bold">
              Aceita Pedidos Sob Demanda
            </span>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default MakerHeader;
