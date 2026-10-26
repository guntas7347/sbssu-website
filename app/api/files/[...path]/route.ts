import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextRequest, NextResponse } from "next/server";

const DATA_DIR = path.resolve(process.cwd(), "data");

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  try {
    const { path: segments } = await params;
    const filePath = path.resolve(DATA_DIR, ...segments);

    // Prevent path traversal outside the data directory.
    if (filePath !== DATA_DIR && !filePath.startsWith(DATA_DIR + path.sep)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    const file = await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();

    const contentTypes: Record<string, string> = {
      ".pdf": "application/pdf",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".webp": "image/webp",
      ".txt": "text/plain; charset=utf-8",
    };

    return new NextResponse(file, {
      headers: {
        "Content-Type": contentTypes[extension] ?? "application/octet-stream",
        "Content-Disposition": "inline",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch {
    return new NextResponse("File not found", { status: 404 });
  }
}
