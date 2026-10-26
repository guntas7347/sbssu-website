"use server";

import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { getAuth } from "@/lib/getAuth";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";

export interface CreateNoticeInput {
  title: string;
  description?: string | null;
  refNumber: string;
  date: string | Date;
  showTill: string | Date;
  category?: string;
  file?: { title?: string; url: string } | string | null;
  departmentId?: string;
  scope?: "CENTRAL" | "DEPARTMENT";
}

export async function getAllNotices() {
  return prisma.notice.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getNoticesAction(options?: {
  scope?: "CENTRAL" | "DEPARTMENT";
  departmentId?: string;
  limit?: number;
  activeOnly?: boolean;
}): Promise<ActionResponse> {
  try {
    const where: any = {};
    if (options?.scope) where.scope = options.scope;
    if (options?.departmentId) where.departmentId = options.departmentId;
    if (options?.activeOnly) where.showTill = { gte: new Date() };

    const notices = await prisma.notice.findMany({
      // where,
      orderBy: { createdAt: "desc" },
      take: options?.limit,
      include: {
        department: { select: { id: true, name: true, departmentCode: true } },
      },
    });

    return { success: true, data: notices };
  } catch (err: any) {
    console.error("getNoticesAction error:", err);
    return { success: false, error: err.message || "Failed to fetch notices." };
  }
}

export async function createNoticeAction(
  data: CreateNoticeInput,
): Promise<ActionResponse> {
  const user = await getAuth();
  if (!user) {
    return { success: false, error: "Unauthorized. Please log in." };
  }

  try {
    const { title, description, refNumber, date, showTill, category, file } =
      data;

    if (!title || !refNumber || !date || !showTill) {
      return {
        success: false,
        error:
          "Title, Reference Number, Notice Date, and Show Till Date are required.",
      };
    }

    const isSuperAdmin = user.roles.includes("SUPER_ADMIN");
    const isCentralEditor = user.roles.includes("CENTRAL_EDITOR");
    const isCentral =
      isSuperAdmin ||
      isCentralEditor ||
      user.department?.departmentCode === "ADMIN";

    let deptId = data.departmentId || user.department?.id;
    if (!deptId) {
      const adminDept = await prisma.department.findFirst({
        where: { departmentCode: "ADMIN" },
      });
      deptId = adminDept?.id;
    }

    if (!deptId) {
      const anyDept = await prisma.department.findFirst();
      deptId = anyDept?.id;
    }

    if (!deptId) {
      return { success: false, error: "No department found to assign notice." };
    }

    const scope = data.scope || (isCentral ? "CENTRAL" : "DEPARTMENT");

    const created = await prisma.notice.create({
      data: {
        title: title.trim(),
        description: description?.trim() || null,
        refNumber: refNumber.trim(),
        date: new Date(date),
        showTill: new Date(showTill),
        category: category?.toLowerCase() || "other",
        fileName: (file as any) ?? undefined,
        filePath: (file as any) ?? undefined,
        createdBy: user.id,
        departmentId: deptId,
        scope,
      },
    });

    try {
      revalidatePath("/notices");
      revalidatePath("/admin/notices");
      revalidatePath("/");
    } catch {
      // non-blocking
    }

    return { success: true, data: created };
  } catch (err: any) {
    console.error("createNoticeAction error:", err);
    return { success: false, error: err.message || "Failed to create notice." };
  }
}

export async function deleteNoticeAction(id: string): Promise<ActionResponse> {
  const auth = await requireAuth();
  if (!auth.ok) {
    return { success: false, error: auth.error || "Unauthorized." };
  }

  try {
    const notice = await prisma.notice.findUnique({
      where: { id },
    });

    if (!notice) return { success: false, error: "Notice not found." };

    const isSuperAdmin = auth.roles?.includes("SUPER_ADMIN");
    const isOwner = notice.createdBy === auth.userId;

    if (!isSuperAdmin && !isOwner) {
      return {
        success: false,
        error: "Forbidden: You can only delete your own notices.",
      };
    }

    await prisma.notice.delete({
      where: { id },
    });

    try {
      revalidatePath("/notices");
      revalidatePath("/admin/notices");
      revalidatePath("/");
    } catch {
      // non-blocking
    }

    return { success: true };
  } catch (err: any) {
    console.error("deleteNoticeAction error:", err);
    return { success: false, error: err.message || "Failed to delete notice." };
  }
}
