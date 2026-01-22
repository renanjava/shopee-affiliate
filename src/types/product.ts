export interface Product {
  productName: string;
  offerLink: string;
  imageUrl: string;
  price: number;
  category?: string;
}

export interface ProductRaw {
  productName: string;
  offerLink: string;
  imageUrl: string;
  price: string;
  category?: string;
}

