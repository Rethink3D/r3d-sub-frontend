import { Product, Maker, Category } from "../types/types";
import { MakerStatusEnum, ContactTypeEnum } from "../types/types";

const categoriesMock: Category[] = [
  {
    id: "1",
    name: "Action Figure",
    description: "Figuras de ação colecionáveis.",
  },
  { id: "2", name: "Boneco", description: "Bonecos de personagens diversos." },
  { id: "3", name: "Funko Pop", description: "Miniaturas de vinil da Funko." },
  { id: "4", name: "Diorama", description: "Cenários em miniatura." },
  { id: "5", name: "Miniatura", description: "Réplicas em escala de objetos." },
  { id: "6", name: "Cosplay", description: "Acessórios e props para cosplay." },
  { id: "7", name: "Acessórios", description: "Chaveiros e outros itens." },
];

export const makersMock: Maker[] = [
  {
    id: "maker-1",
    name: "Ana Silva",
    description: "Especialista em action figures detalhadas.",
    acceptsPersonalization: true,
    status: MakerStatusEnum.ACTIVE,
    contacts: [
      {
        id: "contact-1",
        type: ContactTypeEnum.WHATSAPP,
        contactInfo: "5511912345678",
      },
      {
        id: "contact-2",
        type: ContactTypeEnum.INSTAGRAM,
        contactInfo: "anaartes3d",
      },
    ],
    categories: [categoriesMock[0], categoriesMock[1]],
    profileImage: {
      id: "img-p1",
      filename: "ana.jpg",
      format: "jpeg",
      url: "https://placehold.co/100x100/3E3E3E/FFFFFF?text=Ana",
      altText: "Foto de perfil de Ana Silva",
    },
    location: "São Luís",
    rating: 4.8,
    productCount: 52,
    createdAt: "2025-09-01T10:00:00.000Z",
    updatedAt: "2025-09-05T15:30:00.000Z",
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
    const randomPrice = (Math.random() * 250 + 50).toFixed(2);
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
      createdAt: randomDate.toISOString(),
      deletedAt: null,
      description: `Descrição detalhada do ${randomTitle}.`,
      maker: randomMaker,
      material: "PLA",
      images: [
        {
          id: `img-${i}`,
          filename: `prod-${i}.jpg`,
          format: "jpeg",
          url: `https://placehold.co/400x400/5E5E5E/FFFFFF?text=Produto+${i}`,
          altText: `Imagem do produto ${randomTitle}`,
        },
      ],
    });
  }
  return products;
};

export const mockProducts = generateMockProducts(100);

export const sortOptions = [
  { value: "relevance", label: "Ordenar por" },
  { value: "price-asc", label: "Menor Preço" },
  { value: "price-desc", label: "Maior Preço" },
];
