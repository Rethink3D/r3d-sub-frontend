import React, { useState, useEffect } from "react";
import styles from "./MakerProfileModal.module.css";
import { Maker, Product } from "../../../../types/types";
import {
  CloseIcon,
  LocationIcon,
  BoxIcon,
  InformationIcon,
  ExternalLinkIcon,
  LoadingSpinner,
} from "../Icons";
import FeaturedProductCarousel from "./FeaturedProductCarousel";

interface MakerProfileModalProps {
  maker: Maker;
  featuredProduct: Product;
  onClose: () => void;
  isLoading?: boolean;
  onViewAllProducts: (makerName: string) => void;
}

const MakerProfileModal: React.FC<MakerProfileModalProps> = ({
  maker,
  featuredProduct,
  onClose,
  isLoading,
  onViewAllProducts,
}) => {
  const handleModalContentClick = (e: React.MouseEvent) => e.stopPropagation();
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  const handleViewAllClick = () => {
    onViewAllProducts(maker.name);
    onClose();
  };

  const isLongDescription = maker.description.length > 200;

  const contactDetails: {
    [key: string]: {
      label: string;
      urlPrefix: string;
      actionText: string;
      icon: string;
    };
  } = {
    INSTAGRAM: {
      label: "Instagram",
      urlPrefix: "https://ig.me/m/",
      actionText: "Ver perfil",
      icon: "/InstagramIcon.png",
    },
    WHATSAPP: {
      label: "WhatsApp",
      urlPrefix: "https://wa.me/",
      actionText: "Conversar agora",
      icon: "/WhatsappIcon.png",
    },
    MERCADO_LIVRE: {
      label: "Mercado Livre",
      urlPrefix: "",
      actionText: "Ver loja",
      icon: "/MercadoLivreIcon.png",
    },
    EMAIL: {
      label: "Email",
      urlPrefix: "mailto:",
      actionText: "Enviar mensagem",
      icon: "/EmailIcon.png",
    },
  };

  const whatsappMessage = `Oi, vim pela Rethink3D. Você é o Maker ${maker.name}? Prazer em te conhecer, gostaria de saber sobre seus produtos e serviços.`;
  const encodedWhatsappMessage = encodeURIComponent(whatsappMessage);

  if (isLoading || !maker) {
    return (
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      >
        <div
          id="maker-modal-scroll-container"
          onClick={(e) => e.stopPropagation()}
          className={`${styles["animate-fade-in-scale"]} relative bg-white dark:bg-[#121212] rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] p-6 sm:p-8`}
        >
          <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
            <LoadingSpinner className="w-12 h-12" />
            <p className="text-gray-400">Carregando perfil do maker...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    >
      <div
        id="maker-modal-scroll-container"
        onClick={handleModalContentClick}
        className={`${styles["animate-fade-in-scale"]} ${styles["no-scrollbar"]} relative bg-white dark:bg-[#121212] text-gray-900 dark:text-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 sm:p-8`}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors"
        >
          <CloseIcon className="w-8 h-8" />
        </button>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center min-h-[400px] gap-4">
            <LoadingSpinner className="w-12 h-12" />
            <p className="text-gray-400">Carregando perfil do maker...</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col md:grid md:grid-cols-2 md:gap-8">
              <div className="flex flex-col md:order-2 mb-8 md:mb-0">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                  <div
                    className={`${styles.avatarRing} p-1 flex-shrink-0 mb-4 md:mb-0`}
                  >
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
                  <div className="flex-grow">
                    <h1 className="text-3xl font-bold">{maker.name}</h1>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1 text-gray-600 dark:text-gray-400 text-sm mt-2">
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
                  </div>
                </div>

                <div className="mt-6 text-center md:text-left">
                  <p
                    className={`text-gray-700 dark:text-gray-300 transition-all duration-300 ${
                      !isDescriptionExpanded && isLongDescription
                        ? "line-clamp-3"
                        : ""
                    }`}
                  >
                    {maker.description}
                  </p>
                  {isLongDescription && (
                    <button
                      onClick={() =>
                        setIsDescriptionExpanded(!isDescriptionExpanded)
                      }
                      className="text-blue-500 hover:text-blue-400 font-semibold text-sm mt-2"
                    >
                      {isDescriptionExpanded ? "Ver menos" : "Ver mais"}
                    </button>
                  )}
                </div>

                {maker.categories && maker.categories.length > 0 && (
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
                )}
                {maker.acceptsPersonalization && (
                  <div className="mt-6 w-full">
                    <div className="group relative flex items-center justify-center gap-2 text-cyan-600 dark:text-cyan-400">
                      <InformationIcon className="flex-shrink-0 w-5 h-5" />
                      <h3 className="font-semibold text-sm">
                        Aceita Pedidos Sob Demanda
                      </h3>
                      <div className="absolute z-20 top-full mt-2 left-1/2 -translate-x-1/2 w-64 text-center bg-gray-900 text-white text-xs rounded-md px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        Este Maker aceita pedidos sob demanda nas categorias em
                        que trabalha.
                      </div>
                    </div>
                  </div>
                )}
                <div className="mt-4 text-center">
                  <button
                    onClick={handleViewAllClick}
                    className={`${styles.viewAllButton} font-bold py-3 px-6 rounded-lg bg-gray-800 text-white dark:bg-[#00c6ff] dark:text-gray-900`}
                  >
                    Ver Todos os Produtos de {maker.name}
                  </button>
                </div>
              </div>

              <div className="flex flex-col bg-gray-100 dark:bg-black/30 rounded-lg p-6 md:order-1">
                <h2 className="font-bold text-xl mb-4 text-center sm:text-left">
                  Produto em Destaque
                </h2>
                <FeaturedProductCarousel product={featuredProduct} />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
                Entre em Contato
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {maker.contacts.map((contact) => {
                  const detail = contactDetails[contact.type];
                  if (!detail) return null;

                  let href = `${detail.urlPrefix}${contact.contactInfo}`;
                  if (contact.type === "WHATSAPP") {
                    href = `${detail.urlPrefix}${contact.contactInfo}?text=${encodedWhatsappMessage}`;
                  }

                  return (
                    <a
                      key={contact.id}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${styles.contactCard} flex justify-between items-center p-4 rounded-lg`}
                    >
                      <div className="flex items-center">
                        <img
                          src={detail.icon}
                          alt={`${detail.label} icon`}
                          className="w-10 h-10 mr-4"
                        />
                        <div>
                          <p className="font-bold">{detail.label}</p>
                          <p className="text-sm">{detail.actionText}</p>
                        </div>
                      </div>
                      <ExternalLinkIcon />
                    </a>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MakerProfileModal;
