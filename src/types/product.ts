export interface Product {
  id: string;
  title: string;
  price: number;
  original_price: number;
  discount_percentage: number;
  image_url: string;
  affiliate_url: string;
  category: string;
  active: boolean;
}

export interface ProductRaw {
  id: string;
  title: string;
  price: string;
  original_price: string;
  discount_percentage: string;
  image_url: string;
  affiliate_url: string;
  category: string;
  active: string;
}
