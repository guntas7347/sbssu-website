"use server";

import { unlink } from "node:fs/promises";
import path from "node:path";
import {
  and,
  asc,
  desc,
  eq,
  ilike,
  inArray,
  isNull,
  or,
  sql,
} from "drizzle-orm";
import { db } from "@/db/drizzel";
import {
  departmentsTable,
  pageEntries,
  type CustomPageScope,
  type NewPageEntry,
  type PageEntry,
  type PageEntryType,
} from "@/db/schema";
import { getCurrentUser } from "@/lib/actions/auth";
import { saveHtmlContentFile } from "@/lib/save-html-file";
import { getAllowedPageCategories } from "@/constants/page-categories";

const UPLOAD_DIR = path.resolve(
  process.env.UPLOAD_DIR || path.join(process.cwd(), "data"),
);

function safeTrim(value: string | null | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeSlug(raw: string | null | undefined): string {
  return safeTrim(raw)
    .toLowerCase()
    .replace(/^\/+|\/+$/g, "")
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeOptionalLink(raw: string | null | undefined): string | null {
  const trimmed = safeTrim(raw);
  if (!trimmed) return null;

  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:")
  ) {
    return null;
  }

  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }

  // Treat bare slug as a university custom HTML page path
  const slug = normalizeSlug(trimmed);
  return slug ? `/pages/${slug}` : null;
}

function resolveSafeDiskPath(
  storedPath: string | null | undefined,
): string | null {
  const trimmed = safeTrim(storedPath);
  if (!trimmed) return null;

  const relative = trimmed.startsWith("/data/")
    ? trimmed.slice("/data/".length)
    : trimmed.replace(/^\/+/, "");

  const resolved = path.resolve(UPLOAD_DIR, relative);
  const rootWithSep = UPLOAD_DIR.endsWith(path.sep)
    ? UPLOAD_DIR
    : `${UPLOAD_DIR}${path.sep}`;

  if (!resolved.startsWith(rootWithSep)) {
    return null;
  }

  return resolved;
}

async function removeDiskFileIfSafe(storedPath: string | null | undefined) {
  const safePath = resolveSafeDiskPath(storedPath);
  if (!safePath) return;
  try {
    await unlink(safePath);
  } catch {
    // Ignore missing or already removed file
  }
}

export interface PageEntryWithDept extends PageEntry {
  departmentName: string | null;
  departmentCode: string | null;
}

export interface ListPageEntriesQuery {
  type?: "all" | PageEntryType;
  category?: string | null;
  departmentId?: string | null;
  search?: string | null;
  page?: number;
  pageSize?: number;
}

