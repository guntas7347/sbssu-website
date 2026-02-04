import prisma from "@/lib/prisma";
import { send } from "@/lib/utils";
import { getAuth } from "@/lib/getAuth";

export async function POST(req: Request, { params }) {
  const { slug } = await params;

  if (!slug) return send(400, "Missing slug");

  const user = await getAuth();
  if (!user) return send(401, "Unauthorized");

  const { data } = await req.json();

  const normalizedSlug = slug.toLowerCase();

  try {
    const existing = await prisma.page.findFirst({
      where: {
        slug: normalizedSlug,
        departmentId: null,
      },
    });

    let page;

    if (existing) {
      page = await prisma.page.update({
        where: { id: existing.id },
        data: { data },
      });
    } else {
      page = await prisma.page.create({
        data: {
          slug: normalizedSlug,
          departmentId: null,
          data,
          createdBy: user.id,
        },
      });
    }

    return send(200, "Saved", page);
  } catch (err: any) {
    console.error("PRISMA ERROR:", err);
    return send(500, "Save failed", { detail: err.message });
  }
}
