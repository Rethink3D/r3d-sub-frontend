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
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  SUSPENDED = "SUSPENDED",
  DEACTIVATED = "DEACTIVATED",
}

export interface Contact {
  id: string;
  type: ContactTypeEnum;
  contactInfo: string;
}

export interface Image {
  id: string;
  filename: string;
  format: string;
  url: string;
  altText: string | null;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Maker {
  id: string;
  name: string;
  description: string;
  cpf: string;
  acceptsPersonalization: boolean;
  status: MakerStatusEnum;
  contacts: Contact[];
  profileImage: Image;
  categories: Category[];
  createdAt: string;
  updatedAt: string;
  location: string;
  rating?: number;
  productCount?: number;
}

export enum ProductTypeEnum {
  STANDARD = "STANDARD",
  PROMOTIONAL = "PROMOTIONAL",
}

export interface Product {
  id: string;
  name: string;
  description: string;
  material: MaterialTypeEnum;
  price: string;
  isPersonalizable: boolean;
  maker: Maker;
  images: Image[];
  categories: Category[];
  createdAt: string;
  deletedAt: string | null;
  popularity?: number;
  status: ProductStatusEnum;
  type: ProductTypeEnum;
}

export interface MakerPayload {
  name: string;
  cpf: string;
  description: string;
  acceptsPersonalization: boolean;
  status: MakerStatusEnum;
  contacts: {
    type: string;
    contactInfo: string;
  }[];
  categoryIds?: string[];
  recaptchaToken?: string;
}

export interface ProductPayload {
  name: string;
  description: string;
  material: string;
  price: string;
  isPersonalizable: boolean;
  makerId?: string;
  categoryIds?: string[];
  type?: ProductTypeEnum;
}

export enum ProductStatusEnum {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
}

export enum OrderStatusEnum {
  AWAITING_PAYMENT = "awaiting_payment",
  AWAITING_MAKER = "awaiting_maker",
  ON_GOING = "on_going",
  DELAYED = "delayed",
  NEW_DEADLINE = "new_deadline",
  READY = "ready",
  AWAITING_CONFIRMATION = "awaiting_confirmation",
  REFUND_IN_ANALYSIS = "refund_in_analysis",
  REFUND_IN_PROCESS = "refund_in_process",
  PARTIAL_REFUND = "partial_refund",
  REFUNDED = "refunded",
  DONE = "done",
}

export enum MaterialTypeEnum {
  PLA = "PLA",
  ABS = "ABS",
  PETG = "PETG",
  TPU = "TPU",
  Nylon = "Nylon",
  ASA = "ASA",
  PC = "Policarbonato",
  Resin = "Resina",
  Outro = "Outro",
}

export interface DevolutionImage {
  id: number;
  filename: string;
  format: string;
}

export interface DevolutionProduct {
  id: string;
  name: string;
  price: number;
}

export interface DevolutionProductItem {
  id: string;
  quantity: number;
  approvedQuantity: number;
  price: number;
  product: DevolutionProduct;
}

export interface DevolutionResponseDTO {
  id: string;
  orderId: string;
  reason: string;
  contact: string;
  creationTime: Date;
  products: DevolutionProductItem[];
  images: DevolutionImage[];
  orderStatus: OrderStatusEnum | null;
}
