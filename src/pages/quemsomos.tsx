import React from 'react';
import styles from './quemsomos.module.css'; // O nosso CSS Module para a borda e texto

// Componente reutilizável para cada cartão de destaque
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
          iconUrl="company.png"
          iconBgColor="#5a3a9a"
          text="Uma empresa focada em resolver problemas de makers que não tem uma plataforma própria de vendas online"
        />
        <FeatureCard
          iconUrl="goal.png"
          iconBgColor="#e11d48"
          text="Unir o desconhecido, juntar Makers3D com clientes em busca de algo personalizado ou produtos 3D"
        />
        <FeatureCard
          iconUrl="rocket (1).png"
          iconBgColor="#5a3a9a"
          text="Uma STARTUP que começou em São Luís/do Maranhão"
        />
      </section>



      {/* NOVA SECÇÃO: VÍDEOS DA APLICAÇÃO */}
      <section className="flex flex-col items-center gap-8">
        <h2 className="text-4xl font-bold text-white">Veja a nossa plataforma em desenvolvimento em Ação</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-4">
          <VideoCard 
            videoSrc="/Home_Produtos_Makers.mp4"
            title="Home, Produtos e Makers"
          />
          <VideoCard 
            videoSrc="/Carrinho_Pesquisa_Categorias.mp4"
            title="Carrinho e Pesquisa"
          />
          <VideoCard 
            videoSrc="/Pedidos_Chats_Servicos.mp4"
            title="Pedidos e Chat"
          />
        </div>
      </section>
    </div>
  );
};

export default QuemSomosPage;
