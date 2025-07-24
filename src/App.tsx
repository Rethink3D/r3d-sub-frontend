import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importando os componentes de layout
import Header from './components/header/header';
import Footer from './components/footer/footer';

// Importando os componentes das páginas
import HomePage from './pages/homepage';
import ContatoPage from './pages/contatopage';

// Importando o CSS global (mesmo que esteja vazio, é bom manter a estrutura)
import './App.css';

const App: React.FC = () => {
  return (
    // O div principal não precisa de classes de layout,
    // pois o fundo é controlado pelo <body> e o layout interno é gerenciado pelos filhos.
    <div className="bg-[#1F1F24] min-h-screen flex flex-col">
      <Header />
      
      {/* Área principal onde o conteúdo das páginas será renderizado */}
      <main className="container mx-auto flex-1 p-8">
        <Routes>
          {/* Rota para a página inicial */}
          <Route path="/" element={<HomePage />} />

          {/* Rota para a página de catálogo */}
          <Route path="/catalogo" element={<p>Página do Catálogo em construção...</p>} />

          {/* Rota para a página "Quem Somos" */}
          <Route path="/quem-somos" element={<p>Página "Quem Somos" em construção...</p>} />

          {/* Rota para a página de contato */}
          <Route path="/contato" element={<ContatoPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;