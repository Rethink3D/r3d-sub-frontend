import { useState } from "react";


const ChevronIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={`w-6 h-6 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);


const faqData = [
  {
    question: "Como funciona o processo de pedido personalizado?",
    answer: "Para solicitar um pedido personalizado, basta entrar em contato direto com o Maker através do perfil dele. Vocês poderão discutir todos os detalhes, como design, materiais e prazos, para criar uma peça que seja exatamente como você imaginou."
  },
  {
    question: "Quais materiais de impressão 3D são oferecidos?",
    answer: "Nossos Makers trabalham com uma vasta gama de materiais, incluindo PLA, ABS, PETG, resinas e até filamentos flexíveis. Cada produto no catálogo especifica o material utilizado, e você pode discutir opções com o Maker para pedidos personalizados."
  },
  {
    question: "Qual é o prazo de entrega para os produtos?",
    answer: "O prazo de entrega varia dependendo da complexidade do produto e da agenda do Maker. Essa informação geralmente está na página do produto ou pode ser confirmada diretamente com o criador antes de finalizar a compra."
  },
  {
    question: "Posso me tornar um Maker e vender na plataforma?",
    answer: "Sim! Estamos sempre em busca de novos talentos para se juntarem à nossa comunidade. Preencha o formulário de interesse em nossa página inicial e nossa equipe entrará em contato com os próximos passos para você começar a vender suas criações."
  },
  {
    question: "Como a Rethink3D garante a qualidade dos produtos?",
    answer: "Atuamos como uma ponte entre você e os Makers, que são avaliados pela comunidade. Incentivamos a comunicação transparente e a avaliação dos perfis para garantir que você sempre receba produtos de alta qualidade, feitos com paixão e precisão."
  }
];

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Deixa o primeiro item aberto por padrão

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4 text-left">
      {faqData.map((faq, index) => (
        <div key={index} className="border-b border-gray-200 dark:border-gray-700 last:border-b-0">
          <button
            onClick={() => handleToggle(index)}
            className="w-full flex justify-between items-center py-6 text-left"
          >
            <h3 className={`text-xl font-semibold transition-colors ${openIndex === index ? 'text-blue-500 dark:text-blue-400' : 'text-texto-principal'}`}>
              {faq.question}
            </h3>
            <span className={openIndex === index ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500'}>
              <ChevronIcon isOpen={openIndex === index} />
            </span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}
          >
            <p className="pb-6 text-texto-secundario leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FaqAccordion;