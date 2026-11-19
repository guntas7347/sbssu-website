// src/lib/actions/users.ts
"use server";

import { db } from "@/db/drizzel";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { asc } from "drizzle-orm";
import { departmentsTable } from "@/db/schema";
import type { SSOUserPayload } from "@/app/api/auth/callback/route";

export async function upsertUser(ssoUser: SSOUserPayload) {
  if (!ssoUser.email)
    throw new Error("Email is required from SSO payload to upsert user.");

  // Check if user already exists by email
  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, ssoUser.email),
  });

  if (existingUser) {
    // Update existing core user details
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        username: ssoUser.username ?? existingUser.username,
        fullName: ssoUser.fullName ?? existingUser.fullName,
        phone: ssoUser.mobile ?? existingUser.phone,
      })
      .where(eq(usersTable.email, ssoUser.email))
      .returning();

    return updatedUser;
  } else {
    // Insert new user record with only core fields
    const [newUser] = await db
      .insert(usersTable)
      .values({
        email: ssoUser.email,
        username: ssoUser.username || null,
        fullName: ssoUser.fullName || null,
        phone: ssoUser.mobile || null,
        rights: ["allow_login"],
      })
      .returning();

    return newUser;
  }
}

export type UserRight =
  | "admin"
  | "allow_login"
  | "hod"
  | "academics"
  | "placements";

export interface UserRecord {
  id: string;
  username: string | null;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  departmentId: string | null;
  rights: string[] | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface DepartmentOption {
  id: string;
  name: string;
}

export interface UpdateUserAccessInput {
  id: string;
  departmentId: string | null;
  rights: UserRight[];
}

export interface UserActionResult {
  ok: boolean;
  message: string;
  user?: UserRecord;
}

export async function getAllUsersAndDepartments(): Promise<{
  users: UserRecord[];
  departments: DepartmentOption[];
}> {
  const [users, departments] = await Promise.all([
    db
      .select()
      .from(usersTable)
      .orderBy(asc(usersTable.fullName), asc(usersTable.username)),
    db
      .select({
        id: departmentsTable.id,
        name: departmentsTable.name,
      })
      .from(departmentsTable)
      .orderBy(asc(departmentsTable.name)),
  ]);

  return { users, departments };
}

export async function editUserAccess(
  input: UpdateUserAccessInput,
): Promise<UserActionResult> {
  try {
    const cleanId = input.id.trim();
    if (!cleanId) {
      return { ok: false, message: "User ID is required." };
    }

    const cleanDepartmentId =
      input.departmentId && input.departmentId.trim() !== ""
        ? input.departmentId.trim()
        : null;

    const uniqueRights = Array.from(new Set(input.rights));

    const [updated] = await db
      .update(usersTable)
      .set({
        departmentId: cleanDepartmentId,
        rights: uniqueRights,
      })
      .where(eq(usersTable.id, cleanId))
      .returning();

    if (!updated) {
      return { ok: false, message: "User not found." };
    }

    revalidatePath("/users");

    return {
      ok: true,
      message: `Updated ${updated.fullName || updated.username || updated.id}.`,
      user: updated,
    };
  } catch (err) {
    return {
      ok: false,
      message:
        err instanceof Error ? err.message : "Failed to update user access.",
    };
  }
}
