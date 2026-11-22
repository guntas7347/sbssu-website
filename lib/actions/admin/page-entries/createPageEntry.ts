"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { pageCategories, pageEntries } from "@/db/schema";
import { getCurrentUser } from "@/lib/actions/auth";
import { getUserAllowedScopes } from "@/lib/actions/configs";
import { sanitizeHtmlClient } from "@/lib/sanitize-html";

export interface CreatePageEntryInput {
  pageCategoryId: string;
  displayOrder?: number;
  field1: string;
  field2: string;
  field3: string;
  field4: string;
  field5: string;
  file1: string;
  file2: string;
  link1: string;
  link2: string;
  isCustomPage: boolean;
  slug: string;
  htmlContent: string;
}

function normalizeSlug(raw: string): string | null {
  const cleaned = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || null;
}

export async function createPageEntry(input: CreatePageEntryInput) {
  const user = await getCurrentUser();
  const rights = Array.isArray(user?.rights) ? user.rights : [];

  if (!user || rights.length === 0) {
    throw new Error("Unauthorized: Portal access required.");
  }

  if (!input.pageCategoryId) {
    throw new Error("Please select a category.");
  }

  const [cat] = await db
    .select({
      id: pageCategories.id,
      scope: pageCategories.scope,
      departmentId: pageCategories.departmentId,
    })
    .from(pageCategories)
    .where(eq(pageCategories.id, input.pageCategoryId))
    .limit(1);

  if (!cat) {
    throw new Error("Category not found.");
  }

  const allowedScopes = await getUserAllowedScopes();
  const allowedKeys = new Set(allowedScopes.map((s) => s.key));
  const isHod = rights.includes("hod");
  const scopeKey = cat.scope || "university";

  const canUseCat =
    allowedKeys.has(scopeKey) || (isHod && scopeKey === "all-departments");

  if (!canUseCat) {
    throw new Error(
      "Unauthorized: You cannot create entries in this category.",
    );
  }

  const departmentId =
    cat.departmentId ?? (isHod ? (user.departmentId ?? null) : null);

  const normalizedOrder =
    typeof input.displayOrder === "number" &&
    Number.isFinite(input.displayOrder)
      ? Math.trunc(input.displayOrder)
      : 0;

  const rawHtml = input.htmlContent?.trim() || "";
  const sanitizedHtml =
    input.isCustomPage && rawHtml ? sanitizeHtmlClient(rawHtml) : null;

  const [created] = await db
    .insert(pageEntries)
    .values({
      pageCategoryId: cat.id,
      departmentId,
      displayOrder: normalizedOrder,
      field1: input.field1.trim() || null,
      field2: input.field2.trim() || null,
      field3: input.field3.trim() || null,
      field4: input.field4.trim() || null,
      field5: input.field5.trim() || null,
      file1: input.file1.trim() || null,
      file2: input.file2.trim() || null,
      link1: input.link1.trim() || null,
      link2: input.link2.trim() || null,
      slug: input.isCustomPage ? normalizeSlug(input.slug) : null,
      htmlContent: sanitizedHtml,
      createdById: user.id ?? null,
    })
    .returning({ id: pageEntries.id });

  return created;
}
