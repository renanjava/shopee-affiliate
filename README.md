# 🎁 Itambé Promoções

MVP de site de ofertas com links de afiliado da Shopee, usando Google Sheets como fonte de dados.

## 📋 Características

- ✅ Frontend-only (sem backend próprio)
- ✅ Dados atualizados via Google Sheets
- ✅ ISR (Incremental Static Regeneration) - atualização automática a cada 5 minutos
- ✅ SEO otimizado
- ✅ Design responsivo e moderno
- ✅ Links de afiliado prontos
- ✅ Deploy fácil na Vercel

## 🏗️ Estrutura do Projeto

```
shopee-affiliate/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── products/
│   │   │       └── route.ts          # API route com ISR
│   │   ├── layout.tsx                # Layout raiz com SEO
│   │   ├── page.tsx                  # Página inicial
│   │   └── globals.css               # Estilos globais
│   ├── components/
│   │   ├── ProductCard.tsx           # Card de produto
│   │   └── CategoryFilter.tsx        # Filtro de categorias
│   ├── lib/
│   │   └── fetchProducts.ts          # Funções para buscar dados
│   └── types/
│       └── product.ts                # Tipos TypeScript
├── .env.local.example                # Exemplo de variáveis de ambiente
├── next.config.js                    # Configuração do Next.js
├── package.json
└── tsconfig.json
```

## 📊 Configuração do Google Sheets

### 1. Criar a Planilha

Crie uma planilha no Google Sheets com as seguintes colunas:

| id | title | price | original_price | discount_percentage | image_url | affiliate_url | category | active |
|----|-------|-------|----------------|---------------------|-----------|---------------|----------|--------|
| 1 | Fone Bluetooth XYZ | 89.90 | 149.90 | 40 | https://... | https://shope.ee/... | Eletrônicos | true |
| 2 | Camiseta Básica | 29.90 | 49.90 | 40 | https://... | https://shope.ee/... | Moda | true |

### 2. Publicar como CSV

1. No Google Sheets, vá em **Arquivo** → **Compartilhar** → **Publicar na Web**
2. Selecione a aba desejada
3. Escolha formato **CSV**
4. Clique em **Publicar**
5. Copie a URL gerada

### 3. Configurar Variável de Ambiente

Crie o arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/e/SEU_ID_AQUI/pub?output=csv
REVALIDATE_TIME=300
```

## 🚀 Como Executar Localmente

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Variáveis de Ambiente

Copie `.env.local.example` para `.env.local` e configure a URL da planilha.

### 3. Executar em Desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:3000

## 📦 Deploy na Vercel

### 1. Conectar Repositório

1. Faça push do código para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project"
4. Importe seu repositório

### 2. Configurar Variáveis de Ambiente

No painel da Vercel, adicione:

- `NEXT_PUBLIC_GOOGLE_SHEETS_URL`: URL da planilha publicada
- `REVALIDATE_TIME`: 300 (ou outro valor em segundos)

### 3. Deploy

A Vercel fará o deploy automaticamente. Cada push na branch principal gerará um novo deploy.

## 🔄 Como Funciona a Atualização de Dados

1. **ISR (Incremental Static Regeneration)**: A API route `/api/products` é configurada com `revalidate = 300` (5 minutos)
2. **Cache Inteligente**: O Next.js mantém uma versão em cache e a atualiza em background
3. **Sem Redeploy**: Basta atualizar a planilha Google Sheets - os dados serão atualizados automaticamente

## 🎨 Personalização

### Cores

Edite as variáveis CSS em `src/app/globals.css`:

```css
:root {
  --primary-color: #ee4d2d;
  --primary-hover: #d73211;
  --secondary-color: #ff6b35;
}
```

### Tempo de Revalidação

Ajuste em `src/app/api/products/route.ts`:

```typescript
export const revalidate = 300; // segundos
```

## 📝 Boas Práticas

### Links de Afiliado

- ✅ Gere os links no painel da Shopee Afiliados
- ✅ Use links curtos (shope.ee/...)
- ✅ Teste cada link antes de adicionar à planilha
- ❌ Não tente gerar links dinamicamente

### SEO

- ✅ Títulos descritivos nos produtos
- ✅ Imagens otimizadas
- ✅ Meta tags configuradas
- ✅ Estrutura semântica HTML

### Performance

- ✅ Next.js Image para otimização automática
- ✅ ISR para cache inteligente
- ✅ CSS moderno e leve
- ✅ Sem dependências pesadas

## 🔒 Segurança

- ✅ Planilha pública (somente leitura)
- ✅ Links de afiliado pré-validados
- ✅ Sem exposição de dados sensíveis
- ✅ HTTPS obrigatório (Vercel)

## 🐛 Troubleshooting

### Produtos não aparecem

1. Verifique se a URL da planilha está correta
2. Confirme que a planilha está publicada como CSV
3. Verifique se há produtos com `active = true`
4. Veja o console do navegador para erros

### Imagens não carregam

1. Adicione o domínio em `next.config.js`:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'seu-dominio.com',
    },
  ],
}
```

### Dados não atualizam

1. Verifique o tempo de revalidação
2. Force um novo deploy na Vercel
3. Limpe o cache do navegador

## 📄 Licença

Este é um projeto MVP para fins educacionais e de validação de ideia.

## 🤝 Contribuindo

Este é um MVP simples. Para melhorias:

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

---

**Nota**: Este site é um afiliado independente da Shopee. Não somos a Shopee nem representamos oficialmente a marca.
