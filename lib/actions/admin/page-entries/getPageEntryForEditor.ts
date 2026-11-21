"use server";

import { asc, desc, eq, inArray } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { departmentsTable, pageCategories, pageEntries } from "@/db/schema";
import { getCurrentUser } from "@/lib/actions/auth";
import {
  getAllowedScopesForRights,
  getScopesConfig,
} from "@/lib/actions/configs";

export interface CategoryChoice {
  id: string;
  name: string;
  code: string;
  note: string | null;
  permanent: boolean;
  singleEntry: boolean;
  existingEntryId: string | null;
  scope: string;
  scopeLabel: string;
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
}

export interface PageEntryEditorData {
  id: string | null;
  title: string | null;
  desc: string;
  pageCategoryId: string;
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  slug: string;
  htmlPath: string;
  file1: string;
  file2: string;
  link1: string;
  link2: string;
  userDepartmentId: string | null;
  userDepartmentCode: string | null;
  userDepartmentName: string | null;
  categories: CategoryChoice[];
}

export async function getPageEntryForEditor(
  id: string,
): Promise<PageEntryEditorData> {
  const user = await getCurrentUser();
  const rights = Array.isArray(user?.rights) ? user.rights : [];

  if (!user || rights.length === 0) {
    throw new Error("Unauthorized: Portal access required.");
  }

  const [scopes, allowedScopes] = await Promise.all([
    getScopesConfig(),
    getAllowedScopesForRights(rights),
  ]);

  const isAdmin = rights.includes("admin");
  const isHod = rights.includes("hod");

  const effectiveScopeKeys = new Set(allowedScopes.map((s) => s.key));
  if (isHod) {
    effectiveScopeKeys.add("all-departments");
  }

  const scopeLabelMap = new Map(scopes.map((s) => [s.key, s.label]));

  function canAccessScopeAndDept(
    scopeKey: string,
    rowDepartmentId: string | null,
  ): boolean {
    if (!effectiveScopeKeys.has(scopeKey)) return false;
    if (scopeKey === "department" && !isAdmin) {
      return (
        Boolean(user?.departmentId) && rowDepartmentId === user?.departmentId
      );
    }
    return true;
  }

  // 1. Load user's department if present
  let userDept: { id: string; code: string; name: string } | null = null;
  if (user.departmentId) {
    const [dept] = await db
      .select({
        id: departmentsTable.id,
        code: departmentsTable.code,
        name: departmentsTable.name,
      })
      .from(departmentsTable)
      .where(eq(departmentsTable.id, user.departmentId))
      .limit(1);
    userDept = dept ?? null;
  }

  // 2. Load categories visible to user's allowed scopes (+ all-departments for HOD)
  const catRows = await db
    .select({
      id: pageCategories.id,
      name: pageCategories.name,
      code: pageCategories.code,
      note: pageCategories.note,
      permanent: pageCategories.permanent,
      singleEntry: pageCategories.singleEntry,
      scope: pageCategories.scope,
      departmentId: pageCategories.departmentId,
      departmentCode: departmentsTable.code,
      departmentName: departmentsTable.name,
    })
    .from(pageCategories)
    .leftJoin(
      departmentsTable,
      eq(pageCategories.departmentId, departmentsTable.id),
    )
    .orderBy(
      asc(pageCategories.scope),
      asc(pageCategories.code),
      asc(pageCategories.name),
    );

  const visibleCats = catRows.filter((row) =>
    canAccessScopeAndDept(row.scope || "university", row.departmentId),
  );

  // 3. Find latest entry per singleEntry category
  const visibleCatIds = visibleCats.map((r) => r.id);
  const existingByCat = new Map<string, string>();

  if (visibleCatIds.length > 0) {
    const existingRows = await db
      .select({
        id: pageEntries.id,
        pageCategoryId: pageEntries.pageCategoryId,
        departmentId: pageEntries.departmentId,
      })
      .from(pageEntries)
      .where(inArray(pageEntries.pageCategoryId, visibleCatIds));

    for (const cat of visibleCats) {
      const match =
        cat.scope === "all-departments" && user.departmentId
          ? existingRows.find(
              (r) =>
                r.pageCategoryId === cat.id &&
                r.departmentId === user.departmentId,
            )
          : existingRows.find((r) => r.pageCategoryId === cat.id);

      if (match) {
        existingByCat.set(cat.id, match.id);
      }
    }
  }

  const categories: CategoryChoice[] = visibleCats.map((row) => {
    const scopeKey = row.scope || "university";
    return {
      id: row.id,
      name: row.name,
      code: row.code,
      note: row.note,
      permanent: row.permanent,
      singleEntry: Boolean(row.singleEntry),
      existingEntryId: existingByCat.get(row.id) ?? null,
      scope: scopeKey,
      scopeLabel: scopeLabelMap.get(scopeKey) ?? scopeKey,
      departmentId: row.departmentId,
      departmentCode: row.departmentCode,
      departmentName: row.departmentName,
    };
  });

  const baseReturn = {
    userDepartmentId: userDept?.id ?? null,
    userDepartmentCode: userDept?.code ?? null,
    userDepartmentName: userDept?.name ?? null,
    categories,
  };

  // 4. Return blank template for new entry
  if (id === "new") {
    const first = categories[0] ?? null;
    return {
      ...baseReturn,
      id: null,
      title: null,
      desc: "",
      pageCategoryId: first?.id ?? "",
      departmentId: first?.departmentId ?? userDept?.id ?? null,
      departmentCode: first?.departmentCode ?? userDept?.code ?? null,
      departmentName: first?.departmentName ?? userDept?.name ?? null,
      slug: "",
      htmlPath: "",
      file1: "",
      file2: "",
      link1: "",
      link2: "",
    };
  }

  // 5. Load and verify existing entry
  const [existing] = await db
    .select({
      id: pageEntries.id,
      title: pageEntries.title,
      desc: pageEntries.desc,
      pageCategoryId: pageEntries.pageCategoryId,
      departmentId: pageEntries.departmentId,
      departmentCode: departmentsTable.code,
      departmentName: departmentsTable.name,
      slug: pageEntries.slug,
      htmlPath: pageEntries.htmlPath,
      file1: pageEntries.file1,
      file2: pageEntries.file2,
      link1: pageEntries.link1,
      link2: pageEntries.link2,
      categoryScope: pageCategories.scope,
    })
    .from(pageEntries)
    .leftJoin(
      departmentsTable,
      eq(pageEntries.departmentId, departmentsTable.id),
    )
    .leftJoin(pageCategories, eq(pageEntries.pageCategoryId, pageCategories.id))
    .where(eq(pageEntries.id, id))
    .limit(1);

  if (!existing) {
    throw new Error("Page entry not found.");
  }

  if (
    !canAccessScopeAndDept(
      existing.categoryScope || "university",
      existing.departmentId,
    )
  ) {
    throw new Error("Unauthorized: You cannot access this page entry.");
  }

  return {
    ...baseReturn,
    id: existing.id,
    title: existing.title,
    desc: existing.desc ?? "",
    pageCategoryId: existing.pageCategoryId,
    departmentId: existing.departmentId,
    departmentCode: existing.departmentCode,
    departmentName: existing.departmentName,
    slug: existing.slug ?? "",
    htmlPath: existing.htmlPath ?? "",
    file1: existing.file1 ?? "",
    file2: existing.file2 ?? "",
    link1: existing.link1 ?? "",
    link2: existing.link2 ?? "",
  };
}
