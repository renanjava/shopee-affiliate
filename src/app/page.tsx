"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { Product } from "@/types/product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<"commission" | "discount">("commission");
  const [loading, setLoading] = useState(true);

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

  // Toggle selection to avoid accidental multiple sets
  const handleSelectCategory = (category: string) => {
    setSelectedCategory((prev) => (prev === category ? "" : category));
  };

  // Debug logs to trace unexpected mutations/duplicates
  useEffect(() => {
    console.debug(
      "products count:",
      products.length,
      "selectedCategory:",
      selectedCategory
    );
  }, [products, selectedCategory]);

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
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center py-16 text-shopee-text-secondary text-lg flex flex-col items-center gap-4">
          Carregando ofertas...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto px-6">
      <section className="mt-8 mb-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-shopee-text-primary mb-1">
            Ofertas em destaque
          </h2>
          <p className="text-[0.95rem] text-shopee-text-secondary font-normal">
            {sortedAndFilteredProducts.length} produto
            {sortedAndFilteredProducts.length !== 1 ? "s" : ""} com desconto
            especial
          </p>
        </div>
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
          <p className="text-center py-16 text-shopee-text-secondary text-lg">
            Nenhum produto encontrado nesta categoria.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {sortedAndFilteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
