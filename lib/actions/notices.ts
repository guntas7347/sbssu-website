"use server";

import { createId } from "@paralleldrive/cuid2";
import { and, desc, eq, ilike, inArray, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzel";
import { departmentsTable, noticesTable, usersTable } from "@/db/schema";
import { getCurrentUser } from "@/lib/actions/auth";
import { notice_categories } from "@/constants/categories";

export interface AdminNoticeItem {
  id: string;
  title: string;
  description: string | null;
  refNumber: string | null;
  level: string | null;
  category: string | null;
  file: string | null;
  createdBy: string | null;
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  createdAt: Date;
}

export interface NoticeCreateFormContext {
  allowedLevels: string[];
  categories: readonly string[];
  userDepartmentId: string | null;
  userDepartmentCode: string | null;
  userDepartmentName: string | null;
}

function getAllowedNoticeLevels(rights: string[] | null | undefined) {
  const userRights = rights ?? [];
  const hasAdmin = userRights.includes("admin");
  const hasHod = userRights.includes("hod");
  const allowed = [];
  if (hasAdmin) allowed.push("central", "public");
  if (hasHod) allowed.push("department");
  return allowed;
}

export async function getNotices(options?: {
  search?: string;
}): Promise<AdminNoticeItem[]> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Please log in.");
  }

  const allowedLevels = getAllowedNoticeLevels(user.rights);
  if (!Array.isArray(allowedLevels) || allowedLevels.length === 0) {
    return [];
  }

  const isAdmin = Array.isArray(user.rights) && user.rights.includes("admin");
  const conditions: NonNullable<ReturnType<typeof eq>>[] = [];

  const nonDeptLevels = allowedLevels.filter((lvl) => lvl !== "department");
  const hasDeptLevel = allowedLevels.includes("department");

  if (hasDeptLevel && !isAdmin) {
    if (!user.departmentId && nonDeptLevels.length === 0) {
      return [];
    }

    const levelClauses = [];
    if (nonDeptLevels.length > 0) {
      levelClauses.push(inArray(noticesTable.level, nonDeptLevels));
    }
    if (user.departmentId) {
      levelClauses.push(
        and(
          eq(noticesTable.level, "department"),
          eq(noticesTable.departmentId, user.departmentId),
        )!,
      );
    }

    if (levelClauses.length === 1) {
      conditions.push(levelClauses[0]!);
    } else if (levelClauses.length > 1) {
      conditions.push(or(...levelClauses)!);
    }
  } else {
    conditions.push(inArray(noticesTable.level, allowedLevels));
  }

  const trimmedSearch =
    typeof options?.search === "string" ? options.search.trim() : "";

  if (trimmedSearch.length > 0) {
    const pattern = `%${trimmedSearch}%`;
    const searchClause = or(
      ilike(noticesTable.title, pattern),
      ilike(noticesTable.description, pattern),
      ilike(noticesTable.refNumber, pattern),
      ilike(noticesTable.category, pattern),
      ilike(noticesTable.level, pattern),
      ilike(departmentsTable.code, pattern),
      ilike(departmentsTable.name, pattern),
    );
    if (searchClause) {
      conditions.push(searchClause);
    }
  }

  const validConditions = conditions.filter(Boolean);
  const whereClause =
    validConditions.length === 1
      ? validConditions[0]
      : validConditions.length > 1
        ? and(...validConditions)
        : undefined;

  const rows = await db
    .select({
      id: noticesTable.id,
      title: noticesTable.title,
      description: noticesTable.description,
      refNumber: noticesTable.refNumber,
      level: noticesTable.level,
      category: noticesTable.category,
      file: noticesTable.file,
      createdBy: noticesTable.createdBy,
      departmentId: noticesTable.departmentId,
      departmentCode: departmentsTable.code,
      departmentName: departmentsTable.name,
      createdAt: noticesTable.createdAt,
    })
    .from(noticesTable)
    .leftJoin(
      departmentsTable,
      eq(noticesTable.departmentId, departmentsTable.id),
    )
    .where(whereClause)
    .orderBy(desc(noticesTable.createdAt), desc(noticesTable.id));

  return rows;
}

export async function getNoticeCreateContext(): Promise<NoticeCreateFormContext> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Please log in.");
  }

  const allowedLevels = getAllowedNoticeLevels(user.rights);
  if (allowedLevels.length === 0) {
    throw new Error("Unauthorized: You do not have rights to publish notices.");
  }

  let dept: { id: string; code: string; name: string } | null = null;
  if (user.departmentId) {
    const [found] = await db
      .select({
        id: departmentsTable.id,
        code: departmentsTable.code,
        name: departmentsTable.name,
      })
      .from(departmentsTable)
      .where(eq(departmentsTable.id, user.departmentId))
      .limit(1);

    dept = found ?? null;
  }

  return {
    allowedLevels,
    categories: Array.from(notice_categories),
    userDepartmentId: dept?.id ?? null,
    userDepartmentCode: dept?.code ?? null,
    userDepartmentName: dept?.name ?? null,
  };
}

export async function createNotice(input: {
  title: string;
  description?: string;
  refNumber?: string;
  level: string;
  category: string;
  file?: string;
}): Promise<{ id: string }> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Please log in.");
  }

  const allowedLevels = getAllowedNoticeLevels(user.rights);
  const level = input.level.trim();

  if (!level || !allowedLevels.includes(level)) {
    throw new Error("Unauthorized: You are not allowed to post at this level.");
  }

  const title = input.title.trim();
  if (!title) {
    throw new Error("Notice title is required.");
  }

  const category = input.category.trim();
  if (!category) {
    throw new Error("Please select a notice category.");
  }

  let departmentId: string | null = null;
  if (level === "department") {
    if (!user.departmentId) {
      throw new Error(
        "Your account does not have an assigned department for department-level notices.",
      );
    }
    departmentId = user.departmentId;
  }

  const id = createId();

  await db.insert(noticesTable).values({
    id,
    title,
    description: input.description?.trim() || null,
    refNumber: input.refNumber?.trim() || null,
    level,
    category,
    file: input.file?.trim() || null,
    createdBy: user.id,
    departmentId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  revalidatePath("/admin/notices");
  return { id };
}

export async function deleteNotice(id: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Please log in.");
  }

  const allowedLevels = getAllowedNoticeLevels(user.rights);
  if (allowedLevels.length === 0) {
    throw new Error("Unauthorized: You cannot delete notices.");
  }

  const [existing] = await db
    .select({
      id: noticesTable.id,
      level: noticesTable.level,
      departmentId: noticesTable.departmentId,
    })
    .from(noticesTable)
    .where(eq(noticesTable.id, id))
    .limit(1);

  if (!existing) {
    throw new Error("Notice not found.");
  }

  const isAdmin = Array.isArray(user.rights) && user.rights.includes("admin");
  const levelAllowed =
    Boolean(existing.level) && allowedLevels.includes(existing.level!);

  const deptAllowed =
    existing.level !== "department" ||
    isAdmin ||
    (Boolean(user.departmentId) && existing.departmentId === user.departmentId);

  if (!levelAllowed || !deptAllowed) {
    throw new Error("Unauthorized: You cannot delete this notice.");
  }

  await db.delete(noticesTable).where(eq(noticesTable.id, existing.id));

  revalidatePath("/admin/notices");
}
