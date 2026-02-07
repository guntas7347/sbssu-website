import prisma from "@/lib/prisma";

export async function getUsers() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      username: true,
      email: true,
      fullName: true,
      designation: true,
      phone: true,
      roles: true,
      loginEnabled: true,
      createdAt: true,
      department: {
        select: {
          id: true,
          name: true,
          departmentCode: true,
        },
      },
    },
  });
}
