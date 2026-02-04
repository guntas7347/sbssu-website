import prisma from "@/lib/prisma";
import { send } from "@/lib/auth";

export async function GET(req, { params }) {
  try {
    const { id } = await params;

    const notice = await prisma.notice.findUnique({
      where: { id },
    });

    if (!notice) return send(404, "Not found");
    return send(200, "Notice fetched", notice);
  } catch (err) {
    return send(500, "ISR");
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = await params;

    await prisma.notice.delete({
      where: { id },
    });

    return send(200, "Notice deleted");
  } catch (err) {
    return send(500, "ISR");
  }
}
