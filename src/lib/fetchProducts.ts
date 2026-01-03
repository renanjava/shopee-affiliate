import Papa from 'papaparse';
import { Product } from '@/types/product';

interface ProductRaw {
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
    active: raw.active?.toLowerCase() === 'true',
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const spreadsheetId = '1Jm9nkz9SO4jeB5YX5JheSZ-RBFS6eWdtalHR1yHI6Pg';
  
  const csvUrl = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv&gid=0`;

  try {
    const response = await fetch(csvUrl, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar planilha: ${response.status}`);
    }

    const csvText = await response.text();

    const parsed = Papa.parse<ProductRaw>(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim(),
    });

    if (parsed.errors.length > 0) {
      console.error('Erros ao parsear CSV:', parsed.errors);
    }

    const products = parsed.data
      .map(parseProduct)
      .filter((product) => product.active && product.id);

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