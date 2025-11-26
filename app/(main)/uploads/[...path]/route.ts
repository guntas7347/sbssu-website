import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  req: Request,
  context: { params: Promise<{ path?: string[] }> }
) {
  const { path: pathSegments } = await context.params; // await required

  try {
    if (!pathSegments || pathSegments.length === 0) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }

    const uploadsDir = path.join(process.cwd(), "uploads");
    const filePath = path.join(uploadsDir, ...pathSegments);

    const file = await fs.promises.readFile(filePath);
    const ext = path.extname(filePath).toLowerCase();

    const mime =
      ext === ".pdf"
        ? "application/pdf"
        : ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".png"
        ? "image/png"
        : "application/octet-stream";

    return new NextResponse(file, {
      headers: { "Content-Type": mime },
    });
  } catch (err) {
    console.error("File read error:", err);
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }
}
