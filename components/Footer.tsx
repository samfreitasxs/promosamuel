import Link from "next/link";
import { getCategories } from "@/lib/queries";

export default async function Footer() {
  const categories = await getCategories();

  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <span className="text-lg font-extrabold tracking-tight">
            Promo<span className="text-brand">Samuel</span>
          </span>
          <p className="mt-2 max-w-xs text-sm text-slate-500">
            As melhores ofertas e promoções reunidas em um só lugar.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Categorias</h3>
          <ul className="mt-3 grid grid-cols-2 gap-1 text-sm text-slate-500">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/categoria/${c.slug}`} className="hover:text-brand">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink">Aviso</h3>
          <p className="mt-3 text-sm text-slate-500">
            O PromoSamuel participa de programas de afiliados. Ao comprar via
            nossos links podemos receber uma comissão, sem custo extra para
            você.
          </p>
        </div>
      </div>

      <div className="border-t border-slate-100 py-4 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} PromoSamuel · Fase 2 (banco de dados)
      </div>
    </footer>
  );
}
