"use server";

import prisma from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";

export interface DepartmentInput {
  name: string;
  departmentCode: string;
  establishmentYear?: number | null;
  location?: string | null;
  description?: string | null;
}

export async function getDepartmentsAction(includeAdmin = false): Promise<ActionResponse> {
  try {
    const departments = await prisma.department.findMany({
      where: includeAdmin ? {} : { departmentCode: { not: "ADMIN" } },
      orderBy: { name: "asc" },
    });
    return { success: true, data: departments };
  } catch (err: any) {
    console.error("getDepartmentsAction error:", err);
    return { success: false, error: err.message || "Failed to fetch departments." };
  }
}

export async function getDepartmentAction(id: string): Promise<ActionResponse> {
  try {
    const department = await prisma.department.findUnique({
      where: { id },
    });
    if (!department) return { success: false, error: "Department not found." };
    return { success: true, data: department };
  } catch (err: any) {
    console.error("getDepartmentAction error:", err);
    return { success: false, error: err.message || "Failed to fetch department." };
  }
}

export async function createDepartmentAction(data: DepartmentInput): Promise<ActionResponse> {
  const auth = await requireSuperAdmin();
  if (!auth.ok) {
    return { success: false, error: auth.error || "Forbidden: Super Admin access required." };
  }

  try {
    const code = data.departmentCode?.trim().toUpperCase();
    const name = data.name?.trim();

    if (!name || !code) {
      return { success: false, error: "Name and Department Code are required." };
    }

    const existing = await prisma.department.findUnique({
      where: { departmentCode: code },
    });
    if (existing) {
      return { success: false, error: "Department code already exists." };
    }

    const created = await prisma.department.create({
      data: {
        name,
        departmentCode: code,
        establishmentYear: data.establishmentYear ? Number(data.establishmentYear) : null,
        location: data.location?.trim() || null,
        description: data.description?.trim() || null,
      },
    });

    try {
      revalidatePath("/admin/manage-departments");
      revalidatePath("/admin/content");
      revalidatePath("/");
    } catch {
      // non-blocking
    }

    return { success: true, data: created };
  } catch (err: any) {
    console.error("createDepartmentAction error:", err);
    return { success: false, error: err.message || "Failed to create department." };
  }
}

export async function updateDepartmentAction(
  id: string,
  data: DepartmentInput,
): Promise<ActionResponse> {
  const auth = await requireSuperAdmin();
  if (!auth.ok) {
    return { success: false, error: auth.error || "Forbidden: Super Admin access required." };
  }

  try {
    const code = data.departmentCode?.trim().toUpperCase();
    const name = data.name?.trim();

    if (!name || !code) {
      return { success: false, error: "Name and Department Code are required." };
    }

    const updated = await prisma.department.update({
      where: { id },
      data: {
        name,
        departmentCode: code,
        establishmentYear: data.establishmentYear ? Number(data.establishmentYear) : null,
        location: data.location?.trim() || null,
        description: data.description?.trim() || null,
      },
    });

    try {
      revalidatePath("/admin/manage-departments");
      revalidatePath(`/admin/manage-departments/${id}`);
      revalidatePath("/admin/content");
      revalidatePath("/");
    } catch {
      // non-blocking
    }

    return { success: true, data: updated };
  } catch (err: any) {
    console.error("updateDepartmentAction error:", err);
    return { success: false, error: err.message || "Failed to update department." };
  }
}

export async function deleteDepartmentAction(id: string): Promise<ActionResponse> {
  const auth = await requireSuperAdmin();
  if (!auth.ok) {
    return { success: false, error: auth.error || "Forbidden: Super Admin access required." };
  }

  try {
    const [userCount, pageCount, noticeCount] = await Promise.all([
      prisma.user.count({ where: { departmentId: id } }),
      prisma.page.count({ where: { departmentId: id } }),
      prisma.notice.count({ where: { departmentId: id } }),
    ]);

    if (userCount > 0 || pageCount > 0 || noticeCount > 0) {
      return {
        success: false,
        error: `Cannot delete: department has ${userCount} users, ${noticeCount} notices, and ${pageCount} pages assigned.`,
      };
    }

    await prisma.department.delete({
      where: { id },
    });

    try {
      revalidatePath("/admin/manage-departments");
      revalidatePath("/admin/content");
      revalidatePath("/");
    } catch {
      // non-blocking
    }

    return { success: true };
  } catch (err: any) {
    console.error("deleteDepartmentAction error:", err);
    return { success: false, error: err.message || "Failed to delete department." };
  }
}
