import { PrismaClient } from "@prisma/client";
import { stores, categories, offers } from "./seed-data";

const prisma = new PrismaClient();

async function main() {
  console.log("→ Lojas...");
  for (const s of stores) {
    await prisma.store.upsert({
      where: { slug: s.slug },
      update: { name: s.name, color: s.color },
      create: { slug: s.slug, name: s.name, color: s.color },
    });
  }

  console.log("→ Categorias...");
  for (const c of categories) {
    await prisma.category.upsert({
      where: { slug: c.slug },
      update: { name: c.name, icon: c.icon, description: c.description },
      create: { slug: c.slug, name: c.name, icon: c.icon, description: c.description },
    });
  }

  console.log("→ Ofertas...");
  for (const o of offers) {
    await prisma.offer.upsert({
      where: { slug: o.slug },
      update: {
        title: o.title,
        shortDescription: o.shortDescription,
        imageUrl: o.imageUrl,
        originalPrice: o.originalPrice,
        currentPrice: o.currentPrice,
        affiliateUrl: o.affiliateUrl,
        category: { connect: { slug: o.categoryId } },
        store: { connect: { slug: o.storeId } },
      },
      create: {
        slug: o.slug,
        title: o.title,
        shortDescription: o.shortDescription,
        imageUrl: o.imageUrl,
        originalPrice: o.originalPrice,
        currentPrice: o.currentPrice,
        affiliateUrl: o.affiliateUrl,
        category: { connect: { slug: o.categoryId } },
        store: { connect: { slug: o.storeId } },
        priceHistory: {
          create: o.priceHistory.map((p) => ({
            price: p.price,
            capturedAt: new Date(p.capturedAt),
          })),
        },
      },
    });
  }

  console.log("✓ Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
