"use server";

import { and, asc, eq, isNull, sql } from "drizzle-orm";
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

const EMPTY_FALLBACK: PublicPageCategoryWithEntries = {
  category: null,
  entries: [],
};

export async function getPageCategory(
  code: string,
  scope: PublicCategoryScope = "university",
  departmentId?: string | null,
): Promise<PublicPageCategoryWithEntries> {
  const normalizedCode = code.trim().toLowerCase();
  if (!normalizedCode) {
    return EMPTY_FALLBACK;
  }

  try {
    const deptCondition =
      scope === "department" && departmentId
        ? eq(pageCategories.departmentId, departmentId)
        : isNull(pageCategories.departmentId);

    const [category] = await db
      .select()
      .from(pageCategories)
      .where(
        and(
          sql`lower(${pageCategories.code}) = ${normalizedCode}`,
          eq(pageCategories.scope, scope),
          deptCondition,
        ),
      )
      .limit(1);

    if (!category) {
      return EMPTY_FALLBACK;
    }

    const entries = await db
      .select()
      .from(pageEntries)
      .where(eq(pageEntries.pageCategoryId, category.id))
      .orderBy(asc(pageEntries.displayOrder), asc(pageEntries.createdAt));

    return {
      category,
      entries,
    };
  } catch (err) {
    console.error("[getPageCategory] Failed to load category entries:", err);
    return EMPTY_FALLBACK;
  }
}
