import React from 'react';
import styles from './quemsomos.module.css'; // O nosso CSS Module para a borda

// Componente reutilizável para cada cartão, agora com cor de fundo do ícone personalizável
interface FeatureCardProps {
  iconUrl: string;
  text: string;
  iconBgColor: string; // Nova propriedade para a cor de fundo do ícone
}

const FeatureCard: React.FC<FeatureCardProps> = ({ iconUrl, text, iconBgColor }) => {
  return (
    // O cartão agora tem um fundo mais escuro
    <div className={`${styles.cardBorder} bg-[#1a1a1a] rounded-3xl p-10 flex flex-col items-center text-center h-full`}>
      {/* O fundo do ícone agora é dinâmico */}
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
    <div className="py-12">
      {/* Grid que contém os três cartões */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          iconUrl="public/company.png" // ATUALIZADO: Coloque o seu ícone na pasta 'public'
          iconBgColor="#5a3a9a" // Roxo
          text="Uma empresa focada em resolver problemas de makers que não tem uma plataforma própria de vendas online"
        />
        <FeatureCard
          iconUrl="public/goal.png" // ATUALIZADO: Coloque o seu ícone na pasta 'public'
          iconBgColor="#e11d48" // Rosa/Vermelho
          text="Unir o desconhecido, juntar Makers3D com clientes em busca de algo personalizado ou produtos 3D"
        />
        <FeatureCard
          iconUrl="public/rocket (1).png" // ATUALIZADO: Coloque o seu ícone na pasta 'public'
          iconBgColor="#5a3a9a" // Roxo
          text="Uma STARTUP que começou em São Luís/do Maranhão"
        />
      </div>
    </div>
  );
};

export default QuemSomosPage;
