import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface AuthCheckResult {
  ok: boolean;
  userId?: string;
  rights?: string[];
  user?: any;
  response?: NextResponse;
}

export default async function verifyAuth(
  requiredRights?: string | string[]
): Promise<AuthCheckResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token)
    return {
      ok: false,
      response: send(401, "Unauthorised"),
    };

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    const userId = decoded.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        rights: true,
        loginEnabled: true,
      },
    });

    if (!user)
      return {
        ok: false,
        response: send(404, "User not found"),
      };

    if (!user.loginEnabled)
      return {
        ok: false,
        response: send(403, "Login disabled"),
      };

    const rights = user.rights || [];

    const reqRights = Array.isArray(requiredRights)
      ? requiredRights
      : requiredRights
      ? [requiredRights]
      : [];

    const hasRights =
      reqRights.length === 0 || reqRights.every((r) => rights.includes(r));

    if (!hasRights)
      return {
        ok: false,
        response: send(403, "Forbidden"),
      };

    return { ok: true, userId, rights, user };
  } catch {
    return {
      ok: false,
      response: send(401, "Invalid Session"),
    };
  }
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
export function createJwt(payload: object, expires = "1d"): string {
  return jwt.sign(payload, SECRET, { expiresIn: expires });
}

// decode and verify jwt
export function decodeJwt(token: string): any {
  return jwt.verify(token, SECRET);
}

export function send(
  code: number,
  message: string,
  payload: any = null,
  headers?: Headers
) {
  return NextResponse.json(
    { code, message, payload },
    { status: code, headers }
  );
}
