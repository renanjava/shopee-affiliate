"use client";

import { useState, useEffect } from "react";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import WhatsAppBanner from "@/components/WhatsAppBanner";
import { Product } from "@/types/product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<"commission" | "discount">("commission");
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(15);
  const itemsPerPage = 15;

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        setProducts(data.products);
        setCategories(data.categories);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
  };

  useEffect(() => {
    setVisibleCount(itemsPerPage);
  }, [selectedCategory, sortBy]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerPage);
  };

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "commission") {
      const commissionA = a.commission || 0;
      const commissionB = b.commission || 0;
      return commissionB - commissionA;
    } else {
      return b.discount_percentage - a.discount_percentage;
    }
  });

  if (loading) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 md:px-6">
        <section className="mt-4 mb-4">
          <div className="mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-shopee-text-primary mb-1">
              Ofertas em destaque
            </h2>
            <div className="h-4 w-32 bg-muted/50 animate-pulse rounded" />
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-8 w-20 bg-muted/50 animate-pulse rounded-full" />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3 xl:grid-cols-4 mb-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 md:px-6">
      <section className="mt-4 mb-4">
        <div className="mb-4">
          <h2 className="text-xl md:text-2xl font-bold text-shopee-text-primary mb-1">
            Ofertas em destaque
          </h2>
          <p className="text-xs md:text-sm text-shopee-text-secondary font-normal">
            {sortedAndFilteredProducts.length} produto
            {sortedAndFilteredProducts.length !== 1 ? "s" : ""} com desconto
          </p>
        </div>
        
        <WhatsAppBanner />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </section>

      <section>
        {sortedAndFilteredProducts.length === 0 ? (
          <p className="text-center py-12 text-shopee-text-secondary text-base">
            Nenhum produto encontrado nesta categoria.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3 xl:grid-cols-4 mb-8">
              {sortedAndFilteredProducts.slice(0, visibleCount).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {visibleCount < sortedAndFilteredProducts.length && (
              <div className="flex justify-center mt-6 mb-6">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-white text-shopee-orange border-2 border-shopee-orange font-bold rounded-full hover:bg-shopee-orange hover:text-white transition-all duration-300 shadow-shopee-sm hover:shadow-shopee-md active:scale-95"
                >
                  Carregar mais produtos
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
