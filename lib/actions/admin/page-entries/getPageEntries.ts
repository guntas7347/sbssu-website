"use server";

import { and, count, desc, eq, ilike, inArray, or, sql } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { departmentsTable, pageCategories, pageEntries } from "@/db/schema";
import { getCurrentUser } from "@/lib/actions/auth";
import { getAllowedScopesForRights } from "@/lib/actions/configs";

export interface AdminPageEntryItem {
  id: string;
  title: string | null;
  desc: string | null;
  pageCategoryId: string;
  categoryCode: string;
  categoryName: string;
  categoryScope: string;
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  slug: string | null;
  htmlPath: string | null;
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

  const allowedScopes = await getAllowedScopesForRights(rights);
  const allowedScopeKeys = allowedScopes.map((s) => s.key);
  const isHod = rights.includes("hod");

  const accessParts = [];
  if (allowedScopeKeys.length > 0) {
    accessParts.push(
      inArray(
        sql`coalesce(${pageCategories.scope}, 'university')`,
        allowedScopeKeys,
      ),
    );
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
        ilike(pageEntries.title, pattern),
        ilike(pageEntries.desc, pattern),
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
      title: pageEntries.title,
      desc: pageEntries.desc,
      pageCategoryId: pageEntries.pageCategoryId,
      categoryCode: pageCategories.code,
      categoryName: pageCategories.name,
      categoryScope: pageCategories.scope,
      departmentId: pageEntries.departmentId,
      departmentCode: departmentsTable.code,
      departmentName: departmentsTable.name,
      slug: pageEntries.slug,
      htmlPath: pageEntries.htmlPath,
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
