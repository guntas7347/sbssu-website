"use server";

import prisma from "@/lib/prisma";
import { requireDepartmentAccess } from "@/lib/auth";
import { revalidatePath } from "next/cache";

import { getPage as getPageInternal } from "./getPage";

export async function getPage(dept: string, pageKey: string, opts?: any) {
  return getPageInternal(dept, pageKey, opts);
}

export interface SavePageResult {
  success: boolean;
  data?: any;
  error?: string;
}

export async function savePageAction(
  dept: string,
  pageKey: string,
  data: any,
): Promise<SavePageResult> {
  try {
    if (!dept || !pageKey) {
      return { success: false, error: "Missing department or page key." };
    }

    if (data === undefined || data === null) {
      return { success: false, error: "Missing page data." };
    }

    const auth = await requireDepartmentAccess(dept);
    if (!auth.ok || !auth.user) {
      return { success: false, error: auth.error || "Forbidden" };
    }
    const user = auth.user;

    const departmentCode = dept.toUpperCase();

    // Resolve department
    const department = await prisma.department.findUnique({
      where: { departmentCode },
      select: { id: true },
    });

    if (!department) {
      return { success: false, error: `Invalid department code: ${dept}` };
    }

    const page = await prisma.page.upsert({
      where: {
        pageKey_departmentId: {
          pageKey,
          departmentId: department.id,
        },
      },
      update: {
        data,
      },
      create: {
        pageKey,
        scope: departmentCode === "ADMIN" ? "CENTRAL" : "DEPARTMENT",
        departmentId: department.id,
        data,
        createdBy: user.id,
      },
    });

    try {
      revalidatePath("/", "layout");
      revalidatePath(`/admin/content/${dept}/${pageKey}`);
    } catch {
      // non-blocking
    }

    return { success: true, data: page };
  } catch (err: any) {
    console.error("savePageAction error:", err);
    return { success: false, error: err.message || "Failed to save page." };
  }
}

export async function getPageAction(
  dept: string,
  pageKey: string,
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    if (!dept || !pageKey) {
      return { success: false, error: "Missing department or pageKey." };
    }

    const departmentCode = (dept || "ADMIN").toUpperCase();
    const department = await prisma.department.findUnique({
      where: { departmentCode },
      select: { id: true, name: true, departmentCode: true },
    });

    if (!department) {
      return { success: false, error: "Department not found." };
    }

    const page = await prisma.page.findUnique({
      where: {
        pageKey_departmentId: {
          pageKey,
          departmentId: department.id,
        },
      },
    });

    if (!page) {
      return { success: false, error: "Page content not found." };
    }

    return {
      success: true,
      data: {
        ...page,
        department,
      },
    };
  } catch (err: any) {
    console.error("getPageAction error:", err);
    return { success: false, error: err.message || "Failed to fetch page." };
  }
}

