import type { Category, Offer, Store } from "./types";
import { discountPct } from "./types";

// ---------------------------------------------------------------------------
// Dados de EXEMPLO da Fase 1.
// Na Fase 2/3 isso vira consulta ao PostgreSQL (ou cache Redis).
// Por enquanto é um mock estático para validar o layout e o fluxo.
// ---------------------------------------------------------------------------

export const stores: Store[] = [
  { id: "amazon", name: "Amazon", slug: "amazon", color: "#ff9900" },
  { id: "mercadolivre", name: "Mercado Livre", slug: "mercado-livre", color: "#ffe600" },
  { id: "shopee", name: "Shopee", slug: "shopee", color: "#ee4d2d" },
  { id: "magalu", name: "Magalu", slug: "magalu", color: "#0086ff" },
];

export const categories: Category[] = [
  { id: "eletronicos", name: "Eletrônicos", slug: "eletronicos", icon: "🔌", description: "Fones, TVs, smartwatches e mais." },
  { id: "suplementos", name: "Suplementos", slug: "suplementos", icon: "💊", description: "Whey, creatina, pré-treino e vitaminas." },
  { id: "academia", name: "Academia", slug: "academia", icon: "🏋️", description: "Equipamentos e acessórios de treino." },
  { id: "celulares", name: "Celulares", slug: "celulares", icon: "📱", description: "Smartphones, capas e acessórios." },
  { id: "games", name: "Games", slug: "games", icon: "🎮", description: "Consoles, jogos e periféricos." },
  { id: "casa", name: "Casa", slug: "casa", icon: "🏠", description: "Utensílios, decoração e organização." },
  { id: "ferramentas", name: "Ferramentas", slug: "ferramentas", icon: "🔧", description: "Furadeiras, kits e acessórios." },
  { id: "moda", name: "Moda", slug: "moda", icon: "👕", description: "Roupas, calçados e acessórios." },
];

// Helper de imagem placeholder (substituir por imagem real do produto depois).
function img(text: string): string {
  return `https://placehold.co/600x400/f1f5f9/0f172a?text=${encodeURIComponent(text)}`;
}

