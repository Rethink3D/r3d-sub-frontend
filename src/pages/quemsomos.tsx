import React from 'react';
import styles from './quemsomos.module.css';

// Componente reutilizável para cada cartão
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

// NOVO: Componente reutilizável para os vídeos
const VideoCard: React.FC<{ videoSrc: string; title: string; }> = ({ videoSrc, title }) => {
  return (
    <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
      <h3 className="text-white font-bold text-lg mb-4 text-center">{title}</h3>
      <video 
        className="w-full rounded"
        autoPlay
        loop
        muted
        playsInline // Essencial para autoplay em telemóveis
      >
        <source src={videoSrc} type="video/mp4" />
        O seu navegador não suporta o vídeo.
      </video>
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