import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import WhatsAppFloat from '@/components/WhatsAppFloat';

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
        <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-shopee-border">
          <div className="bg-gradient-to-r from-shopee-orange to-shopee-secondary py-1.5 px-6 text-center text-white text-[0.75rem] font-medium tracking-wide">
            🔥 AS MELHORES OFERTAS DA SHOPEE SELECIONADAS PARA VOCÊ
          </div>
          <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-4 flex justify-between items-center bg-white">
            <div className="flex items-center gap-3">
              <div className="bg-shopee-orange p-2 rounded-xl shadow-shopee-sm">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <h1 className="text-[1.25rem] md:text-[1.5rem] font-black m-0 leading-tight tracking-tight text-shopee-text-primary">
                  ITAMBÉ<span className="text-shopee-orange">PROMOÇÕES</span>
                </h1>
                <p className="text-[0.7rem] md:text-[0.8rem] text-shopee-text-secondary font-medium uppercase tracking-widest hidden sm:block">
                  Curadoria de Ofertas VIP
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden lg:flex items-center bg-shopee-bg border border-shopee-border rounded-full px-4 py-2 w-[350px]">
                <svg className="w-4 h-4 text-shopee-text-light mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-shopee-text-secondary text-sm">O que você está procurando?</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-shopee-orange/10 text-shopee-orange lg:hidden">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div className="bg-shopee-orange hover:bg-shopee-hover text-white px-4 md:px-5 py-2.5 rounded-full text-[0.85rem] font-bold shadow-shopee-sm transition-all active:scale-95 flex items-center gap-2">
                  <span className="hidden sm:inline">Comunidade</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 pb-4">{children}</main>

        <footer className="bg-[#1e272e] text-[#dfe6e9] py-8 mt-8 border-t-4 border-shopee-orange">
          <div className="max-w-[1280px] mx-auto px-6 text-center">
            <div className="mb-6 flex flex-col items-center">
              <h2 className="text-white text-lg font-bold mb-1">Itambé Promoções</h2>
              <p className="text-sm text-shopee-text-light max-w-lg mx-auto leading-relaxed">
                Selecionamos as melhores ofertas da Shopee para você. Ao comprar pelos nossos links, 
                você apoia nosso trabalho sem pagar nada a mais por isso.
              </p>
            </div>
            <p className="mt-8 pt-6 border-t border-white/5 text-shopee-text-light text-[0.75rem]">
              © {new Date().getFullYear()} Itambé Promoções. Todos os direitos reservados.
            </p>
          </div>
        </footer>

        <WhatsAppFloat />
      </body>
    </html>
  );
}