export interface ListPageEntriesResult {
  items: PageEntryWithDept[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface CreatePageEntryInput {
  type: PageEntryType;
  title: string;
  departmentId?: string | null;

  // Generic fields
  category?: string | null;
  srNo?: number | string | null;
  desc?: string | null;
  file?: string | null;
  link?: string | null;

  // Custom HTML page fields
  slug?: string | null;
  path?: string | null;
  rawHtml?: string | null;
  scope?: CustomPageScope | null;
}

export interface UpdatePageEntryInput extends Partial<CreatePageEntryInput> {
  id: string;
}

export interface PageEntryActionResult {
  ok: boolean;
  message: string;
  item?: PageEntry;
}

async function isDuplicateCustomSlug(params: {
  slug: string;
  departmentId: string | null;
  excludeId?: string;
}): Promise<boolean> {
  const conditions = [
    eq(pageEntries.type, "custom"),
    eq(pageEntries.slug, params.slug),
    params.departmentId
      ? eq(pageEntries.departmentId, params.departmentId)
      : sql`${pageEntries.departmentId} is null`,
  ];

  if (params.excludeId) {
    conditions.push(sql`${pageEntries.id} <> ${params.excludeId}`);
  }

  const existing = await db
    .select({ id: pageEntries.id })
    .from(pageEntries)
    .where(and(...conditions))
    .limit(1);

  return existing.length > 0;
}

// ---------------------------------------------------------------------------
// READ (Paginated List + Single by ID)
// ---------------------------------------------------------------------------

export async function getPageEntries(
  query: ListPageEntriesQuery = {},
): Promise<ListPageEntriesResult> {
  const currentUser = await getCurrentUser().catch(() => null);
  if (!currentUser) {
    return {
      items: [],
      totalCount: 0,
      page: 1,
      pageSize: 20,
      hasMore: false,
    };
  }

  const rights = currentUser.rights ?? [];
  const hasAdmin = rights.includes("admin");
  const hasHod = rights.includes("hod");

  if (!hasAdmin && !hasHod) {
    return {
      items: [],
      totalCount: 0,
      page: 1,
      pageSize: 20,
      hasMore: false,
    };
  }

  const allowedCategories = getAllowedPageCategories(currentUser).map(
    (c) => c.categoryNumber,
  );
  if (allowedCategories.length === 0) {
    return {
      items: [],
      totalCount: 0,
      page: 1,
      pageSize: 20,
      hasMore: false,
    };
  }

  const pageSize =
    query.pageSize && query.pageSize > 0
      ? Math.min(Math.floor(query.pageSize), 100)
      : 20;
  const page = query.page && query.page >= 1 ? Math.floor(query.page) : 1;
  const offset = (page - 1) * pageSize;

  const conditions = [inArray(pageEntries.category, allowedCategories)];

  const userDeptId =
    currentUser.departmentId ?? currentUser.department?.id ?? null;

  // Scope enforcement based on rights
  if (hasAdmin && hasHod) {
    conditions.push(
      userDeptId
        ? or(
            eq(pageEntries.scope, "university"),
            and(
              eq(pageEntries.scope, "department"),
              eq(pageEntries.departmentId, userDeptId),
            ),
          )!
        : eq(pageEntries.scope, "university"),
    );
  } else if (hasHod) {
    if (!userDeptId) {
      return {
        items: [],
        totalCount: 0,
        page,
        pageSize,
        hasMore: false,
      };
    }
    conditions.push(
      eq(pageEntries.scope, "department"),
      eq(pageEntries.departmentId, userDeptId),
    );
  } else {
    conditions.push(eq(pageEntries.scope, "university"));
  }

  if (query.type === "generic" || query.type === "custom") {
    conditions.push(eq(pageEntries.type, query.type));
  }

  const cleanCategory = safeTrim(query.category);
  if (cleanCategory && cleanCategory !== "all") {
    conditions.push(eq(pageEntries.category, cleanCategory));
  }

  const cleanDeptId = safeTrim(query.departmentId);
  if (cleanDeptId && cleanDeptId !== "all") {
    if (cleanDeptId === "none") {
      conditions.push(isNull(pageEntries.departmentId));
    } else {
      conditions.push(eq(pageEntries.departmentId, cleanDeptId));
    }
  }

  const cleanSearch = safeTrim(query.search);
  if (cleanSearch) {
    const pattern = `%${cleanSearch}%`;
    conditions.push(
      or(
        ilike(pageEntries.title, pattern),
        ilike(pageEntries.slug, pattern),
        ilike(pageEntries.category, pattern),
        ilike(pageEntries.desc, pattern),
      )!,
    );
  }

  const whereClause = and(...conditions);

  const [rows, countRows] = await Promise.all([
    db
      .select({
        id: pageEntries.id,
        type: pageEntries.type,
        departmentId: pageEntries.departmentId,
        title: pageEntries.title,
        category: pageEntries.category,
        srNo: pageEntries.srNo,
        desc: pageEntries.desc,
        file: pageEntries.file,
        link: pageEntries.link,
        slug: pageEntries.slug,
        path: pageEntries.path,
        scope: pageEntries.scope,
        createdBy: pageEntries.createdBy,
        createdAt: pageEntries.createdAt,
        updatedAt: pageEntries.updatedAt,
        departmentName: departmentsTable.name,
        departmentCode: departmentsTable.code,
      })
      .from(pageEntries)
      .leftJoin(
        departmentsTable,
        eq(pageEntries.departmentId, departmentsTable.id),
      )
      .where(whereClause)
      .orderBy(
        asc(pageEntries.srNo),
        desc(pageEntries.createdAt),
        desc(pageEntries.id),
      )
      .limit(pageSize)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(pageEntries)
      .where(whereClause),
  ]);

  const totalCount = Number(countRows[0]?.count ?? 0);
  const hasMore = offset + rows.length < totalCount;

  return {
    items: rows,
    totalCount,
    page,
    pageSize,
    hasMore,
  };
}

export async function getPageEntryById(
  id: string,
): Promise<PageEntryWithDept | null> {
  const cleanId = id.trim();
  if (!cleanId) return null;

  const currentUser = await getCurrentUser().catch(() => null);
  if (!currentUser) return null;

  const rights = currentUser.rights ?? [];
  const hasAdmin = rights.includes("admin");
  const hasHod = rights.includes("hod");

  if (!hasAdmin && !hasHod) return null;

  const allowedCategories = getAllowedPageCategories(currentUser).map(
    (c) => c.categoryNumber,
  );
  if (allowedCategories.length === 0) return null;

  const userDeptId =
    currentUser.departmentId ?? currentUser.department?.id ?? null;

  const conditions = [
    eq(pageEntries.id, cleanId),
    inArray(pageEntries.category, allowedCategories),
  ];

  if (hasAdmin && hasHod) {
    conditions.push(
      userDeptId
        ? or(
            eq(pageEntries.scope, "university"),
            and(
              eq(pageEntries.scope, "department"),
              eq(pageEntries.departmentId, userDeptId),
            ),
          )!
        : eq(pageEntries.scope, "university"),
    );
  } else if (hasHod) {
    if (!userDeptId) return null;
    conditions.push(
      eq(pageEntries.scope, "department"),
      eq(pageEntries.departmentId, userDeptId),
    );
  } else {
    conditions.push(eq(pageEntries.scope, "university"));
  }

  const [row] = await db
    .select({
      id: pageEntries.id,
      type: pageEntries.type,
      departmentId: pageEntries.departmentId,
      title: pageEntries.title,
      category: pageEntries.category,
      srNo: pageEntries.srNo,
      desc: pageEntries.desc,
      file: pageEntries.file,
      link: pageEntries.link,
      slug: pageEntries.slug,
      path: pageEntries.path,
      scope: pageEntries.scope,
      createdBy: pageEntries.createdBy,
      createdAt: pageEntries.createdAt,
      updatedAt: pageEntries.updatedAt,
      departmentName: departmentsTable.name,
      departmentCode: departmentsTable.code,
    })
    .from(pageEntries)
    .leftJoin(
      departmentsTable,
      eq(pageEntries.departmentId, departmentsTable.id),
    )
    .where(and(...conditions))
    .limit(1);

  return row ?? null;
}

// ---------------------------------------------------------------------------
// CREATE ("generic" | "custom")
// ---------------------------------------------------------------------------

export async function createPageEntry(
  input: CreatePageEntryInput,
): Promise<PageEntryActionResult> {
  try {
    if (!input) {
      return { ok: false, message: "Invalid entry payload." };
    }

    const currentUser = await getCurrentUser().catch(() => null);
    if (!currentUser?.id) {
      return {
        ok: false,
        message: "Authenticated user is required to create an entry.",
      };
    }

    const cleanTitle = safeTrim(input.title);
    if (!cleanTitle) {
      return { ok: false, message: "Title is required." };
    }

    const cleanCategory = safeTrim(input.category) || null;
    const parsedSrNo = Number(input.srNo ?? 1);
    const cleanSrNo =
      Number.isFinite(parsedSrNo) && parsedSrNo >= 1
        ? Math.floor(parsedSrNo)
        : 1;
    const cleanDesc = safeTrim(input.desc) || null;

    const pastedHtml = safeTrim(input.rawHtml);
    const shouldBeCustom = Boolean(pastedHtml) || input.type === "custom";

    const userRights = (currentUser?.rights || []).map((r) =>
      r.trim().toLowerCase(),
    );
    const hasAdminRight = userRights.includes("admin");
    const hasHodRight = userRights.includes("hod");

    if (!hasAdminRight && !hasHodRight) {
      return {
        ok: false,
        message: "Insufficient rights to create page entries.",
      };
    }

    const requestedDeptId = safeTrim(input.departmentId) || null;
    const userDeptId =
      safeTrim(
        (currentUser as { departmentId?: string | null }).departmentId,
      ) || null;

    // HOD publishes to department scope; Admin publishes to central/university scope
    const useDeptScope =
      input.scope === "department" ||
      (input.scope !== "university" && hasHodRight && !hasAdminRight);

    const resolvedScope: CustomPageScope = useDeptScope
      ? "department"
      : "university";
    const resolvedDeptId: string | null = useDeptScope
      ? userDeptId || requestedDeptId
      : null;

    if (useDeptScope && !hasHodRight) {
      return {
        ok: false,
        message: "HOD right is required for department-scoped entries.",
      };
    }

    if (useDeptScope && !resolvedDeptId) {
      return {
        ok: false,
        message: "Department is required for department-scoped entries.",
      };
    }

    if (shouldBeCustom) {
      const cleanSlug = normalizeSlug(input.slug);

      const duplicate = await isDuplicateCustomSlug({
        slug: cleanSlug,
        departmentId: resolvedDeptId,
      });
      if (duplicate) {
        return {
          ok: false,
          message: `Slug "${cleanSlug}" already exists in this ${resolvedScope} scope.`,
        };
      }

      let resolvedPath = safeTrim(input.path);
      let wroteNewHtmlFile = false;

      if (pastedHtml) {
        const saved = await saveHtmlContentFile(pastedHtml, "custom-pages");
        if (!saved.success || !saved.path) {
          return {
            ok: false,
            message: saved.error || "Failed to save HTML file.",
          };
        }
        resolvedPath = saved.path;
        wroteNewHtmlFile = true;
      }

      if (!resolvedPath) {
        return {
          ok: false,
          message: "HTML content or file path is required for custom pages.",
        };
      }

      const customValues: NewPageEntry = {
        type: "custom",
        title: cleanTitle,
        departmentId: resolvedDeptId,
        scope: resolvedScope,
        slug: cleanSlug,
        path: resolvedPath,
        category: cleanCategory,
        srNo: cleanSrNo,
        desc: cleanDesc,
        file: null,
        link: null,
        createdBy: currentUser.id,
      };

      try {
        const [created] = await db
          .insert(pageEntries)
          .values(customValues)
          .returning();

        const routeHint =
          resolvedScope === "department"
            ? `/departments/.../pages/${cleanSlug}`
            : `/pages/${cleanSlug}`;

        return {
          ok: true,
          message: `Created custom page "${created.title}" (${routeHint})${cleanCategory ? ` under category ${cleanCategory}` : ""}.`,
          item: created,
        };
      } catch (insertErr) {
        if (wroteNewHtmlFile) {
          await removeDiskFileIfSafe(resolvedPath);
        }
        throw insertErr;
      }
    }

    // type === "generic" (file or link)
    if (!cleanCategory) {
      return {
        ok: false,
        message: "Category is required for generic entries.",
      };
    }

    const genericValues: NewPageEntry = {
      type: "generic",
      title: cleanTitle,
      departmentId: resolvedDeptId,
      category: cleanCategory,
      srNo: cleanSrNo,
      desc: cleanDesc,
      file: safeTrim(input.file) || null,
      link: normalizeOptionalLink(input.link),
      slug: null,
      path: null,
      scope: null,
      createdBy: currentUser.id,
    };

    const [created] = await db
      .insert(pageEntries)
      .values(genericValues)
      .returning();

    return {
      ok: true,
      message: `Created "${created.title}" (${cleanCategory}).`,
      item: created,
    };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Failed to create entry.",
    };
  }
}

// ---------------------------------------------------------------------------
// UPDATE ("generic" | "custom")
// ---------------------------------------------------------------------------

export async function updatePageEntry(
  input: UpdatePageEntryInput,
): Promise<PageEntryActionResult> {
  try {
    if (!input) {
      return { ok: false, message: "Invalid update payload." };
    }

    const cleanId = safeTrim(input.id);
    if (!cleanId) {
      return { ok: false, message: "Entry ID is required." };
    }

    const [existing] = await db
      .select()
      .from(pageEntries)
      .where(eq(pageEntries.id, cleanId))
      .limit(1);

    if (!existing) {
      return { ok: false, message: "Entry not found." };
    }

    const nextType: PageEntryType =
      input.type === "custom" || input.type === "generic"
        ? input.type
        : existing.type;

    const cleanTitle =
      input.title !== undefined ? safeTrim(input.title) : existing.title;
    if (!cleanTitle) {
      return { ok: false, message: "Title is required." };
    }

    const rawDeptId =
      input.departmentId !== undefined
        ? safeTrim(input.departmentId)
        : safeTrim(existing.departmentId);

    if (nextType === "generic") {
      const cleanCategory =
        input.category !== undefined
          ? safeTrim(input.category)
          : safeTrim(existing.category);
      if (!cleanCategory) {
        return {
          ok: false,
          message: "Category is required for generic entries.",
        };
      }

      const parsedSrNo =
        input.srNo !== undefined ? Number(input.srNo) : existing.srNo;
      const cleanSrNo =
        Number.isFinite(parsedSrNo) && parsedSrNo >= 1
          ? Math.floor(parsedSrNo)
          : existing.srNo;

      const nextDesc =
        input.desc !== undefined ? safeTrim(input.desc) || null : existing.desc;
      const nextFile =
        input.file !== undefined ? safeTrim(input.file) || null : existing.file;
      const nextLink =
        input.link !== undefined
          ? normalizeOptionalLink(input.link)
          : existing.link;

      const [updated] = await db
        .update(pageEntries)
        .set({
          type: "generic",
          title: cleanTitle,
          departmentId: rawDeptId || null,
          category: cleanCategory,
          srNo: cleanSrNo,
          desc: nextDesc,
          file: nextFile,
          link: nextLink,
          slug: null,
          path: null,
          scope: null,
        })
        .where(eq(pageEntries.id, cleanId))
        .returning();

      // If switching from custom -> generic, remove orphaned custom HTML file
      if (existing.type === "custom" && existing.path) {
        await removeDiskFileIfSafe(existing.path);
      }

      return {
        ok: true,
        message: `Updated "${updated.title}".`,
        item: updated,
      };
    }

    // nextType === "custom"
    const cleanSlug =
      input.slug !== undefined
        ? normalizeSlug(input.slug)
        : normalizeSlug(existing.slug);
    if (!cleanSlug) {
      return { ok: false, message: "Valid slug is required for custom pages." };
    }

    const resolvedScope: CustomPageScope =
      input.scope === "department" || input.scope === "university"
        ? input.scope
        : existing.scope === "department" || existing.scope === "university"
          ? existing.scope
          : rawDeptId
            ? "department"
            : "university";

    const resolvedDeptId =
      resolvedScope === "department" ? rawDeptId || null : null;

    if (resolvedScope === "department" && !resolvedDeptId) {
      return {
        ok: false,
        message: "Department is required for department-scoped custom pages.",
      };
    }

    const duplicate = await isDuplicateCustomSlug({
      slug: cleanSlug,
      departmentId: resolvedDeptId,
      excludeId: cleanId,
    });
    if (duplicate) {
      return {
        ok: false,
        message: `Slug "${cleanSlug}" already exists in this ${resolvedScope} scope.`,
      };
    }

    let nextPath =
      input.path !== undefined ? safeTrim(input.path) : safeTrim(existing.path);
    const pastedHtml = safeTrim(input.rawHtml);
    let wroteNewHtmlFile = false;

    if (pastedHtml) {
      const saved = await saveHtmlContentFile(pastedHtml, "custom-pages");
      if (!saved.success || !saved.path) {
        return {
          ok: false,
          message: saved.error || "Failed to write updated HTML file.",
        };
      }
      nextPath = saved.path;
      wroteNewHtmlFile = true;
    }

    if (!nextPath) {
      return {
        ok: false,
        message: "HTML content or file path is required for custom pages.",
      };
    }

    try {
      const [updated] = await db
        .update(pageEntries)
        .set({
          type: "custom",
          title: cleanTitle,
          departmentId: resolvedDeptId,
          scope: resolvedScope,
          slug: cleanSlug,
          path: nextPath,
          category: null,
          srNo: 1,
          desc: null,
          file: null,
          link: null,
        })
        .where(eq(pageEntries.id, cleanId))
        .returning();

      if (wroteNewHtmlFile && existing.path && existing.path !== nextPath) {
        await removeDiskFileIfSafe(existing.path);
      }

      return {
        ok: true,
        message: `Updated custom page "/${cleanSlug}".`,
        item: updated,
      };
    } catch (updateErr) {
      if (wroteNewHtmlFile) {
        await removeDiskFileIfSafe(nextPath);
      }
      throw updateErr;
    }
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Failed to update entry.",
    };
  }
}

// ---------------------------------------------------------------------------
// DELETE ("generic" | "custom")
// ---------------------------------------------------------------------------

export async function deletePageEntry(
  id: string,
): Promise<PageEntryActionResult> {
  try {
    const cleanId = safeTrim(id);
    if (!cleanId) {
      return { ok: false, message: "Entry ID is required." };
    }

    const [deleted] = await db
      .delete(pageEntries)
      .where(eq(pageEntries.id, cleanId))
      .returning();

    if (!deleted) {
      return { ok: false, message: "Entry not found." };
    }

    if (deleted.type === "custom" && deleted.path) {
      await removeDiskFileIfSafe(deleted.path);
    }

    return {
      ok: true,
      message: `Deleted "${deleted.title}".`,
      item: deleted,
    };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Failed to delete entry.",
    };
  }
}

export async function getDepartmentsForSelect(): Promise<
  Array<{ id: string; name: string; code: string | null }>
> {
  return db
    .select({
      id: departmentsTable.id,
      name: departmentsTable.name,
      code: departmentsTable.code,
    })
    .from(departmentsTable)
    .orderBy(departmentsTable.name);
}
