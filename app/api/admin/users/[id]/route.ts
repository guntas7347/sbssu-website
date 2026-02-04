import verifyAuth, { send } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  // const auth = await verifyAuth("manage-users");
  // if (!auth.ok) return auth.response!;

  const { id } = await context.params;
  if (!id) return send(400, "Missing user id");

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        email: true,
        rights: true,
        role: true,
        loginEnabled: true,
        department: {
          select: { name: true, departmentCode: true },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) return send(404, "User not found");
    return send(200, "OK", user);
  } catch (err) {
    console.error("GET /users/[id] error:", err);
    return send(500, "Server error");
  }
}
