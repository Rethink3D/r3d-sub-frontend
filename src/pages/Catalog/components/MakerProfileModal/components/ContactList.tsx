import { Maker, Product } from "../../../../../types/types";
import { ExternalLinkIcon } from "../../Icons";
import { contactDetailsMap, generateWhatsappLink } from "../utils";
import styles from "../MakerProfileModal.module.css";
import { trackEvent } from "../../../../../utils/analytics";

interface ContactListProps {
  maker: Maker;
  product?: Product;
}

const ContactList: React.FC<ContactListProps> = ({ maker, product }) => (
  <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
    <h2 className="text-2xl font-bold mb-4 text-center md:text-left">
      Entre em Contato
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
);

export default ContactList;
