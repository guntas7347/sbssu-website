"use server";

import { revalidatePath } from "next/cache";
import { and, desc, eq, ne, or, isNull } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { legacyWebsites, type LegacyWebsite } from "@/db/schema";
import type { LegacyLookupMode } from "@/constants/legacy-select-options";

export type LegacyManagerTabMode = "view" | "add" | "delete";

export interface AddLegacyRecordPayload {
  category: number | null;
  name?: string;
  image?: string;
  company?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  contactNo?: string;
  email?: string;
  webSite?: string;
  advertisement?: string;
  video?: string;
  type?: string;
  approve: boolean;
}

export interface LegacyActionResponse {
  ok: boolean;
  message: string;
  record?: LegacyWebsite;
  deletedId?: string;
}

// Helper: rows that are NOT soft-deleted (deleted = false or null)
function notDeletedFilter() {
  return or(eq(legacyWebsites.deleted, false), isNull(legacyWebsites.deleted));
}

// Helper: matches `id` whether `legacyWebsites.id` is integer or UUID/text in Drizzle
function whereIdEquals(rawId: string | number) {
  const strVal = String(rawId).trim();
  const numVal = Number(strVal);
  const target: unknown =
    strVal !== "" && Number.isInteger(numVal) && String(numVal) === strVal
      ? numVal
      : strVal;
  return eq(legacyWebsites.id, target as never);
}

function cleanText(val?: string): string | null {
  if (val === undefined || val === null) return null;
  const trimmed = val.trim();
  return trimmed === "" ? null : trimmed;
}

function revalidateLegacyRoutes() {
  revalidatePath("/legacy-website");
  revalidatePath("/legacy-website/manage");
}

// ============================================================================
// 1. Legacy Website Viewer Queries (Active / Non-Deleted Only)
// ============================================================================

export async function getLegacyRecordsByCategory(
  categoryId: number,
): Promise<LegacyWebsite[]> {
  return db
    .select()
    .from(legacyWebsites)
    .where(and(eq(legacyWebsites.category, categoryId), notDeletedFilter()))
    .orderBy(desc(legacyWebsites.id));
}

export async function getLegacyRecordById(
  id: number,
): Promise<LegacyWebsite | null> {
  const [record] = await db
    .select()
    .from(legacyWebsites)
    .where(and(whereIdEquals(id), notDeletedFilter()))
    .limit(1);

  return record ?? null;
}

export async function resolveLegacyData(id: number, mode?: string) {
  if (mode === "category") {
    const records = await getLegacyRecordsByCategory(id);
    return {
      mode: "category" as const,
      record: records[0] ?? null,
      categoryRecords: records,
    };
  }

  const [recordById, recordsByCategory] = await Promise.all([
    getLegacyRecordById(id),
    getLegacyRecordsByCategory(id),
  ]);

  return {
    mode: "auto" as const,
    recordById,
    recordsByCategory,
  };
}

// ============================================================================
// 2. Legacy Manager Queries & Soft-Delete / Restore Mutations
// ============================================================================

export async function getLegacyRecordsBySelection(params: {
  id: number;
  mode: LegacyLookupMode;
}): Promise<{
  recordById: LegacyWebsite | null;
  records: LegacyWebsite[];
}> {
  if (params.mode === "record") {
    const rows = await db
      .select()
      .from(legacyWebsites)
      .where(and(whereIdEquals(params.id), notDeletedFilter()))
      .limit(1);

    const found = rows[0] ?? null;
    return {
      recordById: found,
      records: found ? [found] : [],
    };
  }

  const rows = await db
    .select()
    .from(legacyWebsites)
    .where(and(eq(legacyWebsites.category, params.id), notDeletedFilter()))
    .orderBy(desc(legacyWebsites.id));

  return {
    recordById: null,
    records: rows,
  };
}

