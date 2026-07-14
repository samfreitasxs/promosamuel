import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import OfferCard from "@/components/OfferCard";
import { categories, getFeaturedOffers } from "@/lib/data";

export default function HomePage() {
  const featured = getFeaturedOffers(4);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-brand/10 via-white to-white">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center">
          <span className="badge-discount mx-auto mb-4">🔥 Ofertas atualizadas diariamente</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
            As melhores promoções em um só lugar
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-slate-600">
            Eletrônicos, suplementos, celulares, games e muito mais — com links
            de afiliado rastreados e preços verificados.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a
              href="#categorias"
              className="rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
            >
              Ver categorias
            </a>
            <a
              href="https://exemplo.com/aff/cadastro"
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-slate-100"
            >
              Receber no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-ink">🔥 Ofertas em destaque</h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((offer) => (
            <OfferCard key={offer.id} offer={offer} />
          ))}
        </div>
      </section>

      {/* Categorias */}
      <section id="categorias" className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="mb-4 text-xl font-bold text-ink">📂 Categorias</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 text-center">
        <Link
          href="/categoria/eletronicos"
          className="text-sm font-medium text-brand hover:underline"
        >
          Explorar todas as ofertas →
        </Link>
      </section>
    </div>
  );
}
