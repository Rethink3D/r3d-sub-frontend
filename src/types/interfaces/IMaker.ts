import { MakerStatusEnum } from "../enums/maker-status.enum";
import { Image } from "./IImage";

export interface Maker {
  id: string;
  name: string;
  description: string;
  acceptsPersonalization: boolean;
  status: MakerStatusEnum;
  contacts: { type: string; contactInfo: string }[];
  categories: { id: string; name: string }[];
  profileImage?: Image;
}
