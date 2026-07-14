// Modelo de dados da Fase 1.
// Estrutura pensada para migrar fácil para o banco (PostgreSQL) na Fase 2/3:
// Produtos, Categorias, Histórico de preço, Links afiliados, Lojas.

export interface Store {
  id: string;
  name: string;
  slug: string;
  /** Cor da marca, usada no selo da loja. */
  color: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  /** Emoji como ícone (sem dependência de assets na Fase 1). */
  icon: string;
  description: string;
}

export interface PricePoint {
  price: number;
  /** ISO 8601. */
  capturedAt: string;
}

export interface Offer {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  categoryId: string;
  storeId: string;
  /** Preço "de" (referência). */
  originalPrice: number;
  /** Preço "por" (atual em promoção). */
  currentPrice: number;
  /** Link de afiliado rastreado. */
  affiliateUrl: string;
  imageUrl: string;
  createdAt: string;
  /** Histórico para o futuro gráfico de queda de preço. */
  priceHistory: PricePoint[];
}

/** Desconto em % (0-100). Calculado a partir de original/current. */
export function discountPct(offer: Pick<Offer, "originalPrice" | "currentPrice">): number {
  if (offer.originalPrice <= 0) return 0;
  const pct = ((offer.originalPrice - offer.currentPrice) / offer.originalPrice) * 100;
  return Math.round(pct);
}
