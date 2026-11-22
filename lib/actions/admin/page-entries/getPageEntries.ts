"use server";

import { and, count, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { departmentsTable, pageCategories, pageEntries } from "@/db/schema";
import { getCurrentUser } from "@/lib/actions/auth";
import { getUserAllowedScopes } from "@/lib/actions/configs";

export interface AdminPageEntryItem {
  id: string;
  pageCategoryId: string;
  categoryCode: string;
  categoryName: string;
  categoryScope: string;
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  displayOrder: number;
  field1: string | null;
  field2: string | null;
  field3: string | null;
  field4: string | null;
  field5: string | null;
  slug: string | null;
  htmlPath: string | null;
  htmlContent: string | null;
  file1: string | null;
  file2: string | null;
  link1: string | null;
  link2: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetPageEntriesResult {
  items: AdminPageEntryItem[];
  totalCount: number;
}

export async function getPageEntries(options?: {
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<GetPageEntriesResult> {
  const user = await getCurrentUser();
  const rights = Array.isArray(user?.rights) ? user.rights : [];

  if (!user || rights.length === 0) {
    throw new Error("Unauthorized: Portal access required.");
  }

  const isAdmin = rights.includes("admin");
  const isHod = rights.includes("hod");
  const allowedScopes = await getUserAllowedScopes();
  const allowedScopeKeys = allowedScopes.map((s) => s.key);

  const accessParts = [];
  if (allowedScopeKeys.length > 0) {
    for (const scope of allowedScopeKeys) {
      if (scope === "department" && !isAdmin) {
        if (user.departmentId) {
          accessParts.push(
            and(
              eq(pageCategories.scope, "department"),
              eq(pageEntries.departmentId, user.departmentId),
            )!,
          );
        }
      } else {
        accessParts.push(eq(pageCategories.scope, scope));
      }
    }
  }

  if (isHod && user.departmentId) {
    accessParts.push(eq(pageEntries.departmentId, user.departmentId));
  }

  if (accessParts.length === 0) {
    return { items: [], totalCount: 0 };
  }

  const conditions = [
    accessParts.length === 1 ? accessParts[0] : or(...accessParts)!,
  ];

  const trimmedSearch = options?.search?.trim();
  if (trimmedSearch) {
    const pattern = `%${trimmedSearch}%`;
    conditions.push(
      or(
        ilike(pageEntries.field1, pattern),
        ilike(pageEntries.field2, pattern),
        ilike(pageEntries.field3, pattern),
        ilike(pageEntries.field4, pattern),
        ilike(pageEntries.field5, pattern),
        ilike(pageEntries.slug, pattern),
        ilike(pageCategories.code, pattern),
        ilike(pageCategories.name, pattern),
        ilike(departmentsTable.code, pattern),
        ilike(departmentsTable.name, pattern),
      )!,
    );
  }

  const whereClause = and(...conditions);
  const page = Math.max(1, options?.page ?? 1);
  const pageSize = Math.max(1, Math.min(200, options?.pageSize ?? 50));
  const offset = (page - 1) * pageSize;

  const [totalRow] = await db
    .select({ total: count() })
    .from(pageEntries)
    .innerJoin(
      pageCategories,
      eq(pageEntries.pageCategoryId, pageCategories.id),
    )
    .leftJoin(
      departmentsTable,
      eq(pageEntries.departmentId, departmentsTable.id),
    )
    .where(whereClause);

  const items = await db
    .select({
      id: pageEntries.id,
      pageCategoryId: pageEntries.pageCategoryId,
      categoryCode: pageCategories.code,
      categoryName: pageCategories.name,
      categoryScope: pageCategories.scope,
      departmentId: pageEntries.departmentId,
      departmentCode: departmentsTable.code,
      departmentName: departmentsTable.name,
      displayOrder: pageEntries.displayOrder,
      field1: pageEntries.field1,
      field2: pageEntries.field2,
      field3: pageEntries.field3,
      field4: pageEntries.field4,
      field5: pageEntries.field5,
      slug: pageEntries.slug,
      htmlPath: pageEntries.htmlPath,
      htmlContent: pageEntries.htmlContent,
      file1: pageEntries.file1,
      file2: pageEntries.file2,
      link1: pageEntries.link1,
      link2: pageEntries.link2,
      createdAt: pageEntries.createdAt,
      updatedAt: pageEntries.updatedAt,
    })
    .from(pageEntries)
    .innerJoin(
      pageCategories,
      eq(pageEntries.pageCategoryId, pageCategories.id),
    )
    .leftJoin(
      departmentsTable,
      eq(pageEntries.departmentId, departmentsTable.id),
    )
    .where(whereClause)
    .orderBy(desc(pageEntries.updatedAt), desc(pageEntries.createdAt))
    .limit(pageSize)
    .offset(offset);

  return {
    items,
    totalCount: Number(totalRow?.total ?? 0),
  };
}
