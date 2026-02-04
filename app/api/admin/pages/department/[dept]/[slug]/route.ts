import prisma from "@/lib/prisma";
import { send } from "@/lib/utils";
import { getAuth } from "@/lib/getAuth";

export async function POST(req: Request, { params }) {
  const { dept, slug } = await params;

  if (!dept || !slug) return send(400, "Missing params");

  const user = await getAuth();
  if (!user) return send(401, "Unauthorized");

  // Authorization: user must belong to this department
  if (user.department?.departmentCode !== dept.toUpperCase()) {
    return send(403, "Forbidden");
  }

  const { data } = await req.json();

  try {
    const department = await prisma.department.findUnique({
      where: { departmentCode: dept.toUpperCase() },
      select: { id: true },
    });

    if (!department) return send(404, "Invalid department");

    const page = await prisma.page.upsert({
      where: {
        slug_departmentId: {
          slug: slug.toLowerCase(),
          departmentId: department.id,
        },
      },
      update: {
        data,
      },
      create: {
        slug: slug.toLowerCase(),
        departmentId: department.id,
        data,
        createdBy: user.id,
        // type MUST already exist or be enforced elsewhere
      },
    });

    return send(200, "Saved", page);
  } catch (err: any) {
    console.error("PRISMA ERROR:", err);
    return send(500, "Save failed", { detail: err.message });
  }
}
