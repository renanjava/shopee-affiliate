import { Product } from '@/types/product';
import { formatPrice } from '@/utils/format';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleClick = () => {
    window.open(product.affiliate_url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    
    const shareData = {
      title: product.title,
      text: `Confira esta oferta: ${product.title} - R$ ${product.price.toFixed(2)}`,
      url: product.affiliate_url
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Compartilhamento cancelado');
      }
    } else {
      try {
        await navigator.clipboard.writeText(product.affiliate_url);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.error('Erro ao copiar link:', err);
      }
    }
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
      </div>

      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>

        <div className="product-pricing">
          {product.original_price > product.price && (
            <>
              <span className="original-price">
                {formatPrice(product.original_price)}
              </span>
              <div className="price-row">
                <span className="current-price">
                  {formatPrice(product.price)}
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
              {formatPrice(product.price)}
            </span>
          )}
        </div>

        <div className="product-actions">
          <button
            onClick={handleClick}
            className="offer-button"
            aria-label={`Ver oferta de ${product.title}`}
          >
            Ver Oferta
          </button>
          
          <button
            onClick={handleShare}
            className="share-button"
            aria-label={`Compartilhar ${product.title}`}
            title="Compartilhar oferta"
          >
            {showCopied ? (
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            )}
          </button>
        </div>
        
        {showCopied && (
          <span className="copied-message">Link copiado! ✓</span>
        )}
      </div>
    </div>
  );
}