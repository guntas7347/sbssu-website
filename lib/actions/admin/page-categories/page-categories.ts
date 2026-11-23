"use server";

import { count, eq } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { departmentsTable, pageCategories, pageEntries } from "@/db/schema";
import { getCurrentUser } from "@/lib/actions/auth";
import { getAllowedScopesForRights } from "../../configs";

export type CategoryUiLayoutType =
  | "list"
  | "table"
  | "cards"
  | "accordion"
  | "article";

export interface PageCategoryByIdData {
  id: string | null;
  name: string;
  code: string;
  note: string;
  permanent: boolean;
  singleEntry: boolean;
  scope: string;
  uiLayout: CategoryUiLayoutType;
  field1Label: string;
  field2Label: string;
  field3Label: string;
  field4Label: string;
  field5Label: string;
  file1Label: string;
  file2Label: string;
  link1Label: string;
  link2Label: string;
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  entryCount: number;
}

function normalizeCode(raw: string): string {
  return raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeUiLayout(raw?: string | null): CategoryUiLayoutType {
  const clean = (raw ?? "").trim().toLowerCase();
  if (
    clean === "list" ||
    clean === "table" ||
    clean === "cards" ||
    clean === "accordion" ||
    clean === "article"
  ) {
    return clean;
  }
  return "list";
}

function normalizeOptionalLabel(raw?: string | null): string | null {
  const trimmed = raw?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : null;
}

export async function getPageCategoryById(
  id: string,
): Promise<PageCategoryByIdData> {
  const user = await getCurrentUser();
  const rights = Array.isArray(user?.rights) ? user.rights : [];

  if (!user || rights.length === 0) {
    throw new Error("Unauthorized: Portal access required.");
  }

  if (id === "new") {
    return {
      id: null,
      name: "",
      code: "",
      note: "",
      permanent: false,
      singleEntry: false,
      scope: "university",
      uiLayout: "list",
      field1Label: "",
      field2Label: "",
      field3Label: "",
      field4Label: "",
      field5Label: "",
      file1Label: "",
      file2Label: "",
      link1Label: "",
      link2Label: "",
      departmentId: null,
      departmentCode: null,
      departmentName: null,
      entryCount: 0,
    };
  }

  const [row] = await db
    .select({
      id: pageCategories.id,
      name: pageCategories.name,
      code: pageCategories.code,
      note: pageCategories.note,
      permanent: pageCategories.permanent,
      singleEntry: pageCategories.singleEntry,
      scope: pageCategories.scope,
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
      departmentId: pageCategories.departmentId,
      departmentCode: departmentsTable.code,
      departmentName: departmentsTable.name,
    })
    .from(pageCategories)
    .leftJoin(
      departmentsTable,
      eq(pageCategories.departmentId, departmentsTable.id),
    )
    .where(eq(pageCategories.id, id))
    .limit(1);

  if (!row) {
    throw new Error("Category not found.");
  }

  const [childCount] = await db
    .select({ total: count() })
    .from(pageEntries)
    .where(eq(pageEntries.pageCategoryId, row.id));

  return {
    id: row.id,
    name: row.name,
    code: row.code,
    note: row.note ?? "",
    permanent: row.permanent,
    singleEntry: Boolean(row.singleEntry),
    scope: row.scope || "university",
    uiLayout: normalizeUiLayout(row.uiLayout),
    field1Label: row.field1Label ?? "",
    field2Label: row.field2Label ?? "",
    field3Label: row.field3Label ?? "",
    field4Label: row.field4Label ?? "",
    field5Label: row.field5Label ?? "",
    file1Label: row.file1Label ?? "",
    file2Label: row.file2Label ?? "",
    link1Label: row.link1Label ?? "",
    link2Label: row.link2Label ?? "",
    departmentId: row.departmentId,
    departmentCode: row.departmentCode,
    departmentName: row.departmentName,
    entryCount: Number(childCount?.total ?? 0),
  };
}

export async function createPageCategory(input: {
  name: string;
  code: string;
  note?: string;
  scope?: string;
  singleEntry?: boolean;
  uiLayout?: string;
  field1Label?: string;
  field2Label?: string;
  field3Label?: string;
  field4Label?: string;
  field5Label?: string;
  file1Label?: string;
  file2Label?: string;
  link1Label?: string;
  link2Label?: string;
}): Promise<{ id: string; createdCount: number }> {
  const user = await getCurrentUser();
  const rights = Array.isArray(user?.rights) ? user.rights : [];

  if (!user || rights.length === 0) {
    throw new Error("Unauthorized: Portal access required.");
  }

  const allowedScopes = await getAllowedScopesForRights(rights);
  if (allowedScopes.length === 0) {
    throw new Error("Unauthorized: No category scope permissions.");
  }

  const name = input.name.trim();
  const code = normalizeCode(input.code);
  const note = input.note?.trim() || null;
  const scope = input.scope?.trim() || allowedScopes[0].key;
  const departmentId = user.departmentId ?? null;
  const singleEntry = Boolean(input.singleEntry);
  const uiLayout = normalizeUiLayout(input.uiLayout);

  if (!name) throw new Error("Category name is required.");
  if (!code) throw new Error("Category code is required.");
  if (!scope) throw new Error("Category Scope is required.");

  if (!allowedScopes.some((s) => s.key === scope)) {
    throw new Error(
      `Unauthorized: Scope "${scope}" is not allowed for your rights.`,
    );
  }

  const [inserted] = await db
    .insert(pageCategories)
    .values({
      name,
      code,
      note,
      permanent: false,
      singleEntry,
      scope,
      departmentId,
      uiLayout,
      field1Label: normalizeOptionalLabel(input.field1Label),
      field2Label: normalizeOptionalLabel(input.field2Label),
      field3Label: normalizeOptionalLabel(input.field3Label),
      field4Label: normalizeOptionalLabel(input.field4Label),
      field5Label: normalizeOptionalLabel(input.field5Label),
      file1Label: normalizeOptionalLabel(input.file1Label),
      file2Label: normalizeOptionalLabel(input.file2Label),
      link1Label: normalizeOptionalLabel(input.link1Label),
      link2Label: normalizeOptionalLabel(input.link2Label),
    })
    .returning({ id: pageCategories.id });

  return { id: inserted.id, createdCount: 1 };
}

export async function updatePageCategory(input: {
  id: string;
  name: string;
  code: string;
  note?: string;
  singleEntry?: boolean;
  uiLayout?: string;
  field1Label?: string;
  field2Label?: string;
  field3Label?: string;
  field4Label?: string;
  field5Label?: string;
  file1Label?: string;
  file2Label?: string;
  link1Label?: string;
  link2Label?: string;
}): Promise<void> {
  const user = await getCurrentUser();
  const rights = Array.isArray(user?.rights) ? user.rights : [];

  if (!user || rights.length === 0) {
    throw new Error("Unauthorized: Portal access required.");
  }

  const name = input.name.trim();
  const code = normalizeCode(input.code);
  const note = input.note?.trim() || null;
  const singleEntry = Boolean(input.singleEntry);
  const uiLayout = normalizeUiLayout(input.uiLayout);

  if (!input.id) throw new Error("Category ID is required.");
  if (!name) throw new Error("Category name is required.");
  if (!code) throw new Error("Category code is required.");

  const [existing] = await db
    .select({
      id: pageCategories.id,
      permanent: pageCategories.permanent,
    })
    .from(pageCategories)
    .where(eq(pageCategories.id, input.id))
    .limit(1);

  if (!existing) throw new Error("Category not found.");
  if (existing.permanent) {
    throw new Error("Permanent categories cannot be updated.");
  }

  await db
    .update(pageCategories)
    .set({
      name,
      code,
      note,
      singleEntry,
      uiLayout,
      field1Label: normalizeOptionalLabel(input.field1Label),
      field2Label: normalizeOptionalLabel(input.field2Label),
      field3Label: normalizeOptionalLabel(input.field3Label),
      field4Label: normalizeOptionalLabel(input.field4Label),
      field5Label: normalizeOptionalLabel(input.field5Label),
      file1Label: normalizeOptionalLabel(input.file1Label),
      file2Label: normalizeOptionalLabel(input.file2Label),
      link1Label: normalizeOptionalLabel(input.link1Label),
      link2Label: normalizeOptionalLabel(input.link2Label),
      updatedAt: new Date(),
    })
    .where(eq(pageCategories.id, existing.id));
}

export async function deletePageCategory(id: string): Promise<void> {
  const user = await getCurrentUser();
  const rights = Array.isArray(user?.rights) ? user.rights : [];

  if (!user || rights.length === 0) {
    throw new Error("Unauthorized: Portal access required.");
  }

  if (!id) {
    throw new Error("Category ID is required.");
  }

  const [existing] = await db
    .select({
      id: pageCategories.id,
      permanent: pageCategories.permanent,
    })
    .from(pageCategories)
    .where(eq(pageCategories.id, id))
    .limit(1);

  if (!existing) {
    throw new Error("Category not found.");
  }

  if (existing.permanent) {
    throw new Error(
      "Permanent system/department categories cannot be deleted.",
    );
  }

  const [childCount] = await db
    .select({ total: count() })
    .from(pageEntries)
    .where(eq(pageEntries.pageCategoryId, existing.id));

  const totalEntries = Number(childCount?.total ?? 0);
  if (totalEntries > 0) {
    throw new Error(
      `Cannot delete category: ${totalEntries} page ${
        totalEntries === 1 ? "entry exists" : "entries exist"
      } under it. Remove or reassign them first.`,
    );
  }

  await db.delete(pageCategories).where(eq(pageCategories.id, existing.id));
}
