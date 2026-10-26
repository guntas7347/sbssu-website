import prisma from "@/lib/prisma";
import { notFound, redirect as navigate } from "next/navigation";

type Options = {
  cookie?: boolean;
  redirect?: boolean;
  redirectTo?: string;
  notfound?: boolean;
};

type PageResult<T = any> = {
  page: T;
  updatedAt: string;
};

const getPage = async <T = any>(
  dept: string,
  pageKey: string,
  {
    redirect = false,
    redirectTo = "/",
    notfound = true,
  }: Options = {},
): Promise<PageResult<T>> => {
  try {
    const departmentCode = (dept || "ADMIN").toUpperCase();
    const department = await prisma.department.findUnique({
      where: { departmentCode },
      select: { id: true },
    });

    if (!department) {
      if (redirect) navigate(redirectTo);
      if (notfound) notFound();
      throw new Error("Department not found");
    }

    const page = await prisma.page.findUnique({
      where: {
        pageKey_departmentId: {
          pageKey,
          departmentId: department.id,
        },
      },
    });

    if (!page) {
      if (redirect) navigate(redirectTo);
      if (notfound) notFound();
      throw new Error("Page content not found");
    }

    return {
      page: page.data as T,
      updatedAt: page.updatedAt.toISOString(),
    };
  } catch (err) {
    if (redirect) navigate(redirectTo);
    if (notfound) notFound();
    throw err;
  }
};

export default getPage;
