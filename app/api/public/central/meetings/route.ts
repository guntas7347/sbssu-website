import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const meetings = await prisma.councilMeeting.findMany({
      include: {
        uploader: { select: { username: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    const result = meetings.map((m) => ({
      id: m.id,
      name: m.name,
      date: m.date.toISOString().split("T")[0], // YYYY-MM-DD
      category: m.category,
      agenda: m.agenda,
      isUpcoming: m.isUpcoming,
      documents: m.documents,
      uploadedBy: m.uploader?.username || null,
      createdAt: m.createdAt.toISOString(),
      updatedAt: m.updatedAt.toISOString(),
    }));

    console.log(result);

    return NextResponse.json(result);
  } catch (error) {
    console.error("GET /api/meetings error:", error);
    return NextResponse.json(
      { error: "Failed to fetch meetings" },
      { status: 500 }
    );
  }
}
