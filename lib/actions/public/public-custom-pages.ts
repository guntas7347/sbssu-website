"use server";

import { and, asc, eq } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { departmentsTable, pageCategories, pageEntries } from "@/db/schema";

export interface PublicHtmlPageEntry {
  id: string;
  slug: string | null;
  field1: string | null;
  field2: string | null;
  field3: string | null;
  field4: string | null;
  field5: string | null;
  file1: string | null;
  file2: string | null;
  link1: string | null;
  link2: string | null;
  htmlContent: string | null;
  htmlPath: string | null;
  categoryCode: string;
  categoryName: string;
  scope: string;
  departmentCode: string | null;
  departmentName: string | null;
}

const DEPT_SCOPES = new Set(["all-departments", "department"]);

interface ParsedHtmlRoute {
  scope: string;
  deptCode?: string;
  catCode?: string;
  entrySlug: string;
}

function parseHtmlSlugSegments(segments?: string[]): ParsedHtmlRoute | null {
  if (!segments || segments.length < 3) return null;

  const clean = segments.map((s) => s.trim().toLowerCase()).filter(Boolean);
  if (clean.length < 3) return null;

  const scope = clean[0];
  const fourth = clean[1];
  const entrySlug = clean[2];

  if (!scope || !fourth || !entrySlug) return null;

  if (DEPT_SCOPES.has(scope)) {
    return {
      scope,
      deptCode: fourth,
      entrySlug,
    };
  }

  return {
    scope,
    catCode: fourth,
    entrySlug,
  };
}

export async function getPublicHtmlPageEntry(
  slugSegments?: string[],
): Promise<PublicHtmlPageEntry | null> {
  const parsed = parseHtmlSlugSegments(slugSegments);
  if (!parsed) return null;

  if (parsed.deptCode) {
    const rows = await db
      .select({
        id: pageEntries.id,
        slug: pageEntries.slug,
        field1: pageEntries.field1,
        field2: pageEntries.field2,
        field3: pageEntries.field3,
        field4: pageEntries.field4,
        field5: pageEntries.field5,
        file1: pageEntries.file1,
        file2: pageEntries.file2,
        link1: pageEntries.link1,
        link2: pageEntries.link2,
        htmlContent: pageEntries.htmlContent,
        htmlPath: pageEntries.htmlPath,
        categoryCode: pageCategories.code,
        categoryName: pageCategories.name,
        scope: pageCategories.scope,
        departmentCode: departmentsTable.code,
        departmentName: departmentsTable.name,
      })
      .from(pageEntries)
      .innerJoin(
        pageCategories,
        eq(pageEntries.pageCategoryId, pageCategories.id),
      )
      .innerJoin(
        departmentsTable,
        eq(pageEntries.departmentId, departmentsTable.id),
      )
      .where(
        and(
          eq(departmentsTable.code, parsed.deptCode),
          eq(pageEntries.slug, parsed.entrySlug),
        ),
      )
      .orderBy(asc(pageEntries.displayOrder), asc(pageEntries.createdAt))
      .limit(1);

    return rows[0] ?? null;
  }

  const rows = await db
    .select({
      id: pageEntries.id,
      slug: pageEntries.slug,
      field1: pageEntries.field1,
      field2: pageEntries.field2,
      field3: pageEntries.field3,
      field4: pageEntries.field4,
      field5: pageEntries.field5,
      file1: pageEntries.file1,
      file2: pageEntries.file2,
      link1: pageEntries.link1,
      link2: pageEntries.link2,
      htmlContent: pageEntries.htmlContent,
      htmlPath: pageEntries.htmlPath,
      categoryCode: pageCategories.code,
      categoryName: pageCategories.name,
      scope: pageCategories.scope,
      departmentId: pageEntries.departmentId,
    })
    .from(pageEntries)
    .innerJoin(
      pageCategories,
      eq(pageEntries.pageCategoryId, pageCategories.id),
    )
    .where(
      and(
        eq(pageCategories.scope, parsed.scope),
        eq(pageCategories.code, parsed.catCode!),
        eq(pageEntries.slug, parsed.entrySlug),
      ),
    )
    .orderBy(asc(pageEntries.displayOrder), asc(pageEntries.createdAt))
    .limit(1);

  const row = rows[0];
  if (!row) return null;

  let departmentCode: string | null = null;
  let departmentName: string | null = null;

  if (row.departmentId) {
    const [dept] = await db
      .select({
        code: departmentsTable.code,
        name: departmentsTable.name,
      })
      .from(departmentsTable)
      .where(eq(departmentsTable.id, row.departmentId))
      .limit(1);

    departmentCode = dept?.code ?? null;
    departmentName = dept?.name ?? null;
  }

  return {
    id: row.id,
    slug: row.slug,
    field1: row.field1,
    field2: row.field2,
    field3: row.field3,
    field4: row.field4,
    field5: row.field5,
    file1: row.file1,
    file2: row.file2,
    link1: row.link1,
    link2: row.link2,
    htmlContent: row.htmlContent,
    htmlPath: row.htmlPath,
    categoryCode: row.categoryCode,
    categoryName: row.categoryName,
    scope: row.scope,
    departmentCode,
    departmentName,
  };
}
