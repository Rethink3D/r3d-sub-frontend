import React from "react";
import { FaFilePdf } from "react-icons/fa";
import styles from "./Terms.module.css";

const legalDocs = [
  {
    title: "Termos e Condições Gerais de Uso",
    description: "Regras gerais para utilizar a plataforma Rethink3D.",
    file: "/legal/termos-e-condicoes-gerais.pdf",
  },
  {
    title: "Política de Privacidade",
    description: "Como coletamos, usamos e protegemos seus dados.",
    file: "/legal/politica-de-privacidade.pdf",
  },
  {
    title: "Termos Adicionais para Makers",
    description: "Regras e condições específicas para Makers na plataforma.",
    file: "/legal/termos-adicionais-makers.pdf",
  },
];

const Terms: React.FC = () => {
  return (
    <div className="py-12 md:py-20 max-w-5xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-texto-principal mb-4">
          Termos e Documentos
        </h1>
        <p className="text-lg text-texto-secundario">
          Consulte nossos documentos legais para entender o funcionamento da
          plataforma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {legalDocs.map((doc) => (
          <a
            key={doc.title}
            href={doc.file}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.docCard}
          >
            <FaFilePdf className="w-12 h-12 text-blue-500 dark:text-blue-400 mb-4" />
            <h2 className="text-xl font-bold text-texto-principal mb-2">
              {doc.title}
            </h2>
            <p className="text-texto-secundario text-sm mb-6 flex-grow">
              {doc.description}
            </p>
            <span className={styles.docLink}>Ver Documento &rarr;</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Terms;
