import prisma from "@/lib/prisma";
import { send } from "@/lib/utils";
import { getAuth } from "@/lib/getAuth";

export async function POST(
  req: Request,
  { params }: { params: { dept: string; pageKey: string } },
) {
  try {
    const user = await getAuth();
    if (!user) return send(401, "Unauthorized");

    const { dept, pageKey } = await params;

    if (!dept || !pageKey) return send(400, "Missing params");

    const body = await req.json();
    const { data } = body;

    if (!data) return send(400, "Missing data");

    const departmentCode = dept.toUpperCase();

    // Resolve department
    const department = await prisma.department.findUnique({
      where: { departmentCode },
      select: { id: true },
    });

    if (!department) return send(404, "Invalid department");

    // Authorization:
    // SUPER_ADMIN can edit anything
    // Others only their own department
    if (
      !user.roles.includes("SUPER_ADMIN") &&
      user.department?.departmentCode !== departmentCode
    ) {
      return send(403, "Forbidden");
    }

    const page = await prisma.page.upsert({
      where: {
        pageKey_departmentId: {
          pageKey,
          departmentId: department.id,
        },
      },
      update: {
        data,
      },
      create: {
        pageKey,
        scope: departmentCode === "ADMIN" ? "CENTRAL" : "DEPARTMENT",
        departmentId: department.id,
        data,
        createdBy: user.id,
      },
    });

    return send(200, "Saved", page);
  } catch (err: any) {
    console.error("POST /admin/page error:", err);
    return send(500, "Save failed", { detail: err.message });
  }
}
