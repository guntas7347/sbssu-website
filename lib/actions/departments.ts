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

async function assignHodDepartmentAndRight(
  tx: Parameters<Parameters<typeof db.transaction>[0]>[0],
  userId: string,
  departmentId: string,
) {
  const [targetUser] = await tx
    .select({ rights: usersTable.rights })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  const nextRights = Array.from(
    new Set([...(targetUser?.rights ?? []), "hod"]),
  );

  await tx
    .update(usersTable)
    .set({
      departmentId,
      rights: nextRights,
    })
    .where(eq(usersTable.id, userId));
}

export async function createDepartment(data: DepartmentInput) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const name = data.name?.trim();
  const code = data.code?.trim();
  const hodId = data.hodId?.trim() || null;

  if (!name || !code) {
    throw new Error("Department name and code are required.");
  }

  try {
    await db.transaction(async (tx) => {
      const [inserted] = await tx
        .insert(departmentsTable)
        .values({
          name,
          code,
          hodId,
          createdBy: user.id,
        })
        .returning({ id: departmentsTable.id });

      if (hodId && inserted) {
        await assignHodDepartmentAndRight(tx, hodId, inserted.id);
      }
    });

    return { success: true };
  } catch (error: any) {
    console.error("Failed to create department:", error);
    return {
      success: false,
      error: error.message || "Failed to create department",
    };
  }
}

export async function updateDepartment(id: string, data: DepartmentInput) {
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  const name = data.name?.trim();
  const code = data.code?.trim();
  const hodId = data.hodId?.trim() || null;

  if (!name || !code) {
    throw new Error("Department name and code are required.");
  }

  try {
    await db.transaction(async (tx) => {
      await tx
        .update(departmentsTable)
        .set({
          name,
          code,
          hodId,
        })
        .where(eq(departmentsTable.id, id));

      if (hodId) {
        await assignHodDepartmentAndRight(tx, hodId, id);
      }
    });

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
