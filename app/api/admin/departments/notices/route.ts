import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import verifyAuth from "@/lib/auth";

export async function GET() {
  const auth = await verifyAuth();
  if (!auth.ok) return auth.response!;

  try {
    const notices = await prisma.notice.findMany({
      where: { noticeLevel: "department" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        fileUrl: true,
        showTill: true,
        category: true,
        date: true,
      },
    });

    return NextResponse.json(notices, { status: 200 });
  } catch (err) {
    console.error("Error fetching central notices:", err);
    return NextResponse.json(
      { error: "Failed to fetch central notices" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const auth = await verifyAuth("central");
  if (!auth.ok) return auth.response!;

  try {
    const data = await req.json();

    const newNotice = await prisma.notice.create({
      data: {
        title: data.title,
        description: data.description || null,
        refNumber: data.refNumber,
        date: new Date(data.date),
        showTill: new Date(data.showTill),
        category: data.category,
        fileUrl: data.fileUrl || null,
        noticeLevel: data.noticeLevel || "central",
        uploadedBy: auth.userId, // extracted from token
      },
      select: {
        id: true,
        title: true,
        refNumber: true,
        noticeLevel: true,
        showTill: true,
        uploadedBy: true,
      },
    });

    return NextResponse.json(newNotice, { status: 201 });
  } catch (err) {
    console.error("Failed to create notice:", err);
    return NextResponse.json(
      { error: "Failed to create notice" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const auth = await verifyAuth(); // returns decoded user object or 401
  if (!auth.ok) return auth.response!;

  try {
    const { id } = await req.json();
    if (!id) {
      return NextResponse.json({ error: "Missing notice ID" }, { status: 400 });
    }

    const notice = await prisma.notice.findUnique({
      where: { id },
    });
    if (!notice) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    const rights: string[] = auth?.rights || [];

    const level = notice.noticeLevel?.toLowerCase();
    const canDelete =
      rights.includes("admin") ||
      (level === "central" && rights.includes("central")) ||
      (level === "departmental" && rights.includes("departmental"));

    if (!canDelete) {
      return NextResponse.json(
        { error: "Not authorized to delete this notice" },
        { status: 403 }
      );
    }

    await prisma.notice.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to delete notice:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
