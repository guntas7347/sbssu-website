import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import verifyAuth from "@/lib/auth";

export async function GET() {
  const auth = await verifyAuth();
  if (!auth.ok) return auth.response!;

  try {
    const notices = await prisma.notice.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        fileUrl: true,
        showTill: true,
        category: true,
        date: true,
        refNumber: true,
      },
    });

    return NextResponse.json(notices, { status: 200 });
  } catch (err) {
    console.error("Error fetching notices:", err);
    return NextResponse.json(
      { error: "Failed to fetch notices" },
      { status: 500 }
    );
  }
}
