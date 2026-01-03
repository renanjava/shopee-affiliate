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
    active: raw.active?.toLowerCase() === 'true',
    sales: raw.sales || undefined,
    commission: raw.commission ? parseFloat(raw.commission) : undefined,
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
      .filter((product) => product.active && product.id)
      .sort((a, b) => {
        const commissionA = a.commission || 0;
        const commissionB = b.commission || 0;
        return commissionB - commissionA;
      });

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