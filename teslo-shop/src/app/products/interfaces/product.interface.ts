import { User } from "@auth/interfaces/user.interface";

export enum Gender {
  Men = 'men',
  Women = 'women',
  Kid = 'kid',
  Unisex = 'unisex'
}

export enum SizeEnum {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL'
}

export enum TagEnum {
  Shirt = 'shirt',
  Hoodie = 'hoodie',
  Hats = 'hats',
  Jacket = 'jacket',
  Sweatshirt = 'sweatshirt'
}



export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: SizeEnum[];
  gender: Gender;
  tags: TagEnum[];
  images: string[];
  user: User;
}


export interface ProductResponse {
  count: number;
  pages: number;
  products: Product[];
}
