import { notFound } from "next/navigation";
import type { Metadata } from "next";
import OfferCard from "@/components/OfferCard";
import { getCategoryBySlug, getOffersByCategory, getStores } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Categoria não encontrada" };
  return {
    title: `${category.name} em promoção — PromoSamuel`,
    description: category.description,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [offers, stores] = await Promise.all([
    getOffersByCategory(category.id),
    getStores(),
  ]);
  const storeMap = new Map(stores.map((s) => [s.id, s]));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center gap-4">
        <span className="grid h-14 w-14 place-items-center rounded-xl bg-slate-100 text-3xl">
          {category.icon}
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-ink">{category.name}</h1>
          <p className="text-sm text-slate-500">{category.description}</p>
        </div>
      </div>

      {offers.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-500">
          Nenhuma oferta nesta categoria ainda. Volte em breve! 🔔
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {offers.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              store={storeMap.get(offer.storeId)}
              categorySlug={category.slug}
            />
          ))}
        </div>
      )}
    </div>
  );
}
