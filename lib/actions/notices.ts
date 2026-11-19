"use server";

import { and, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { noticesTable, type Notice } from "@/db/schema";
import { getCurrentUser } from "@/lib/actions/auth";

export interface CreateNoticeInput {
  title: string;
  description?: string | null;
  refNumber?: string | null;
  level?: string | null;
  category?: string | null;
  file?: string | null;
}

export interface NoticeActionResult {
  ok: boolean;
  message: string;
  notice?: Notice;
}

function cleanNullable(val?: string | null): string | null {
  if (val === undefined || val === null) return null;
  const trimmed = val.trim();
  return trimmed === "" ? null : trimmed;
}

export async function getNotices(): Promise<Notice[]> {
  return db
    .select()
    .from(noticesTable)
    .orderBy(desc(noticesTable.createdAt), desc(noticesTable.id));
}

export async function createNotice(
  input: CreateNoticeInput,
): Promise<NoticeActionResult> {
  try {
    const cleanTitle = input.title.trim();
    if (!cleanTitle) {
      return { ok: false, message: "Notice title is required." };
    }

    const currentUser = await getCurrentUser().catch(() => null);

    const [created] = await db
      .insert(noticesTable)
      .values({
        title: cleanTitle,
        description: cleanNullable(input.description),
        refNumber: cleanNullable(input.refNumber),
        level: cleanNullable(input.level),
        category: cleanNullable(input.category),
        file: cleanNullable(input.file),
        departmentId: currentUser?.departmentId ?? null,
        createdBy: currentUser ? currentUser.id : null,
      })
      .returning();

    return {
      ok: true,
      message: `Published "${created.title}".`,
      notice: created,
    };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Failed to create notice.",
    };
  }
}

export async function deleteNotice(id: string): Promise<NoticeActionResult> {
  try {
    const cleanId = id.trim();
    if (!cleanId) {
      return { ok: false, message: "Notice ID is required." };
    }

    const [deleted] = await db
      .delete(noticesTable)
      .where(eq(noticesTable.id, cleanId))
      .returning();

    if (!deleted) {
      return { ok: false, message: "Notice not found." };
    }

    return {
      ok: true,
      message: `Deleted "${deleted.title}".`,
      notice: deleted,
    };
  } catch (err) {
    return {
      ok: false,
      message: err instanceof Error ? err.message : "Failed to delete notice.",
    };
  }
}

export interface PublicNoticesQuery {
  level?: string | null;
  category?: string | null;
  page?: number;
  pageSize?: number;
}

export interface PublicNoticesResult {
  notices: Notice[];
  totalCount: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export async function getPublicNotices(
  query: PublicNoticesQuery = {},
): Promise<PublicNoticesResult> {
  const pageSize = query.pageSize && query.pageSize > 0 ? query.pageSize : 20;
  const page = query.page && query.page >= 1 ? Math.floor(query.page) : 1;
  const offset = (page - 1) * pageSize;

  const conditions = [];
  const cleanLevel = query.level?.trim();
  const cleanCategory = query.category?.trim();

  if (cleanLevel && cleanLevel !== "all") {
    conditions.push(eq(noticesTable.level, cleanLevel));
  }

  if (cleanCategory && cleanCategory !== "all") {
    conditions.push(eq(noticesTable.category, cleanCategory));
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [notices, countRows] = await Promise.all([
    db
      .select()
      .from(noticesTable)
      .where(whereClause)
      .orderBy(desc(noticesTable.createdAt), desc(noticesTable.id))
      .limit(pageSize)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(noticesTable)
      .where(whereClause),
  ]);

  const totalCount = Number(countRows[0]?.count ?? 0);
  const hasMore = offset + notices.length < totalCount;

  return {
    notices,
    totalCount,
    page,
    pageSize,
    hasMore,
  };
}

export async function getLatestNoticesCarousel(limit = 20): Promise<Notice[]> {
  const safeLimit = limit > 0 ? Math.min(limit, 50) : 20;

  return db
    .select()
    .from(noticesTable)
    .orderBy(desc(noticesTable.createdAt), desc(noticesTable.id))
    .limit(safeLimit);
}
