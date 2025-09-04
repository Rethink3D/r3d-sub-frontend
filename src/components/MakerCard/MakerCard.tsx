import React from "react";

const StoreIcon = () => (
  <svg
    className="w-5 h-5 mr-2"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
    />
  </svg>
);
const WandIcon = () => (
  <svg
    className="w-4 h-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"
    />
  </svg>
);
const InstagramIcon = () => (
  <svg
    className="w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const WhatsappIcon = () => (
  <svg
    className="w-6 h-6"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path d="M21.45,16.22a2,2,0,0,1-1.12,1.46,12.27,12.27,0,0,1-4.2.87c-1.3,0-2.83-.16-4.32-.51a10.33,10.33,0,0,1-3.88-2.33,10.2,10.2,0,0,1-2.33-3.88,11.5,11.5,0,0,1-.51-4.32,12.5,12.5,0,0,1,.87-4.2,2,2,0,0,1,1.46-1.12L9,2.1a1.28,1.28,0,0,1,.58.12,1.33,1.33,0,0,1,.53.48l1.52,2.53a1.27,1.27,0,0,1-.1,1.59l-.65.81a.51.51,0,0,0-.11.57,6.46,6.46,0,0,0,3.16,3.16.51.51,0,0,0,.57-.11l.81-.65a1.27,1.27,0,0,1,1.59-.1l2.53,1.52a1.33,1.33,0,0,1,.48.53,1.28,1.28,0,0,1,.12.58Z"></path>
  </svg>
);
interface MakerCardProps {
  maker: {
    name: string;
    storeName: string;
    location: string;
    avatarUrl?: string;
    offersCustomization?: boolean;
    whatsapp?: string;
    instagram?: string;
  };
  onProfileClick: () => void;
}

const MakerCard: React.FC<MakerCardProps> = ({ maker, onProfileClick }) => {
  return (
    <div className="bg-white dark:bg-gray-900/50 rounded-lg p-6 flex flex-col items-center text-center h-full shadow-md">
      <div onClick={onProfileClick} className="cursor-pointer group">
        <img
          src={
            maker.avatarUrl ||
            `https://ui-avatars.com/api/?name=${maker.name.replace(
              " ",
              "+"
            )}&background=random`
          }
          alt={`Foto de ${maker.name}`}
          className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-gray-200 dark:border-gray-700 group-hover:border-purple-500 transition-colors"
        />
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-purple-500 transition-colors">
          {maker.name}
        </h3>
      </div>

      <p className="text-md text-purple-600 dark:text-purple-400 font-semibold">
        {maker.storeName}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {maker.location}
      </p>

      {maker.offersCustomization && (
        <div className="mb-6">
          <span className="flex items-center gap-2 text-purple-700 bg-purple-100 dark:text-purple-300 dark:bg-purple-900/50 font-bold text-xs py-1 px-3 rounded-full">
            <WandIcon />
            Pedidos Personalizados
          </span>
        </div>
      )}

      {(maker.instagram || maker.whatsapp) && (
        <div className="flex justify-center gap-6 mb-6">
          {maker.instagram && (
            <a
              href={`https://instagram.com/${maker.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-pink-600 transition-colors"
            >
              <InstagramIcon />
            </a>
          )}
          {maker.whatsapp && (
            <a
              href={`https://wa.me/${maker.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-green-600 transition-colors"
            >
              <WhatsappIcon />
            </a>
          )}
        </div>
      )}

      <div className="border-t border-gray-200 dark:border-gray-700 w-full pt-6 mt-auto">
        <button className="flex items-center justify-center w-full bg-gray-800 text-white font-bold py-3 px-6 rounded-lg hover:bg-gray-900 transition-colors">
          <StoreIcon />
          Ver Loja do Maker
        </button>
      </div>
    </div>
  );
};

export default MakerCard;