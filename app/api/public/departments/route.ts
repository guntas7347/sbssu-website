// app/api/public/departments/route.ts

import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const departments = await prisma.department.findMany({
      orderBy: { name: "asc" },
    });
    return Response.json(departments);
  } catch (err) {
    console.error("Error fetching departments:", err);
    return new Response("Failed to fetch departments", { status: 500 });
  }
}
