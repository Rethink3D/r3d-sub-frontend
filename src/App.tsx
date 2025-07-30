import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import Catalog from "./pages/Catalog/Catalog";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

import "./App.css";

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="container mx-auto flex-1 p-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalog />} />
          <Route path="/quem-somos" element={<About />} />
          <Route path="/contato" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
};

export default App;
