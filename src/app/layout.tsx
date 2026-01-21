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
        {children}

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
