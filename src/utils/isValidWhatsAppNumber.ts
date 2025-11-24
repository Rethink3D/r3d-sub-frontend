export const isValidWhatsAppNumber = (value: string): boolean => {
  const cleanValue = value.replace(/\D/g, "");
  return cleanValue.length === 11;
};
