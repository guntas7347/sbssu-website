import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 });
  }

  try {
    const page = await prisma.page.findUnique({
      where: { slug },
    });

    if (!page) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch (err: any) {
    console.error("PRISMA ERROR:", err);
    return NextResponse.json(
      { error: "Load failed", detail: err.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const body = await req.json();

  const { data } = body;

  const slug = body.slug;

  if (!body || typeof data !== "object") {
    return NextResponse.json(
      { error: "Invalid payload or missing key" },
      { status: 400 }
    );
  }

  try {
    const updated = await prisma.page.upsert({
      where: { slug },
      update: { data },
      create: {
        slug,
        data,
      },
    });

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error("PRISMA ERROR:", err);
    return NextResponse.json(
      { error: "Save failed", detail: err.message },
      { status: 500 }
    );
  }
}
