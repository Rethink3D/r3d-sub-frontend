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
  contactInfo: string
) => {
  const message = `Oi, vim pela Rethink3D. Você é o Maker ${makerName}? Prazer em te conhecer, gostaria de saber sobre seus produtos e serviços.`;
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${contactInfo}?text=${encodedMessage}`;
};
