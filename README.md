# 🎁 Itambé Promoções

Site de ofertas de alta performance com links de afiliado da Shopee, utilizando Google Sheets como CMS e alimentado por Next.js 14 com Tailwind CSS.

## � Novas Funcionalidades e Melhorias

-   ✅ **100% Tailwind CSS**: Migração total para uma arquitetura de estilos moderna e manutenível.
-   ✅ **Shimmer Loading State**: Skeletons com efeito de brilho (shimmer) para uma percepção de carregamento muito mais fluida.
-   ✅ **Filtros Sticky & Dropdown**: Barra de filtros fixa no topo com menus inteligentes para economizar espaço e facilitar a navegação.
-   ✅ **Layout de Alta Densidade**: Otimizado para exibir o máximo de ofertas possível sem sacrificar a legibilidade (foco mobile-first).
-   ✅ **Imagens Ampliadas no Mobile**: Imagens de 130px para melhor visualização dos produtos.
-   ✅ **Feedback de Interação**: Botões com estados de carregamento e mensagens de confirmação ao copiar links.
-   ✅ **ISR (Incremental Static Regeneration)**: Atualização automática dos dados a cada 5 minutos via Google Sheets.

## 🏗️ Estrutura do Projeto

```
shopee-affiliate/
├── src/
│   ├── app/
│   │   ├── api/products/route.ts     # API com ISR
│   │   ├── layout.tsx                # Layout raiz com SEO
│   │   ├── page.tsx                  # Home com grid de produtos
│   │   └── globals.css               # Diretivas do Tailwind
│   ├── components/
│   │   ├── ui/                       # Componentes base (Skeleton, Button)
│   │   ├── ProductCard.tsx           # Card de produto otimizado
│   │   └── CategoryFilter.tsx        # Filtros sticky com dropdown
│   ├── lib/
│   │   ├── fetchProducts.ts          # Busca de dados do Sheets
│   │   └── utils.ts                  # Utilitários (cn)
│   └── types/
│       └── product.ts                # Tipos TypeScript
├── tailwind.config.js                # Configuração de temas e animações
├── .env.local.example                # Exemplo de variáveis de ambiente
└── next.config.js                    # Configuração do Next.js
```

## 📊 Configuração do Google Sheets

### 1. Criar a Planilha

Crie uma planilha com as seguintes colunas (exatamente nesta ordem):

| id | title | price | original_price | discount_percentage | image_url | affiliate_url | category | active | sales |
|----|-------|-------|----------------|---------------------|-----------|---------------|----------|--------|-------|
| 1  | Fone Bluetooth | 89.90 | 149.90 | 40 | https://... | https://shope.ee/... | Eletrônicos | true | 1.293+ |

### 2. Publicar como CSV

1.  Vá em **Arquivo** → **Compartilhar** → **Publicar na Web**.
2.  Escolha a aba desejada e o formato **CSV**.
3.  Clique em **Publicar** e copie a URL gerada.

### 3. Variáveis de Ambiente

Crie o arquivo `.env.local`:

```env
NEXT_PUBLIC_GOOGLE_SHEETS_URL=Sua_URL_CSV_Aqui
REVALIDATE_TIME=300
```

## �️ Tecnologias Utilizadas

-   **Next.js 14**: Framework React com App Router.
-   **Tailwind CSS**: Estilização baseada em utilitários.
-   **Radix UI**: Componentes acessíveis.
-   **PapaParse**: Parsing eficiente de CSV.
-   **Lucide React**: Biblioteca de ícones (opcional).
-   **Shadcn/UI Patterns**: Padrões de design de alta fidelidade.

## 🎨 Personalização de Marca

Para alterar as cores e o tema (ex: Laranja Shopee), edite o arquivo `tailwind.config.js`:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      shopee: {
        orange: '#ff6b35',
        hover: '#ff5722',
        // ... outras cores customizadas
      },
    },
  }
}
```

## 📝 Boas Práticas e Performance

-   **Imagens**: Use o componente `next/image` para garantir WebP e lazy loading automático.
-   **SEO**: Cada página possui estrutura semântica correta (`h1` único, meta tags descritivas).
-   **Cache**: O ISR garante que o site seja sempre rápido, servindo arquivos estáticos que revalidam em background.

---

**Nota**: Este é um projeto de afiliado independente. Não temos vínculo oficial com a Shopee.
