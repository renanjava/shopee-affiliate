import { Product } from "@/types/product";
import Image from "next/image";
import { useState } from "react";
import IconButton from "@/components/ui/IconButton";
import { Button } from "./ui/Button";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showCopied, setShowCopied] = useState(false);

  const handleClick = () => {
    window.open(product.affiliate_url, "_blank", "noopener,noreferrer");
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();

    const shareData = {
      title: product.title,
      text: `Confira esta oferta: ${product.title} - R$ ${product.price.toFixed(
        2
      )}`,
      url: product.affiliate_url,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // user cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(product.affiliate_url);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      } catch (err) {
        console.error("Erro ao copiar link:", err);
      }
    }
  };

  return (
    <article
      onClick={handleClick}
      className="product-card group bg-white rounded-md overflow-hidden shadow-sm transition-transform hover:-translate-y-1 cursor-pointer flex flex-col md:flex-col"
      role="button"
      aria-label={`Abrir oferta de ${product.title}`}
    >
      <div className="product-image-wrapper relative w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
        <Image
          src={product.image_url}
          alt={product.title}
          width={300}
          height={300}
          className="object-cover w-full h-full"
        />
        {product.sales && (
          <div className="product-sales-badge absolute left-2 top-2 bg-white/90 text-xs text-orange-500 font-semibold rounded px-2 py-0.5">
            {product.sales} vendidos
          </div>
        )}
      </div>

      <div className="product-info p-4 flex flex-col gap-3 flex-1">
        <h3 className="product-title text-sm font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </h3>

        <div className="product-pricing">
          {product.original_price > product.price ? (
            <>
              <div className="flex items-baseline gap-2">
                <span className="original-price text-xs text-gray-400 line-through">
                  R$ {product.original_price.toFixed(2)}
                </span>
                <span className="current-price text-xl font-extrabold text-orange-500">
                  R$ {product.price.toFixed(2)}
                </span>
                {product.discount_percentage > 0 && (
                  <span className="discount-tag inline-flex items-center bg-green-500 text-white rounded-full text-xs font-bold px-2 py-0.5">
                    -{product.discount_percentage}%
                  </span>
                )}
              </div>
            </>
          ) : (
            <span className="current-price text-xl font-extrabold text-orange-500">
              R$ {product.price.toFixed(2)}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500">
              Taxa de comissão{" "}
              {product.commission ? `${product.commission}%` : "—"}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="py-2 px-3 bg-orange-500 hover:bg-orange-600"
              aria-label={`Ver oferta de ${product.title}`}
            >
              Ver Oferta
            </Button>

            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleShare(e);
              }}
              aria-label={`Compartilhar ${product.title}`}
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
            </IconButton>
          </div>
        </div>

        {showCopied && (
          <span className="copied-message text-sm text-green-600 mt-2">
            Link copiado! ✓
          </span>
        )}
      </div>
    </article>
  );
}
