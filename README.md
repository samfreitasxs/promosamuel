# PromoSamuel

Site de ofertas e promoções com links de afiliado — projeto em fases.

> **Fase atual: 1** — site estático com dados de exemplo. Validação manual da ideia.

## Stack

- **Frontend:** Next.js (App Router) + React + TypeScript + Tailwind CSS
- **Backend/DB/Automação:** previstos para as Fases 2-3 (NestJS, PostgreSQL, Redis, n8n, OpenAI/Gemini)

## Como rodar

```bash
npm install
cp .env.example .env.local   # preencha DATABASE_URL, DIRECT_URL, ADMIN_*
npm run db:migrate           # cria as tabelas no Postgres
npm run db:seed              # popula com as ofertas de exemplo
npm run dev                  # http://localhost:3000
```

Build de produção: `npm run build && npm start`.

### Banco de dados (Fase 2)

- **PostgreSQL** via **Prisma** (`prisma/schema.prisma`).
- Tabelas: `Store`, `Category`, `Offer`, `PricePoint` (histórico de preço).
- Comandos úteis:
  - `npm run db:migrate` — aplica migrations (dev)
  - `npm run db:deploy` — aplica migrations em produção (usado no deploy)
  - `npm run db:seed` — popula dados de exemplo
  - `npm run db:studio` — abre o Prisma Studio (explorar o banco)
- A camada de acesso fica em `lib/queries.ts` (funções `async`, com `cache()`
  do React para evitar queries repetidas por requisição).

### Painel admin

- `/admin` é protegido por senha (`ADMIN_PASSWORD`) via middleware + cookie assinado.
- `/admin/login` → autentica; `/admin` → lista e exclui; `/admin/ofertas/novo` → cadastra.
- Geração de token em `lib/session-crypto.ts`; sessão em `lib/auth.ts`.

## Estrutura

```
app/
  layout.tsx              # layout raiz (Header/Footer)
  page.tsx                # home: hero + destaques + categorias
  categoria/[slug]/       # página de categoria (dinâmica)
  admin/                  # painel: login, dashboard, nova oferta
  actions/admin.ts        # Server Actions (login, criar, excluir oferta)
components/
  Header.tsx Footer.tsx
  CategoryCard.tsx OfferCard.tsx
lib/
  types.ts                # tipos do app (Offer, Category, Store...)
  queries.ts              # camada de acesso ao Postgres (Prisma)
  db.ts                   # singleton do PrismaClient
  auth.ts                 # sessão admin (cookie)
  session-crypto.ts       # assinatura do token (Edge + Node)
  format.ts               # formatação BRL
prisma/
  schema.prisma           # modelo do banco
  seed.ts / seed-data.ts  # popula dados de exemplo
middleware.ts             # protege /admin
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
