"use server";

import { and, asc, eq, sql } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { departmentsTable, pageCategories, pageEntries } from "@/db/schema";
import {
  normalizeUiLayout,
  type CategoryUiLayout,
} from "@/components/category-views/entry-view-helpers";

const DEPARTMENT_SCOPES = new Set(["department", "all-departments"]);

export interface RawCategoryEntry {
  id: string;
  displayOrder?: number | null;
  field1?: string | null;
  field2?: string | null;
  field3?: string | null;
  field4?: string | null;
  field5?: string | null;
  file1?: string | null;
  file2?: string | null;
  link1?: string | null;
  link2?: string | null;
  slug?: string | null;
  htmlContent?: string | null;
  createdAt?: Date | string | null;
}

export interface PublicCategoryRecord {
  id: string;
  name: string;
  code: string;
  note: string | null;
  permanent: boolean;
  singleEntry: boolean;
  scope: string;
  departmentId: string | null;
  uiLayout: CategoryUiLayout;
  field1Label: string | null;
  field2Label: string | null;
  field3Label: string | null;
  field4Label: string | null;
  field5Label: string | null;
  file1Label: string | null;
  file2Label: string | null;
  link1Label: string | null;
  link2Label: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PublicCategoryDepartment {
  id: string;
  code: string;
  name: string;
}

export interface PublicCategoryPageData {
  category: PublicCategoryRecord;
  department: PublicCategoryDepartment | null;
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

    if (!scope || !catCode) return null;

    const isDepartmentScope = DEPARTMENT_SCOPES.has(scope);
    const deptCode = isDepartmentScope
      ? input.deptCode?.trim().toLowerCase() || null
      : null;

    if (isDepartmentScope && !deptCode) {
      return null;
    }

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

    const categoryConditions = [
      eq(sql`lower(${pageCategories.scope})`, scope),
      eq(sql`lower(${pageCategories.code})`, catCode),
    ];

    if (scope === "department" && department) {
      categoryConditions.push(eq(pageCategories.departmentId, department.id));
    }

    const [cat] = await db
      .select()
      .from(pageCategories)
      .where(and(...categoryConditions))
      .limit(1);

    if (!cat) {
      return null;
    }

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
        ...cat,
        uiLayout: normalizeUiLayout(cat.uiLayout),
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
    if (!scope) return null;

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
