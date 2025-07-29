import React from 'react';
import styles from './homepage.module.css'; // Importando os nossos estilos, incluindo a animação
import InviteForm from '../components/inviteForm/InviteForm';
import { Link } from 'react-router-dom';

// Componente reutilizável para as estatísticas
const StatItem: React.FC<{ iconUrl: string; value: string; label: string; }> = ({ iconUrl, value, label }) => {
  return (
    <div className="flex items-center gap-4">
      <img src={iconUrl} alt={label} className="w-8 h-8" />
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-sm text-gray-400">{label}</p>
      </div>
    </div>
  );
};

// Componente para os passos de "Como Funciona"
const HowItWorksStep: React.FC<{ step: number; title: string; description: string; }> = ({ step, title, description }) => {
  return (
    <div className="dark:bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 text-center">
      <div className="mb-4 text-3xl font-bold text-blue-500">0{step}</div>
      <h3 className="text-xl font-bold text-texto-principal mb-2">{title}</h3>
      <p className="text-texto-secundario">{description}</p>
    </div>
  );
};

// Componente para os cartões de categoria
const CategoryCard: React.FC<{ imageUrl: string; name: string; }> = ({ imageUrl, name }) => {
  return (
    <div className="relative rounded-lg overflow-hidden group">
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-300" />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <h3 className="text-white text-2xl font-bold">{name}</h3>
      </div>
    </div>
  );
};


const HomePage: React.FC = () => {
  return (
    // Adicionado flex-col e um espaçamento maior entre as secções
    <div className="py-20 flex flex-col gap-24">
      
      {/* SECÇÃO HERO */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="flex flex-col gap-8 text-center lg:text-left">
          <h1 className="text-5xl md:text-6xl font-light text-texto-principal leading-tight">
            Democratizando o acesso à
            <br />
            <strong className="font-bold">Impressão 3D.</strong>
          </h1>
          <p className="text-lg text-texto-secundario max-w-lg mx-auto lg:mx-0">
            Conectamos suas ideias aos melhores makers do Brasil. Impressão 3D personalizada, rápida e com qualidade profissional.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center lg:justify-start">
            <button className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors duration-300">
              <Link to='/quem-somos'>Saiba mais &rarr;</Link>
            </button>
            <button className="bg-transparent border border-gray-600 text-texto-principal font-bold py-3 px-8 rounded-lg hover:bg-gray-800 hover:text-white transition-colors duration-300">
              <Link to="/contato">Contato</Link>
            </button>
          </div>

        </div>
        <div className="flex justify-center items-center">
          {/* IMAGEM ANIMADA E AUMENTADA - imagem com "cópia" foi cortada para ficar 1:1*/}
          <img 
            src="/imagemtest - Copia.png" 
            alt="Impressão 3D" 
            className={`w-full max-w-[30rem] aspect-square ${styles.animateFloat}`} 
          />
        </div>
      </section>

      {/* SECÇÃO: COMO FUNCIONA */}
      <section className="text-center">
        <h2 className="text-4xl font-bold text-texto-principal mb-12">Simples, Rápido e Personalizado</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <HowItWorksStep
            step={1}
            title="Descreva a sua Ideia"
            description="Envie os detalhes do seu projeto ou escolha um produto do nosso catálogo."
          />
          <HowItWorksStep
            step={2}
            title="Receba Orçamentos"
            description="Os nossos makers especializados irão analisar o seu pedido e enviar propostas."
          />
          <HowItWorksStep
            step={3}
            title="Aprove e Produza"
            description="Escolha o melhor maker para o seu projeto e acompanhe a produção até à entrega."
          />
        </div>
      </section>

      {/* SECÇÃO: SER MAKER */}
      <section className="py-20">
  {/* Contêiner principal para limitar a largura e centralizar */}
  <div className="max-w-7xl mx-auto px-4">
    
    {/* Layout em grid: 1 coluna em mobile, 2 colunas em telas grandes (lg) */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      {/* Coluna da Imagem */}
      <div className="flex justify-center">
        {/* Substitua o 'src' pela imagem que preferir. Uma foto de uma oficina, impressora 3D ou pessoa criando algo funciona bem. */}
        <img 
          src="https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Maker trabalhando em um projeto de tecnologia"
          className="rounded-2xl object-cover w-full h-full max-h-[500px] shadow-lg"
        />
      </div>

      {/* Coluna do Texto */}
      <div className="text-center lg:text-left">
        {/* Título com fonte maior */}
        <h2 className="text-5xl font-bold text-texto-principal mb-6">
          O que é ser um maker?
        </h2>
        
        {/* Parágrafos com fonte maior, mais espaçamento entre linhas e divididos para melhor legibilidade */}
        <div className="space-y-6 text-xl text-texto-secundario leading-relaxed">
          <p>
            Um maker é, em essência, um inventor da era digital. Uma pessoa curiosa e proativa que utiliza a tecnologia para criar, consertar e personalizar o mundo ao seu redor. Movidos pela paixão de aprender e pela satisfação de fazer com as próprias mãos, eles combinam ferramentas modernas, como a impressão 3D, com habilidades tradicionais.
          </p>
          <p>
            Eles representam a ideia de que qualquer um pode ser um criador, solucionando problemas de forma criativa e transformando um conceito digital em um objeto físico. Cada peça que você encontra aqui nasceu desse espírito inventivo e da busca incansável por materializar grandes ideias.
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

      <section id='form-maker'>
        <InviteForm />
      </section>

    </div>
  );
};

export default HomePage;
