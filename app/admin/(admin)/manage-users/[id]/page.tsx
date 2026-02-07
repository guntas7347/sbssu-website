import getData from "@/lib/getData";

import prisma from "@/lib/prisma";
import EditUser from "./EditUser";

const Page = async ({ params }) => {
  const { id } = await params;

  const departments = await prisma.department.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      departmentCode: true,
    },
  });

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      email: true,
      fullName: true,
      roles: true,
      loginEnabled: true,
      createdAt: true,
      updatedAt: true,
      department: {
        select: {
          id: true,
          name: true,
          departmentCode: true,
        },
      },
    },
  });

  return <EditUser departments={departments} editingUser={user} />;
};

export default Page;
