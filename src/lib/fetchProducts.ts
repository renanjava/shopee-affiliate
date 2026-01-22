import Papa from 'papaparse';
import { Product, ProductRaw } from '@/types/product';

function parseProduct(raw: ProductRaw): Product {
  return {
    productName: raw.productName,
    offerLink: raw.offerLink,
    imageUrl: raw.imageUrl,
    price: parseFloat(raw.price),
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
      .filter((product) => product.productName && product.offerLink);

    return products;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return [];
  }
}