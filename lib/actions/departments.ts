// src/lib/actions/departments.ts
"use server";

import { db } from "@/db/drizzel";
import { departmentsTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/actions/auth";
import { revalidatePath } from "next/cache";

export interface DepartmentInput {
  name: string;
  code: string;
  hodId?: string | null;
}

// Get all departments with their HOD and Creator details
export async function getDepartments() {
  try {
    const departments = await db.query.departmentsTable.findMany({
      with: {
        hod: true,
        creator: true,
      },
      orderBy: (departments, { desc }) => [desc(departments.createdAt)],
    });
    return departments;
  } catch (error) {
    console.error("Failed to fetch departments:", error);
    return [];
  }
}

// Get a single department by ID
export async function getDepartmentById(id: string) {
  try {
    const department = await db.query.departmentsTable.findFirst({
      where: eq(departmentsTable.id, id),
      with: {
        hod: true,
      },
    });
    return department || null;
  } catch (error) {
    console.error(`Failed to fetch department ${id}:`, error);
    return null;
  }
}

// Create a new department
export async function createDepartment(data: DepartmentInput) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!data.name || !data.code) {
    throw new Error("Department name and code are required.");
  }

  try {
    await db.insert(departmentsTable).values({
      name: data.name,
      code: data.code,
      hodId: data.hodId || null,
      createdBy: user.id,
    });

    revalidatePath("/admin/departments");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to create department:", error);
    return {
      success: false,
      error: error.message || "Failed to create department",
    };
  }
}

// Update an existing department
export async function updateDepartment(id: string, data: DepartmentInput) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  if (!data.name || !data.code) {
    throw new Error("Department name and code are required.");
  }

  try {
    await db
      .update(departmentsTable)
      .set({
        name: data.name,
        code: data.code,
        hodId: data.hodId || null,
      })
      .where(eq(departmentsTable.id, id));

    revalidatePath("/admin/departments");
    revalidatePath(`/admin/departments/${id}`);
    return { success: true };
  } catch (error: any) {
    console.error(`Failed to update department ${id}:`, error);
    return {
      success: false,
      error: error.message || "Failed to update department",
    };
  }
}

// Delete a department
export async function deleteDepartment(id: string) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  try {
    await db.delete(departmentsTable).where(eq(departmentsTable.id, id));
    revalidatePath("/admin/departments");
    return { success: true };
  } catch (error: any) {
    console.error(`Failed to delete department ${id}:`, error);
    return {
      success: false,
      error: error.message || "Failed to delete department",
    };
  }
}

// Helper to get all users for selecting HOD dropdown
export async function getUsersList() {
  try {
    return await db.query.usersTable.findMany({
      columns: {
        id: true,
        fullName: true,
        email: true,
        username: true,
      },
    });
  } catch (error) {
    return [];
  }
}
