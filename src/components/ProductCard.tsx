import { Product } from "@/types/product";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/Skeleton";

interface ProductCardProps {
  product: Product;
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-shopee-md overflow-hidden shadow-shopee-sm border border-shopee-border flex flex-row h-auto min-h-[120px] md:grid md:grid-cols-1 md:h-[340px]">
      <div className="min-w-[100px] w-[100px] md:w-full md:h-[180px]">
        <Skeleton className="w-full h-full rounded-none" />
      </div>
      <div className="p-2.5 flex flex-col gap-1.5 justify-between flex-1">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>
        <div className="hidden md:flex flex-col gap-1">
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
        <div className="flex gap-2 items-stretch mt-auto">
          <Skeleton className="flex-1 h-8" />
          <Skeleton className="w-8 h-8" />
        </div>
      </div>
    </div>
  );
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showCopied, setShowCopied] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleClick = () => {
    setIsRedirecting(true);
    window.open(product.affiliate_url, "_blank", "noopener,noreferrer");
    setTimeout(() => setIsRedirecting(false), 2000);
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
      className="bg-white rounded-shopee-md overflow-hidden shadow-shopee-sm transition-all duration-300 hover:shadow-shopee-lg hover:-translate-y-0.5 hover:border-transparent border border-shopee-border flex flex-row h-auto min-h-[130px] md:grid md:grid-cols-1 md:h-[340px] cursor-pointer group"
      role="button"
      aria-label={`Abrir oferta de ${product.title}`}
    >
      <div className="relative min-w-[130px] w-[130px] md:w-full md:h-[180px] bg-white overflow-hidden flex items-center justify-center p-1 self-stretch border-r md:border-r-0 md:border-b border-shopee-border/50">
        {isImageLoading && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-none z-10" />
        )}
        <Image
          src={product.image_url}
          alt={product.title}
          width={400}
          height={400}
          className={`w-full h-full object-contain transition-all duration-500 ease-in-out group-hover:scale-105 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsImageLoading(false)}
          loading="lazy"
        />
      </div>

      <div className="p-2.5 flex flex-col justify-between flex-1 min-w-0">
        <div className="flex flex-col gap-1">
          <h3 className="text-[0.85rem] font-medium text-shopee-text-primary leading-tight line-clamp-2 md:line-clamp-2">
            {product.title}
          </h3>

          <div className="flex flex-col gap-0.5 md:gap-1 mt-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[1.1rem] md:text-xl font-bold text-shopee-orange tracking-tight">
                R$ {product.price.toFixed(2)}
              </span>
              {product.original_price > product.price && (
                <span className="text-[0.7rem] text-shopee-text-light line-through font-normal tabular-nums">
                  R$ {product.original_price.toFixed(2)}
                </span>
              )}
              {product.discount_percentage > 0 && (
                <span className="inline-flex items-center bg-shopee-orange/10 text-shopee-orange px-1.5 py-0.5 rounded text-[0.65rem] font-bold border border-shopee-orange/20">
                  -{product.discount_percentage}%
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-1.5 row-start-1">
              {product.sales && (
                <span className="text-[0.7rem] text-shopee-text-secondary whitespace-nowrap">
                  {product.sales} vendidos
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 items-center mt-2.5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            disabled={isRedirecting}
            className="flex-1 py-1.5 px-3 bg-shopee-orange text-white border-none rounded-md text-[0.8rem] font-semibold cursor-pointer transition-all duration-300 shadow-sm hover:bg-shopee-hover active:scale-95 flex items-center justify-center gap-1 group/btn disabled:opacity-70 disabled:cursor-not-allowed h-8"
            aria-label={`Ver oferta de ${product.title}`}
          >
            {isRedirecting ? (
              <svg className="animate-spin h-3.5 w-3.5 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : (
              <span>Ver Oferta</span>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare(e);
            }}
            className="flex items-center justify-center w-8 h-8 min-w-[32px] bg-transparent border border-shopee-border rounded-md cursor-pointer transition-all duration-200 text-shopee-text-secondary hover:bg-shopee-bg hover:text-shopee-orange active:scale-95 h-8"
            aria-label={`Compartilhar ${product.title}`}
          >
            {showCopied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"></circle>
                <circle cx="6" cy="12" r="3"></circle>
                <circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
            )}
          </button>
        </div>

        {showCopied && <span className="absolute bottom-2 right-2 text-[0.65rem] text-shopee-success font-bold bg-white px-2 py-0.5 rounded shadow animate-fadeInUp">Copiado!</span>}
      </div>
    </article>
  );
}
