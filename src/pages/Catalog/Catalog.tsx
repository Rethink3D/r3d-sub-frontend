import React, { useState, useMemo, useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import ProductDetailModal from "../../components/ProductDetailModal/ProductDetailModal";
import MakerProfileModal from "../../components/MakerProfileModal/MakerProfileModal"; 
import styles from './Catalogo.module.css';

// --- Ícones ---
const SearchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg> );
const FilterIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V19l-4 2v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /> </svg> );
const ChevronDownIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /> </svg> );

// --- Dados de Exemplo ---
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
      maker: { name: "Ana Silva", storeName: "Ana Artes 3D", location: "São Paulo, SP", offersCustomization: true, whatsapp: "5511912345678", instagram: "anaartes3d" }
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
      maker: { name: "Bruno Costa", storeName: "BC Prints", location: "Rio de Janeiro, RJ", offersCustomization: false }
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
      maker: { name: "Carla Dias", storeName: "Pop Collectibles", location: "Belo Horizonte, MG", offersCustomization: true, instagram: "carlapops" }
    },
];

const ITEMS_PER_PAGE = 10;
const sortOptions = [
  { value: 'popularity', label: 'Em alta' },
  { value: 'recent', label: 'Mais recentes' },
  { value: 'price-asc', label: 'Mais baratos' },
  { value: 'price-desc', label: 'Mais caros' },
];

const Catalog: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("popularity");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [selectedMaker, setSelectedMaker] = useState<any | null>(null);
  const [animateGrid, setAnimateGrid] = useState(false);

  useEffect(() => {
    if (selectedProduct || selectedMaker) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto' };
  }, [selectedProduct, selectedMaker]);

  const triggerAnimation = () => {
    setAnimateGrid(false);
    setTimeout(() => setAnimateGrid(true), 50);
  };
  
  const categoryCounts = useMemo(() => {
    const counts: { [key: string]: number } = { Todos: mockProducts.length };
    mockProducts.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  const allCategories = ["Todos", ...Array.from(new Set(mockProducts.map(p => p.category)))];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...mockProducts];
    if (searchInput) { result = result.filter(p => p.title.toLowerCase().includes(searchInput.toLowerCase())); }
    if (selectedCategory !== "Todos") { result = result.filter(p => p.category === selectedCategory); }
    // ... (sua lógica de ordenação aqui)
    return result;
  }, [searchInput, selectedCategory, sortBy]);

  useEffect(() => {
    triggerAnimation();
  }, [searchInput, selectedCategory, sortBy]);

  const handleShowMakerProfile = (maker: any) => {
    setSelectedProduct(null);
    setSelectedMaker(maker);
  };
  
  const handleLoadMore = () => setVisibleCount(p => p + ITEMS_PER_PAGE);
  const productsToShow = filteredAndSortedProducts.slice(0, visibleCount);
  
  return (
    <>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          <aside className="lg:col-span-1">
            <div className="bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl p-6 sticky top-28">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-6">
                <FilterIcon />
                Categorias
              </h2>
              <ul className="space-y-2">
                {allCategories.map(category => (
                  <li key={category}>
                    <button 
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full flex justify-between items-center text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
                        selectedCategory === category 
                          ? 'bg-blue-500 text-white font-bold' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      <span>{category}</span>
                      <span className={`text-sm rounded-full px-2 py-0.5 ${
                        selectedCategory === category ? 'bg-black/20' : 'bg-gray-200 dark:bg-gray-700/50'
                      }`}>
                        {categoryCounts[category]}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-8">
              <div className="relative flex-grow w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4"><SearchIcon /></span>
                <input 
                  type="text" 
                  placeholder="Buscar produtos..." 
                  value={searchInput} 
                  onChange={e => setSearchInput(e.target.value)}
                  className="bg-gray-100 dark:bg-[#1a1a1a] w-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-3 pl-14 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <CustomSelect options={sortOptions} value={sortBy} onChange={(value) => setSortBy(value)} />
            </div>

            <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 ${animateGrid ? styles.gridFadeIn : ''}`}>
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
                <p className="text-xl text-gray-500 dark:text-gray-400">Nenhum produto encontrado.</p>
              </div>
            )}
            {productsToShow.length > 0 && productsToShow.length < filteredAndSortedProducts.length && (
              <div className="mt-12 text-center">
                <button onClick={handleLoadMore} className="bg-blue-600 text-white font-semibold rounded-lg px-8 py-3 hover:bg-blue-700 transition-transform duration-200 hover:scale-105">
                  Carregar Mais
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {selectedProduct && (
  <ProductDetailModal
    product={selectedProduct}
    onClose={() => setSelectedProduct(null)}
    onShowMakerProfile={handleShowMakerProfile} 
  />
)}

      {selectedMaker && (
        <MakerProfileModal
          maker={selectedMaker}
          onClose={() => setSelectedMaker(null)}
        />
      )}
    </>
  );
};

export default Catalog;
