# 📊 Exemplo de Planilha Google Sheets

## Estrutura da Planilha

Crie uma planilha com exatamente estas colunas (na ordem):

| Coluna | Tipo | Descrição | Exemplo |
|--------|------|-----------|---------|
| id | texto | Identificador único | "1", "2", "3" |
| title | texto | Nome do produto | "Fone Bluetooth Premium" |
| price | número | Preço atual | 89.90 |
| original_price | número | Preço original | 149.90 |
| discount_percentage | número | Percentual de desconto | 40 |
| image_url | URL | Link da imagem | https://cf.shopee.com.br/file/... |
| affiliate_url | URL | Link de afiliado | https://shope.ee/XXXXX |
| category | texto | Categoria do produto | "Eletrônicos" |
| active | booleano | Se está ativo | true ou false |

## Exemplo Completo

```
id	title	price	original_price	discount_percentage	image_url	affiliate_url	category	active
1	Fone Bluetooth Premium	89.90	149.90	40	https://cf.shopee.com.br/file/exemplo1.jpg	https://shope.ee/ABC123	Eletrônicos	true
2	Camiseta Básica Algodão	29.90	49.90	40	https://cf.shopee.com.br/file/exemplo2.jpg	https://shope.ee/DEF456	Moda	true
3	Garrafa Térmica 500ml	45.00	89.90	50	https://cf.shopee.com.br/file/exemplo3.jpg	https://shope.ee/GHI789	Casa	true
4	Mouse Gamer RGB	79.90	159.90	50	https://cf.shopee.com.br/file/exemplo4.jpg	https://shope.ee/JKL012	Eletrônicos	true
5	Tênis Esportivo	149.90	299.90	50	https://cf.shopee.com.br/file/exemplo5.jpg	https://shope.ee/MNO345	Moda	false
```

## Como Obter os Dados

### 1. Link de Afiliado (affiliate_url)

1. Acesse o [Painel de Afiliados da Shopee](https://affiliate.shopee.com.br/)
2. Faça login
3. Busque o produto desejado
4. Clique em "Gerar Link"
5. Copie o link curto (formato: https://shope.ee/XXXXX)

### 2. Imagem do Produto (image_url)

**Opção 1 - Da página do produto:**
1. Abra o produto na Shopee
2. Clique com botão direito na imagem principal
3. Selecione "Copiar endereço da imagem"

**Opção 2 - Do painel de afiliados:**
1. No painel de afiliados, ao gerar o link
2. Copie a URL da imagem fornecida

### 3. Preços e Descontos

- `price`: Preço atual com desconto
- `original_price`: Preço antes do desconto
- `discount_percentage`: Calcule: ((original - atual) / original) × 100

### 4. Categorias Sugeridas

Use categorias consistentes para facilitar a filtragem:

- Eletrônicos
- Moda
- Casa e Decoração
- Beleza e Cuidados
- Esportes
- Livros
- Brinquedos
- Alimentos
- Pet Shop
- Automotivo

## Publicar a Planilha

### Passo a Passo

1. **Abra sua planilha no Google Sheets**

2. **Vá em: Arquivo → Compartilhar → Publicar na Web**

3. **Configurações:**
   - Aba: Selecione a aba com os produtos (geralmente "Planilha1")
   - Formato: **CSV** (muito importante!)

4. **Clique em "Publicar"**

5. **Copie a URL gerada**
   - Deve ter este formato:
   ```
   https://docs.google.com/spreadsheets/d/e/2PACX-XXXXXXX/pub?output=csv
   ```

6. **Cole esta URL no arquivo `.env.local`:**
   ```env
   NEXT_PUBLIC_GOOGLE_SHEETS_URL=https://docs.google.com/spreadsheets/d/e/2PACX-XXXXXXX/pub?output=csv
   ```

## Dicas Importantes

### ✅ Boas Práticas

1. **IDs únicos**: Use números sequenciais (1, 2, 3...)
2. **Títulos claros**: Seja descritivo mas conciso
3. **Preços corretos**: Sempre com 2 casas decimais (use ponto, não vírgula)
4. **Links válidos**: Teste cada link de afiliado antes de adicionar
5. **Imagens de qualidade**: Use imagens claras e bem iluminadas
6. **Categorias consistentes**: Use sempre os mesmos nomes

### ❌ Erros Comuns

1. **Vírgula em vez de ponto**: Use 89.90, não 89,90
2. **Links quebrados**: Sempre teste antes de publicar
3. **Colunas faltando**: Todas as 9 colunas são obrigatórias
4. **Formato errado**: Publique como CSV, não como página web
5. **Planilha privada**: Certifique-se de que está publicada

## Atualização de Dados

### Como Atualizar Produtos

1. **Edite a planilha normalmente**
2. **As mudanças são automáticas** - não precisa republicar
3. **Aguarde até 5 minutos** para o site atualizar (ISR)

### Adicionar Novo Produto

1. Adicione uma nova linha
2. Preencha todas as colunas
3. Defina `active` como `true`
4. Salve (Ctrl+S ou Cmd+S)

### Desativar Produto

1. Encontre o produto na planilha
2. Mude `active` de `true` para `false`
3. Salve

### Remover Produto

**Opção 1 - Desativar (recomendado):**
- Mude `active` para `false`

**Opção 2 - Deletar:**
- Delete a linha inteira
- Reorganize se necessário

## Template para Download

Você pode criar uma cópia desta planilha modelo:

[Link para planilha modelo](https://docs.google.com/spreadsheets/d/EXEMPLO)

Ou crie uma nova seguindo exatamente a estrutura acima.

## Validação dos Dados

Antes de publicar, verifique:

- [ ] Todas as 9 colunas estão presentes
- [ ] Não há linhas vazias no meio dos dados
- [ ] Todos os preços usam ponto (não vírgula)
- [ ] Todos os links de afiliado funcionam
- [ ] Todas as imagens carregam
- [ ] Pelo menos um produto tem `active = true`
- [ ] A planilha está publicada como CSV
- [ ] A URL pública foi copiada corretamente

---

**Dica Pro**: Mantenha uma segunda aba na planilha com produtos inativos ou para rascunho. Assim você pode preparar novos produtos antes de ativá-los.