export const offers: Offer[] = [
  {
    id: "Whey-Protein-1kg-Whey-Pro-Max",
    slug: "whey-protein-1kg-whey-pro-max",
    title: "Whey Protein 1kg Whey Pro Max",
    shortDescription: "Whey Protein 1kg Whey Pro Max Titanium Sabor Chocolate BCAA e Aminoácidos",
    categoryId: "suplementos",
    storeId: "mercadolivre",
    originalPrice: 119.55,
    currentPrice: 78.90,
    affiliateUrl: "https://meli.la/1tR5mzD",
    imageUrl: "/ofertas/whey-protein-1kg.png",
    createdAt: "2026-07-13",
    priceHistory: [
      { price: 119.55, capturedAt: "2026-07-01" },
      { price: 99.9, capturedAt: "2026-07-07" },
      { price: 78.90, capturedAt: "2026-07-13" },
    ],
  },
  {
    id: "creatina-black-skull",
    slug: "creatina-black-skull-300g",
    title: "Creatina Black Skull 300g",
    shortDescription: "Creatina micronizada, 300g. Aumenta força e explosão.",
    categoryId: "suplementos",
    storeId: "mercadolivre",
    originalPrice: 89.9,
    currentPrice: 59.9,
    affiliateUrl: "https://exemplo.com/aff/creatina-bs",
    imageUrl: img("Creatina 300g"),
    createdAt: "2026-07-12",
    priceHistory: [
      { price: 89.9, capturedAt: "2026-07-01" },
      { price: 59.9, capturedAt: "2026-07-12" },
    ],
  },
  {
    id: "Creatina-100%-Pura-300g",
    slug: "creatina-100%-pura-300g",
    title: "Creatina 100% Pura 300g",
    shortDescription: "A Creatina Hardcore é ideal para quem busca mais força e desempenho nos treinos.",
    categoryId: "suplementos",
    storeId: "mercadolivre",
    originalPrice: 79.9,
    currentPrice: 38.32,
    affiliateUrl: "https://meli.la/2HkVYpR",
    imageUrl: "/ofertas/creatina-100-pura-300g.jpeg",
    createdAt: "2026-07-13",
    priceHistory: [
      { price: 249.9, capturedAt: "2026-06-20" },
      { price: 79.9, capturedAt: "2026-07-05" },
      { price: 38.32, capturedAt: "2026-07-13" },
    ],
  },
  {
    id: "smartwatch-mi-band",
    slug: "xiaomi-smart-band-9",
    title: "Xiaomi Smart Band 9",
    shortDescription: "Monitora sono, batimento e 21 dias de bateria.",
    categoryId: "eletronicos",
    storeId: "shopee",
    originalPrice: 299.9,
    currentPrice: 199.9,
    affiliateUrl: "https://exemplo.com/aff/mi-band-9",
    imageUrl: img("Smart Band 9"),
    createdAt: "2026-07-11",
    priceHistory: [{ price: 299.9, capturedAt: "2026-07-01" }, { price: 199.9, capturedAt: "2026-07-11" }],
  },
  {
    id: "Vídeo-Game-Stick-M15",
    slug: "video-game-stick-m15",
    title: "Vídeo Game Stick M15",
    shortDescription: "2025 NOVO Vídeo Game Stick M15 Plus 4k 64gb Hdmi Com 2 Controles Se Fio +20mil Jogos Moby",
    categoryId: "games",
    storeId: "shopee",
    originalPrice: 119.98,
    currentPrice: 113.99,
    affiliateUrl: "https://s.shopee.com.br/60Pzr5ssYo",
    imageUrl: "/ofertas/video-game-stick-m15.jpeg",
    createdAt: "2026-07-13",
    priceHistory: [{ price: 119.98, capturedAt: "2026-07-01" }, { price: 113.99, capturedAt: "2026-07-13" }],
  },
  {
    id: "Bicicleta-Bike-Ergometrica ",
    slug: "bicicleta-bike-ergometrica",
    title: "Bicicleta Bike Ergometrica Spinning Academia Fitness Profissional 120kg",
    shortDescription: "A bicicleta ergométrica Bike Sport é uma excelente opção para melhorar a saúde cardiovascular, controlar a pressão arterial e reduzir o impacto nas articulações. ",
    categoryId: "academia",
    storeId: "shopee",
    originalPrice: 500.67,
    currentPrice: 420.19,
    affiliateUrl: "https://s.shopee.com.br/5q6Zf2WYHv",
    imageUrl: "/ofertas/bicicleta-bike-ergometrica.jpeg",
    createdAt: "2026-07-10",
    priceHistory: [{ price: 500.67, capturedAt: "2026-07-01" }, { price: 420.19, capturedAt: "2026-07-10" }],
  },
  {
    id: "controle-xbox",
    slug: "controle-xbox-series-wireless",
    title: "Controle Xbox Wireless",
    shortDescription: "Bluetooth, compatível com PC e console. Cor preta.",
    categoryId: "games",
    storeId: "amazon",
    originalPrice: 399.9,
    currentPrice: 279.9,
    affiliateUrl: "https://exemplo.com/aff/controle-xbox",
    imageUrl: img("Controle Xbox"),
    createdAt: "2026-07-12",
    priceHistory: [{ price: 399.9, capturedAt: "2026-07-01" }, { price: 279.9, capturedAt: "2026-07-12" }],
  },
  {
    id: "playstation-5",
    slug: "ps5-standard-825gb",
    title: "PlayStation 5 Edição Standard",
    shortDescription: "SSD 825GB, controle DualSense, mídia física.",
    categoryId: "games",
    storeId: "magalu",
    originalPrice: 3999.0,
    currentPrice: 3399.0,
    affiliateUrl: "https://exemplo.com/aff/ps5",
    imageUrl: img("PS5"),
    createdAt: "2026-07-13",
    priceHistory: [{ price: 3999.0, capturedAt: "2026-07-01" }, { price: 3399.0, capturedAt: "2026-07-13" }],
  },
  {
    id: "halter-adjustable",
    slug: "halter-ajustavel-24kg",
    title: "Halter Ajustável 24kg",
    shortDescription: "Substitui um kit de pesos. Ideal para casa.",
    categoryId: "academia",
    storeId: "mercadolivre",
    originalPrice: 599.9,
    currentPrice: 399.9,
    affiliateUrl: "https://exemplo.com/aff/halter-24",
    imageUrl: img("Halter 24kg"),
    createdAt: "2026-07-09",
    priceHistory: [{ price: 599.9, capturedAt: "2026-07-01" }, { price: 399.9, capturedAt: "2026-07-09" }],
  },
  {
    id: "Basic-Whey-1kg-Growth-Supplements",
    slug: "basic-whey-1kg-growth-supplements",
    title: "Basic Whey 1kg Growth Supplements",
    shortDescription: "Por que escolher o Basic Whey Growth?",
    categoryId: "suplementos",
    storeId: "mercadolivre",
    originalPrice: 104.9,
    currentPrice: 72.9,
    affiliateUrl: "https://meli.la/1ZUqYi6",
    imageUrl: "/ofertas/basic-whey-1kg-growth-supplements.png",
    createdAt: "2026-07-08",
    priceHistory: [{ price: 104.9, capturedAt: "2026-07-01" }, { price: 72.9, capturedAt: "2026-07-08" }],
  },
  {
    id: "furadeira-vonder",
    slug: "furadeira-vonder-550w",
    title: "Furadeira Vonder 550W",
    shortDescription: "Pistola, 550W, maleta com bits inclusos.",
    categoryId: "ferramentas",
    storeId: "magalu",
    originalPrice: 219.9,
    currentPrice: 149.9,
    affiliateUrl: "https://exemplo.com/aff/furadeira-vonder",
    imageUrl: img("Furadeira Vonder"),
    createdAt: "2026-07-11",
    priceHistory: [{ price: 219.9, capturedAt: "2026-07-01" }, { price: 149.9, capturedAt: "2026-07-11" }],
  },
  {
    id: "kit-ferramentas",
    slug: "kit-ferramentas-130-pecas",
    title: "Kit de Ferramentas 130 peças",
    shortDescription: "Chaves, bits e alicates em maleta organizada.",
    categoryId: "ferramentas",
    storeId: "mercadolivre",
    originalPrice: 179.9,
    currentPrice: 119.9,
    affiliateUrl: "https://exemplo.com/aff/kit-130",
    imageUrl: img("Kit 130pcs"),
    createdAt: "2026-07-07",
    priceHistory: [{ price: 179.9, capturedAt: "2026-07-01" }, { price: 119.9, capturedAt: "2026-07-07" }],
  },
  {
    id: "cafeteira-electrolux",
    slug: "cafeteira-electrolux-15-bar",
    title: "Cafeteira Electrolux 15 bar",
    shortDescription: "Espresso automático, 15 bar, 1,2L.",
    categoryId: "casa",
    storeId: "amazon",
    originalPrice: 499.9,
    currentPrice: 349.9,
    affiliateUrl: "https://exemplo.com/aff/cafeteira",
    imageUrl: img("Cafeteira 15bar"),
    createdAt: "2026-07-13",
    priceHistory: [{ price: 499.9, capturedAt: "2026-07-01" }, { price: 349.9, capturedAt: "2026-07-13" }],
  },
  {
    id: "Jogo-De-Chave-Catraca",
    slug: "jogo-de-chave-catraca",
    title: "Jogo De Chave Catraca Caixa De Ferramentas Completa Reversível Soquetes Maleta 40 Peças / 46 Peças ",
    shortDescription: "A catraca possui 45 dentes de alta qualidade, o que melhora a performance do trabalho que será executado.",
    categoryId: "casa",
    storeId: "shopee",
    originalPrice: 99.80,
    currentPrice: 32.99,
    affiliateUrl: "https://s.shopee.com.br/3Viet6fD3o",
    imageUrl: "/ofertas/jogo-de-chave-catraca.jpeg",
    createdAt: "2026-07-06",
    priceHistory: [{ price: 99.80, capturedAt: "2026-07-01" }, { price: 32.99, capturedAt: "2026-07-06" }],
  },
  {
    id: "Kit-Treino-Funcional",
    slug: "kit-treino-funcional",
    title: "Kit Treino Funcional 10/15/20kg Halteres Barra Supino Kettlebell Preto",
    shortDescription: "Treine em qualquer lugar com segurança e eficiência",
    categoryId: "academia",
    storeId: "shopee",
    originalPrice: 249.00,
    currentPrice: 225.00,
    affiliateUrl: "https://s.shopee.com.br/9zw8dKnKg9",
    imageUrl: "/ofertas/kit-treino-funcional.jpeg",
    createdAt: "2026-07-10",
    priceHistory: [{ price: 249.00, capturedAt: "2026-07-01" }, { price: 225.00, capturedAt: "2026-07-10" }],
  },
  {
    id: "Ventilador-de-Mesa",
    slug: "ventilador-de-mesa",
    title: "Ventilador de Mesa 40 cm 10 Pás com 3 Velocidades Ventisol Turbo 10",
    shortDescription: "Mais conforto, tecnologia e praticidade para o seu ambiente!",
    categoryId: "casa",
    storeId: "shopee",
    originalPrice: 149.9,
    currentPrice: 141.41,
    affiliateUrl: "https://s.shopee.com.br/70IX4X7Exc",
    imageUrl: "/ofertas/ventilador1.jpeg",
    createdAt: "2026-07-12",
    priceHistory: [{ price: 149.9, capturedAt: "2026-07-01" }, { price: 141.41, capturedAt: "2026-07-12" }],
  },
];

// --------------------------- Acessores --------------------------------------

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getOffersByCategory(categoryId: string): Offer[] {
  return offers.filter((o) => o.categoryId === categoryId);
}

/** Ofertas com maior desconto, para a home. */
export function getFeaturedOffers(limit = 4): Offer[] {
  return [...offers]
    .sort((a, b) => discountPct(b) - discountPct(a))
    .slice(0, limit);
}

export function getStoreById(id: string): Store | undefined {
  return stores.find((s) => s.id === id);
}
