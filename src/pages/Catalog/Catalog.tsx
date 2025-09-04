import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import CustomSelect from "../../components/CustomSelect/CustomSelect";
import MakerProfileModal from "../../components/MakerProfileModal/MakerProfileModal";
import styles from "./Catalogo.module.css";

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />{" "}
  </svg>
);
const FilterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V19l-4 2v-6.586a1 1 0 00-.293.707L3.293 7.293A1 1 0 013 6.586V4z"
    />{" "}
  </svg>
);
const LoadingSpinner = () => (
  <svg
    className="animate-spin h-8 w-8 text-blue-500"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-gray-500"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    {" "}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />{" "}
  </svg>
);

const generateMockProducts = (count) => {
  const products = [];
  const categories = [
    "Action Figure",
    "Boneco",
    "Funko Pop",
    "Diorama",
    "Miniatura",
    "Cosplay",
    "Acessórios",
  ];
  const titles = [
    "Herói das Sombras",
    "Guerreiro Estelar",
    "Criatura Mística",
    "Robô de Batalha",
    "Mago Poderoso",
    "Elmo Lendário",
    "Amuleto Antigo",
  ];
  const makers = [
    {
      name: "Ana Silva",
      storeName: "Ana Artes 3D",
      location: "São Paulo, SP",
      rating: 4.8,
      productCount: 52,
      bio: "Especialista em action figures detalhadas.",
      tags: ["Action Figures", "Colecionáveis"],
      offersCustomization: true,
      whatsapp: "5511912345678",
      instagram: "anaartes3d",
      featuredProduct: {
        imageUrl: "https://placehold.co/100x100/3E3E3E/FFFFFF?text=Heroi",
        title: "Herói Sombrio",
        description: "Peça de colecionador.",
        price: "250.00",
      },
    },
    {
      name: "Bruno Costa",
      storeName: "BC Prints",
      location: "Rio de Janeiro, RJ",
      rating: 4.9,
      productCount: 35,
      bio: "Dioramas e cenários realistas.",
      tags: ["Dioramas", "RPG"],
      offersCustomization: false,
      featuredProduct: {
        imageUrl: "https://placehold.co/100x100/3E3E3E/FFFFFF?text=Diorama",
        title: "Cenário Medieval",
        description: "Perfeito para jogos de RPG.",
        price: "350.00",
      },
    },
    {
      name: "Carla Dias",
      storeName: "Pop Collectibles",
      location: "Belo Horizonte, MG",
      rating: 4.7,
      productCount: 88,
      bio: "A maior coleção de Funkos customizados.",
      tags: ["Funko Pop", "Cultura Pop"],
      offersCustomization: true,
      instagram: "carlapops",
      featuredProduct: {
        imageUrl: "https://placehold.co/100x100/3E3E3E/FFFFFF?text=Funko",
        title: "Funko Custom",
        description: "Seu personagem favorito.",
        price: "180.00",
      },
    },
  ];
  for (let i = 1; i <= count; i++) {
    const randomCategory = categories[i % categories.length];
    const randomTitle = titles[i % titles.length];
    const randomMaker = makers[i % makers.length];
    const randomPrice = (Math.random() * 250 + 50).toFixed(2);
    products.push({
      id: i,
      imageUrl: `https://placehold.co/400x400/5E5E5E/FFFFFF?text=Produto+${i}`,
      title: `${randomTitle} ${randomCategory} #${i}`,
      price: randomPrice,
      isCustomizable: Math.random() > 0.5,
      category: randomCategory,
      popularity: Math.floor(Math.random() * 100),
      dateAdded: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0],
      description: `Descrição detalhada do ${randomTitle}.`,
      width: `${Math.floor(Math.random() * 10) + 10}cm`,
      height: `${Math.floor(Math.random() * 15) + 15}cm`,
      maker: randomMaker,
    });
  }
  return products;
};

const mockProducts = generateMockProducts(100);
const ITEMS_PER_PAGE = 12;
const sortOptions = [
  { value: "popularity", label: "Em alta" },
  { value: "recent", label: "Mais recentes" },
  { value: "price-asc", label: "Mais baratos" },
  { value: "price-desc", label: "Mais caros" },
];

