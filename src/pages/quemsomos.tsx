import React from 'react';
import styles from './quemsomos.module.css';

// Componente reutilizável para cada cartão (versão melhorada do seu amigo)
interface FeatureCardProps {
  iconUrl: string;
  iconBgColor: string;
  title: string;
  text: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ iconUrl, iconBgColor, title, text }) => {
  return (
    // Aplicando a nova borda de gradiente
    <div className={`${styles.gradientBorder} rounded-3xl p-0 dark:p-[1px] h-full shadow-2xl 
        dark:shadow-none 
        transition-shadow `}>
      <div className="bg-white dark:bg-[#1a1a1a] rounded-[23px] p-8 flex flex-col items-center text-center h-full">
        <div
          className="rounded-full p-4 mb-5 inline-flex"
          style={{ backgroundColor: iconBgColor }}
        >
          <img src={iconUrl} alt={`${title} icon`} className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold text-texto-principal mb-3">{title}</h3>
        <p className="text-texto-secundario text-lg leading-relaxed">
          {text}
        </p>
      </div>
    </div>
  );
};

// Componente reutilizável para os vídeos (da nossa versão anterior)
const VideoCard: React.FC<{ videoSrc: string; title: string; }> = ({ videoSrc, title }) => {
  return (
    <div className="bg-gray-300 dark:bg-[#1a1a1a] border border-gray-800 rounded-lg p-4">
      <h3 className="text-texto-principal font-bold text-lg mb-4 text-center">{title}</h3>
      <video 
        className="w-full rounded"
        autoPlay
        loop
        muted
        playsInline
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
      {/* Secção dos Cartões de Destaque (com o novo design) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          iconUrl="public/company.png"
          iconBgColor="#5a3a9a"
          title="Empresa de Vendas Online"
          text="Uma empresa focada em resolver problemas de makers que não tem uma plataforma própria de vendas online"
        />
        <FeatureCard
          iconUrl="public/goal.png"
          iconBgColor="#e11d48"
          title="Conexão entre Makers e Clientes"
          text="Unir o desconhecido, juntar Makers3D com clientes em busca de algo personalizado ou produtos 3D"
        />
        <FeatureCard
          iconUrl="public/rocket (1).png"
          iconBgColor="#5a3a9a"
          title="Startup em São Luís"
          text="Uma STARTUP que começou em São Luís/do Maranhão"
        />
      </section>


      
      {/* SECÇÃO DOS VÍDEOS (ADICIONADA NOVAMENTE) */}
      <section className="flex flex-col items-center gap-8">
        <h2 className="text-4xl font-bold text-white">Veja a Plataforma em desenvolvimento em Ação</h2>
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
