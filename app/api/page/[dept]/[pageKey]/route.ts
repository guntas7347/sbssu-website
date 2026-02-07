import prisma from "@/lib/prisma";
import { send } from "@/lib/utils";

export async function GET(
  req: Request,
  { params }: { params: { dept: string; pageKey: string } },
) {
  const { dept, pageKey } = params;

  if (!dept || !pageKey) return send(400, "Missing params");

  try {
    const department = await prisma.department.findUnique({
      where: { departmentCode: dept.toUpperCase() },
      select: { id: true, name: true, departmentCode: true },
    });

    if (!department) return send(404, "Invalid department");

    const page = await prisma.page.findUnique({
      where: {
        pageKey_departmentId: {
          pageKey,
          departmentId: department.id,
        },
      },
    });

    if (!page) return send(404, "Not found");

    return send(200, "OK", {
      ...page,
      department,
    });
  } catch (err: any) {
    console.error("PRISMA ERROR:", err);
    return send(500, "Load failed", { detail: err.message });
  }
}
