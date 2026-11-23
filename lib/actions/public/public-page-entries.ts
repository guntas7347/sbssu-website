import { and, asc, desc, eq, isNotNull, isNull, or, sql } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { departmentsTable, pageCategories, pageEntries } from "@/db/schema";

export interface PublicDepartmentEntryItem {
  id: string;
  pageCategoryId: string;
  categoryCode: string;
  categoryName: string;
  departmentId: string | null;
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

export interface PublicCategoryPageEntryItem {
  id: string;
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

export interface PublicDepartmentBasic {
  id: string;
  name: string;
  code: string;
}

export interface PublicCustomPageLinkItem {
  id: string;
  displayOrder: number;
  field1: string | null;
  field2: string | null;
  field3: string | null;
  field4: string | null;
  field5: string | null;
  slug: string;
  htmlContent: string | null;
  pageCategoryId: string;
  categoryCode: string;
  categoryName: string;
  scope: "university" | "department";
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  href: string;
  createdAt: Date;
}

export interface PublicUniversityCustomPageItem {
  id: string;
  displayOrder: number;
  field1: string | null;
  field2: string | null;
  field3: string | null;
  field4: string | null;
  field5: string | null;
  slug: string;
  htmlContent: string | null;
  pageCategoryId: string;
  categoryCode: string;
  categoryName: string;
  href: string;
  createdAt: Date;
}

/**
 * Fetches all entries for a department in a single query so /departments/[deptCode]
 * can slice categories in memory without N+1 queries.
 */
export async function getAllPublicDepartmentEntries(deptCode: string): Promise<{
  department: PublicDepartmentBasic | null;
  entries: PublicDepartmentEntryItem[];
} | null> {
  const cleanCode = deptCode.trim().toLowerCase();
  if (!cleanCode) return { department: null, entries: [] };

  const [department] = await db
    .select({
      id: departmentsTable.id,
      name: departmentsTable.name,
      code: departmentsTable.code,
    })
    .from(departmentsTable)
    .where(sql`lower(${departmentsTable.code}) = ${cleanCode}`)
    .limit(1);

  if (!department) {
    return { department: null, entries: [] };
  }

  const entries = await db
    .select({
      id: pageEntries.id,
      pageCategoryId: pageEntries.pageCategoryId,
      categoryCode: pageCategories.code,
      categoryName: pageCategories.name,
      departmentId: pageEntries.departmentId,
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
    .where(eq(pageEntries.departmentId, department.id))
    .orderBy(
      asc(pageEntries.displayOrder),
      desc(pageEntries.createdAt),
      desc(pageEntries.id),
    );

  return { department, entries };
}

export async function getAllPublicDepartments(): Promise<
  PublicDepartmentBasic[]
> {
  return db
    .select({
      id: departmentsTable.id,
      name: departmentsTable.name,
      code: departmentsTable.code,
    })
    .from(departmentsTable)
    .orderBy(asc(departmentsTable.name));
}
