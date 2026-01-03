import { NextResponse } from 'next/server';
import { fetchProducts, getCategories } from '@/lib/fetchProducts';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await fetchProducts();
    
    if (products.length === 0) {
      console.warn('Nenhum produto ativo encontrado');
    }
    
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