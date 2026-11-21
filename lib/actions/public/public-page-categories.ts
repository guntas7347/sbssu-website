import { db } from "@/db/drizzel";
import { departmentsTable, pageCategories, pageEntries } from "@/db/schema";
import { and, eq, isNull } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function getPublicCategoryPage(params: {
  code: string;
  deptCode?: string;
}) {
  const normalizedCode = params.code.trim().toLowerCase();
  const normalizedDept = params.deptCode?.trim().toLowerCase();

  if (normalizedDept) {
    const [dept] = await db
      .select({
        id: departmentsTable.id,
        code: departmentsTable.code,
        name: departmentsTable.name,
      })
      .from(departmentsTable)
      .where(eq(departmentsTable.code, normalizedDept))
      .limit(1);

    if (!dept) {
      notFound();
    }

    const [category] = await db
      .select({
        id: pageCategories.id,
        name: pageCategories.name,
        code: pageCategories.code,
        note: pageCategories.note,
        permanent: pageCategories.permanent,
      })
      .from(pageCategories)
      .where(
        and(
          eq(pageCategories.departmentId, dept.id),
          eq(pageCategories.code, normalizedCode),
          eq(pageCategories.permanent, false),
        ),
      )
      .limit(1);

    if (!category) {
      notFound();
    }

    const entries = await db
      .select()
      .from(pageEntries)
      .where(
        and(
          eq(pageEntries.pageCategoryId, category.id),
          eq(pageEntries.departmentId, dept.id),
        ),
      );

    return {
      scope: "department" as const,
      department: dept,
      category,
      entries,
    };
  }

  const [category] = await db
    .select({
      id: pageCategories.id,
      name: pageCategories.name,
      code: pageCategories.code,
      note: pageCategories.note,
      permanent: pageCategories.permanent,
    })
    .from(pageCategories)
    .where(
      and(
        isNull(pageCategories.departmentId),
        eq(pageCategories.code, normalizedCode),
        eq(pageCategories.permanent, false),
      ),
    )
    .limit(1);

  if (!category) {
    notFound();
  }

  const entries = await db
    .select()
    .from(pageEntries)
    .where(
      and(
        eq(pageEntries.pageCategoryId, category.id),
        isNull(pageEntries.departmentId),
      ),
    );

  return { scope: "university" as const, department: null, category, entries };
}
