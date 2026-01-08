import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Itambé Promoções - Ofertas Selecionadas da Shopee',
  description:
    'Produtos variados com curadoria de ofertas. Somos um site afiliado da Shopee.',
  keywords: ['promoções', 'ofertas', 'shopee', 'descontos', 'produtos'],
  authors: [{ name: 'Itambé Promoções' }],
  openGraph: {
    title: 'Itambé Promoções - Ofertas Selecionadas da Shopee',
    description:
      'Produtos variados com curadoria de ofertas. Somos um site afiliado da Shopee.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen flex flex-col bg-shopee-bg text-shopee-text-primary`}>
        <header className="bg-gradient-to-br from-shopee-orange to-shopee-secondary text-white py-8 shadow-md">
          <div className="max-w-[1280px] mx-auto px-6 flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-[1.75rem] font-extrabold m-0 flex items-center gap-2">
                🎁 Itambé Promoções
              </h1>
              <p className="text-[0.95rem] opacity-95 mt-1 font-normal">
                Produtos variados com curadoria de ofertas
              </p>
            </div>
            <div className="bg-white/25 backdrop-blur-md px-5 py-2 rounded-full text-[0.9rem] font-semibold border-2 border-white/30 text-white">
              Ofertas Quentes
            </div>
          </div>
        </header>

        <main className="flex-1 pb-12">{children}</main>

        <footer className="bg-[#2d3436] text-[#dfe6e9] py-10 mt-16 border-t-4 border-shopee-orange">
          <div className="max-w-[1280px] mx-auto px-6 text-center">
            <p className="my-2 text-[0.95rem] leading-relaxed">
              Somos um site afiliado da Shopee. Ao comprar através dos nossos
              links, você nos ajuda a continuar trazendo as melhores ofertas.
            </p>
            <p className="mt-6 pt-6 border-t border-white/10 text-shopee-text-light text-[0.875rem]">
              © {new Date().getFullYear()} Itambé Promoções
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
