import Link from "next/link";
import type { Category } from "@/lib/types";
import { getOffersByCategory } from "@/lib/data";

export default function CategoryCard({ category }: { category: Category }) {
  const count = getOffersByCategory(category.id).length;

  return (
    <Link
      href={`/categoria/${category.slug}`}
      className="group flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:border-brand"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-slate-100 text-2xl transition group-hover:bg-brand/10">
        {category.icon}
      </span>
      <div className="min-w-0">
        <h3 className="font-semibold text-ink">{category.name}</h3>
        <p className="truncate text-sm text-slate-500">{category.description}</p>
        <span className="text-xs font-medium text-brand">
          {count} {count === 1 ? "oferta" : "ofertas"} →
        </span>
      </div>
    </Link>
  );
}
