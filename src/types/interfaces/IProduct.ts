import { Maker } from "./IMaker";
import { Image } from "./IImage";

export interface Product {
  id: string;
  name: string;
  description: string;
  material: string;
  price: number;
  isPersonalizable: boolean;
  maker: Maker;
  images?: Image[];
  categories: { id: string; name: string }[];
}
