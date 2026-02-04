import verifyAuth from "@/lib/auth";
import prisma from "@/lib/prisma";
import { send } from "@/lib/utils";
import bcrypt from "bcryptjs";

// GET all users
export async function GET() {
  // const auth = await verifyAuth("manage-users");
  // if (!auth.ok) return auth.response!;

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        loginEnabled: true,
        role: true,
        rights: true,
        department: {
          select: {
            name: true,
            departmentCode: true,
          },
        },
      },
      orderBy: { id: "asc" },
    });

    const result = users.map((u) => ({
      id: u.id,
      username: u.username,
      email: u.email,
      loginEnabled: u.loginEnabled,
      role: u.role,
      rights: u.rights,
      department: u.department ? u.department.name : "—",
      departmentCode: u.department ? u.department.departmentCode : null,
    }));

    return send(200, "OK", result);
  } catch (err) {
    console.error("Error fetching users:", err);
    return send(500, "Failed to fetch users");
  }
}

// CREATE user
export async function POST(req: Request) {
  // const auth = await verifyAuth("manage-users");
  // if (!auth.ok) return auth.response!;

  try {
    const body = await req.json();
    const { username, email, department, rights, loginEnabled, role } = body;

    if (!username || !email) return send(400, "Missing required fields");

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) return send(400, "Username already exists");

    const passwordHash = await bcrypt.hash("123456", 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        rights: Array.isArray(rights) ? rights : [],
        role: role || "staff",
        loginEnabled: Boolean(loginEnabled),
        ...(department
          ? {
              department: {
                connect: { departmentCode: department },
              },
            }
          : {}),
      },
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
      },
    });

    return send(201, "User created", user);
  } catch (err) {
    console.error("POST /users error:", err);
    return send(500, "Server error");
  }
}

// UPDATE user
export async function PATCH(req: Request) {
  // const auth = await verifyAuth("manage-users");
  // if (!auth.ok) return auth.response!;

  try {
    const data = await req.json();
    const { id, username, email, department, rights, loginEnabled, role } =
      data;

    if (!id) return send(400, "Missing user id");

    const updated = await prisma.user.update({
      where: { id },
      data: {
        username: String(username),
        email: String(email),
        rights: Array.isArray(rights) ? rights : [],
        role: role || "staff",
        loginEnabled: Boolean(loginEnabled),
        ...(department
          ? {
              department: {
                connect: { departmentCode: department },
              },
            }
          : {
              department: { disconnect: true },
            }),
      },
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
      },
    });

    return send(200, "User updated", updated);
  } catch (err) {
    console.error("PATCH /users error:", err);
    return send(500, "Server error");
  }
}
