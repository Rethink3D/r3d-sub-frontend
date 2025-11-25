export const translateBackendError = (errorMessage: string): string => {
  const msgLower = errorMessage.toLowerCase();

  if (msgLower.includes("description"))
    return "A descrição do perfil é obrigatória.";

  if (msgLower.includes("name")) return "O nome do Maker é obrigatório.";

  if (
    msgLower.includes("cpf") &&
    (msgLower.includes("cadastrado") ||
      msgLower.includes("existe") ||
      msgLower.includes("already"))
  ) {
    return "Este CPF já está cadastrado na plataforma.";
  }

  if (msgLower.includes("cpf"))
    return "O CPF informado é inválido ou obrigatório.";

  if (msgLower.includes("contacts"))
    return "Adicione pelo menos um contato válido.";

  if (msgLower.includes("email"))
    return "O email informado é inválido ou já está em uso.";

  return errorMessage;
};
