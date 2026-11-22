"use server";

import { and, asc, eq, isNull } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { pageCategories, pageEntries } from "@/db/schema";

export type PublicCategoryScope =
  | "university"
  | "all-departments"
  | "department"
  | "academics"
  | "coe"
  | (string & {});

export type PublicPageCategory = typeof pageCategories.$inferSelect;
export type PublicPageEntry = typeof pageEntries.$inferSelect;

export interface PublicPageCategoryWithEntries {
  category: PublicPageCategory | null;
  entries: PublicPageEntry[];
}

export async function getPageCategory(
  code: string,
  scope: PublicCategoryScope = "university",
  departmentId?: string | null,
): Promise<PublicPageCategoryWithEntries> {
  const normalizedCode = code.trim().toLowerCase();
  if (!normalizedCode) {
    return { category: null, entries: [] };
  }

  const deptCondition =
    scope === "department" && departmentId
      ? eq(pageCategories.departmentId, departmentId)
      : isNull(pageCategories.departmentId);

  const [category] = await db
    .select()
    .from(pageCategories)
    .where(
      and(
        eq(pageCategories.code, normalizedCode),
        eq(pageCategories.scope, scope),
        deptCondition,
      ),
    )
    .limit(1);

  if (!category) {
    return { category: null, entries: [] };
  }

  const entries = await db
    .select()
    .from(pageEntries)
    .where(eq(pageEntries.pageCategoryId, category.id))
    .orderBy(asc(pageEntries.createdAt));

  return {
    category,
    entries,
  };
}
