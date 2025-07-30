import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/Home/Home";
import CatalogoPage from "./pages/Catalog/Catalog";
import QuemSomosPage from "./pages/About/About";
import ContatoPage from "./pages/Contact/Contact";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

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
