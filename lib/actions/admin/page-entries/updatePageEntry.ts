"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { pageCategories, pageEntries } from "@/db/schema";
import { getCurrentUser } from "@/lib/actions/auth";
import { getUserAllowedScopes } from "@/lib/actions/configs";
import { sanitizeHtmlClient } from "@/lib/sanitize-html";

export interface UpdatePageEntryInput {
  id: string;
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

export async function updatePageEntry(input: UpdatePageEntryInput) {
  const user = await getCurrentUser();
  const rights = Array.isArray(user?.rights) ? user.rights : [];

  if (!user || rights.length === 0) {
    throw new Error("Unauthorized: Portal access required.");
  }

  const [existing] = await db
    .select({
      id: pageEntries.id,
      departmentId: pageEntries.departmentId,
      categoryScope: pageCategories.scope,
    })
    .from(pageEntries)
    .leftJoin(pageCategories, eq(pageEntries.pageCategoryId, pageCategories.id))
    .where(eq(pageEntries.id, input.id))
    .limit(1);

  if (!existing) {
    throw new Error("Page entry not found.");
  }

  const allowedScopes = await getUserAllowedScopes();
  const allowedKeys = new Set(allowedScopes.map((s) => s.key));
  const isHod = rights.includes("hod");
  const scopeKey = existing.categoryScope || "university";

  const hasScope =
    allowedKeys.has(scopeKey) || (isHod && scopeKey === "all-departments");
  const isSameDeptHod =
    isHod &&
    Boolean(user.departmentId) &&
    existing.departmentId === user.departmentId;

  if (!hasScope && !isSameDeptHod) {
    throw new Error("Unauthorized: You cannot edit this page entry.");
  }

  const rawHtml = input.htmlContent?.trim() || "";
  const sanitizedHtml =
    input.isCustomPage && rawHtml ? sanitizeHtmlClient(rawHtml) : null;

  const [updated] = await db
    .update(pageEntries)
    .set({
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
      updatedAt: new Date(),
    })
    .where(eq(pageEntries.id, input.id))
    .returning({ id: pageEntries.id });

  return updated;
}
