import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import verifyAuth from "@/lib/auth";

export async function POST(req: Request) {
  const auth = await verifyAuth("manage-departments");
  if (!auth.ok) return auth.response!;

  try {
    const data = await req.json();
    const department = await prisma.department.create({ data });
    return NextResponse.json(department);
  } catch (err) {
    console.error("Error creating department:", err);
    return new NextResponse("Failed to create department", { status: 500 });
  }
}

export async function PUT(req: Request) {
  const auth = await verifyAuth("manage-departments");
  if (!auth.ok) return auth.response!;

  const {
    id,
    name,
    departmentCode,
    establishmentYear,
    location,
    description,
    hidden,
  } = await req.json();

  if (!id || !name || !departmentCode || !establishmentYear)
    return new NextResponse("Missing required fields", { status: 400 });

  const existing = await prisma.department.findUnique({ where: { id } });
  if (!existing)
    return new NextResponse("Department not found", { status: 404 });

  const updated = await prisma.department.update({
    where: { id },
    data: {
      name,
      departmentCode,
      establishmentYear,
      location,
      description,
      hidden,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  const auth = await verifyAuth("manage-departments");
  if (!auth.ok) return auth.response!;

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return new NextResponse("Missing department id", { status: 400 });

  const users = await prisma.user.count({ where: { departmentId: id } });
  if (users > 0)
    return new NextResponse("Cannot delete department with assigned users", {
      status: 409,
    });

  await prisma.department.delete({ where: { id } });
  return new NextResponse(null, { status: 204 });
}
