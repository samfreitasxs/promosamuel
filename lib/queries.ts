import { cache } from "react";
import { prisma } from "./db";
import { discountPct, type Category, type Offer, type Store } from "./types";

// ---------------------------------------------------------------------------
// Camada de acesso a dados (Fase 2) — substitui o mock de lib/data.ts.
// Tudo async (PostgreSQL via Prisma). `cache()` evita queries repetidas
// na mesma requisição (ex.: Header + Home + Footer).
// ---------------------------------------------------------------------------

function toOffer(o: {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  categoryId: string;
  storeId: string;
  originalPrice: any;
  currentPrice: any;
  affiliateUrl: string;
  imageUrl: string;
  createdAt: Date;
  priceHistory?: { price: any; capturedAt: Date }[];
}): Offer {
  return {
    id: o.id,
    slug: o.slug,
    title: o.title,
    shortDescription: o.shortDescription,
    categoryId: o.categoryId,
    storeId: o.storeId,
    originalPrice: Number(o.originalPrice),
    currentPrice: Number(o.currentPrice),
    affiliateUrl: o.affiliateUrl,
    imageUrl: o.imageUrl,
    createdAt: o.createdAt.toISOString(),
    priceHistory: (o.priceHistory ?? []).map((p) => ({
      price: Number(p.price),
      capturedAt: p.capturedAt.toISOString(),
    })),
  };
}

export const getCategories = cache(async (): Promise<Category[]> => {
  const rows = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return rows.map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    icon: c.icon,
    description: c.description,
  }));
});

export const getCategoryBySlug = cache(
  async (slug: string): Promise<Category | null> => {
    const c = await prisma.category.findUnique({ where: { slug } });
    if (!c) return null;
    return { id: c.id, name: c.name, slug: c.slug, icon: c.icon, description: c.description };
  }
);

export const getStores = cache(async (): Promise<Store[]> => {
  const rows = await prisma.store.findMany({ orderBy: { name: "asc" } });
  return rows.map((s) => ({ id: s.id, name: s.name, slug: s.slug, color: s.color }));
});

export const getStoreById = cache(
  async (id: string): Promise<Store | undefined> => {
    const s = await prisma.store.findUnique({ where: { id } });
    if (!s) return undefined;
    return { id: s.id, name: s.name, slug: s.slug, color: s.color };
  }
);

export const getOffersByCategory = cache(async (categoryId: string): Promise<Offer[]> => {
  const rows = await prisma.offer.findMany({
    where: { categoryId },
    include: { priceHistory: true },
    orderBy: { createdAt: "desc" },
  });
  return rows.map(toOffer);
});

export const getFeaturedOffers = cache(async (limit = 4): Promise<Offer[]> => {
  const rows = await prisma.offer.findMany({
    include: { priceHistory: true },
    orderBy: { createdAt: "desc" },
  });
  return rows
    .map(toOffer)
    .sort((a, b) => discountPct(b) - discountPct(a))
    .slice(0, limit);
});

/** Categorias + contagem de ofertas (usado na home). */
export const getCategoriesWithCounts = cache(
  async (): Promise<{ category: Category; count: number }[]> => {
    const rows = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { offers: true } } },
    });
    return rows.map((c) => ({
      category: {
        id: c.id,
        name: c.name,
        slug: c.slug,
        icon: c.icon,
        description: c.description,
      },
      count: c._count.offers,
    }));
  }
);

/** Lista para o painel admin (com nome da loja/categoria). */
export async function getAdminOffers(): Promise<
  { offer: Offer; storeName: string; categoryName: string }[]
> {
  const rows = await prisma.offer.findMany({
    include: { store: true, category: true },
    orderBy: { createdAt: "desc" },
  });
  return rows.map((o) => ({
    offer: toOffer(o),
    storeName: o.store.name,
    categoryName: o.category.name,
  }));
}

export type OfferInput = {
  slug: string;
  title: string;
  shortDescription: string;
  imageUrl: string;
  originalPrice: number;
  currentPrice: number;
  affiliateUrl: string;
  categorySlug: string;
  storeSlug: string;
  priceHistory?: { price: number; capturedAt: string }[];
};

export async function createOffer(input: OfferInput): Promise<void> {
  await prisma.offer.create({
    data: {
      slug: input.slug,
      title: input.title,
      shortDescription: input.shortDescription,
      imageUrl: input.imageUrl,
      originalPrice: input.originalPrice,
      currentPrice: input.currentPrice,
      affiliateUrl: input.affiliateUrl,
      category: { connect: { slug: input.categorySlug } },
      store: { connect: { slug: input.storeSlug } },
      priceHistory: input.priceHistory?.length
        ? {
            create: input.priceHistory.map((p) => ({
              price: p.price,
              capturedAt: new Date(p.capturedAt),
            })),
          }
        : undefined,
    },
  });
}

export async function deleteOffer(id: string): Promise<void> {
  await prisma.offer.delete({ where: { id } });
}
