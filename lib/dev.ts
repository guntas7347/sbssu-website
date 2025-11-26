import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function initAdmin() {
  // Create or get Department
  const dept = await prisma.department.upsert({
    where: { departmentCode: "ADMIN" },
    update: {},
    create: {
      name: "Administration",
      departmentCode: "ADMIN",
      description: "Handles system-level operations.",
      establishmentYear: 2000,
      location: "Main Block",
    },
  });

  // Create Admin User if missing
  const existing = await prisma.user.findUnique({
    where: { username: "admin" },
  });
  if (existing) return existing;

  const passwordHash = await bcrypt.hash("admin123", 10);
  const admin = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@example.com",
      passwordHash,
      departmentId: dept.id,
      rights: ["admin"],
      portals: ["admin"],
    },
  });

  console.log("ADMIN CREATED");

  return admin;
}
