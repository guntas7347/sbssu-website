"use server";

import { and, count, desc, eq, sql } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { departmentsTable, noticesTable } from "@/db/schema";

export interface PublicNoticeItem {
  id: string;
  title: string;
  description: string | null;
  refNumber: string | null;
  level: string | null;
  category: string | null;
  file: string | null;
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  createdAt: Date;
}

export interface GetPublicNoticesParams {
  level?: string;
  category?: string;
  page?: number;
  pageSize?: number;
}

export interface GetPublicNoticesResult {
  notices: PublicNoticeItem[];
  totalCount: number;
  hasMore: boolean;
  page: number;
  pageSize: number;
}

export async function getPublicNotices(
  params?: GetPublicNoticesParams,
): Promise<GetPublicNoticesResult> {
  const safePage = Math.max(1, Math.floor(Number(params?.page) || 1));
  const safePageSize = Math.min(
    100,
    Math.max(1, Math.floor(Number(params?.pageSize) || 20)),
  );
  const offset = (safePage - 1) * safePageSize;

  const cleanLevel =
    params?.level && params.level.toLowerCase() !== "all"
      ? params.level.trim().toLowerCase()
      : null;

  const cleanCategory =
    params?.category && params.category.toLowerCase() !== "all"
      ? params.category.trim().toLowerCase()
      : null;

  const conditions = [];
  if (cleanLevel) {
    conditions.push(sql`lower(${noticesTable.level}) = ${cleanLevel}`);
  }
  if (cleanCategory) {
    conditions.push(sql`lower(${noticesTable.category}) = ${cleanCategory}`);
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [totalRow] = await db
    .select({ value: count() })
    .from(noticesTable)
    .where(whereClause);

  const totalCount = Number(totalRow?.value ?? 0);

  const notices = await db
    .select({
      id: noticesTable.id,
      title: noticesTable.title,
      description: noticesTable.description,
      refNumber: noticesTable.refNumber,
      level: noticesTable.level,
      category: noticesTable.category,
      file: noticesTable.file,
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
    .orderBy(desc(noticesTable.createdAt), desc(noticesTable.id))
    .limit(safePageSize)
    .offset(offset);

  const hasMore = offset + notices.length < totalCount;

  return {
    notices,
    totalCount,
    hasMore,
    page: safePage,
    pageSize: safePageSize,
  };
}
