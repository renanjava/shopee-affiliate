import { NextResponse } from 'next/server';
import { Product } from '@/types/product';
import productsData from '@/data/products.json';

export const revalidate = 300;

function getCategories(products: Product[]): string[] {
  const categories = new Set(products.map((p) => p.category));
  return Array.from(categories).sort();
}

export async function GET() {
  try {
    const products = productsData as Product[];
    const categories = getCategories(products);

    return NextResponse.json({
      products,
      categories,
      lastUpdate: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro na API de produtos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
}
