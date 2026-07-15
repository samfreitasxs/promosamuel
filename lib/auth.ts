import { cookies } from "next/headers";
import { makeToken, verifyToken, ADMIN_COOKIE } from "./session-crypto";

export { ADMIN_COOKIE };
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

export function checkPassword(pw: string): boolean {
  return ADMIN_PASSWORD.length > 0 && pw === ADMIN_PASSWORD;
}

export async function createSession(): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_COOKIE, await makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(ADMIN_COOKIE)?.value);
}
