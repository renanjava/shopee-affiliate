import { NextResponse } from "next/server";
import { fetchProducts, fetchMetaData } from "@/lib/fetchProducts";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const [products, metaData] = await Promise.all([
      fetchProducts(),
      fetchMetaData(),
    ]);

    if (products.length === 0) {
      console.warn("Nenhum produto encontrado");
    }

    return NextResponse.json({
      products,
      metaData,
      lastUpdate: metaData?.lastUpdated || new Date().toISOString(),
    });
  } catch (error) {
    console.error("Erro na API de produtos:", error);
    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 },
    );
  }
}
