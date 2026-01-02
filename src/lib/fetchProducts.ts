import Papa from 'papaparse';
import { Product, ProductRaw } from '@/types/product';

function parseProduct(raw: ProductRaw): Product {
  return {
    id: raw.id,
    title: raw.title,
    price: parseFloat(raw.price),
    original_price: parseFloat(raw.original_price),
    discount_percentage: parseFloat(raw.discount_percentage),
    image_url: raw.image_url,
    affiliate_url: raw.affiliate_url,
    category: raw.category,
    active: raw.active.toLowerCase() === 'true',
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const sheetsUrl = process.env.NEXT_PUBLIC_GOOGLE_SHEETS_URL;

  if (!sheetsUrl) {
    console.error('NEXT_PUBLIC_GOOGLE_SHEETS_URL não configurada');
    return [];
  }

  try {
    const response = await fetch(sheetsUrl, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar planilha: ${response.status}`);
    }

    const csvText = await response.text();

    const parsed = Papa.parse<ProductRaw>(csvText, {
      header: true,
      skipEmptyLines: true,
    });

    if (parsed.errors.length > 0) {
      console.error('Erros ao parsear CSV:', parsed.errors);
    }

    const products = parsed.data
      .map(parseProduct)
      .filter((product) => product.active);

    return products;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}

export function getCategories(products: Product[]): string[] {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories).sort();
}
