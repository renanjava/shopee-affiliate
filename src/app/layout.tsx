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
      <body className={inter.className}>
        <header className="site-header">
          <div className="container">
            <div>
              <h1 className="site-title">
                🎁 Itambé Promoções
              </h1>
              <p className="site-subtitle">
                Produtos variados com curadoria de ofertas
              </p>
            </div>
            <div className="header-badge">
              Ofertas Quentes
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="container">
            <p>
              Somos um site afiliado da Shopee. Ao comprar através dos nossos
              links, você nos ajuda a continuar trazendo as melhores ofertas.
            </p>
            <p className="footer-note">
              © {new Date().getFullYear()} Itambé Promoções
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
