import { useState } from "react";

const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${
      isOpen ? "rotate-180" : ""
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const faqData: { question: string; answer: React.ReactNode }[] = [
  {
    question: "Como funciona o processo de pedido personalizado?",
    answer: (
      <>
        Basta encontrar um Maker no catálogo que trabalhe com a categoria do que
        você deseja. Ao visitar um produto semelhante, entre em contato com ele.
        Juntos, vocês alinham detalhes como design, materiais e prazos para
        criar exatamente o que você imaginou.
      </>
    ),
  },
  {
    question: "Onde posso encontrar modelos 3D para impressão?",
    answer: (
      <>
        Existem muitos sites que oferecem modelos gratuitos e pagos. Alguns dos
        mais conhecidos são:{" "}
        <a
          href="https://www.thingiverse.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Thingiverse
        </a>
        ,{" "}
        <a
          href="https://www.printables.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Printables
        </a>{" "}
        e{" "}
        <a
          href="https://cults3d.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Cults
        </a>
        .
      </>
    ),
  },
  {
    question: "O que é um produto personalizado?",
    answer: (
      <>
        É um produto já disponível no catálogo do Maker, mas que pode ser
        adaptado em alguns aspectos, como cor, tamanho ou material. Para saber
        até onde vai a personalização, basta falar diretamente com o Maker.
      </>
    ),
  },
  {
    question: "Quais materiais de impressão 3D são usados?",
    answer: (
      <>
        Nossos Makers trabalham com diferentes opções, como PLA, ABS, PETG,
        resinas e até filamentos flexíveis. Caso o produto não especifique o
        material, entre em contato com o Maker para confirmar.
      </>
    ),
  },
  {
    question: "Qual é o prazo de entrega para os produtos?",
    answer: (
      <>
        O prazo depende da complexidade do pedido e da disponibilidade do Maker.
        O ideal é conversar diretamente com ele para alinhar datas.
      </>
    ),
  },
  {
    question: "Posso me tornar um Maker e vender na plataforma?",
    answer: (
      <>
        Sim! Estamos sempre de portas abertas para novos talentos. Basta
        preencher o formulário de interesse na página inicial, e nossa equipe
        entrará em contato com os próximos passos.
      </>
    ),
  },
  {
    question: "Como a Rethink3D garante a qualidade dos produtos?",
    answer: (
      <>
        Somos uma ponte entre você e os Makers. Nossa equipe avalia os perfis e
        incentiva avaliações e feedbacks transparentes, garantindo que você
        receba produtos de qualidade, feitos com dedicação e cuidado. Entre em
        contato com a Rethink3D, caso precise de ajuda.
      </>
    ),
  },
];

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-3 sm:gap-4 text-left px-3 sm:px-0">
      {faqData.map((faq, index) => (
        <div
          key={index}
          className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
        >
          <button
            onClick={() => handleToggle(index)}
            className="w-full flex justify-between items-center py-4 sm:py-6 text-left"
          >
            <h3
              className={`text-lg sm:text-xl font-semibold transition-colors ${
                openIndex === index
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-texto-principal"
              }`}
            >
              {faq.question}
            </h3>
            <span
              className={
                openIndex === index
                  ? "text-blue-500 dark:text-blue-400"
                  : "text-gray-500"
              }
            >
              <ChevronIcon isOpen={openIndex === index} />
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="pb-4 sm:pb-6 text-sm sm:text-base text-texto-secundario leading-relaxed">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
