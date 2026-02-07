import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function initAdmin() {
  // Ensure ADMIN department exists
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

  // Check if admin user already exists
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

      fullName: "System Administrator",
      designation: "Super Admin",

      departmentId: dept.id,

      roles: ["SUPER_ADMIN", "CENTRAL_EDITOR"],

      loginEnabled: true,
    },
  });

  console.log("ADMIN CREATED");

  return admin;
}
