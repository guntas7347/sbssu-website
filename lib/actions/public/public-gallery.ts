"use server";

import { and, count, desc, eq, isNull, sql } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { departmentsTable, galleryItems } from "@/db/schema";

export interface PublicGalleryItem {
  id: string;
  title: string | null;
  desc: string | null;
  path: string;
  category: string;
  album: string;
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  createdAt: Date;
}

export interface GetPublicGalleryParams {
  category?: string;
  album?: string;
  departmentCode?: string;
  departmentId?: string;
  universityOnly?: boolean;
  page?: number;
  pageSize?: number;
}

export interface GetPublicGalleryResult {
  items: PublicGalleryItem[];
  totalCount: number;
  hasMore: boolean;
  page: number;
  pageSize: number;
}

export async function getPublicGallery(
  params?: GetPublicGalleryParams,
): Promise<GetPublicGalleryResult> {
  const safePage = Math.max(1, Math.floor(Number(params?.page) || 1));
  const safePageSize = Math.min(
    100,
    Math.max(1, Math.floor(Number(params?.pageSize) || 20)),
  );
  const offset = (safePage - 1) * safePageSize;

  const cleanCategory =
    params?.category && params.category.toLowerCase() !== "all"
      ? params.category.trim().toLowerCase()
      : null;

  const cleanAlbum =
    params?.album && params.album.toLowerCase() !== "all"
      ? params.album.trim().toLowerCase()
      : null;

  const cleanDeptCode =
    params?.departmentCode && params.departmentCode.toLowerCase() !== "all"
      ? params.departmentCode.trim().toLowerCase()
      : null;

  const cleanDeptId = params?.departmentId?.trim() || null;

  const conditions = [];

  if (cleanCategory) {
    conditions.push(sql`lower(${galleryItems.category}) = ${cleanCategory}`);
  }

  if (cleanAlbum) {
    conditions.push(sql`lower(${galleryItems.album}) = ${cleanAlbum}`);
  }

  if (params?.universityOnly) {
    conditions.push(isNull(galleryItems.departmentId));
  } else if (cleanDeptId) {
    conditions.push(eq(galleryItems.departmentId, cleanDeptId));
  } else if (cleanDeptCode) {
    conditions.push(sql`lower(${departmentsTable.code}) = ${cleanDeptCode}`);
  }

  const whereClause = conditions.length > 0 ? and(...conditions) : undefined;

  const [totalRow] = await db
    .select({ value: count() })
    .from(galleryItems)
    .leftJoin(
      departmentsTable,
      eq(galleryItems.departmentId, departmentsTable.id),
    )
    .where(whereClause);

  const totalCount = Number(totalRow?.value ?? 0);

  const items = await db
    .select({
      id: galleryItems.id,
      title: galleryItems.title,
      desc: galleryItems.desc,
      path: galleryItems.path,
      category: galleryItems.category,
      album: galleryItems.album,
      departmentId: galleryItems.departmentId,
      departmentCode: departmentsTable.code,
      departmentName: departmentsTable.name,
      createdAt: galleryItems.createdAt,
    })
    .from(galleryItems)
    .leftJoin(
      departmentsTable,
      eq(galleryItems.departmentId, departmentsTable.id),
    )
    .where(whereClause)
    .orderBy(desc(galleryItems.createdAt), desc(galleryItems.id))
    .limit(safePageSize)
    .offset(offset);

  const hasMore = offset + items.length < totalCount;

  return {
    items,
    totalCount,
    hasMore,
    page: safePage,
    pageSize: safePageSize,
  };
}
