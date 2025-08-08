import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import ProductDetailModal from "../../components/ProductDetailModal/ProductDetailModal";

// --- Ícones ---
const SearchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg> );
const FilterIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6-414 6.414a1 1 0 00-.293.707V19l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /> </svg> );

// --- Dados de Exemplo Completos e Consistentes ---
const mockProducts = [
    { 
      id: 1, 
      imageUrl: "https://http2.mlstatic.com/D_NQ_NP_835409-MLA49244622240_022022-W.webp", 
      title: "Action Figure Pikachu Detetive Pokémon", 
      price: "190.00", 
      isCustomizable: true,
      category: "Action Figure", 
      popularity: 8, 
      dateAdded: '2025-07-15',
      description: "Uma incrível action figure do Pikachu Detetive, feita com resina de alta qualidade e pintura detalhada à mão. Perfeito para colecionadores.",
      width: "15cm",
      height: "20cm",
      maker: {
        name: "Ana Silva",
        storeName: "Ana Artes 3D",
        location: "São Paulo, SP",
        offersCustomization: true
      }
    },
    { 
      id: 2, 
      imageUrl: "https://http2.mlstatic.com/D_NQ_NP_859203-MLA74092173275_012024-W.webp", 
      title: "Boneco Charmander Batalha Fogo Pokémon", 
      price: "150.00", 
      isCustomizable: false, 
      category: "Boneco", 
      popularity: 9, 
      dateAdded: '2025-08-01',
      description: "Boneco do Charmander em pose de batalha, com articulações nos braços e pernas. Ideal para brincar e decorar.",
      width: "12cm",
      height: "18cm",
      maker: {
        name: "Bruno Costa",
        storeName: "BC Prints",
        location: "Rio de Janeiro, RJ",
        offersCustomization: false
      }
    },
    { 
      id: 3, 
      imageUrl: "https://http2.mlstatic.com/D_NQ_NP_941198-MLB53740265824_022023-W.webp", 
      title: "Boneco Funko Pop Snorlax Pokémon #580", 
      price: "210.50", 
      isCustomizable: false, 
      category: "Funko Pop", 
      popularity: 10, 
      dateAdded: '2025-06-20',
      description: "Funko Pop original do Snorlax, item indispensável para qualquer coleção Pokémon.",
      width: "9cm",
      height: "10cm",
      maker: {
        name: "Carla Dias",
        storeName: "Pop Collectibles",
        location: "Belo Horizonte, MG",
        offersCustomization: true
      }
    },
];

const allCategories = Array.from(new Set(mockProducts.map(p => p.category)));
const ITEMS_PER_PAGE = 10;
const sortOptions = [
  { value: 'popularity', label: 'Em alta' },
  { value: 'recent', label: 'Mais recentes' },
  { value: 'price-asc', label: 'Mais baratos' },
  { value: 'price-desc', label: 'Mais caros' },
];

const Catalog: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [activeSearchTerm, setActiveSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto' };
  }, [selectedProduct]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...mockProducts];
    if (activeSearchTerm) { result = result.filter(p => p.title.toLowerCase().includes(activeSearchTerm.toLowerCase())); }
    if (selectedCategories.length > 0) { result = result.filter(p => selectedCategories.includes(p.category)); }
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); break;
      case 'price-desc': result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); break;
      case 'recent': result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()); break;
      case 'popularity': default: result.sort((a, b) => b.popularity - a.popularity); break;
    }
    return result;
  }, [activeSearchTerm, selectedCategories, sortBy]);
  
  const handleSearchClick = () => setActiveSearchTerm(searchInput);
  const handleCategoryToggle = (category: string) => setSelectedCategories(p => p.includes(category) ? p.filter(c => c !== category) : [...p, category]);
  const handleLoadMore = () => setVisibleCount(p => p + ITEMS_PER_PAGE);
  const productsToShow = filteredAndSortedProducts.slice(0, visibleCount);
  
  return (
    <>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-left mb-10">
          <h1 className="text-4xl md:text-5xl font-bold">Catálogo de Produtos</h1>
          <p className="text-lg text-gray-400 mt-2">Descubra produtos únicos criados por makers talentosos.</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-8">
            <div className="flex w-full md:w-auto md:flex-grow max-w-lg gap-3">
                <div className="relative flex-grow">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-4"><SearchIcon /></span>
                    <input type="text" placeholder="Buscar produtos..." value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearchClick()}
                        className="bg-fundo-cards w-full border border-borda text-texto-principal rounded-lg py-4 pl-14 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-sky-500 h-full" />
                </div>
                <div className="p-0.5 rounded-xl bg-gradient-to-br from-pink-500 via-purple-500 to-sky-400">
                    <button onClick={handleSearchClick} className="bg-fundo-principal text-texto-principal w-full h-full px-8 py-4 font-bold text-lg rounded-lg hover:bg-fundo-cards transition-colors">
                        Buscar
                    </button>
                </div>
            </div>
            <div className="flex gap-3 relative">
                <button onClick={() => setIsFilterOpen(!isFilterOpen)} className="flex items-center gap-2 bg-fundo-cards border border-borda rounded-lg px-4 py-2 text-texto-principal hover:border-gray-500 transition-colors">
                    <FilterIcon />
                    <span>Filtros</span>
                </button>
                <CustomSelect options={sortOptions} value={sortBy} onChange={(value) => setSortBy(value)} />
            </div>
        </div>
        {isFilterOpen && (
          <div className="bg-fundo-cards border border-borda rounded-lg p-4 mb-8 flex flex-wrap gap-x-6 gap-y-2 animate-fade-in-down">
            {allCategories.map(category => (
              <label key={category} className="flex items-center gap-2 cursor-pointer text-texto-principal">
                <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => handleCategoryToggle(category)}
                  className="h-4 w-4 rounded bg-fundo-principal border-borda text-sky-500 focus:ring-sky-600 cursor-pointer" />
                {category}
              </label>
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {productsToShow.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              description={product.category}
              onCardClick={() => setSelectedProduct(product)}
            />
          ))}
        </div>
        {productsToShow.length === 0 && (
           <div className="text-center py-16 col-span-full">
             <p className="text-xl text-gray-400">Nenhum produto encontrado com estes critérios.</p>
           </div>
        )}
        {productsToShow.length > 0 && productsToShow.length < filteredAndSortedProducts.length && (
          <div className="mt-12 text-center">
            <button onClick={handleLoadMore} className="bg-sky-600 text-white font-semibold rounded-lg px-8 py-3 hover:bg-sky-700 transition-transform duration-200 hover:scale-105">
              Carregar Mais
            </button>
          </div>
        )}
      </div>

      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
};

export default Catalog;