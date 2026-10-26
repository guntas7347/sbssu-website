"use server";

import prisma from "@/lib/prisma";
import { requireSuperAdmin } from "@/lib/auth";
import bcrypt from "bcryptjs";
import { Role } from "@/prisma/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { ActionResponse } from "./types";

import { getUsers } from "./getUsers";

export async function getUsersAction() {
  return getUsers();
}

export interface CreateUserInput {
  username: string;
  email: string;
  fullName?: string;
  department?: string;
  roles: Role[];
  loginEnabled?: boolean;
  password?: string;
}

export interface UpdateUserInput {
  username?: string;
  email?: string;
  fullName?: string;
  department?: string;
  roles?: Role[];
  loginEnabled?: boolean;
}

export async function getUserAction(id: string): Promise<ActionResponse> {
  const auth = await requireSuperAdmin();
  if (!auth.ok) {
    return { success: false, error: auth.error || "Unauthorized." };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        roles: true,
        loginEnabled: true,
        createdAt: true,
        updatedAt: true,
        department: {
          select: { id: true, name: true, departmentCode: true },
        },
      },
    });

    if (!user) return { success: false, error: "User not found." };
    return { success: true, data: user };
  } catch (err: any) {
    console.error("getUserAction error:", err);
    return { success: false, error: err.message || "Failed to fetch user." };
  }
}

export async function createUserAction(data: CreateUserInput): Promise<ActionResponse> {
  const auth = await requireSuperAdmin();
  if (!auth.ok) {
    return { success: false, error: auth.error || "Forbidden: Super Admin access required." };
  }

  try {
    const { username, email, department, roles, loginEnabled, password } = data;

    if (!username || !email || !Array.isArray(roles)) {
      return { success: false, error: "Missing required fields (username, email, roles)." };
    }

    const existing = await prisma.user.findUnique({
      where: { username },
    });
    if (existing) {
      return { success: false, error: "Username already exists." };
    }

    const deptCode = department?.toUpperCase();
    const dept = deptCode
      ? await prisma.department.findUnique({
          where: { departmentCode: deptCode },
          select: { id: true },
        })
      : null;

    if (deptCode && !dept) {
      return { success: false, error: "Invalid department selected." };
    }

    const passwordHash = await bcrypt.hash(password || "123456", 10);

    const user = await prisma.user.create({
      data: {
        username: username.trim(),
        email: email.trim(),
        fullName: data.fullName?.trim() || username.trim(),
        passwordHash,
        departmentId: dept?.id || null,
        roles: roles as Role[],
        loginEnabled: loginEnabled ?? true,
      },
      select: {
        id: true,
        username: true,
        email: true,
        roles: true,
        loginEnabled: true,
        createdAt: true,
      },
    });

    try {
      revalidatePath("/admin/manage-users");
    } catch {
      // non-blocking
    }

    return { success: true, data: user };
  } catch (err: any) {
    console.error("createUserAction error:", err);
    return { success: false, error: err.message || "Failed to create user." };
  }
}

export async function updateUserAction(
  id: string,
  data: UpdateUserInput,
): Promise<ActionResponse> {
  const auth = await requireSuperAdmin();
  if (!auth.ok) {
    return { success: false, error: auth.error || "Forbidden: Super Admin access required." };
  }

  try {
    if (!id) return { success: false, error: "Missing user ID." };

    const deptCode = data.department?.toUpperCase();
    const dept = deptCode
      ? await prisma.department.findUnique({
          where: { departmentCode: deptCode },
          select: { id: true },
        })
      : null;

    const updated = await prisma.user.update({
      where: { id },
      data: {
        username: data.username?.trim(),
        email: data.email?.trim(),
        fullName: data.fullName?.trim(),
        departmentId: dept ? dept.id : undefined,
        roles: data.roles as Role[] | undefined,
        loginEnabled: data.loginEnabled,
      },
      select: {
        id: true,
        username: true,
        email: true,
        roles: true,
        loginEnabled: true,
      },
    });

    try {
      revalidatePath("/admin/manage-users");
      revalidatePath(`/admin/manage-users/${id}`);
    } catch {
      // non-blocking
    }

    return { success: true, data: updated };
  } catch (err: any) {
    console.error("updateUserAction error:", err);
    return { success: false, error: err.message || "Failed to update user." };
  }
}

export async function deleteUserAction(id: string): Promise<ActionResponse> {
  const auth = await requireSuperAdmin();
  if (!auth.ok) {
    return { success: false, error: auth.error || "Forbidden: Super Admin access required." };
  }

  if (auth.userId === id) {
    return { success: false, error: "Cannot delete your own account." };
  }

  try {
    await prisma.user.delete({
      where: { id },
    });

    try {
      revalidatePath("/admin/manage-users");
    } catch {
      // non-blocking
    }

    return { success: true };
  } catch (err: any) {
    console.error("deleteUserAction error:", err);
    return { success: false, error: err.message || "Failed to delete user." };
  }
}
