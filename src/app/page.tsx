"use client";

import { useState, useEffect } from "react";
import ProductCard, { ProductCardSkeleton } from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import WhatsAppBanner from "@/components/WhatsAppBanner";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { Product } from "@/types/product";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState<"commission" | "discount" | "price_low" | "price_under_20">("commission");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, sortBy]);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

  const searchedProducts = searchQuery
    ? filteredProducts.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredProducts;

  const sortedAndFilteredProducts = [...searchedProducts].sort((a, b) => {
    if (sortBy === "commission") {
      const commissionA = a.commission || 0;
      const commissionB = b.commission || 0;
      return commissionB - commissionA;
    } else if (sortBy === "discount") {
      return b.discount_percentage - a.discount_percentage;
    } else if (sortBy === "price_low") {
      return a.price - b.price;
    } else if (sortBy === "price_under_20") {
      const aUnder20 = a.price < 20 ? 0 : 1;
      const bUnder20 = b.price < 20 ? 0 : 1;
      if (aUnder20 !== bUnder20) return aUnder20 - bUnder20;
      return a.price - b.price;
    }
    return 0;
  });

  const totalPages = Math.ceil(sortedAndFilteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = sortedAndFilteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <>
        <Header onSearch={handleSearch} />
        <main className="flex-1 pb-4">
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
        </main>
        <WhatsAppFloat />
      </>
    );
  }

  return (
    <>
      <Header onSearch={handleSearch} />
      <main className="flex-1 pb-4">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6">
          <section className="mt-4 mb-4">
            <div className="mb-4">
              <h2 className="text-xl md:text-2xl font-bold text-shopee-text-primary mb-1">
                Ofertas em destaque
              </h2>
              <p className="text-xs md:text-sm text-shopee-text-secondary font-normal">
                {sortedAndFilteredProducts.length} produto
                {sortedAndFilteredProducts.length !== 1 ? "s" : ""} com desconto
                {searchQuery && ` para "${searchQuery}"`}
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
            {currentProducts.length === 0 ? (
              <p className="text-center py-12 text-shopee-text-secondary text-base">
                Nenhum produto encontrado{searchQuery && ` para "${searchQuery}"`}.
              </p>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-3 lg:grid-cols-3 xl:grid-cols-4 mb-8">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2 mt-8 mb-12 flex-wrap">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-shopee-border bg-white text-shopee-text-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:border-shopee-orange hover:text-shopee-orange transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNumber = idx + 1;
                      if (
                        pageNumber === 1 ||
                        pageNumber === totalPages ||
                        (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                      ) {
                        return (
                          <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            className={`w-10 h-10 rounded-xl font-bold text-sm transition-all border-2 ${
                              currentPage === pageNumber
                                ? "bg-shopee-orange border-shopee-orange text-white shadow-shopee-sm"
                                : "bg-white border-shopee-border text-shopee-text-secondary hover:border-shopee-orange hover:text-shopee-orange"
                            }`}
                          >
                            {pageNumber}
                          </button>
                        );
                      } else if (
                        pageNumber === currentPage - 2 ||
                        pageNumber === currentPage + 2
                      ) {
                        return <span key={pageNumber} className="text-shopee-text-light px-1">...</span>;
                      }
                      return null;
                    })}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="flex items-center justify-center w-10 h-10 rounded-xl border-2 border-shopee-border bg-white text-shopee-text-secondary disabled:opacity-30 disabled:cursor-not-allowed hover:border-shopee-orange hover:text-shopee-orange transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      </main>
      <WhatsAppFloat />
    </>
  );
}
