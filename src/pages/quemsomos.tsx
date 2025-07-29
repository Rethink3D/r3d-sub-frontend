import React from 'react';
import styles from './quemsomos.module.css'; // O nosso CSS Module para a borda e texto

// Componente reutilizável para cada cartão
interface FeatureCardProps {
  iconUrl: string;
  text: string;
  iconBgColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ iconUrl, text, iconBgColor }) => {
  return (
    <div className={`${styles.cardBorder} bg-[#1a1a1a] rounded-3xl p-8 flex flex-col items-center text-center h-full`}>
      <div 
        className="rounded-full p-5 mb-6 inline-flex" 
        style={{ backgroundColor: iconBgColor }}
      >
        <img src={iconUrl} alt="Ícone da funcionalidade" className="w-16 h-16" />
      </div>
      <p className="text-white text-xl md:text-2xl leading-relaxed">
        {text}
      </p>
    </div>
  );
};

const QuemSomosPage: React.FC = () => {
  return (
    <div className="py-12 flex flex-col gap-24">
      {/* Secção dos Cartões de Destaque */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          iconUrl="public/company.png"
          iconBgColor="#5a3a9a"
          text="Uma empresa focada em resolver problemas de makers que não tem uma plataforma própria de vendas online"
        />
        <FeatureCard
          iconUrl="/public/goal.png"
          iconBgColor="#e11d48"
          text="Unir o desconhecido, juntar Makers3D com clientes em busca de algo personalizado ou produtos 3D"
        />
        <FeatureCard
          iconUrl="public/rocket (1).png"
          iconBgColor="#5a3a9a"
          text="Uma STARTUP que começou em São Luís/do Maranhão"
        />
      </section>

      {/* NOVA SECÇÃO: APLICAÇÃO RETHINK3D */}
      <section className="flex flex-col items-center gap-8">
        <h2 className={`text-5xl lg:text-6xl text-center text-white ${styles.textStroke}`}>
          Aplicação Rethink3D
        </h2>
        {/* Linha decorativa */}
        <div className="w-1/3 h-1.5 bg-gray-600 rounded-full"></div>
        
        <div className="w-full max-w-6xl mt-4">
          <img 
            src="https://placehold.co/1646x707/141414/686868?text=Screenshots+da+Aplicação" 
            alt="Screenshots da aplicação Rethink3D" 
            className="rounded-3xl border-4 border-gray-700 w-full h-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default QuemSomosPage;
