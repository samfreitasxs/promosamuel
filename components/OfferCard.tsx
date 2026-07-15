import Link from "next/link";
import type { Offer, Store } from "@/lib/types";
import { discountPct } from "@/lib/types";
import { formatBRL } from "@/lib/format";

export default function OfferCard({
  offer,
  store,
  categorySlug,
}: {
  offer: Offer;
  store?: Store;
  categorySlug?: string;
}) {
  const pct = discountPct(offer);
  const categoryHref = `/categoria/${categorySlug ?? offer.categoryId}`;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={offer.imageUrl}
          alt={offer.title}
          className="h-44 w-full object-cover"
          loading="lazy"
        />
        {pct > 0 && <span className="badge-discount absolute left-3 top-3">-{pct}%</span>}
        {store && (
          <span
            className="absolute right-3 top-3 rounded-md px-2 py-1 text-xs font-bold text-ink"
            style={{ backgroundColor: store.color }}
          >
            {store.name}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-ink">{offer.title}</h3>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-slate-500">
          {offer.shortDescription}
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-xs text-slate-400 line-through">
            {formatBRL(offer.originalPrice)}
          </span>
          <span className="text-xl font-extrabold text-brand">
            {formatBRL(offer.currentPrice)}
          </span>
        </div>

        <a
          href={offer.affiliateUrl}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-4 block rounded-lg bg-brand text-center text-sm font-semibold text-white transition hover:bg-brand-dark"
          style={{ padding: "0.625rem 0" }}
        >
          Ver oferta →
        </a>

        <Link
          href={categoryHref}
          className="mt-2 text-center text-xs text-slate-400 hover:text-brand"
        >
          ver mais da categoria
        </Link>
      </div>
    </article>
  );
}
