"use server";

import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export interface AdminStats {
  departments: number;
  users: number;
  activeNotices: number;
  pages: number;
}

export async function getAdminStatsAction(): Promise<{
  success: boolean;
  data?: AdminStats;
  error?: string;
}> {
  const auth = await requireAuth();
  if (!auth.ok) {
    return { success: false, error: auth.error || "Unauthorized." };
  }

  try {
    const now = new Date();
    const [departments, users, activeNotices, pages] = await Promise.all([
      prisma.department.count({ where: { departmentCode: { not: "ADMIN" } } }),
      prisma.user.count(),
      prisma.notice.count({ where: { showTill: { gte: now } } }),
      prisma.page.count(),
    ]);

    return {
      success: true,
      data: {
        departments,
        users,
        activeNotices,
        pages,
      },
    };
  } catch (err: any) {
    console.error("getAdminStatsAction error:", err);
    return { success: false, error: err.message || "Failed to fetch stats." };
  }
}
