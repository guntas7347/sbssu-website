"use server";

import { eq, desc } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { legacyWebsites, type LegacyWebsite } from "@/db/schema";

export async function getLegacyRecordsByCategory(
  categoryId: number,
): Promise<LegacyWebsite[]> {
  return db
    .select()
    .from(legacyWebsites)
    .where(eq(legacyWebsites.category, categoryId))
    .orderBy(desc(legacyWebsites.id));
}

export async function getLegacyRecordById(
  id: number,
): Promise<LegacyWebsite | null> {
  const [record] = await db
    .select()
    .from(legacyWebsites)
    .where(eq(legacyWebsites.id, id))
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
