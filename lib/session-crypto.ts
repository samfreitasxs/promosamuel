// Verificação de sessão em crypto puro (Web Crypto) — funciona em Edge (middleware) e Node.
// O token é "timestamp.hmac" assinado com ADMIN_SESSION_SECRET.

const SECRET = process.env.ADMIN_SESSION_SECRET ?? "dev-secret-troque-me";
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 dias

// Nome do cookie de sessão (compartilhado com o middleware, que não pode importar next/headers).
export const ADMIN_COOKIE = "admin_session";

async function signTs(ts: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(SECRET),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(ts));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function makeToken(): Promise<string> {
  const ts = Date.now().toString();
  const sig = await signTs(ts);
  return `${ts}.${sig}`;
}

export async function verifyToken(token?: string | null): Promise<boolean> {
  if (!token) return false;
  const [ts, sig] = token.split(".");
  if (!ts || !sig) return false;

  const age = Date.now() - Number(ts);
  if (!Number.isFinite(age) || age < 0 || age > MAX_AGE_MS) return false;

  const expected = await signTs(ts);
  if (expected.length !== sig.length) return false;

  let diff = 0;
  for (let i = 0; i < expected.length; i++) {
    diff |= expected.charCodeAt(i) ^ sig.charCodeAt(i);
  }
  return diff === 0;
}
