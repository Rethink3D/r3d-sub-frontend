import React from "react";

const AccountDeletion: React.FC = () => {
  return (
    <div className="py-16 md:py-24 max-w-3xl mx-auto px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-texto-principal mb-6">
        Exclusão de Conta
      </h1>

      <p className="text-lg text-texto-secundario leading-relaxed mb-8">
        Os usuários da <strong>Rethink3D</strong> podem solicitar a exclusão
        completa de sua conta e dos dados pessoais armazenados enviando uma
        solicitação para{" "}
        <a
          href="mailto:contato@rethink3d.com.br"
          className="text-blue-600 dark:text-blue-400 font-medium underline"
        >
          contato@rethink3d.com.br
        </a>
        .
      </p>

      <p className="text-lg text-texto-secundario leading-relaxed mb-6">
        Após a confirmação da identidade, todos os dados pessoais associados à
        conta (como nome, e-mail, CPF/CNPJ, mensagens e arquivos de projeto)
        serão removidos de forma segura, exceto aqueles que precisarem ser
        mantidos temporariamente por obrigação legal (como registros fiscais e
        logs de acesso, que podem ser mantidos por até <strong>6 meses</strong>,
        conforme o Marco Civil da Internet).
      </p>

      <p className="text-lg text-texto-secundario leading-relaxed">
        Caso o usuário tenha enviado comentários ou avaliações públicas, esses
        conteúdos poderão permanecer visíveis de forma{" "}
        <strong>anonimizada</strong>, sendo exibidos como{" "}
        <em>"Conta excluída"</em>, sem qualquer dado pessoal associado.
      </p>
    </div>
  );
};

export default AccountDeletion;
