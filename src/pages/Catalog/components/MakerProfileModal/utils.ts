import { Product } from "../../../../types/types";

export const contactDetailsMap = {
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

export const generateWhatsappLink = (
  makerName: string,
  contactInfo: string,
  product?: Product
) => {
  let message: string;

  if (product) {
    const productUrl = `https://web.rethink3d.com.br/catalogo/produto/${product.id}`;
    message = `Oi! Vim pelo catálogo da Rethink3D e tenho interesse no produto "${product.name}".\n\nLink do produto: ${productUrl}`;
  } else {
    message = `Oi, vim pela Rethink3D. Você é o Maker ${makerName}? Prazer em te conhecer, gostaria de saber sobre seus produtos e serviços.`;
  }

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${contactInfo}?text=${encodedMessage}`;
};
