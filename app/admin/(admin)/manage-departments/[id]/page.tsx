import prisma from "@/lib/prisma";
import AddDepartment from "./AddDepartment";
import { notFound } from "next/navigation";

const Page = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  if (id === "add") {
    return <AddDepartment />;
  }

  const department = await prisma.department.findUnique({
    where: { id },
  });

  if (!department) {
    notFound();
  }

  return <AddDepartment editingDept={department} />;
};

export default Page;
