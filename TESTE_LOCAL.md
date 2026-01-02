# 🚀 Teste Rápido com Dados Locais

## Status Atual

✅ O projeto está configurado para usar dados de um arquivo JSON local (`src/data/products.json`) ao invés do Google Sheets.

Isso permite que você veja o site funcionando **imediatamente** sem precisar configurar a planilha!

## Como Executar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Executar em Desenvolvimento

```bash
npm run dev
```

### 3. Acessar no Navegador

Abra: http://localhost:3000

## 📊 Dados de Teste

O arquivo `src/data/products.json` contém 3 produtos de exemplo:

1. **Fone Bluetooth Premium** - R$ 89,90 (40% off)
2. **Camiseta Básica Algodão** - R$ 29,90 (40% off)
3. **Garrafa Térmica 500ml** - R$ 45,00 (50% off)

## 🔄 Adicionar Mais Produtos

Edite o arquivo `src/data/products.json` e adicione novos objetos no array:

```json
{
  "id": "4",
  "title": "Nome do Produto",
  "price": 99.90,
  "original_price": 199.90,
  "discount_percentage": 50,
  "image_url": "https://cf.shopee.com.br/file/...",
  "affiliate_url": "https://shope.ee/XXXXX",
  "category": "Categoria",
  "active": true
}
```

## 🖼️ Imagens dos Produtos

As URLs de imagem atuais são exemplos. Para usar imagens reais:

1. Acesse o produto na Shopee
2. Clique com botão direito na imagem
3. Selecione "Copiar endereço da imagem"
4. Cole no campo `image_url`

## 🔄 Migrar para Google Sheets

Quando estiver pronto para usar Google Sheets:

### 1. Restaurar API Original

Edite `src/app/api/products/route.ts`:

```typescript
import { NextResponse } from 'next/server';
import { fetchProducts, getCategories } from '@/lib/fetchProducts';

export const revalidate = 300;

export async function GET() {
  try {
    const products = await fetchProducts();
    const categories = getCategories(products);

    return NextResponse.json({
      products,
      categories,
      lastUpdate: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Erro na API de produtos:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar produtos' },
      { status: 500 }
    );
  }
}
```

### 2. Configurar Variáveis de Ambiente

```bash
cp .env.local.example .env.local
```

Edite `.env.local` e adicione a URL da planilha.

### 3. Seguir Guia Completo

Veja [PLANILHA_EXEMPLO.md](PLANILHA_EXEMPLO.md) para instruções detalhadas.

## 📁 Estrutura Atual

```
src/
├── data/
│   └── products.json          ← Dados locais (temporário)
├── app/
│   └── api/products/
│       └── route.ts           ← Usando JSON local
└── lib/
    └── fetchProducts.ts       ← Função Google Sheets (não usada agora)
```

## ✨ Próximos Passos

1. ✅ Teste o site localmente
2. 📝 Adicione produtos reais ao JSON
3. 🖼️ Substitua URLs de imagem por reais
4. 🔗 Adicione seus links de afiliado
5. 🚀 Quando estiver satisfeito, migre para Google Sheets
6. ☁️ Faça deploy na Vercel

---

**Dica**: Mantenha o JSON local para desenvolvimento rápido e use Google Sheets apenas em produção!
