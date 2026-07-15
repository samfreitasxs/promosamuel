import Link from "next/link";
import { getCategories } from "@/lib/queries";

export default async function Header() {
  const categories = await getCategories();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-brand text-lg font-black text-white">
            P
          </span>
          <span className="text-lg font-extrabold tracking-tight">
            Promo<span className="text-brand">Samuel</span>
          </span>
        </Link>

        <nav className="hidden gap-1 md:flex">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/categoria/${c.slug}`}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-ink"
            >
              {c.icon} {c.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/admin"
            className="hidden rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-ink transition hover:bg-slate-100 sm:block"
          >
            Admin
          </Link>
          <a
            href="https://exemplo.com/aff/cadastro"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Receber ofertas
          </a>
        </div>
      </div>
    </header>
  );
}
