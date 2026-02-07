import prisma from "@/lib/prisma";
import { send } from "@/lib/auth";
import verifyAuth from "@/lib/auth";
import { getAuth } from "@/lib/getAuth";

export async function POST(req) {
  try {
    const body = await req.json();

    const user = await getAuth();
    if (!user) throw Error();

    const scope =
      user?.department.departmentCode === "ADMIN" ? "CENTRAL" : "DEPARTMENT";

    const created = await prisma.notice.create({
      data: {
        title: body.title,
        description: body.description ?? null,
        refNumber: body.refNumber,
        date: new Date(body.date),
        showTill: new Date(body.showTill),
        category: body.category ?? "other",
        file: body.fileUrl ?? null,
        createdBy: user.id,
        departmentId: user.department.id,
        scope,
      },
    });

    return send(201, "Notice created", created);
  } catch (err) {
    console.log(err);
    return send(500, "ISR");
  }
}
