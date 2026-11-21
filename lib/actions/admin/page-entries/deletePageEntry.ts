"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { pageCategories, pageEntries } from "@/db/schema";
import { getCurrentUser } from "@/lib/actions/auth";
import { getUserAllowedScopes } from "@/lib/actions/configs";

export async function deletePageEntry(id: string) {
  const user = await getCurrentUser();
  const rights = Array.isArray(user?.rights) ? user.rights : [];

  if (!user || rights.length === 0) {
    throw new Error("Unauthorized: Portal access required.");
  }

  const [existing] = await db
    .select({
      id: pageEntries.id,
      departmentId: pageEntries.departmentId,
      categoryScope: pageCategories.scope,
    })
    .from(pageEntries)
    .leftJoin(pageCategories, eq(pageEntries.pageCategoryId, pageCategories.id))
    .where(eq(pageEntries.id, id))
    .limit(1);

  if (!existing) {
    throw new Error("Page entry not found.");
  }

  const allowedScopes = await getUserAllowedScopes();
  const allowedKeys = new Set(allowedScopes.map((s) => s.key));
  const isHod = rights.includes("hod");
  const scopeKey = existing.categoryScope || "university";

  const hasScope =
    allowedKeys.has(scopeKey) || (isHod && scopeKey === "all-departments");
  const isSameDeptHod =
    isHod &&
    Boolean(user.departmentId) &&
    existing.departmentId === user.departmentId;

  if (!hasScope && !isSameDeptHod) {
    throw new Error("Unauthorized: You cannot delete this page entry.");
  }

  await db.delete(pageEntries).where(eq(pageEntries.id, id));
  return { deleted: true };
}
