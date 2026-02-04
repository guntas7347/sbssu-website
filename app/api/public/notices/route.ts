import prisma from "@/lib/prisma";
import { send } from "@/lib/auth";

export async function GET() {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        file: true,
        showTill: true,
        category: true,
        date: true,
        refNumber: true,
      },
    });

    return send(200, "Notices fetched", notices);
  } catch (err) {
    console.error("Error fetching notices:", err);
    return send(500, "ISR");
  }
}
