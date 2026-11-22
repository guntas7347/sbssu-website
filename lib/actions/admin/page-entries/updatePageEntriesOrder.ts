"use server";

import { and, eq, inArray } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { pageCategories, pageEntries } from "@/db/schema";
import { getCurrentUser } from "@/lib/actions/auth";
import { getUserAllowedScopes } from "@/lib/actions/configs";

export interface EntryOrderUpdate {
  id: string;
  displayOrder: number;
}

export async function updatePageEntriesOrder(
  updates: EntryOrderUpdate[],
): Promise<{ updatedCount: number }> {
  const user = await getCurrentUser();
  const rights = Array.isArray(user?.rights) ? user.rights : [];

  if (!user || rights.length === 0) {
    throw new Error("Unauthorized: Portal access required.");
  }

  if (!Array.isArray(updates) || updates.length === 0) {
    return { updatedCount: 0 };
  }

  const isAdmin = rights.includes("admin");
  const isHod = rights.includes("hod");
  const allowedScopes = await getUserAllowedScopes();
  const allowedScopeSet = new Set(allowedScopes.map((s) => s.key));

  const ids = updates.map((u) => u.id);
  const existingRows = await db
    .select({
      id: pageEntries.id,
      departmentId: pageEntries.departmentId,
      scope: pageCategories.scope,
    })
    .from(pageEntries)
    .innerJoin(
      pageCategories,
      eq(pageEntries.pageCategoryId, pageCategories.id),
    )
    .where(inArray(pageEntries.id, ids));

  const rowMap = new Map(existingRows.map((r) => [r.id, r]));

  for (const item of updates) {
    const row = rowMap.get(item.id);
    if (!row) {
      throw new Error(`Entry not found: ${item.id}`);
    }

    const scopeAllowed = allowedScopeSet.has(row.scope || "university");
    const hodOwnDeptAllowed =
      isHod &&
      Boolean(user.departmentId) &&
      row.departmentId === user.departmentId;

    if (!isAdmin && !scopeAllowed && !hodOwnDeptAllowed) {
      throw new Error(
        "Forbidden: You do not have rights to reorder this entry.",
      );
    }
  }

  let updatedCount = 0;

  for (const item of updates) {
    const nextOrder = Number.isFinite(item.displayOrder)
      ? Math.trunc(item.displayOrder)
      : 0;

    await db
      .update(pageEntries)
      .set({
        displayOrder: nextOrder,
        updatedAt: new Date(),
      })
      .where(and(eq(pageEntries.id, item.id)));

    updatedCount += 1;
  }

  return { updatedCount };
}
