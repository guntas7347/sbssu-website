"use server";

import { asc, eq, inArray } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { departmentsTable, pageCategories, pageEntries } from "@/db/schema";
import { getCurrentUser } from "@/lib/actions/auth";
import { getUserAllowedScopes } from "@/lib/actions/configs";

export interface AdminPageCategoryItem {
  id: string;
  name: string;
  code: string;
  note: string | null;
  permanent: boolean;
  singleEntry: boolean;
  canEdit: boolean;
  scope: string;
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  entryCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export async function getAllPageCategories(): Promise<AdminPageCategoryItem[]> {
  const user = await getCurrentUser();
  const rights = Array.isArray(user?.rights) ? user.rights : [];

  if (!user || rights.length === 0) {
    throw new Error("Unauthorized: Portal access required.");
  }

  const allowedScopes = await getUserAllowedScopes();
  const allowedScopeKeys = allowedScopes.map((s) => s.key);

  if (allowedScopeKeys.length === 0) {
    return [];
  }

  const rows = await db
    .select({
      id: pageCategories.id,
      name: pageCategories.name,
      code: pageCategories.code,
      note: pageCategories.note,
      permanent: pageCategories.permanent,
      singleEntry: pageCategories.singleEntry,
      scope: pageCategories.scope,
      departmentId: pageCategories.departmentId,
      departmentCode: departmentsTable.code,
      departmentName: departmentsTable.name,
      createdAt: pageCategories.createdAt,
      updatedAt: pageCategories.updatedAt,
    })
    .from(pageCategories)
    .leftJoin(
      departmentsTable,
      eq(pageCategories.departmentId, departmentsTable.id),
    )
    .where(inArray(pageCategories.scope, allowedScopeKeys))
    .orderBy(
      asc(pageCategories.scope),
      asc(pageCategories.code),
      asc(pageCategories.name),
    );

  const entries = await db
    .select({ pageCategoryId: pageEntries.pageCategoryId })
    .from(pageEntries);

  const countByCategory = new Map<string, number>();
  for (const entry of entries) {
    countByCategory.set(
      entry.pageCategoryId,
      (countByCategory.get(entry.pageCategoryId) ?? 0) + 1,
    );
  }

  return rows.map((row) => ({
    ...row,
    singleEntry: Boolean(row.singleEntry),
    canEdit: !row.permanent,
    entryCount: countByCategory.get(row.id) ?? 0,
  }));
}
