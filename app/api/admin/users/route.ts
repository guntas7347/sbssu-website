import { NextResponse } from "next/server";
import verifyAuth from "@/lib/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {
  const auth = await verifyAuth("manage-users");
  if (!auth.ok) return auth.response!;

  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        loginEnabled: true,
        rights: true,
        portals: true,
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
      rights: u.rights,
      portals: u.portals,
      department: u.department ? u.department.name : "—",
      departmentCode: u.department ? u.department.departmentCode : null,
    }));

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Error fetching users:", err);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// Create new user
export async function POST(req: Request) {
  const auth = await verifyAuth("manage-users");
  if (!auth.ok) return auth.response!;

  try {
    const body = await req.json();
    const { username, email, department, rights, portals, loginEnabled } = body;

    if (!username || !email)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing)
      return NextResponse.json(
        { error: "Username already exists" },
        { status: 400 }
      );

    const passwordHash = await bcrypt.hash("123456", 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        passwordHash,
        rights: Array.isArray(rights) ? rights : [],
        portals: Array.isArray(portals) ? portals : [],
        loginEnabled: Boolean(loginEnabled),
        ...(department
          ? {
              department: {
                connect: { departmentCode: department }, // departmentCode from frontend
              },
            }
          : {}),
      },
      select: {
        id: true,
        username: true,
        email: true,
        rights: true,
        portals: true,
        loginEnabled: true,
        department: {
          select: { name: true, departmentCode: true },
        },
        createdAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (err) {
    console.error("POST /users error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}

// Update existing user
export async function PATCH(req: Request) {
  const auth = await verifyAuth("manage-users");
  if (!auth.ok) return auth.response!;

  try {
    const data = await req.json();
    const { id, username, email, department, rights, portals, loginEnabled } =
      data;

    if (!id)
      return NextResponse.json({ error: "Missing user id" }, { status: 400 });

    const updated = await prisma.user.update({
      where: { id },
      data: {
        username: String(username),
        email: String(email),
        rights: Array.isArray(rights) ? rights : [],
        portals: Array.isArray(portals) ? portals : [],
        loginEnabled: Boolean(loginEnabled),
        ...(department
          ? {
              department: {
                connect: { departmentCode: department },
              },
            }
          : {
              department: { disconnect: true }, // handle null/removed dept
            }),
      },
      select: {
        id: true,
        username: true,
        email: true,
        rights: true,
        portals: true,
        loginEnabled: true,
        department: {
          select: { name: true, departmentCode: true },
        },
      },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (err) {
    console.error("PATCH /users error:", err);
    return new NextResponse("Server error", { status: 500 });
  }
}
