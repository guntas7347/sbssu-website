import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

type Result = {
  page: any;
  updatedAt: Date;
};

type Options = {
  notfound?: boolean;
};

// overloads
export async function getPage(
  dept: string,
  pageKey: string,
  opts?: { notfound?: true },
): Promise<Result>;

export async function getPage(
  dept: string,
  pageKey: string,
  opts: { notfound: false },
): Promise<Result | null>;

// implementation
export async function getPage(
  dept: string,
  pageKey: string,
  { notfound = true }: Options = {},
) {
  if (!dept || !pageKey) {
    if (notfound) notFound();
    return null;
  }

  const departmentCode = dept.toUpperCase();

  const department = await prisma.department.findUnique({
    where: { departmentCode },
    select: { id: true },
  });

  if (!department) {
    if (notfound) notFound();
    return null;
  }

  const page = await prisma.page.findUnique({
    where: {
      pageKey_departmentId: {
        pageKey,
        departmentId: department.id,
      },
    },
    select: {
      data: true,
      updatedAt: true,
    },
  });

  if (!page) {
    if (notfound) notFound();
    return null;
  }

  return {
    page: page.data,
    updatedAt: page.updatedAt,
  };
}
