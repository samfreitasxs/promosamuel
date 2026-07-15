import { loginAction } from "@/app/actions/admin";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; from?: string }>;
}) {
  const { error, from } = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-sm flex-col justify-center px-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-card">
        <h1 className="text-2xl font-extrabold text-ink">
          Promo<span className="text-brand">Samuel</span> Admin
        </h1>
        <p className="mt-1 text-sm text-slate-500">Acesso restrito.</p>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
            Senha incorreta. Tente novamente.
          </p>
        )}

        <form action={loginAction} method="post" className="mt-6 space-y-4">
          <input type="hidden" name="from" value={from ?? "/admin"} />
          <div>
            <label className="block text-sm font-medium text-ink">Senha</label>
            <input
              type="password"
              name="password"
              required
              autoFocus
              className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
