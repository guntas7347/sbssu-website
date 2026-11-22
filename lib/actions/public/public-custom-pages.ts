"use server";

import { and, asc, desc, eq, or, sql } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { departmentsTable, pageCategories, pageEntries } from "@/db/schema";

export interface PublicSlugPageEntry {
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
  file1: string | null;
  file2: string | null;
  link1: string | null;
  link2: string | null;
  slug: string | null;
  htmlContent: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export async function getPageEntryByCategoryAndSlug(params: {
  catCode: string;
  slug: string;
  deptCode?: string | null;
}): Promise<PublicSlugPageEntry | null> {
  const cleanCatCode = params.catCode.trim().toLowerCase();
  const cleanSlug = params.slug.trim().toLowerCase();
  const cleanDeptCode = params.deptCode?.trim().toLowerCase() || null;

  if (!cleanCatCode || !cleanSlug) {
    return null;
  }

  const conditions = [
    sql`lower(${pageCategories.code}) = ${cleanCatCode}`,
    sql`lower(${pageEntries.slug}) = ${cleanSlug}`,
  ];

  if (cleanDeptCode) {
    conditions.push(
      or(
        sql`lower(${departmentsTable.code}) = ${cleanDeptCode}`,
        eq(pageCategories.scope, "all-departments"),
      )!,
    );
  }

  const rows = await db
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
      file1: pageEntries.file1,
      file2: pageEntries.file2,
      link1: pageEntries.link1,
      link2: pageEntries.link2,
      slug: pageEntries.slug,
      htmlContent: pageEntries.htmlContent,
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
    .where(and(...conditions))
    .orderBy(
      asc(pageEntries.displayOrder),
      desc(pageEntries.updatedAt),
      desc(pageEntries.createdAt),
    )
    .limit(1);

  return rows[0] ?? null;
}
