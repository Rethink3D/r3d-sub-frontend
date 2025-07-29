import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importando os componentes de layout com caminhos em minúsculas
import Header from './components/header/header';
import Footer from './components/footer/footer';

// Importando os componentes das páginas com caminhos em minúsculas
import HomePage from './pages/homepage';
import CatalogoPage from './pages/catalogopage';
import QuemSomosPage from './pages/quemsomos';
import ContatoPage from './pages/contatopage';

// Importando o CSS global
import './App.css';

const App: React.FC = () => {
  return (
    // CORREÇÃO: Estas 3 classes forçam o layout a ocupar a altura total do ecrã
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* A classe 'flex-1' faz com que esta secção principal cresça,
          empurrando o rodapé para o fundo do ecrã. */}
      <main className="container mx-auto flex-1 p-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalogo" element={<CatalogoPage />} />
          <Route path="/quem-somos" element={<QuemSomosPage />} />
          <Route path="/contato" element={<ContatoPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
