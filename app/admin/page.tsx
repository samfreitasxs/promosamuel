import Link from "next/link";
import { getAdminOffers } from "@/lib/queries";
import { formatBRL } from "@/lib/format";
import { logoutAction, deleteOfferAction } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const rows = await getAdminOffers();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">Painel de Ofertas</h1>
          <p className="text-sm text-slate-500">{rows.length} ofertas cadastradas</p>
        </div>
        <div className="flex gap-2">
          <Link
            href="/admin/ofertas/novo"
            className="rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            + Nova oferta
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-ink transition hover:bg-slate-100"
            >
              Sair
            </button>
          </form>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3">Produto</th>
              <th className="px-4 py-3">Loja</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Preço</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {rows.map(({ offer, storeName, categoryName }) => (
              <tr key={offer.id} className="border-b border-slate-100 last:border-0">
                <td className="px-4 py-3 font-medium text-ink">{offer.title}</td>
                <td className="px-4 py-3 text-slate-500">{storeName}</td>
                <td className="px-4 py-3 text-slate-500">{categoryName}</td>
                <td className="px-4 py-3 text-brand">{formatBRL(offer.currentPrice)}</td>
                <td className="px-4 py-3 text-right">
                  <form action={deleteOfferAction}>
                    <input type="hidden" name="id" value={offer.id} />
                    <button
                      type="submit"
                      className="text-xs font-semibold text-red-600 hover:underline"
                    >
                      Excluir
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-400">
                  Nenhuma oferta ainda. Clique em “+ Nova oferta”.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
