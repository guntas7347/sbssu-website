import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { send } from "@/lib/utils";

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        username: true,
        email: true,
        fullName: true,
        roles: true,
        loginEnabled: true,
        createdAt: true,
        department: {
          select: {
            name: true,
            departmentCode: true,
          },
        },
      },
    });

    return send(200, "OK", users);
  } catch (err) {
    console.error("GET /users error:", err);
    return send(500, "Failed to fetch users");
  }
}

// CREATE user
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { username, email, department, roles, loginEnabled } = body;

    if (!username || !email || !Array.isArray(roles))
      return send(400, "Missing required fields");

    const deptCode = department?.toUpperCase();

    const dept = await prisma.department.findUnique({
      where: { departmentCode: deptCode },
      select: { id: true },
    });

    if (!dept) return send(400, "Invalid department");

    const existing = await prisma.user.findUnique({
      where: { username },
    });

    if (existing) return send(409, "Username already exists");

    const passwordHash = await bcrypt.hash("123456", 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,

        // required by schema
        fullName: username,

        departmentId: dept.id,
        roles,
        loginEnabled: Boolean(loginEnabled),
      },
      select: {
        id: true,
        username: true,
        email: true,
        roles: true,
        loginEnabled: true,
        createdAt: true,
        department: {
          select: {
            name: true,
            departmentCode: true,
          },
        },
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
  try {
    const data = await req.json();

    const { id, username, email, department, roles, loginEnabled } = data;

    if (!id) return send(400, "Missing user id");

    const deptCode = department?.toUpperCase();

    const dept = await prisma.department.findUnique({
      where: { departmentCode: deptCode },
      select: { id: true },
    });

    if (!dept) return send(400, "Invalid department");

    const updated = await prisma.user.update({
      where: { id },
      data: {
        username,
        email,
        departmentId: dept.id,
        roles,
        loginEnabled: Boolean(loginEnabled),
      },
      select: {
        id: true,
        username: true,
        email: true,
        roles: true,
        loginEnabled: true,
        department: {
          select: {
            name: true,
            departmentCode: true,
          },
        },
      },
    });

    return send(200, "User updated", updated);
  } catch (err) {
    console.error("PATCH /users error:", err);
    return send(500, "Server error");
  }
}