const Catalog: React.FC = () => {
  const [searchInput, setSearchInput] = useState("");
  const [makerSearchInput, setMakerSearchInput] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popularity");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [selectedMaker, setSelectedMaker] = useState<any | null>(null);
  const [animateGrid, setAnimateGrid] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (selectedMaker) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedMaker]);

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

    if (searchInput) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    if (makerSearchInput) {
      result = result.filter((p) =>
        p.maker.name.toLowerCase().includes(makerSearchInput.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    switch (sortBy) {
      case "popularity":
        result.sort((a, b) => b.popularity - a.popularity);
        break;
      case "recent":
        result.sort(
          (a, b) =>
            new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
        );
        break;
      case "price-asc":
        result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        break;
      case "price-desc":
        result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        break;
      default:
        break;
    }
    return result;
  }, [searchInput, makerSearchInput, selectedCategories, sortBy]);

  useEffect(() => {
    triggerAnimation();
    setVisibleCount(ITEMS_PER_PAGE);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchInput, makerSearchInput, selectedCategories, sortBy]);

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
  const lastProductElementRef = useCallback(
    (node) => {
      if (isLoadingMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          productsToShow.length < filteredAndSortedProducts.length
        ) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prevCount) => prevCount + ITEMS_PER_PAGE);
            setIsLoadingMore(false);
          }, 500);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoadingMore, productsToShow.length, filteredAndSortedProducts.length]
  );

  return (
    <>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-gray-100 dark:bg-[#1a1a1a] rounded-2xl p-6 sticky top-28">
              <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {" "}
                <FilterIcon /> Categorias{" "}
              </h2>
              <ul className="space-y-2">
                {allCategories.map((category) => {
                  const isActive =
                    category === "Todos"
                      ? selectedCategories.length === 0
                      : selectedCategories.includes(category);

                  return (
                    <li key={category}>
                      <button
                        onClick={() => handleCategoryClick(category)}
                        className={`w-full flex justify-between items-center text-left py-3 px-4 rounded-lg transition-colors duration-300 ${
                          isActive
                            ? "bg-blue-500 text-white font-bold"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                        }`}
                      >
                        <span>{category}</span>
                        <span
                          className={`text-sm rounded-full px-2 py-0.5 ${
                            isActive
                              ? "bg-black/20"
                              : "bg-gray-200 dark:bg-gray-700/50"
                          }`}
                        >
                          {categoryCounts[category]}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-8">
              <div className="relative flex-grow w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  placeholder="Buscar produtos..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="bg-gray-100 dark:bg-[#1a1a1a] w-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-3 pl-14 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="relative flex-grow w-full">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4">
                  <UserIcon />
                </span>
                <input
                  type="text"
                  placeholder="Buscar por maker..."
                  value={makerSearchInput}
                  onChange={(e) => setMakerSearchInput(e.target.value)}
                  className="bg-gray-100 dark:bg-[#1a1a1a] w-full border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white rounded-lg py-3 pl-14 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <CustomSelect
                options={sortOptions}
                value={sortBy}
                onChange={(value) => setSortBy(value)}
              />
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${
                animateGrid ? styles.gridFadeIn : ""
              }`}
            >
              {productsToShow.map((product, index) => {
                const card = (
                  <ProductCard
                    key={product.id}
                    {...product}
                    description={product.category}
                    onCardClick={() => setSelectedMaker(product.maker)}
                  />
                );
                if (productsToShow.length === index + 1) {
                  return (
                    <div ref={lastProductElementRef} key={product.id}>
                      {card}
                    </div>
                  );
                }
                return card;
              })}
            </div>

            {productsToShow.length === 0 && !isLoadingMore && (
              <div className="text-center py-16 col-span-full">
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  Nenhum produto encontrado.
                </p>
              </div>
            )}

            {isLoadingMore && (
              <div className="flex justify-center items-center py-8">
                <LoadingSpinner />
              </div>
            )}
          </main>
        </div>
      </div>

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
