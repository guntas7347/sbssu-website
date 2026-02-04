import verifyAuth from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// POST new meeting
export async function POST(req: Request) {
  const auth = await verifyAuth("central");
  if (!auth.ok) return auth.response!;

  try {
    const body = await req.json();

    const { name, date, category, agenda, documents, isUpcoming } = body;

    if (!name || !date || !category)
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );

    const meeting = await prisma.councilMeeting.create({
      data: {
        name,
        date: new Date(date),
        category,
        agenda,
        documents,
        isUpcoming: Boolean(isUpcoming),
        uploadedBy: auth.userId,
      },
    });

    return NextResponse.json(meeting, { status: 201 });
  } catch (error) {
    console.error("POST /api/meetings error:", error);
    return NextResponse.json(
      { error: "Failed to create meeting" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const auth = await verifyAuth("central");
  if (!auth.ok) return auth.response!;

  try {
    const { id } = await req.json();

    if (!id)
      return NextResponse.json(
        { error: "Meeting ID is required" },
        { status: 400 }
      );

    const existing = await prisma.councilMeeting.findUnique({
      where: { id },
    });

    if (!existing)
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 });

    await prisma.councilMeeting.delete({ where: { id } });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("DELETE /api/meetings error:", error);
    return NextResponse.json(
      { error: "Failed to delete meeting" },
      { status: 500 }
    );
  }
}
