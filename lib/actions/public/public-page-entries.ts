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
}> {
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

/**
 * Fetches public entries for a non-permanent category by code, either at
 * university scope (deptCode omitted) or scoped to a specific department.
 */
export async function getPublicCategoryEntries(params: {
  code: string;
  deptCode?: string | null;
}): Promise<{
  department: PublicDepartmentBasic | null;
  category: {
    id: string;
    name: string;
    code: string;
    note: string | null;
  } | null;
  entries: PublicCategoryPageEntryItem[];
}> {
  const cleanCode = params.code.trim().toLowerCase();
  const cleanDeptCode = params.deptCode?.trim().toLowerCase() || null;

  if (!cleanCode) {
    return { department: null, category: null, entries: [] };
  }

  if (cleanDeptCode) {
    const [department] = await db
      .select({
        id: departmentsTable.id,
        name: departmentsTable.name,
        code: departmentsTable.code,
      })
      .from(departmentsTable)
      .where(sql`lower(${departmentsTable.code}) = ${cleanDeptCode}`)
      .limit(1);

    if (!department) {
      return { department: null, category: null, entries: [] };
    }

    const [category] = await db
      .select({
        id: pageCategories.id,
        name: pageCategories.name,
        code: pageCategories.code,
        note: pageCategories.note,
      })
      .from(pageCategories)
      .where(
        and(
          sql`lower(${pageCategories.code}) = ${cleanCode}`,
          eq(pageCategories.permanent, false),
          or(
            eq(pageCategories.departmentId, department.id),
            eq(pageCategories.departmentId, "__all__"),
          ),
        ),
      )
      .limit(1);

    if (!category) {
      return { department, category: null, entries: [] };
    }

    const entries = await db
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
        updatedAt: pageEntries.updatedAt,
      })
      .from(pageEntries)
      .where(
        and(
          eq(pageEntries.pageCategoryId, category.id),
          eq(pageEntries.departmentId, department.id),
        ),
      )
      .orderBy(
        asc(pageEntries.displayOrder),
        desc(pageEntries.createdAt),
        desc(pageEntries.id),
      );

    return { department, category, entries };
  }

  const [category] = await db
    .select({
      id: pageCategories.id,
      name: pageCategories.name,
      code: pageCategories.code,
      note: pageCategories.note,
    })
    .from(pageCategories)
    .where(
      and(
        sql`lower(${pageCategories.code}) = ${cleanCode}`,
        eq(pageCategories.permanent, false),
        isNull(pageCategories.departmentId),
      ),
    )
    .limit(1);

  if (!category) {
    return { department: null, category: null, entries: [] };
  }

  const entries = await db
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
      updatedAt: pageEntries.updatedAt,
    })
    .from(pageEntries)
    .where(
      and(
        eq(pageEntries.pageCategoryId, category.id),
        isNull(pageEntries.departmentId),
      ),
    )
    .orderBy(
      asc(pageEntries.displayOrder),
      desc(pageEntries.createdAt),
      desc(pageEntries.id),
    );

  return { department: null, category, entries };
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

export async function getPublicCustomPagesByDept(
  deptCode?: string | null,
): Promise<PublicCustomPageLinkItem[]> {
  const cleanCode = deptCode?.trim().toLowerCase() || null;

  let resolvedDeptId: string | null = null;
  if (cleanCode) {
    const [dept] = await db
      .select({ id: departmentsTable.id })
      .from(departmentsTable)
      .where(sql`lower(${departmentsTable.code}) = ${cleanCode}`)
      .limit(1);

    if (!dept) return [];
    resolvedDeptId = dept.id;
  }

  const customFilter = or(
    isNotNull(pageEntries.slug),
    isNotNull(pageEntries.htmlContent),
  );

  const whereClause = resolvedDeptId
    ? and(customFilter, eq(pageEntries.departmentId, resolvedDeptId))
    : customFilter;

  const rows = await db
    .select({
      id: pageEntries.id,
      displayOrder: pageEntries.displayOrder,
      field1: pageEntries.field1,
      field2: pageEntries.field2,
      field3: pageEntries.field3,
      field4: pageEntries.field4,
      field5: pageEntries.field5,
      slug: pageEntries.slug,
      htmlContent: pageEntries.htmlContent,
      pageCategoryId: pageEntries.pageCategoryId,
      categoryCode: pageCategories.code,
      categoryName: pageCategories.name,
      departmentId: pageEntries.departmentId,
      departmentCode: departmentsTable.code,
      departmentName: departmentsTable.name,
      createdAt: pageEntries.createdAt,
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
    .orderBy(
      asc(pageEntries.displayOrder),
      desc(pageEntries.createdAt),
      desc(pageEntries.id),
    );

  return rows
    .filter((r): r is typeof r & { slug: string } => Boolean(r.slug?.trim()))
    .map((r) => {
      const cleanSlug = r.slug.trim();
      const deptSlug = r.departmentCode?.toLowerCase();
      const isDept = Boolean(r.departmentId && deptSlug);
      const href = isDept
        ? `/departments/${deptSlug}/custom-pages/${cleanSlug}`
        : `/custom-pages/${cleanSlug}`;

      return {
        id: r.id,
        displayOrder: r.displayOrder,
        field1: r.field1,
        field2: r.field2,
        field3: r.field3,
        field4: r.field4,
        field5: r.field5,
        slug: cleanSlug,
        htmlContent: r.htmlContent,
        pageCategoryId: r.pageCategoryId,
        categoryCode: r.categoryCode,
        categoryName: r.categoryName,
        scope: isDept ? ("department" as const) : ("university" as const),
        departmentId: r.departmentId,
        departmentCode: r.departmentCode,
        departmentName: r.departmentName,
        href,
        createdAt: r.createdAt,
      };
    });
}

export async function getPublicUniversityCustomPages(): Promise<
  PublicUniversityCustomPageItem[]
> {
  const rows = await db
    .select({
      id: pageEntries.id,
      displayOrder: pageEntries.displayOrder,
      field1: pageEntries.field1,
      field2: pageEntries.field2,
      field3: pageEntries.field3,
      field4: pageEntries.field4,
      field5: pageEntries.field5,
      slug: pageEntries.slug,
      htmlContent: pageEntries.htmlContent,
      pageCategoryId: pageEntries.pageCategoryId,
      categoryCode: pageCategories.code,
      categoryName: pageCategories.name,
      createdAt: pageEntries.createdAt,
    })
    .from(pageEntries)
    .innerJoin(
      pageCategories,
      eq(pageEntries.pageCategoryId, pageCategories.id),
    )
    .where(
      and(
        isNull(pageEntries.departmentId),
        or(isNotNull(pageEntries.slug), isNotNull(pageEntries.htmlContent)),
      ),
    )
    .orderBy(
      asc(pageEntries.displayOrder),
      desc(pageEntries.createdAt),
      desc(pageEntries.id),
    );

  return rows
    .filter((r): r is typeof r & { slug: string } => Boolean(r.slug?.trim()))
    .map((r) => {
      const cleanSlug = r.slug.trim();
      return {
        id: r.id,
        displayOrder: r.displayOrder,
        field1: r.field1,
        field2: r.field2,
        field3: r.field3,
        field4: r.field4,
        field5: r.field5,
        slug: cleanSlug,
        htmlContent: r.htmlContent,
        pageCategoryId: r.pageCategoryId,
        categoryCode: r.categoryCode,
        categoryName: r.categoryName,
        href: `/custom-pages/${cleanSlug}`,
        createdAt: r.createdAt,
      };
    });
}
