import prisma from "@/lib/prisma";
import CreateUser from "./CreateUser";

export default async function Page() {
  const departments = await prisma.department.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      name: true,
      departmentCode: true,
    },
  });

  return <CreateUser departments={departments} />;
}
