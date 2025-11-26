import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface AuthCheckResult {
  ok: boolean;
  userId?: string;
  rights?: string[];
  portals?: string[];
  user?: any;
  response?: NextResponse;
}

/**
 * verifyAuth(requiredRights?, requiredPortals?)
 * - Verifies JWT in cookies
 * - Optionally checks for required rights and/or portals
 * - Returns latest user record from DB
 */
export default async function verifyAuth(
  requiredPortals?: string | string[],
  requiredRights?: string | string[]
): Promise<AuthCheckResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return {
      ok: false,
      response: new NextResponse("Unauthorised", { status: 401 }),
    };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const userId = decoded.id;

    // Fetch latest user data
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        rights: true,
        portals: true,
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

    if (!user)
      return {
        ok: false,
        response: new NextResponse("User not found", { status: 404 }),
      };

    const rights = user.rights || [];
    const portals = user.portals || [];

    // Normalize both inputs to arrays
    const reqRights = Array.isArray(requiredRights)
      ? requiredRights
      : requiredRights
      ? [requiredRights]
      : [];

    const reqPortals = Array.isArray(requiredPortals)
      ? requiredPortals
      : requiredPortals
      ? [requiredPortals]
      : [];

    // Check rights and portals
    const hasRight =
      reqRights.length === 0 || reqRights.some((r) => rights.includes(r));

    const hasPortal =
      reqPortals.length === 0 || reqPortals.some((p) => portals.includes(p));

    // Must satisfy both if both are defined
    const hasAccess =
      reqRights.length && reqPortals.length
        ? hasRight && hasPortal
        : hasRight || hasPortal;

    if (!hasAccess) {
      return {
        ok: false,
        response: new NextResponse("Forbidden", { status: 403 }),
      };
    }

    return { ok: true, userId, rights, portals, user };
  } catch {
    return {
      ok: false,
      response: new NextResponse("Invalid Session", { status: 401 }),
    };
  }
}
