import { send } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const department = await prisma.department.findUnique({
      where: { id },
    });
    return send(200, "Department fetched", department);
  } catch (err) {
    console.log(err);
    return send(500, "ISR");
  }
}
