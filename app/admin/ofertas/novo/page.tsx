import type React from "react";
import { getCategories, getStores } from "@/lib/queries";
import { createOfferAction } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function NovaOfertaPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const [{ error }, categories, stores] = await Promise.all([
    searchParams,
    getCategories(),
    getStores(),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-extrabold text-ink">Nova oferta</h1>
      <p className="text-sm text-slate-500">
        Os campos com * são obrigatórios. O slug é gerado do título se deixado em branco.
      </p>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          Preencha título, loja e categoria.
        </p>
      )}

      <form action={createOfferAction} method="post" className="mt-6 space-y-4">
        <Field label="Título *" name="title" required />
        <Field label="Descrição curta" name="shortDescription" textarea />
        <Field label="URL da imagem" name="imageUrl" placeholder="https://... ou /ofertas/arquivo.jpg" />
        <div className="grid grid-cols-2 gap-4">
          <Field label="Preço original (de) *" name="originalPrice" type="number" step="0.01" required />
          <Field label="Preço promocional (por) *" name="currentPrice" type="number" step="0.01" required />
        </div>
        <Field label="Link de afiliado *" name="affiliateUrl" placeholder="https://..." required />

        <div className="grid grid-cols-2 gap-4">
          <Select label="Categoria *" name="categorySlug" options={categories.map((c) => ({ value: c.slug, label: `${c.icon} ${c.name}` }))} />
          <Select label="Loja *" name="storeSlug" options={stores.map((s) => ({ value: s.slug, label: s.name }))} />
        </div>

        <Field label="Slug (opcional)" name="slug" placeholder="gerado automaticamente" />

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="rounded-lg bg-brand px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Salvar oferta
          </button>
          <a
            href="/admin"
            className="rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold text-ink transition hover:bg-slate-100"
          >
            Cancelar
          </a>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  name,
  required,
  type = "text",
  textarea,
  ...rest
}: {
  label: string;
  name: string;
  required?: boolean;
  type?: string;
  textarea?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  const cls =
    "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand";
  return (
    <div>
      <label className="block text-sm font-medium text-ink">{label}</label>
      {textarea ? (
        <textarea name={name} rows={3} className={cls} />
      ) : (
        <input name={name} type={type} required={required} className={cls} {...rest} />
      )}
    </div>
  );
}

function Select({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-ink">{label}</label>
      <select
        name={name}
        required
        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
      >
        <option value="">Selecione…</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}
