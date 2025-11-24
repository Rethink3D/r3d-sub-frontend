import { Maker, Product } from "../../../../../types/types";
import { ExternalLinkIcon } from "../../Icons";
import { contactDetailsMap, generateWhatsappLink } from "../utils";
import styles from "../MakerProfileModal.module.css";
import { trackEvent } from "../../../../../utils/analytics";

interface ContactListProps {
  maker: Maker;
  product?: Product;
  singleColumn?: boolean;
}

const ContactList: React.FC<ContactListProps> = ({
  maker,
  product,
  singleColumn,
}) => {
  return (
    <div
      className={`w-full ${
        !singleColumn
          ? "mt-8 pt-6 border-t border-gray-200 dark:border-gray-700"
          : "mt-6"
      }`}
    >
      <h2 className="text-lg font-bold mb-3 text-gray-900 dark:text-white">
        Entre em Contato
      </h2>
      <div
        className={`grid gap-3 ${
          singleColumn ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"
        }`}
      >
        {maker.contacts.map((contact) => {
          const detail =
            contactDetailsMap[contact.type as keyof typeof contactDetailsMap];
          if (!detail) return null;

          const href =
            contact.type === "WHATSAPP"
              ? generateWhatsappLink(maker.name, contact.contactInfo, product)
              : `${detail.urlPrefix}${contact.contactInfo}`;

          return (
            <a
              key={contact.id}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("Clique no Contato", {
                  label: `makerId:${maker.id}|contactType:${contact.type}`,
                })
              }
              className={`
                ${styles.contactCard} 
                group
                flex items-center p-3 rounded-xl border bg-white dark:bg-gray-800
                hover:shadow-md transition-all duration-200
              `}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-700 group-hover:bg-white/20 transition-colors mr-3 flex-shrink-0">
                <img
                  src={detail.icon}
                  alt={`${detail.label} icon`}
                  className="w-6 h-6"
                />
              </div>
              <div className="flex-grow min-w-0">
                <p className="font-bold text-gray-900 dark:text-white text-sm truncate group-hover:text-white transition-colors">
                  {detail.label}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate group-hover:text-white/90 transition-colors">
                  {detail.actionText}
                </p>
              </div>
              <ExternalLinkIcon className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default ContactList;
