import { Product } from '@/types/product';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleClick = () => {
    window.open(product.affiliate_url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <Image
          src={product.image_url}
          alt={product.title}
          width={300}
          height={300}
          className="product-image"
        />
        <div className="product-category">
          {product.category}
        </div>
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>

        <div className="product-pricing">
          {product.original_price > product.price && (
            <>
              <span className="original-price">
                R$ {product.original_price.toFixed(2)}
              </span>
              <div className="price-row">
                <span className="current-price">
                  R$ {product.price.toFixed(2)}
                </span>
                {product.discount_percentage > 0 && (
                  <span className="discount-tag">
                    -{product.discount_percentage}%
                  </span>
                )}
              </div>
            </>
          )}
          {!(product.original_price > product.price) && (
            <span className="current-price">
              R$ {product.price.toFixed(2)}
            </span>
          )}
        </div>

        <button
          onClick={handleClick}
          className="offer-button"
          aria-label={`Ver oferta de ${product.title}`}
        >
          Ver Oferta
        </button>
      </div>
    </div>
  );
}
