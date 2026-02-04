import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import verifyAuth from "@/lib/auth";

export async function GET() {
  const auth = await verifyAuth("admin-stats");
  if (!auth.ok) return auth.response!;

  try {
    const now = new Date();

    const [departments, users, activeNotices] = await Promise.all([
      prisma.department.count(),
      prisma.user.count(),
      prisma.notice.count({
        where: { showTill: { gte: now } },
      }),
    ]);

    return NextResponse.json([departments, users, activeNotices]);
  } catch (err) {
    console.error("Error fetching stats:", err);
    return new Response("Server error", { status: 500 });
  }
}
