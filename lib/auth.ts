import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { Role } from "@/prisma/generated/prisma/client";

export interface AuthUser {
  id: string;
  username: string;
  roles: Role[];
  loginEnabled: boolean;
  department: {
    id: string;
    name: string;
    departmentCode: string;
  } | null;
}

export interface AuthCheckResult {
  ok: boolean;
  error?: string;
  userId?: string;
  roles?: Role[];
  rights?: string[];
  user?: AuthUser;
}

/**
 * Core individual auth verification function for server actions
 */
export default async function verifyAuth(
  requiredRoles?: Role | Role[] | string | string[]
): Promise<AuthCheckResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { ok: false, error: "Unauthorized. Please log in." };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const userId = decoded.userId ?? decoded.id;

    if (!userId) {
      return { ok: false, error: "Invalid session token." };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        roles: true,
        loginEnabled: true,
        department: {
          select: {
            id: true,
            name: true,
            departmentCode: true,
          },
        },
      },
    });

    if (!user) {
      return { ok: false, error: "User account not found." };
    }

    if (!user.loginEnabled) {
      return { ok: false, error: "User account is disabled." };
    }

    const roles = user.roles || [];
    const isSuperAdmin = roles.includes("SUPER_ADMIN");

    const reqList = Array.isArray(requiredRoles)
      ? requiredRoles
      : requiredRoles
      ? [requiredRoles]
      : [];

    const hasAccess =
      reqList.length === 0 ||
      isSuperAdmin ||
      reqList.some((req) => {
        if (roles.includes(req as Role)) return true;
        if (req === "central" && (roles.includes("CENTRAL_EDITOR") || roles.includes("SUPER_ADMIN"))) return true;
        if (req === "manage_departments" && roles.includes("SUPER_ADMIN")) return true;
        if (req === "manage-users" && roles.includes("SUPER_ADMIN")) return true;
        if (req === "admin-stats" && roles.includes("SUPER_ADMIN")) return true;
        return false;
      });

    if (!hasAccess) {
      return { ok: false, error: "Forbidden: You do not have permission to perform this action." };
    }

    return {
      ok: true,
      userId,
      roles,
      rights: roles as string[],
      user: user as AuthUser,
    };
  } catch {
    return { ok: false, error: "Session expired or invalid. Please log in again." };
  }
}

/**
 * Individual function: require user to be logged in
 */
export async function requireAuth(): Promise<AuthCheckResult> {
  return verifyAuth();
}

/**
 * Individual function: require SUPER_ADMIN role
 */
export async function requireSuperAdmin(): Promise<AuthCheckResult> {
  return verifyAuth("SUPER_ADMIN");
}

/**
 * Individual function: require CENTRAL_EDITOR or SUPER_ADMIN role
 */
export async function requireCentralEditor(): Promise<AuthCheckResult> {
  return verifyAuth(["CENTRAL_EDITOR", "SUPER_ADMIN"]);
}

/**
 * Individual function: require access to a specific department (SUPER_ADMIN or member of department)
 */
export async function requireDepartmentAccess(departmentCode: string): Promise<AuthCheckResult> {
  const auth = await verifyAuth();
  if (!auth.ok || !auth.user) return auth;

  const code = (departmentCode || "ADMIN").toUpperCase();
  const isSuperAdmin = auth.roles?.includes("SUPER_ADMIN");
  const isDeptMember = auth.user.department?.departmentCode === code;

  if (!isSuperAdmin && !isDeptMember) {
    return {
      ok: false,
      error: `Forbidden: You do not have permission to access ${code} department content.`,
    };
  }

  return auth;
}

const SECRET = process.env.JWT_SECRET as string;

// hash a password
export async function hashPassword(raw: string): Promise<string> {
  return await bcrypt.hash(raw, 10);
}

// compare raw vs hash
export async function verifyPassword(
  raw: string,
  hash: string
): Promise<boolean> {
  return await bcrypt.compare(raw, hash);
}

// create jwt
export function createJwt(payload: object, expires: any = "1d"): string {
  return jwt.sign(payload, SECRET, { expiresIn: expires });
}

// decode and verify jwt
export function decodeJwt(token: string): any {
  return jwt.verify(token, SECRET);
}
