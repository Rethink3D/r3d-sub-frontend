import styles from "./MakerProfileModal.module.css";
import React from "react";

const CloseIcon = () => (
  <svg
    className="w-8 h-8"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    ></path>
  </svg>
);

const LocationIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const ExternalLinkIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
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

const InformationIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ></path>
  </svg>
);

const BoxIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-14L4 7v10l8 4m0-14v10"
    ></path>
  </svg>
);

const mockMaker = {
  name: "Ana Souza",
  location: "São Paulo, SP",
  productCount: 45,
  bio: "Designer especializada em objetos decorativos únicos com mais de 5 anos de experiência.",
  tags: ["Decoração", "Design de Interiores", "Arte Moderna"],
  acceptsCustomOrders: true,
  featuredProduct: {
    imageUrl: "https://placehold.co/100x100/313131/FFF?text=Vaso",
    title: "Vaso Geométrico",
    description: "Decoração criada com alta qualidade e atenção aos detalhes.",
    price: "45.90",
    isCustomizable: true,
  },
  contacts: {},
};

interface MakerProfileModalProps {
  maker?: any;
  onClose: () => void;
}

const MakerProfileModal: React.FC<MakerProfileModalProps> = ({
  maker = mockMaker,
  onClose,
}) => {
  const handleModalContentClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      <div
        onClick={handleModalContentClick}
        className="relative bg-white dark:bg-[#121212] text-gray-900 dark:text-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 animate-fade-in-scale"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <CloseIcon />
        </button>
        <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8">
          <div className="flex flex-col md:order-2 mb-8 md:mb-0">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
              <div
                className={`${styles.avatarRing} p-1 flex-shrink-0 mb-4 md:mb-0`}
              >
                <img
                  src={
                    maker.avatarUrl ||
                    `https://ui-avatars.com/api/?name=${maker.name.replace(
                      " ",
                      "+"
                    )}&background=random&color=fff`
                  }
                  alt={maker.name}
                  className="w-28 h-28 rounded-full"
                />
              </div>
              <div className="flex-grow">
                <h1 className="text-3x1 font-bold">{maker.name}</h1>
                <div className="flex flex-nowrap items-center justify-center md:justify-start gap-2 text-gray-600 dark:text-gray-400 text-sm mt-2">
                  <span className="flex items-center gap-1">
                    <LocationIcon /> {maker.location}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <BoxIcon />
                    {maker.productCount} produtos
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 my-4 max-w-md">
                  {maker.bio}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center md:justify-start mt-4">
              {maker.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            {maker.acceptsCustomOrders && (
              <div className="mt-6 w-full">
                <div
                  className={`group relative p-2 rounded-lg flex items-center justify-center gap-3 text-center text-white ${styles.customOrderCard}`}
                >
                  <InformationIcon />
                  <h3 className="font-bold text-sm">
                    Aceita Pedidos Personalizados
                  </h3>
                  <div className="absolute z-20 top-full mt-2 left-1/2 -translate-x-1/2 w-64 text-center bg-gray-900 text-white text-xs rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none">
                    Este Maker aceita pedidos personalizados nas categorias em
                    que trabalha.
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center bg-gray-100 dark:bg-black/30 rounded-lg p-6 md:order-1">
            <h2 className="font-bold text-xl mb-4">Produto em Destaque</h2>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <div className="flex flex-col items-center sm:items-start flex-shrink-0">
                <img
                  src={maker.featuredProduct.imageUrl}
                  alt={maker.featuredProduct.title}
                  className="w-28 h-28 rounded-md object-cover"
                />
                {maker.featuredProduct.isCustomizable && (
                  <div
                    tabIndex={0}
                    onClick={(e) => e.stopPropagation()}
                    className="group relative mt-2 flex items-center gap-1.5 bg-purple-600/80 backdrop-blur-sm text-white text-xs font-semibold px-2 py-1 rounded-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400"
                  >
                    <WandIcon />
                    <span>Customizável</span>
                    <div className="absolute z-20 bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 text-center bg-gray-900 text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300 pointer-events-none">
                      Este Produto pode ser personalizado!
                    </div>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">
                  {maker.featuredProduct.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {maker.featuredProduct.description}
                </p>
                <p className="font-bold text-lg mt-1">
                  R$ {maker.featuredProduct.price}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
            Entre em Contato
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a
              href="#"
              className={`${styles.contactCard} flex justify-between items-center p-4 rounded-lg`}
            >
              <div>
                <p className="font-bold">Instagram</p>
                <p className="text-sm">Ver perfil</p>
              </div>
              <ExternalLinkIcon />
            </a>
            <a
              href="#"
              className={`${styles.contactCard} flex justify-between items-center p-4 rounded-lg`}
            >
              <div>
                <p className="font-bold">Mercado Livre</p>
                <p className="text-sm">Ver loja</p>
              </div>
              <ExternalLinkIcon />
            </a>
            <a
              href="#"
              className={`${styles.contactCard} flex justify-between items-center p-4 rounded-lg`}
            >
              <div>
                <p className="font-bold">WhatsApp</p>
                <p className="text-sm">Conversar agora</p>
              </div>
              <ExternalLinkIcon />
            </a>
            <a
              href="#"
              className={`${styles.contactCard} flex justify-between items-center p-4 rounded-lg`}
            >
              <div>
                <p className="font-bold">Email</p>
                <p className="text-sm">Enviar mensagem</p>
              </div>
              <ExternalLinkIcon />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            className={`
      ${styles.viewAllButton} 
      font-bold py-3 px-6 rounded-lg
      bg-gray-800 text-white
      dark:bg-[#00c6ff] dark:text-gray-900
    `}
          >
            Ver Todos os Produtos
          </button>
        </div>
      </div>
    </div>
  );
};

export default MakerProfileModal;