export async function createLegacyWebsiteRecord(
  input: AddLegacyRecordPayload,
): Promise<LegacyActionResponse> {
  try {
    const rowValues: Record<string, unknown> = {
      category: input.category,
      name: cleanText(input.name),
      image: cleanText(input.image),
      company: cleanText(input.company),
      description: cleanText(input.description),
      address: cleanText(input.address),
      city: cleanText(input.city),
      state: cleanText(input.state),
      country: cleanText(input.country),
      contactNo: cleanText(input.contactNo),
      email: cleanText(input.email),
      webSite: cleanText(input.webSite),
      advertisement: cleanText(input.advertisement),
      video: cleanText(input.video),
      type: cleanText(input.type),
      approve: Boolean(input.approve),
      deleted: false,
    };

    const [inserted] = await db
      .insert(legacyWebsites)
      .values(rowValues as typeof legacyWebsites.$inferInsert)
      .returning();

    revalidateLegacyRoutes();

    const insertedId = String((inserted as Record<string, unknown>)?.id ?? "");

    return {
      ok: true,
      message: `Created record "${insertedId}" successfully.`,
      record: inserted,
    };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "Failed to create legacy record.",
    };
  }
}

/** Soft-deletes a record by setting `deleted = true`. */
export async function removeLegacyWebsiteRecord(
  id: string | number,
): Promise<LegacyActionResponse> {
  try {
    const targetId = String(id).trim();
    if (!targetId) {
      return { ok: false, message: "Record ID is required to delete." };
    }

    const [updated] = await db
      .update(legacyWebsites)
      .set({ deleted: true } as Partial<typeof legacyWebsites.$inferInsert>)
      .where(and(whereIdEquals(targetId), ne(legacyWebsites.deleted, true)))
      .returning();

    if (!updated) {
      return {
        ok: false,
        message: `No active record found with ID "${targetId}".`,
      };
    }

    revalidateLegacyRoutes();

    return {
      ok: true,
      message: `Moved record "${targetId}" to deleted.`,
      deletedId: targetId,
    };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "Failed to delete legacy record.",
    };
  }
}

/** Returns all soft-deleted records (`deleted = true`). */
export async function getDeletedLegacyRecords(): Promise<LegacyWebsite[]> {
  return db
    .select()
    .from(legacyWebsites)
    .where(eq(legacyWebsites.deleted, true))
    .orderBy(desc(legacyWebsites.id));
}

/** Restores a soft-deleted record by setting `deleted = false`. */
export async function restoreLegacyWebsiteRecord(
  id: string | number,
): Promise<LegacyActionResponse> {
  try {
    const targetId = String(id).trim();
    if (!targetId) {
      return { ok: false, message: "Record ID is required to restore." };
    }

    const [restored] = await db
      .update(legacyWebsites)
      .set({ deleted: false } as Partial<typeof legacyWebsites.$inferInsert>)
      .where(and(whereIdEquals(targetId), eq(legacyWebsites.deleted, true)))
      .returning();

    if (!restored) {
      return {
        ok: false,
        message: `No deleted record found with ID "${targetId}".`,
      };
    }

    revalidateLegacyRoutes();

    return {
      ok: true,
      message: `Restored record "${targetId}".`,
      record: restored,
    };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "Failed to restore legacy record.",
    };
  }
}

export interface UpdateLegacyRecordPayload extends AddLegacyRecordPayload {
  id: string | number;
}

export async function updateLegacyWebsiteRecord(
  input: UpdateLegacyRecordPayload,
): Promise<LegacyActionResponse> {
  try {
    const targetId = String(input.id).trim();
    if (!targetId) {
      return { ok: false, message: "Record ID is required to update." };
    }

    const rowValues: Record<string, unknown> = {
      category: input.category,
      name: cleanText(input.name),
      image: cleanText(input.image),
      company: cleanText(input.company),
      description: cleanText(input.description),
      address: cleanText(input.address),
      city: cleanText(input.city),
      state: cleanText(input.state),
      country: cleanText(input.country),
      contactNo: cleanText(input.contactNo),
      email: cleanText(input.email),
      webSite: cleanText(input.webSite),
      advertisement: cleanText(input.advertisement),
      video: cleanText(input.video),
      type: cleanText(input.type),
      approve: Boolean(input.approve),
    };

    const [updated] = await db
      .update(legacyWebsites)
      .set(rowValues as Partial<typeof legacyWebsites.$inferInsert>)
      .where(and(whereIdEquals(targetId), notDeletedFilter()))
      .returning();

    if (!updated) {
      return {
        ok: false,
        message: `No active record found with ID "${targetId}".`,
      };
    }

    revalidateLegacyRoutes();

    return {
      ok: true,
      message: `Updated record "${targetId}" successfully.`,
      record: updated,
    };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "Failed to update legacy record.",
    };
  }
}
