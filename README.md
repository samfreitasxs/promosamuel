# PromoSamuel

Site de ofertas e promoções com links de afiliado — projeto em fases.

> **Fase atual: 1** — site estático com dados de exemplo. Validação manual da ideia.

## Stack

- **Frontend:** Next.js (App Router) + React + TypeScript + Tailwind CSS
- **Backend/DB/Automação:** previstos para as Fases 2-3 (NestJS, PostgreSQL, Redis, n8n, OpenAI/Gemini)

## Como rodar

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de produção
npm start        # serve o build
```

## Estrutura

```
app/
  layout.tsx              # layout raiz (Header/Footer)
  page.tsx                # home: hero + destaques + categorias
  categoria/[slug]/       # página de categoria (SSR estático)
components/
  Header.tsx Footer.tsx
  CategoryCard.tsx OfferCard.tsx
lib/
  types.ts                # modelo de dados (antecipa o banco)
  data.ts                 # dados de EXEMPLO (mock)
  format.ts               # formatação BRL
```

## Roadmap (resumo)

- **Fase 1 (agora):** site + identidade + publicar ofertas manualmente.
- **Fase 2:** painel admin, cadastro de produtos, links rastreados.
- **Fase 3:** automação de busca de ofertas (APIs/RSS), IA gera descrições, publicação automática (Telegram/WhatsApp/Instagram).
- **Fase 4+:** app, comparador de preços, notificações, SEO, monetização.

## Observações importantes

- Links de afiliado neste scaffold são placeholders (`exemplo.com/aff/...`). Troque pelos seus links rastreados reais.
- WhatsApp automatizado deve usar a **WhatsApp Business Cloud API** (Meta) — automação via WhatsApp Web viola os Termos de Uso.
- API da Amazon (PA-API 5.0) exige 3 vendas em 180 dias antes de liberar; comece com links manuais.
