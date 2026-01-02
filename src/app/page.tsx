'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Product } from '@/types/product';

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        setProducts(data.products);
        setCategories(data.categories);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = selectedCategory
    ? products.filter((p) => p.category === selectedCategory)
    : products;

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
            {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} com desconto especial
          </p>
        </div>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </section>

      <section className="products-section">
        
        {filteredProducts.length === 0 ? (
          <p className="no-products">
            Nenhum produto encontrado nesta categoria.
          </p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
