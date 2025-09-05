export enum ContactTypeEnum {
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  WEBSITE = "WEBSITE",
  INSTAGRAM = "INSTAGRAM",
  FACEBOOK = "FACEBOOK",
  X_TWITTER = "X_TWITTER",
  WHATSAPP = "WHATSAPP",
  MERCADO_LIVRE = "MERCADO_LIVRE",
  OLX = "OLX",
  SHOPEE = "SHOPEE",
}

export enum MakerStatusEnum {
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  DEACTIVATED = "DEACTIVATED",
}

export interface Category {
  id: string;
  name: string;
}

export interface Image {
  id: string;
  filename: string;
  format: string;
  url?: string;
  altText?: string;
}

export interface Maker {
  id: string;
  name: string;
  description: string;
  acceptsPersonalization: boolean;
  status: MakerStatusEnum;
  contacts: { type: string; contactInfo: string }[];
  categories: Category[];
  profileImage?: Image;
  storeName?: string;
  location?: string;
  rating?: number;
  productCount?: number;
  bio?: string;
  tags?: string[];
  whatsapp?: string;
  instagram?: string;
  featuredProduct?: any;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  material: string;
  price: number;
  isPersonalizable: boolean;
  maker: Maker;
  images?: Image[];
  categories: Category[];
  popularity?: number;
  dateAdded?: string;
}
