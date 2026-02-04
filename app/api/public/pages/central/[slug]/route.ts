import prisma from "@/lib/prisma";
import { send } from "@/lib/utils";

export async function GET(req: Request, { params }) {
  const { slug } = await params;

  if (!slug) return send(400, "Missing slug");

  try {
    const page = await prisma.page.findFirst({
      where: {
        slug,
        departmentId: null,
      },
    });

    if (!page) return send(404, "Not found");

    return send(200, "OK", page);
  } catch (err: any) {
    console.error("PRISMA ERROR:", err);
    return send(500, "Load failed", { detail: err.message });
  }
}
