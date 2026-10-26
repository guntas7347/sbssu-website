"use server";

import prisma from "@/lib/prisma";
import { requireCentralEditor } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";

export async function getCouncilMeetingsAction(): Promise<ActionResponse> {
  try {
    const adminDept = await prisma.department.findUnique({
      where: { departmentCode: "ADMIN" },
    });

    if (!adminDept) return { success: true, data: [] };

    const page = await prisma.page.findUnique({
      where: {
        pageKey_departmentId: {
          pageKey: "council-meetings",
          departmentId: adminDept.id,
        },
      },
    });

    const meetings = (page?.data as any)?.meetings || [];
    return { success: true, data: meetings };
  } catch (error: any) {
    console.error("getCouncilMeetingsAction error:", error);
    return { success: false, error: error.message || "Failed to fetch council meetings." };
  }
}

export async function createCouncilMeetingAction(data: {
  name: string;
  date: string;
  category: string;
  agenda?: string;
  documents?: any[];
  isUpcoming?: boolean;
}): Promise<ActionResponse> {
  const auth = await requireCentralEditor();
  if (!auth.ok) {
    return { success: false, error: auth.error || "Unauthorized. Central Editor access required." };
  }

  try {
    const { name, date, category, agenda, documents, isUpcoming } = data;

    if (!name || !date || !category) {
      return { success: false, error: "Name, date, and category are required." };
    }

    const adminDept = await prisma.department.findUnique({
      where: { departmentCode: "ADMIN" },
    });

    if (!adminDept) {
      return { success: false, error: "ADMIN department not found." };
    }

    const page = await prisma.page.findUnique({
      where: {
        pageKey_departmentId: {
          pageKey: "council-meetings",
          departmentId: adminDept.id,
        },
      },
    });

    const currentData = (page?.data as any) || { meetings: [] };
    const meetings = Array.isArray(currentData.meetings) ? currentData.meetings : [];

    const newMeeting = {
      id: crypto.randomUUID(),
      name: name.trim(),
      date,
      category,
      agenda: agenda?.trim() || "",
      documents: documents || [],
      isUpcoming: Boolean(isUpcoming),
      createdAt: new Date().toISOString(),
    };

    meetings.push(newMeeting);

    await prisma.page.upsert({
      where: {
        pageKey_departmentId: {
          pageKey: "council-meetings",
          departmentId: adminDept.id,
        },
      },
      update: {
        data: { ...currentData, meetings },
      },
      create: {
        pageKey: "council-meetings",
        scope: "CENTRAL",
        departmentId: adminDept.id,
        createdBy: auth.userId!,
        data: { meetings: [newMeeting] },
      },
    });

    try {
      revalidatePath("/administration/council-meeting");
      revalidatePath("/admin/content/admin/council-meetings");
    } catch {
      // non-blocking
    }

    return { success: true, data: newMeeting };
  } catch (error: any) {
    console.error("createCouncilMeetingAction error:", error);
    return { success: false, error: error.message || "Failed to create council meeting." };
  }
}
