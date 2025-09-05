import { Product, Maker, Category } from "../types/types";
import { MakerStatusEnum, ContactTypeEnum } from "../types/types";

const categoriesMock: Category[] = [
  { id: "1", name: "Action Figure" },
  { id: "2", name: "Boneco" },
  { id: "3", name: "Funko Pop" },
  { id: "4", name: "Diorama" },
  { id: "5", name: "Miniatura" },
  { id: "6", name: "Cosplay" },
  { id: "7", name: "Acessórios" },
];

export const makersMock: Maker[] = [
  {
    id: "maker-1",
    name: "Ana Silva",
    storeName: "Ana Artes 3D",
    description: "Especialista em action figures detalhadas.",
    acceptsPersonalization: true,
    status: MakerStatusEnum.ACTIVE,
    contacts: [
      { type: ContactTypeEnum.WHATSAPP, contactInfo: "5511912345678" },
      { type: ContactTypeEnum.INSTAGRAM, contactInfo: "anaartes3d" },
    ],
    categories: [categoriesMock[0], categoriesMock[1]],
    profileImage: {
      id: "img-p1",
      filename: "ana.jpg",
      format: "jpeg",
      url: "https://placehold.co/100x100/3E3E3E/FFFFFF?text=Ana",
    },
    location: "São Luís",
    rating: 4.8,
    productCount: 52,
    bio: "Especialista em action figures detalhadas.",
    tags: ["Action Figures", "Colecionáveis"],
  },
];

const generateMockProducts = (count: number): Product[] => {
  const products: Product[] = [];
  const titles = [
    "Herói das Sombras",
    "Guerreiro Estelar",
    "Criatura Mística",
    "Robô de Batalha",
  ];

  for (let i = 1; i <= count; i++) {
    const randomCategory = categoriesMock[i % categoriesMock.length];
    const randomTitle = titles[i % titles.length];
    const randomMaker = makersMock[i % makersMock.length];
    const randomPrice = parseFloat((Math.random() * 250 + 50).toFixed(2));
    const randomDate = new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    );

    products.push({
      id: `${i}`,
      name: `${randomTitle} ${randomCategory.name} #${i}`,
      price: randomPrice,
      isPersonalizable: Math.random() > 0.5,
      categories: [randomCategory],
      popularity: Math.floor(Math.random() * 100),
      dateAdded: randomDate.toISOString().split("T")[0],
      description: `Descrição detalhada do ${randomTitle}.`,
      maker: randomMaker,
      material: "PLA",
      images: [
        {
          id: `img-${i}`,
          filename: `prod-${i}.jpg`,
          format: "jpeg",
          url: `https://placehold.co/400x400/5E5E5E/FFFFFF?text=Produto+${i}`,
        },
      ],
    });
  }
  return products;
};

export const mockProducts = generateMockProducts(100);

export const sortOptions = [
  { value: "price-asc", label: "Menor Preço" },
  { value: "price-desc", label: "Maior Preço" },
];
