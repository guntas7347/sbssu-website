"use server";

import { and, asc, eq, sql } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { departmentsTable, pageCategories, pageEntries } from "@/db/schema";
import {
  normalizeUiLayout,
  type CategoryUiLayout,
  type CategoryViewMeta,
  type RawCategoryEntry,
} from "@/components/category-views/entry-view-helpers";

const DEPARTMENT_SCOPES = new Set(["department", "all-departments"]);

export interface PublicCategoryPageData {
  category: CategoryViewMeta & {
    id: string;
    name: string;
    code: string;
    scope: string;
    uiLayout: CategoryUiLayout;
    singleEntry: boolean;
  };
  department: {
    id: string;
    code: string;
    name: string;
  } | null;
  entries: RawCategoryEntry[];
}

export async function getPublicCategoryPageData(input: {
  scope: string;
  catCode: string;
  deptCode?: string | null;
}): Promise<PublicCategoryPageData | null> {
  try {
    const scope = input.scope.trim().toLowerCase();
    const catCode = input.catCode.trim().toLowerCase();

    if (!scope || !catCode) {
      return null;
    }

    const isDepartmentScope = DEPARTMENT_SCOPES.has(scope);
    const deptCode = isDepartmentScope
      ? input.deptCode?.trim().toLowerCase() || null
      : null;

    // Department scopes require a valid deptCode; non-department scopes ignore department completely
    if (isDepartmentScope && !deptCode) {
      return null;
    }

    // 1. Resolve department only when scope is "department" or "all-departments"
    let department: { id: string; code: string; name: string } | null = null;
    if (isDepartmentScope && deptCode) {
      const [dept] = await db
        .select({
          id: departmentsTable.id,
          code: departmentsTable.code,
          name: departmentsTable.name,
        })
        .from(departmentsTable)
        .where(eq(sql`lower(${departmentsTable.code})`, deptCode))
        .limit(1);

      if (!dept) {
        return null;
      }
      department = dept;
    }

    // 2. Resolve category matching scope + catCode (+ departmentId only for "department" scope)
    const categoryConditions = [
      eq(sql`lower(${pageCategories.scope})`, scope),
      eq(sql`lower(${pageCategories.code})`, catCode),
    ];

    if (scope === "department" && department) {
      categoryConditions.push(eq(pageCategories.departmentId, department.id));
    }

    const [cat] = await db
      .select({
        id: pageCategories.id,
        name: pageCategories.name,
        code: pageCategories.code,
        note: pageCategories.note,
        scope: pageCategories.scope,
        singleEntry: pageCategories.singleEntry,
        uiLayout: pageCategories.uiLayout,
        field1Label: pageCategories.field1Label,
        field2Label: pageCategories.field2Label,
        field3Label: pageCategories.field3Label,
        field4Label: pageCategories.field4Label,
        field5Label: pageCategories.field5Label,
        file1Label: pageCategories.file1Label,
        file2Label: pageCategories.file2Label,
        link1Label: pageCategories.link1Label,
        link2Label: pageCategories.link2Label,
      })
      .from(pageCategories)
      .where(and(...categoryConditions))
      .limit(1);

    if (!cat) {
      return null;
    }

    // 3. Fetch entries (filtered by departmentId only when scope is "all-departments")
    const entryConditions = [eq(pageEntries.pageCategoryId, cat.id)];
    if (scope === "all-departments" && department) {
      entryConditions.push(eq(pageEntries.departmentId, department.id));
    }

    const rows = await db
      .select({
        id: pageEntries.id,
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
      })
      .from(pageEntries)
      .where(and(...entryConditions))
      .orderBy(asc(pageEntries.displayOrder), asc(pageEntries.createdAt));

    return {
      category: {
        id: cat.id,
        name: cat.name,
        code: cat.code,
        note: cat.note,
        scope: cat.scope,
        singleEntry: Boolean(cat.singleEntry),
        uiLayout: normalizeUiLayout(cat.uiLayout),
        field1Label: cat.field1Label,
        field2Label: cat.field2Label,
        field3Label: cat.field3Label,
        field4Label: cat.field4Label,
        field5Label: cat.field5Label,
        file1Label: cat.file1Label,
        file2Label: cat.file2Label,
        link1Label: cat.link1Label,
        link2Label: cat.link2Label,
      },
      department,
      entries: rows,
    };
  } catch {
    return null;
  }
}

export interface ScopeDirectoryCategoryItem {
  id: string;
  name: string;
  code: string;
  uiLayout: CategoryUiLayout;
  singleEntry: boolean;
  entryCount: number;
  href: string;
}

export interface PublicScopeDirectoryData {
  scope: string;
  categories: ScopeDirectoryCategoryItem[];
}

export async function getPublicScopeDirectory(
  rawScope: string,
): Promise<PublicScopeDirectoryData | null> {
  try {
    const scope = rawScope.trim().toLowerCase();
    if (!scope || DEPARTMENT_SCOPES.has(scope)) return null;

    const rows = await db
      .select({
        id: pageCategories.id,
        name: pageCategories.name,
        code: pageCategories.code,
        uiLayout: pageCategories.uiLayout,
        singleEntry: pageCategories.singleEntry,
        entryCount: sql<number>`count(${pageEntries.id})::int`,
      })
      .from(pageCategories)
      .leftJoin(pageEntries, eq(pageEntries.pageCategoryId, pageCategories.id))
      .where(eq(sql`lower(${pageCategories.scope})`, scope))
      .groupBy(
        pageCategories.id,
        pageCategories.name,
        pageCategories.code,
        pageCategories.uiLayout,
        pageCategories.singleEntry,
      )
      .orderBy(asc(pageCategories.code), asc(pageCategories.name));

    if (rows.length === 0) return null;

    return {
      scope,
      categories: rows.map((row) => ({
        id: row.id,
        name: row.name,
        code: row.code,
        uiLayout: normalizeUiLayout(row.uiLayout),
        singleEntry: Boolean(row.singleEntry),
        entryCount: Number(row.entryCount ?? 0),
        href: `/pages/${scope}/${row.code.trim().toLowerCase()}`,
      })),
    };
  } catch {
    return null;
  }
}
