import { notFound } from "next/navigation";

export async function getPage(slug: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const res = await fetch(`${base}/api/admin/central/pages?slug=${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const { data, updatedAt } = await res.json();
  return { page: data, updatedAt };
}
