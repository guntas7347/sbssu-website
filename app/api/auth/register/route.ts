import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { username, password, department, rights } = await req.json();

  if (!username || !password)
    return new Response("Missing credentials", { status: 400 });

  const existing = await prisma.user.findUnique({ where: { username } });
  if (existing) return new Response("User exists", { status: 409 });

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { username, passwordHash, department, rights },
  });

  return Response.json({ id: user.id, username: user.username });
}
