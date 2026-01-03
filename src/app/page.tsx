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
      <div className="container">
        <div className="loading">Carregando ofertas...</div>
      </div>
    );
  }

  return (
    <div className="container">
      <section className="filters-section">
        <div className="section-header">
          <h2 className="section-title">Ofertas em destaque</h2>
          <p className="section-subtitle">
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

      <section className="products-section">
        {sortedAndFilteredProducts.length === 0 ? (
          <p className="no-products">
            Nenhum produto encontrado nesta categoria.
          </p>
        ) : (
          <div className="products-grid">
            {sortedAndFilteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
