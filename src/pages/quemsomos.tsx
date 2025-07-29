import React from 'react';
import styles from './quemsomos.module.css';

// O componente FeatureCard pode ser mantido, mas vamos usá-lo com um novo propósito.
// Adicionei um `title` para dar mais destaque.
interface FeatureCardProps {
  iconUrl: string;
  iconBgColor: string;
  title: string;
  text: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ iconUrl, iconBgColor, title, text }) => {
  return (
    // Aplicando a nova borda de gradiente!
    <div className={`${styles.gradientBorder} rounded-3xl p-[1px] h-full`}>
      <div className="bg-[#1a1a1a] rounded-[23px] p-8 flex flex-col items-center text-center h-full">
        <div
          className="rounded-full p-4 mb-5 inline-flex"
          style={{ backgroundColor: iconBgColor }}
        >
          <img src={iconUrl} alt={`${title} icon`} className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">{title}</h3>
        <p className="text-gray-300 text-lg leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

const QuemSomosPage: React.FC = () => {
  return (
    <div className="py-16 md:py-24 flex flex-col gap-20 md:gap-32">
      
      {/* SEÇÃO HERO - TÍTULO PRINCIPAL */}
      <section className="text-center max-w-4xl mx-auto">
        <h1 className={`text-5xl md:text-7xl font-bold mb-6 ${styles.gradientText}`}>
          Repensando o Futuro, Impressão por Impressão.
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
          Nascemos em São Luís do Maranhão com uma missão audaciosa: democratizar a impressão 3D no Brasil. Vimos um universo de criatividade fragmentado e uma tecnologia com potencial infinito ainda distante do dia a dia das pessoas. A Rethink3D é a ponte que une esses dois mundos.
        </p>
      </section>

      {/* SEÇÃO PILARES (ANTIGOS CARDS) */}
      <section>
        <h2 className="text-4xl lg:text-5xl text-center text-white font-bold mb-12">
          Nossos Pilares
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            iconUrl="/public/company.png"
            iconBgColor="rgba(255, 0, 221, 0.1)" // Cor do gradiente com transparência
            title="Empoderando Makers"
            text="Oferecemos a plataforma e as ferramentas para que criadores 3D transformem seu talento em um negócio próspero e escalável."
          />
          <FeatureCard
            iconUrl="/public/goal.png"
            iconBgColor="rgba(0, 238, 255, 0.1)" // Cor do gradiente com transparência
            title="Conectando Necessidades"
            text="Somos o ponto de encontro perfeito entre quem busca soluções personalizadas e quem tem a habilidade para criá-las."
          />
          <FeatureCard
            iconUrl="/public/rocket (1).png"
            iconBgColor="rgba(238, 238, 122, 0.1)" // Cor do gradiente com transparência
            title="Desmistificando a Tecnologia"
            text="Traduzimos o potencial da impressão 3D em soluções práticas e acessíveis para os problemas do cotidiano."
          />
        </div>
      </section>
      
      {/* SEÇÃO JORNADA */}
      <section className="text-center bg-[#1f1f1f] rounded-3xl p-8 md:p-12 max-w-5xl mx-auto">
         <h2 className="text-4xl lg:text-5xl text-center text-white font-bold mb-6">
          Nossa Jornada Até Aqui
        </h2>
        <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
          Nossa visão já está se tornando realidade. Tivemos a honra de apresentar a Rethink3D em eventos como o <strong className="text-[#FF00DD]">Neon 2025</strong> e o <strong className="text-[#00EEFF]">Transformar Juntos 2025 do Sebrae</strong>. Nesses encontros, não apenas demonstramos as infinitas possibilidades da impressão 3D, mas também oferecemos uma prévia da plataforma que está sendo construída para fortalecer e unir essa comunidade.
        </p>
      </section>

      {/* SEÇÃO APLICAÇÃO RETHINK3D */}
      <section className="flex flex-col items-center gap-8">
        <h2 className="text-4xl lg:text-5xl text-center text-white font-bold">
          Conheça um pouco da Plataforma Rethink3D
        </h2>
        <p className="text-xl text-gray-400 text-center max-w-2xl">Onde a sua ideia encontra o maker perfeito para torná-la real.</p>
        
        <div className={`w-full max-w-6xl mt-4 p-[2px] rounded-3xl ${styles.gradientBorder}`}>
          <img
            src="https://placehold.co/1646x707/141414/686868?text=Screenshots+da+Aplicação+Rethink3D"
            alt="Screenshots da aplicação Rethink3D"
            className="rounded-[22px] w-full h-auto" // Borda interna um pouco menor que a externa
          />
        </div>
      </section>

    </div>
  );
};

export default QuemSomosPage;