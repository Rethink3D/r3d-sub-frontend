import React from 'react';
import styles from './homepage.module.css'; // O nosso CSS Module para estilos especiais

const HomePage: React.FC = () => {
  return (
    // Contêiner principal da página, com um espaçamento grande entre as seções
    <div className="flex flex-col gap-24 py-12">
      
      {/* SEÇÃO 1: HERO */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Coluna da Esquerda: Textos */}
        <div className="flex flex-col gap-8">
          <div className="text-white bg-opacity-20 border border-gray-700 rounded-3xl p-8">
            <h1 className="text-4xl lg:text-5xl font-bold italic mb-6">
              A <span className={styles.titleGradient}>Rethink3D</span> conecta suas necessidades às nossas soluções.
            </h1>
            <p className="text-lg lg:text-xl font-bold italic text-gray-300">
              Através da nossa plataforma, clientes de diversos perfis... podem comparar perfis, preços, avaliações e portfólios de makers especializados, negociando diretamente...
            </p>
          </div>
          <div className="bg-black bg-opacity-20 border border-gray-700 rounded-3xl p-8 text-center">
            <p className={`text-5xl lg:text-6xl font-light text-white ${styles.textStroke}`}>Imagine o que quiser,</p>
            <p className={`text-5xl lg:text-6xl font-bold ${styles.lemaHighlight} ${styles.textStroke}`}>nós cuidamos do resto.</p>
          </div>
        </div>

        {/* Coluna da Direita: Título e Imagem */}
        <div className="flex flex-col justify-center items-center gap-6">
          <h2 className={`text-6xl font-semibold ${styles.titleGradient}`}>Rethink3D</h2>
          <img 
            src="/3dvetor.png" 
            alt="Visualização da plataforma Rethink3D" 
            className="rounded-3xl border-4 border-gray-700 w-full h-auto object-cover"
          />
        </div>
      </section>
    
      {/* SEÇÃO 2: APLICAÇÃO RETHINK3D */}
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

export default HomePage;
