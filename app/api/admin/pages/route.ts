import prisma from "@/lib/prisma";
import { send } from "@/lib/utils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const type = searchParams.get("type");
  const deptCode = searchParams.get("dept");

  if (!type) {
    return send(400, "Missing type");
  }

  try {
    let page = null;

    if (deptCode) {
      const dept = await prisma.department.findUnique({
        where: { departmentCode: deptCode },
        select: { id: true },
      });

      if (!dept) {
        return send(404, "Invalid department");
      }

      page = await prisma.page.findUnique({
        where: {
          slug_departmentId: {
            slug: type,
            departmentId: dept.id,
          },
        },
      });
    } else {
      page = await prisma.page.findFirst({
        where: {
          slug: type,
          departmentId: null,
        },
      });
    }

    if (!page) {
      return send(404, "Not found");
    }

    return send(200, "OK", page.data);
  } catch (err: any) {
    console.error("PRISMA ERROR:", err);
    return send(500, "Load failed", { detail: err.message });
  }
}
