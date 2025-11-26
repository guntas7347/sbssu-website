import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import verifyAuth from "@/lib/auth";

export async function GET() {
  const auth = await verifyAuth(
    ["central", "department"],
    ["manage-notices", "hod"]
  );
  if (!auth.ok) return auth.response!;

  try {
    const notices = await prisma.notice.findMany({
      where: { noticeLevel: "central" },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        fileUrl: true,
        refNumber: true,
        showTill: true,
        category: true,
        date: true,
      },
    });

    return NextResponse.json(notices, { status: 200 });
  } catch (err) {
    console.error("Error fetching central notices:", err);
    return new Response("Server error", { status: 500 });
  }
}

export async function POST(req: Request) {
  const auth = await verifyAuth(
    ["central", "department"],
    ["manage-notices", "hod"]
  );
  if (!auth.ok) return auth.response!;

  try {
    const data = await req.json();
    if (!data?.title || !data?.refNumber || !data?.date || !data?.showTill)
      return new Response("Missing required fields", { status: 400 });

    const newNotice = await prisma.notice.create({
      data: {
        title: data.title,
        description: data.description || null,
        refNumber: data.refNumber,
        date: new Date(data.date),
        showTill: new Date(data.showTill),
        category: data.category || "other",
        fileUrl: data.fileUrl || null,
        noticeLevel: data.noticeLevel || "central",
        uploadedBy: auth.userId,
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
    return new Response("Server error", { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const auth = await verifyAuth(
    ["central", "department"],
    ["manage-notices", "hod"]
  );
  if (!auth.ok) return auth.response!;

  try {
    const { id } = await req.json();
    if (!id) return new Response("Missing notice ID", { status: 400 });

    const notice = await prisma.notice.findUnique({ where: { id } });
    if (!notice) return new Response("Notice not found", { status: 404 });

    const rights = auth.rights || [];
    const portals = auth.portals || [];
    const level = notice.noticeLevel?.toLowerCase();

    const canDelete =
      portals.includes("admin") ||
      (level === "central" && portals.includes("central")) ||
      (level === "departmental" && portals.includes("departmental"));

    if (!canDelete) return new Response("Forbidden", { status: 403 });

    await prisma.notice.delete({ where: { id } });
    return new Response("Deleted", { status: 200 });
  } catch (err) {
    console.error("Failed to delete notice:", err);
    return new Response("Server error", { status: 500 });
  }
}
