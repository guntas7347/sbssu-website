"use server";

import { and, asc, eq, max } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { galleryItems, usersTable, type GalleryItem } from "@/db/schema";
import { getCurrentUser } from "@/lib/actions/auth"; // adjust import path if different

export interface CreateGalleryInput {
  srNo?: number | string | null;
  title?: string | null;
  desc?: string | null;
  path: string;
  category: string;
  createdBy?: string | null;
}

export interface GalleryActionResult {
  ok: boolean;
  message: string;
  item?: GalleryItem;
  replacedExisting?: boolean;
}

function cleanNullableText(val?: string | null): string | null {
  if (val === undefined || val === null) return null;
  const trimmed = val.trim();
  return trimmed === "" ? null : trimmed;
}

export async function getGalleryByCategory(
  category: string,
): Promise<GalleryItem[]> {
  const cleanCategory = category.trim();
  if (!cleanCategory) return [];

  return db
    .select()
    .from(galleryItems)
    .where(eq(galleryItems.category, cleanCategory))
    .orderBy(asc(galleryItems.srNo), asc(galleryItems.createdAt));
}

export interface CreateGalleryInput {
  srNo?: number | string | null;
  title?: string | null;
  desc?: string | null;
  path: string;
  category: string;
  createdBy?: string | null;
  departmentId?: string | null;
}

export async function createGalleryItem(
  input: CreateGalleryInput,
): Promise<GalleryActionResult> {
  try {
    const cleanCategory = input.category.trim();
    const cleanPath = input.path.trim();

    if (!cleanCategory) {
      return { ok: false, message: "Category is required." };
    }
    if (!cleanPath) {
      return {
        ok: false,
        message: "File path is required (upload a file first).",
      };
    }

    const currentUser = await getCurrentUser().catch(() => null);

    const rawSr =
      typeof input.srNo === "number"
        ? input.srNo
        : typeof input.srNo === "string" && input.srNo.trim() !== ""
          ? Number(input.srNo.trim())
          : NaN;

    const hasExplicitSr = Number.isInteger(rawSr) && rawSr >= 1;

    const { inserted, replacedExisting, assignedSrNo } = await db.transaction(
      async (tx) => {
        let targetSrNo: number;
        let didReplace = false;

        if (hasExplicitSr) {
          targetSrNo = rawSr;
          const existing = await tx
            .select({ id: galleryItems.id })
            .from(galleryItems)
            .where(
              and(
                eq(galleryItems.category, cleanCategory),
                eq(galleryItems.srNo, targetSrNo),
              ),
            );

          if (existing.length > 0) {
            didReplace = true;
            await tx
              .delete(galleryItems)
              .where(
                and(
                  eq(galleryItems.category, cleanCategory),
                  eq(galleryItems.srNo, targetSrNo),
                ),
              );
          }
        } else {
          const [maxRow] = await tx
            .select({ maxSr: max(galleryItems.srNo) })
            .from(galleryItems)
            .where(eq(galleryItems.category, cleanCategory));
          targetSrNo = Number(maxRow?.maxSr ?? 0) + 1;
        }

        const [created] = await tx
          .insert(galleryItems)
          .values({
            srNo: targetSrNo,
            title: cleanNullableText(input.title),
            desc: cleanNullableText(input.desc),
            path: cleanPath,
            category: cleanCategory,
            departmentId: currentUser?.departmentId,
            createdBy: currentUser?.id,
          })
          .returning();

        return {
          inserted: created,
          replacedExisting: didReplace,
          assignedSrNo: targetSrNo,
        };
      },
    );

    return {
      ok: true,
      message: replacedExisting
        ? `Replaced existing Sr. #${assignedSrNo} in "${cleanCategory}" with new item.`
        : `Added gallery item at Sr. #${assignedSrNo} in "${cleanCategory}".`,
      item: inserted,
      replacedExisting,
    };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "Failed to save gallery item.",
    };
  }
}

export async function deleteGalleryItem(
  id: string,
): Promise<GalleryActionResult> {
  try {
    const cleanId = id.trim();
    if (!cleanId) {
      return { ok: false, message: "Gallery item ID is required." };
    }

    const [deleted] = await db
      .delete(galleryItems)
      .where(eq(galleryItems.id, cleanId))
      .returning();

    if (!deleted) {
      return { ok: false, message: "Gallery item not found." };
    }

    return {
      ok: true,
      message: `Deleted Sr. #${deleted.srNo} (${deleted.title || deleted.path}).`,
      item: deleted,
    };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "Failed to delete gallery item.",
    };
  }
}
