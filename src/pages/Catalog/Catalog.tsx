import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import ProductCard from "./components/ProductCard/ProductCard";
import CustomSelect from "./components/CustomSelect/CustomSelect";
import MakerProfileModal from "./components/MakerProfileModal/MakerProfileModal";
import styles from "./Catalogo.module.css";

const SearchIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> </svg> );
const FilterIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}> <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V19l-4 2v-6.586a1 1 M00-.293.707L3.293 7.293A1 1 0 013 6.586V4z" /> </svg> );
const LoadingSpinner = () => ( <svg className="animate-spin h-8 w-8 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> );
const CloseIcon = () => (<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>);

const generateMockProducts = (count) => {
    const products = []; const categories = ["Action Figure", "Boneco", "Funko Pop", "Diorama", "Miniatura", "Cosplay", "Acessórios"]; const titles = ["Herói das Sombras", "Guerreiro Estelar", "Criatura Mística", "Robô de Batalha", "Mago Poderoso", "Elmo Lendário", "Amuleto Antigo"]; const makers = [{ name: "Ana Silva", storeName: "Ana Artes 3D", location: "São Paulo, SP", rating: 4.8, productCount: 52, bio: "Especialista em action figures detalhadas.", tags: ["Action Figures", "Colecionáveis"], offersCustomization: true, whatsapp: "5511912345678", instagram: "anaartes3d", featuredProduct: { imageUrl: "https://placehold.co/100x100/3E3E3E/FFFFFF?text=Heroi", title: "Herói Sombrio", description: "Peça de colecionador.", price: "250.00" } }, { name: "Bruno Costa", storeName: "BC Prints", location: "Rio de Janeiro, RJ", rating: 4.9, productCount: 35, bio: "Dioramas e cenários realistas.", tags: ["Dioramas", "RPG"], offersCustomization: false, featuredProduct: { imageUrl: "https://placehold.co/100x100/3E3E3E/FFFFFF?text=Diorama", title: "Cenário Medieval", description: "Perfeito para jogos de RPG.", price: "350.00" } }, { name: "Carla Dias", storeName: "Pop Collectibles", location: "Belo Horizonte, MG", rating: 4.7, productCount: 88, bio: "A maior coleção de Funkos customizados.", tags: ["Funko Pop", "Cultura Pop"], offersCustomization: true, instagram: "carlapops", featuredProduct: { imageUrl: "https://placehold.co/100x100/3E3E3E/FFFFFF?text=Funko", title: "Funko Custom", description: "Seu personagem favorito.", price: "180.00" } }]; for (let i = 1; i <= count; i++) { const randomCategory = categories[i % categories.length]; const randomTitle = titles[i % titles.length]; const randomMaker = makers[i % makers.length]; const randomPrice = (Math.random() * 250 + 50).toFixed(2); products.push({ id: i, imageUrl: `https://placehold.co/400x400/5E5E5E/FFFFFF?text=Produto+${i}`, title: `${randomTitle} ${randomCategory} #${i}`, price: randomPrice, isCustomizable: Math.random() > 0.5, category: randomCategory, popularity: Math.floor(Math.random() * 100), dateAdded: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split("T")[0], description: `Descrição detalhada do ${randomTitle}.`, width: `${Math.floor(Math.random() * 10) + 10}cm`, height: `${Math.floor(Math.random() * 15) + 15}cm`, maker: randomMaker, }); } return products;
};

const mockProducts = generateMockProducts(100);
const ITEMS_PER_PAGE = 20;
const sortOptions = [
    { value: "popularity", label: "Em alta" }, { value: "recent", label: "Mais recentes" }, { value: "price-asc", label: "Menor preço" }, { value: "price-desc", label: "Maior Preço" },
];

const Catalog: React.FC = () => {
    const [searchInput, setSearchInput] = useState("");
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState("popularity");
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [selectedMaker, setSelectedMaker] = useState<any | null>(null);
    const [animateGrid, setAnimateGrid] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

    useEffect(() => {
        if (selectedMaker || isMobileFiltersOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [selectedMaker, isMobileFiltersOpen]);

    const triggerAnimation = () => {
        setAnimateGrid(false);
        setTimeout(() => setAnimateGrid(true), 50);
    };

    const categoryCounts = useMemo(() => {
        const counts: { [key: string]: number } = { Todos: mockProducts.length };
        mockProducts.forEach((p) => {
            counts[p.category] = (counts[p.category] || 0) + 1;
        });
        return counts;
    }, []);

    const allCategories = [
        "Todos",
        ...Array.from(new Set(mockProducts.map((p) => p.category))),
    ];

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...mockProducts];
        if (searchInput) { result = result.filter((p) => p.title.toLowerCase().includes(searchInput.toLowerCase())); }
        if (selectedCategories.length > 0) { result = result.filter((p) => selectedCategories.includes(p.category)); }
        switch (sortBy) {
            case "popularity": result.sort((a, b) => b.popularity - a.popularity); break;
            case "recent": result.sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()); break;
            case "price-asc": result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price)); break;
            case "price-desc": result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price)); break;
            default: break;
        }
        return result;
    }, [searchInput, selectedCategories, sortBy]);

    useEffect(() => {
        triggerAnimation();
        setVisibleCount(ITEMS_PER_PAGE);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [searchInput, selectedCategories, sortBy]);

    const productsToShow = filteredAndSortedProducts.slice(0, visibleCount);

    const handleCategoryClick = (category: string) => {
        if (category === "Todos") {
            setSelectedCategories([]);
            return;
        }
        setSelectedCategories((prev) => {
            if (prev.includes(category)) {
                return prev.filter((c) => c !== category);
            } else {
                return [...prev, category];
            }
        });
    };

    const observer = useRef<IntersectionObserver>();
    const lastProductElementRef = useCallback((node) => {
        if (isLoadingMore) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && productsToShow.length < filteredAndSortedProducts.length) {
                setIsLoadingMore(true);
                setTimeout(() => {
                    setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
                    setIsLoadingMore(false);
                }, 500);
            }
        });
        if (node) observer.current.observe(node);
    }, [isLoadingMore, productsToShow.length, filteredAndSortedProducts.length]);

    const CategorySidebar = ({ inDrawer = false }) => (
        <div className={!inDrawer ? "bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl p-6 sticky top-28" : ""}>
            <div className={`flex items-center justify-between mb-6 ${!inDrawer ? "" : "p-4 border-b border-gray-200 dark:border-gray-700"}`}>
                <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
                    <FilterIcon /> Categorias
                </h2>
                {inDrawer && (
                    <button onClick={() => setIsMobileFiltersOpen(false)} className="text-gray-500 dark:text-gray-400">
                        <CloseIcon />
                    </button>
                )}
            </div>
            <ul className={`space-y-2 ${inDrawer ? "p-4" : ""}`}>
                {allCategories.map((category) => {
                    const isActive = category === "Todos" ? selectedCategories.length === 0 : selectedCategories.includes(category);
                    return (
                        <li key={category}>
                            <button onClick={() => { handleCategoryClick(category); if (inDrawer) setIsMobileFiltersOpen(false); }}
                                className={`w-full flex justify-between items-center text-left py-3 px-4 rounded-lg transition-colors duration-300 ${isActive ? "bg-blue-500 text-white font-bold" : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"}`}>
                                <span>{category}</span>
                                <span className={`text-sm rounded-full px-2 py-0.5 ${isActive ? "bg-black/20" : "bg-gray-200 dark:bg-gray-700/50"}`}>
                                    {categoryCounts[category]}
                                </span>
                            </button>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

    return (
        <>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <aside className="hidden lg:block lg:col-span-1">
                        <CategorySidebar />
                    </aside>

                    <main className="lg:col-span-3">
                        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                            <div className="relative w-full">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <SearchIcon />
                                </span>
                                <input type="text" placeholder="Buscar produtos..." value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                                    className="bg-gray-100 dark:bg-[#1a1a1a] w-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                            </div>
                            <div className="w-full sm:w-56">
                                <CustomSelect options={sortOptions} value={sortBy} onChange={(value) => setSortBy(value)} />
                            </div>
                        </div>

                        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-6 ${animateGrid ? styles.gridFadeIn : ""}`}>
                            {productsToShow.map((product, index) => {
                                const card = (<ProductCard key={product.id} {...product} description={product.category} onCardClick={() => setSelectedMaker(product.maker)} />);
                                if (productsToShow.length === index + 1) {
                                    return (<div ref={lastProductElementRef} key={product.id}>{card}</div>);
                                }
                                return card;
                            })}
                        </div>

                        {productsToShow.length === 0 && !isLoadingMore && (
                            <div className="text-center py-16 col-span-full">
                                <p className="text-xl text-gray-500 dark:text-gray-400">Nenhum produto encontrado.</p>
                            </div>
                        )}
                        {isLoadingMore && (<div className="flex justify-center items-center py-8"><LoadingSpinner /></div>)}
                    </main>
                </div>
            </div>

            {isMobileFiltersOpen && (
                <div role="dialog" aria-modal="true">
                    <div onClick={() => setIsMobileFiltersOpen(false)} className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity opacity-100"></div>
                    <div className={`fixed top-0 left-0 h-full w-full max-w-xs bg-white dark:bg-gray-900 z-50 transform transition-transform ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <CategorySidebar inDrawer={true} />
                    </div>
                </div>
            )}
            
            <button onClick={() => setIsMobileFiltersOpen(true)} className="lg:hidden fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 z-30">
                <FilterIcon />
            </button>

            {selectedMaker && (<MakerProfileModal maker={selectedMaker} onClose={() => setSelectedMaker(null)} />)}
        </>
    );
};

export default Catalog;