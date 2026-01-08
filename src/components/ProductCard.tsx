import { Product } from "@/types/product";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./ui/Skeleton";

interface ProductCardProps {
  product: Product;
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-shopee-md overflow-hidden shadow-shopee-sm border border-shopee-border flex flex-row h-auto md:grid md:grid-cols-1 md:h-[420px]">
      <div className="min-w-[120px] w-[120px] md:w-full md:h-[200px]">
        <Skeleton className="w-full h-full rounded-none" />
      </div>
      <div className="p-4 flex flex-col gap-3 justify-between flex-1">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="h-4 w-1/3 mt-2" />
        </div>
        <div className="flex flex-col gap-1">
          <Skeleton className="h-3 w-1/4" />
          <Skeleton className="h-8 w-1/2" />
        </div>
        <div className="flex gap-2 items-stretch mt-auto">
          <Skeleton className="flex-1 h-10" />
          <Skeleton className="w-12 h-10" />
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
    // Reset after a short delay since we can't really know when the new tab is ready
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
      className="bg-white rounded-shopee-md overflow-hidden shadow-shopee-sm transition-all duration-300 hover:shadow-shopee-lg hover:-translate-y-1 hover:border-transparent border border-shopee-border flex flex-row h-auto md:grid md:grid-cols-1 md:h-[420px] cursor-pointer group"
      role="button"
      aria-label={`Abrir oferta de ${product.title}`}
    >
      <div className="relative min-w-[120px] w-[120px] md:w-full md:h-[200px] bg-[#f0f0f0] overflow-hidden">
        {isImageLoading && (
          <Skeleton className="absolute inset-0 w-full h-full rounded-none z-10" />
        )}
        <Image
          src={product.image_url}
          alt={product.title}
          width={400}
          height={400}
          className={`w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-105 ${
            isImageLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoad={() => setIsImageLoading(false)}
          loading="lazy"
        />
      </div>

      <div className="p-4 flex flex-col gap-3 justify-between flex-1">
        <div className="flex flex-col gap-2">
          <h3 className="text-[0.95rem] font-semibold text-shopee-text-primary leading-snug line-clamp-2 md:line-clamp-3">
            {product.title}
          </h3>

          {product.sales && (
            <div className="flex items-center gap-1.5 text-xs text-shopee-text-secondary font-medium">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-shopee-text-light"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>{product.sales} vendidos</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          {product.original_price > product.price && (
            <span className="text-xs text-shopee-text-light line-through font-normal">
              R$ {product.original_price.toFixed(2)}
            </span>
          )}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[1.3rem] md:text-2xl font-extrabold text-shopee-orange tracking-tight">
              R$ {product.price.toFixed(2)}
            </span>
            {product.discount_percentage > 0 && (
              <span className="inline-flex items-center bg-gradient-to-br from-shopee-success to-[#00d2a0] text-white px-2.5 py-0.5 rounded-full text-xs font-bold shadow-md">
                -{product.discount_percentage}%
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2 items-stretch mt-auto">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            disabled={isRedirecting}
            className="flex-1 py-2.5 px-4 bg-gradient-to-br from-shopee-orange to-shopee-secondary text-white border-none rounded-shopee-sm text-[0.9rem] font-semibold cursor-pointer transition-all duration-300 shadow-md hover:from-shopee-hover hover:to-shopee-orange hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 flex items-center justify-center gap-2 group/btn disabled:opacity-70 disabled:cursor-not-allowed"
            aria-label={`Ver oferta de ${product.title}`}
          >
            {isRedirecting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Carregando...</span>
              </>
            ) : (
              <>
                <span>Ver Oferta</span>
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
              </>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShare(e);
            }}
            className="flex items-center justify-center w-12 min-w-[48px] bg-white border-2 border-shopee-border rounded-shopee-sm cursor-pointer transition-all duration-300 text-shopee-text-secondary hover:bg-shopee-bg hover:border-shopee-orange hover:text-shopee-orange hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
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
                className="transition-transform duration-200 group-hover:scale-110"
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

        {showCopied && <span className="block text-center text-xs text-shopee-success mt-2 font-semibold animate-fadeInUp">Link copiado! ✓</span>}
      </div>
    </article>
  );
}
