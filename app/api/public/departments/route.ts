// app/api/public/departments/route.ts

import { send } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { name: "asc" },
      where: { hidden: false },
    });
    return send(200, "Departments fetched", departments);
  } catch (err) {
    return send(500, "ISR");
  }
}
