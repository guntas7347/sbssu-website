import { cookies } from "next/headers";
import prisma from "@/lib/prisma";
import { decodeJwt } from "./auth";

interface TokenPayload {
  userId?: string;
  id?: string;
  [key: string]: any;
}

export async function getAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return null;

  let payload: TokenPayload;

  try {
    payload = decodeJwt(token);
  } catch {
    return null;
  }

  const userId = payload.userId ?? payload.id;
  if (!userId) return null;

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      rights: true,
      role: true,
      department: { select: { name: true, departmentCode: true } },
    },
  });

  if (!user) return null;

  return user;
}
