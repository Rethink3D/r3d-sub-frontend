import React from "react";
import ProductCard from "../../components/ProductCard/ProductCard";

const mockProducts = [
  {
    id: 1,
    imageUrl: "https://placehold.co/200x200/FFFFFF/000000?text=Pidgey",
    title: "Pikachu",
    description:
      "Descrição bacana sobre o Pikachu, ele é muito incrível e fica muito bonito com esse protótipo.",
    price: "190,00",
  },
  {
    id: 2,
    imageUrl: "https://placehold.co/200x200/FFFFFF/000000?text=Pidgeotto",
    title: "Passaro",
    description:
      "Descrição bacana sobre o Pikachu, ele é muito incrível e fica muito bonito com esse protótipo.",
    price: "190,00",
  },
  {
    id: 3,
    imageUrl: "https://placehold.co/200x200/FFFFFF/000000?text=Pikachu",
    title: "Rato",
    description:
      "Descrição bacana sobre o Pikachu, ele é muito incrível e fica muito bonito com esse protótipo.",
    price: "190,00",
  },
  {
    id: 4,
    imageUrl: "https://placehold.co/200x200/FFFFFF/000000?text=Ninetales",
    title: "Rato com calda",
    description:
      "Descrição bacana sobre o Pikachu, ele é muito incrível e fica muito bonito com esse protótipo.",
    price: "190,00",
  },
  {
    id: 5,
    imageUrl: "https://placehold.co/200x200/FFFFFF/000000?text=Jigglypuff",
    title: "Bixo da nintendo",
    description:
      "Descrição bacana sobre o Pikachu, ele é muito incrível e fica muito bonito com esse protótipo.",
    price: "190,00",
  },
  {
    id: 6,
    imageUrl: "https://placehold.co/200x200/FFFFFF/000000?text=Zubat",
    title: "Batasa",
    description:
      "Descrição bacana sobre o Pikachu, ele é muito incrível e fica muito bonito com esse protótipo.",
    price: "190,00",
  },
  {
    id: 7,
    imageUrl: "https://placehold.co/200x200/FFFFFF/000000?text=Machamp",
    title: "Pikachu",
    description:
      "Descrição bacana sobre o Pikachu, ele é muito incrível e fica muito bonito com esse protótipo.",
    price: "190,00",
  },
  {
    id: 8,
    imageUrl: "https://placehold.co/200x200/FFFFFF/000000?text=Abra",
    title: "Pikachu",
    description:
      "Descrição bacana sobre o Pikachu, ele é muito incrível e fica muito bonito com esse protótipo.",
    price: "190,00",
  },
];

const CatalogoPage: React.FC = () => {
  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-5xl font-bold text-white">
          Explore nosso catálogo 🛒
        </h1>
        <div className="relative">
          <select className="bg-[#2a2a3a] border border-gray-700 text-white rounded-lg py-2 px-4 appearance-none">
            <option>Mais Recentes</option>
            <option>Menor Preço</option>
            <option>Maior Preço</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            imageUrl={product.imageUrl}
            title={product.title}
            description={product.description}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogoPage;
