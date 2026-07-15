"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, createSession, destroySession } from "@/lib/auth";
import { createOffer, deleteOffer } from "@/lib/queries";

function slugify(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function loginAction(formData: FormData) {
  const pw = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin");

  if (!checkPassword(pw)) {
    const q = from && from !== "/admin" ? `?error=1&from=${encodeURIComponent(from)}` : "?error=1";
    redirect(`/admin/login${q}`);
  }

  await createSession();
  redirect(from || "/admin");
}

export async function logoutAction() {
  await destroySession();
  redirect("/admin/login");
}

export async function createOfferAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const shortDescription = String(formData.get("shortDescription") ?? "").trim();
  const imageUrl = String(formData.get("imageUrl") ?? "").trim();
  const affiliateUrl = String(formData.get("affiliateUrl") ?? "").trim();
  const categorySlug = String(formData.get("categorySlug") ?? "");
  const storeSlug = String(formData.get("storeSlug") ?? "");
  const slugInput = String(formData.get("slug") ?? "").trim();

  const originalPrice = parseFloat(String(formData.get("originalPrice") ?? "0")) || 0;
  const currentPrice = parseFloat(String(formData.get("currentPrice") ?? "0")) || 0;

  if (!title || !categorySlug || !storeSlug) {
    redirect("/admin/ofertas/novo?error=1");
  }

  const slug = slugInput || slugify(title) || `oferta-${Date.now()}`;

  await createOffer({
    slug,
    title,
    shortDescription,
    imageUrl:
      imageUrl || "https://placehold.co/600x400/f1f5f9/0f172a?text=Sem+imagem",
    originalPrice,
    currentPrice,
    affiliateUrl,
    categorySlug,
    storeSlug,
    priceHistory: [{ price: currentPrice, capturedAt: new Date().toISOString() }],
  });

  revalidatePath("/");
  redirect("/admin");
}

export async function deleteOfferAction(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  if (id) await deleteOffer(id);
  revalidatePath("/");
  redirect("/admin");
}
