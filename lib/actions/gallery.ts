"use server";

import { and, desc, eq, ilike, isNull, or } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db/drizzel";
import { departmentsTable, galleryItems } from "@/db/schema";
import { getCurrentUser } from "@/lib/actions/auth";

export interface AdminGalleryItem {
  id: string;
  title: string | null;
  desc: string | null;
  path: string;
  category: string;
  album: string;
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  createdBy: string | null;
  createdAt: Date;
}

export async function getGallery(options?: {
  search?: string;
  album?: string;
}): Promise<AdminGalleryItem[]> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Please log in.");
  }

  const rights = Array.isArray(user.rights) ? user.rights : [];
  const isAdmin = rights.includes("admin");
  const isHod = rights.includes("hod");

  if (!isAdmin && !isHod) {
    throw new Error("Unauthorized: Admin or HOD access required.");
  }

  const conditions = [];

  // Scope enforcement by role:
  // - admin only: university-wide items (departmentId IS NULL)
  // - hod only: own department items (departmentId = user.departmentId)
  // - both admin & hod: university-wide OR own department items
  if (isAdmin && isHod) {
    if (user.departmentId) {
      conditions.push(
        or(
          isNull(galleryItems.departmentId),
          eq(galleryItems.departmentId, user.departmentId),
        )!,
      );
    } else {
      conditions.push(isNull(galleryItems.departmentId));
    }
  } else if (isAdmin) {
    conditions.push(isNull(galleryItems.departmentId));
  } else if (isHod) {
    if (!user.departmentId) {
      return [];
    }
    conditions.push(eq(galleryItems.departmentId, user.departmentId));
  }

  const cleanAlbum = options?.album?.trim();
  if (cleanAlbum && cleanAlbum.toLowerCase() !== "all") {
    conditions.push(eq(galleryItems.album, cleanAlbum));
  }

  const trimmedSearch =
    typeof options?.search === "string" ? options.search.trim() : "";

  if (trimmedSearch.length > 0) {
    const pattern = `%${trimmedSearch}%`;
    const searchClause = or(
      ilike(galleryItems.title, pattern),
      ilike(galleryItems.desc, pattern),
      ilike(galleryItems.category, pattern),
      ilike(galleryItems.album, pattern),
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
      id: galleryItems.id,
      title: galleryItems.title,
      desc: galleryItems.desc,
      path: galleryItems.path,
      category: galleryItems.category,
      album: galleryItems.album,
      departmentId: galleryItems.departmentId,
      departmentCode: departmentsTable.code,
      departmentName: departmentsTable.name,
      createdBy: galleryItems.createdBy,
      createdAt: galleryItems.createdAt,
    })
    .from(galleryItems)
    .leftJoin(
      departmentsTable,
      eq(galleryItems.departmentId, departmentsTable.id),
    )
    .where(whereClause)
    .orderBy(desc(galleryItems.createdAt), desc(galleryItems.id));

  return rows;
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Please log in.");
  }

  const rights = Array.isArray(user.rights) ? user.rights : [];
  const isAdmin = rights.includes("admin");
  const isHod = rights.includes("hod");

  if (!isAdmin && !isHod) {
    throw new Error("Unauthorized: Admin or HOD access required.");
  }

  const [existing] = await db
    .select({
      id: galleryItems.id,
      departmentId: galleryItems.departmentId,
    })
    .from(galleryItems)
    .where(eq(galleryItems.id, id))
    .limit(1);

  if (!existing) {
    throw new Error("Gallery item not found.");
  }

  const canDeleteGlobal = isAdmin && existing.departmentId === null;
  const canDeleteDept =
    isHod &&
    Boolean(user.departmentId) &&
    existing.departmentId === user.departmentId;

  if (!canDeleteGlobal && !canDeleteDept) {
    throw new Error("Unauthorized: You cannot delete this gallery item.");
  }

  await db.delete(galleryItems).where(eq(galleryItems.id, existing.id));
  revalidatePath("/admin/gallery");
}

function getAllowedGalleryCategory(
  rights: string[] | null | undefined,
): string[] {
  const safeRights = Array.isArray(rights) ? rights : [];
  const isAdmin = safeRights.includes("admin");
  const isHod = safeRights.includes("hod");

  if (!isAdmin && !isHod) {
    return [];
  }

  // Adjust or expand allowed gallery categories per role as needed
  if (isAdmin && isHod) {
    return ["homepage", "university", "departments"];
  }
  if (isAdmin) {
    return ["homepage", "university"];
  }
  if (isHod) {
    return ["departments"];
  }

  return [""];
}

export interface CreateGalleryItemInput {
  title?: string | null;
  desc?: string | null;
  path: string;
  category: string;
  album: string;
  scope?: "university" | "department";
}

export async function createGalleryItem(
  input: CreateGalleryItemInput,
): Promise<{ id: string }> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Please log in.");
  }

  const rights = Array.isArray(user.rights) ? user.rights : [];
  const isAdmin = rights.includes("admin");
  const isHod = rights.includes("hod");

  if (!isAdmin && !isHod) {
    throw new Error("Unauthorized: Admin or HOD access required.");
  }

  const allowedCategories = getAllowedGalleryCategory(user.rights);
  const cleanCategory = (input.category || "").trim();
  if (!cleanCategory || !allowedCategories.includes(cleanCategory)) {
    throw new Error("Invalid or unauthorized gallery category.");
  }

  const cleanPath = (input.path || "").trim();
  if (!cleanPath) {
    throw new Error("Media file or URL path is required.");
  }

  const cleanAlbum = (input.album || "").trim();
  if (!cleanAlbum) {
    throw new Error("Album name is required.");
  }

  // Determine target scope strictly from role + user.departmentId
  let targetDepartmentId: string | null = null;
  if (isAdmin && isHod) {
    if (input.scope === "department") {
      if (!user.departmentId) {
        throw new Error("No department assigned to your HOD account.");
      }
      targetDepartmentId = user.departmentId;
    } else {
      targetDepartmentId = null;
    }
  } else if (isAdmin) {
    targetDepartmentId = null;
  } else if (isHod) {
    if (!user.departmentId) {
      throw new Error("No department assigned to your HOD account.");
    }
    targetDepartmentId = user.departmentId;
  }

  const cleanTitle = input.title?.trim() || null;
  const cleanDesc = input.desc?.trim() || null;

  const [created] = await db
    .insert(galleryItems)
    .values({
      title: cleanTitle,
      desc: cleanDesc,
      path: cleanPath,
      category: cleanCategory,
      album: cleanAlbum,
      departmentId: targetDepartmentId,
      createdBy: user.id,
    })
    .returning({ id: galleryItems.id });

  revalidatePath("/admin/gallery");
  if (targetDepartmentId) {
    revalidatePath(`/departments/${targetDepartmentId}/gallery`);
  } else {
    revalidatePath("/gallery");
  }

  return { id: created.id };
}

export interface GalleryCreateContext {
  allowedCategories: string[];
  isAdmin: boolean;
  isHod: boolean;
  departmentId: string | null;
}

export async function getGalleryCreateContext(): Promise<GalleryCreateContext> {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized: Please log in.");
  }

  const rights = Array.isArray(user.rights) ? user.rights : [];
  const isAdmin = rights.includes("admin");
  const isHod = rights.includes("hod");

  if (!isAdmin && !isHod) {
    throw new Error("Unauthorized: Admin or HOD access required.");
  }

  return {
    allowedCategories: getAllowedGalleryCategory(user.rights),
    isAdmin,
    isHod,
    departmentId: user.departmentId ?? null,
  };
}
