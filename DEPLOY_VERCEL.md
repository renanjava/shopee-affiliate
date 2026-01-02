# 🚀 Guia de Deploy na Vercel

## Pré-requisitos

- [ ] Conta no GitHub
- [ ] Conta na Vercel (pode usar login do GitHub)
- [ ] Planilha Google Sheets configurada e publicada
- [ ] Código do projeto em um repositório Git

## Passo 1: Preparar o Repositório

### 1.1 Criar Repositório no GitHub

```bash
# Inicializar Git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit inicial
git commit -m "Initial commit: Itambé Promoções MVP"

# Criar repositório no GitHub e conectar
git remote add origin https://github.com/SEU_USUARIO/itambe-promocoes.git

# Enviar código
git push -u origin main
```

### 1.2 Verificar Arquivos Importantes

Certifique-se de que estes arquivos estão no repositório:

- ✅ `package.json`
- ✅ `next.config.js`
- ✅ `tsconfig.json`
- ✅ `.gitignore`
- ✅ `.env.local.example` (NÃO commitar `.env.local`)

## Passo 2: Deploy na Vercel

### 2.1 Acessar Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up" ou "Login"
3. Use "Continue with GitHub"

### 2.2 Importar Projeto

1. No dashboard, clique em **"Add New..."** → **"Project"**
2. Selecione seu repositório `itambe-promocoes`
3. Clique em **"Import"**

### 2.3 Configurar Projeto

**Framework Preset**: Next.js (detectado automaticamente)

**Root Directory**: `./` (deixe como está)

**Build Command**: `npm run build` (padrão)

**Output Directory**: `.next` (padrão)

### 2.4 Configurar Variáveis de Ambiente

Na seção **Environment Variables**, adicione:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_GOOGLE_SHEETS_URL` | `https://docs.google.com/spreadsheets/d/e/SEU_ID/pub?output=csv` |
| `REVALIDATE_TIME` | `300` |

**Importante**: Cole a URL completa da sua planilha publicada!

### 2.5 Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (geralmente 1-3 minutos)
3. ✅ Deploy concluído!

## Passo 3: Verificar Deploy

### 3.1 Acessar Site

Após o deploy, você receberá uma URL como:

```
https://itambe-promocoes.vercel.app
```

### 3.2 Testar Funcionalidades

- [ ] Página carrega corretamente
- [ ] Produtos aparecem
- [ ] Imagens carregam
- [ ] Filtro de categorias funciona
- [ ] Botão "Ver Oferta" abre link da Shopee
- [ ] Design está correto
- [ ] Responsivo funciona (teste no celular)

### 3.3 Verificar Dados

1. Abra o DevTools (F12)
2. Vá na aba "Network"
3. Recarregue a página
4. Procure por `/api/products`
5. Verifique se os dados estão corretos

## Passo 4: Configurar Domínio (Opcional)

### 4.1 Domínio Personalizado

1. No dashboard da Vercel, vá em **Settings** → **Domains**
2. Clique em **"Add"**
3. Digite seu domínio (ex: `itambepromos.com.br`)
4. Siga as instruções para configurar DNS

### 4.2 Configuração DNS

Adicione estes registros no seu provedor de domínio:

**Tipo A:**
```
@ → 76.76.21.21
```

**Tipo CNAME:**
```
www → cname.vercel-dns.com
```

## Passo 5: Atualizações Futuras

### 5.1 Atualizar Código

```bash
# Fazer mudanças no código
git add .
git commit -m "Descrição das mudanças"
git push

# A Vercel fará deploy automaticamente!
```

### 5.2 Atualizar Produtos

1. Edite a planilha Google Sheets
2. Aguarde até 5 minutos
3. Os dados serão atualizados automaticamente (ISR)
4. **Não precisa fazer redeploy!**

### 5.3 Forçar Revalidação

Se precisar atualizar imediatamente:

1. No dashboard da Vercel
2. Vá em **Deployments**
3. Clique nos 3 pontos do último deploy
4. Selecione **"Redeploy"**

## Configurações Avançadas

### Analytics

1. No dashboard da Vercel
2. Vá em **Analytics**
3. Ative para ver métricas de acesso

### Performance Monitoring

1. Vá em **Speed Insights**
2. Ative para monitorar performance
3. Receba sugestões de otimização

### Environment Variables por Branch

Você pode ter variáveis diferentes para:

- **Production**: Branch `main`
- **Preview**: Outras branches
- **Development**: Ambiente local

## Troubleshooting

### Build Falha

**Erro**: `Module not found`
```bash
# Localmente, delete node_modules e reinstale
rm -rf node_modules
npm install
npm run build

# Se funcionar, faça commit e push
```

**Erro**: `Type error`
```bash
# Verifique erros TypeScript
npm run lint
```

### Produtos Não Aparecem

1. **Verifique a variável de ambiente**
   - Vá em Settings → Environment Variables
   - Confirme que a URL está correta

2. **Teste a URL da planilha**
   - Abra a URL no navegador
   - Deve baixar um arquivo CSV

3. **Verifique os logs**
   - Vá em Deployments → Último deploy → Function Logs
   - Procure por erros

### Imagens Não Carregam

1. **Adicione domínio em `next.config.js`**:

```javascript
images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'cf.shopee.com.br',
    },
  ],
}
```

2. **Faça commit e push**

### Site Lento

1. **Verifique ISR**
   - Confirme `revalidate` em `/api/products/route.ts`

2. **Otimize imagens**
   - Use imagens menores na planilha
   - Prefira formato WebP

3. **Ative Edge Runtime** (opcional):

```typescript
// Em src/app/api/products/route.ts
export const runtime = 'edge';
```

## Monitoramento

### Logs em Tempo Real

```bash
# Instale Vercel CLI
npm i -g vercel

# Faça login
vercel login

# Veja logs em tempo real
vercel logs
```

### Métricas Importantes

Monitore no dashboard:

- **Visitors**: Número de visitantes
- **Page Views**: Visualizações de página
- **Bandwidth**: Tráfego de dados
- **Build Time**: Tempo de build
- **Function Executions**: Chamadas à API

## Custos

### Plano Hobby (Gratuito)

- ✅ 100GB de bandwidth/mês
- ✅ Builds ilimitados
- ✅ Domínio personalizado
- ✅ SSL automático
- ✅ Perfeito para MVP!

### Quando Escalar

Considere upgrade se:

- Mais de 100GB de bandwidth/mês
- Precisa de analytics avançado
- Quer suporte prioritário
- Precisa de mais de 1 projeto

## Checklist Final

Antes de compartilhar o site:

- [ ] Deploy bem-sucedido
- [ ] Todos os produtos aparecem
- [ ] Links de afiliado funcionam
- [ ] Imagens carregam
- [ ] Design responsivo OK
- [ ] SEO configurado (title, description)
- [ ] Analytics ativado
- [ ] Domínio configurado (se aplicável)
- [ ] Testado em mobile
- [ ] Testado em diferentes navegadores

## Próximos Passos

Após o deploy:

1. **Compartilhe o link** nas redes sociais
2. **Monitore analytics** para ver o tráfego
3. **Atualize produtos** regularmente
4. **Teste conversões** dos links de afiliado
5. **Colete feedback** dos usuários

---

**Parabéns! 🎉** Seu MVP está no ar!

Para suporte: [Documentação Vercel](https://vercel.com/docs)
