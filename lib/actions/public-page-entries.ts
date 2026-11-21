import { db } from "@/db/drizzel";
import { departmentsTable, pageEntries } from "@/db/schema";
import { and, asc, desc, eq, isNull, sql } from "drizzle-orm";

export interface PublicPageEntryItem {
  id: string;
  type: "generic" | "custom";
  departmentId: string | null;
  title: string | null;
  category: string | null;
  desc: string | null;
  file: string | null;
  link: string | null;
  slug: string | null;
  path: string | null;
  scope: "university" | "department" | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetPublicPageEntriesParams {
  category: string;
  departmentId?: string | null;
  deptCode?: string | null;
}

/**
 * Public action to fetch ALL entries for a department in one query (newest first).
 * Useful on /departments/[deptCode]/page.tsx so you can slice categories in memory
 * via `entries.filter((e) => e.category === "208")[0]` without N+1 DB calls.
 */
export async function getAllPublicDepartmentEntries(deptCode: string): Promise<{
  department: { id: string; name: string; code: string } | null;
  entries: PublicPageEntryItem[];
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
      type: pageEntries.type,
      departmentId: pageEntries.departmentId,
      title: pageEntries.title,
      category: pageEntries.category,
      desc: pageEntries.desc,
      file: pageEntries.file,
      link: pageEntries.link,
      slug: pageEntries.slug,
      path: pageEntries.path,
      scope: pageEntries.scope,
      createdAt: pageEntries.createdAt,
      updatedAt: pageEntries.updatedAt,
    })
    .from(pageEntries)
    .where(eq(pageEntries.departmentId, department.id))
    .orderBy(desc(pageEntries.createdAt), desc(pageEntries.id));

  return { department, entries };
}

export interface PublicDepartmentBasic {
  id: string;
  name: string;
  code: string;
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

export interface PublicCustomPageLinkItem {
  id: string;
  title: string | null;
  desc: string | null;
  slug: string;
  category: string | null;
  scope: "university" | "department" | null;
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  href: string;
  createdAt: Date;
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

  const whereClause = resolvedDeptId
    ? and(
        eq(pageEntries.type, "custom"),
        eq(pageEntries.departmentId, resolvedDeptId),
      )
    : eq(pageEntries.type, "custom");

  const rows = await db
    .select({
      id: pageEntries.id,
      title: pageEntries.title,
      desc: pageEntries.desc,
      slug: pageEntries.slug,
      category: pageEntries.category,
      scope: pageEntries.scope,
      departmentId: pageEntries.departmentId,
      departmentCode: departmentsTable.code,
      departmentName: departmentsTable.name,
      createdAt: pageEntries.createdAt,
    })
    .from(pageEntries)
    .leftJoin(
      departmentsTable,
      eq(pageEntries.departmentId, departmentsTable.id),
    )
    .where(whereClause)
    .orderBy(desc(pageEntries.createdAt), desc(pageEntries.id));

  return rows
    .filter((r): r is typeof r & { slug: string } => Boolean(r.slug?.trim()))
    .map((r) => {
      const cleanSlug = r.slug.trim();
      const deptSlug = r.departmentCode?.toLowerCase();
      const href =
        r.scope === "department" && deptSlug
          ? `/departments/${deptSlug}/pages/${cleanSlug}`
          : `/pages/${cleanSlug}`;

      return {
        id: r.id,
        title: r.title,
        desc: r.desc,
        slug: cleanSlug,
        category: r.category,
        scope: r.scope,
        departmentId: r.departmentId,
        departmentCode: r.departmentCode,
        departmentName: r.departmentName,
        href,
        createdAt: r.createdAt,
      };
    });
}

export interface PublicUniversityCustomPageItem {
  id: string;
  title: string | null;
  desc: string | null;
  slug: string;
  category: string | null;
  href: string;
  createdAt: Date;
}

export async function getPublicUniversityCustomPages(): Promise<
  PublicUniversityCustomPageItem[]
> {
  const rows = await db
    .select({
      id: pageEntries.id,
      title: pageEntries.title,
      desc: pageEntries.desc,
      slug: pageEntries.slug,
      category: pageEntries.category,
      createdAt: pageEntries.createdAt,
    })
    .from(pageEntries)
    .where(
      and(eq(pageEntries.type, "custom"), isNull(pageEntries.departmentId)),
    )
    .orderBy(desc(pageEntries.createdAt), desc(pageEntries.id));

  return rows
    .filter((r): r is typeof r & { slug: string } => Boolean(r.slug?.trim()))
    .map((r) => {
      const cleanSlug = r.slug.trim();
      return {
        id: r.id,
        title: r.title,
        desc: r.desc,
        slug: cleanSlug,
        category: r.category,
        href: `/pages/${cleanSlug}`,
        createdAt: r.createdAt,
      };
    });
}
