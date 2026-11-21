import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "data");

const MIME_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".pdf": "application/pdf",
};

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path: segments } = await context.params;

  if (
    !segments?.length ||
    segments.some(
      (segment) =>
        !segment ||
        segment === "." ||
        segment === ".." ||
        segment.includes("\\") ||
        segment.includes("/"),
    )
  ) {
    return new NextResponse("Invalid path", { status: 400 });
  }

  // Development: Serve files locally
  if (process.env.NODE_ENV === "development") {
    try {
      const root = path.resolve(/* turbopackIgnore: true */ UPLOAD_DIR);
      const filePath = path.resolve(root, ...segments);
      const relative = path.relative(root, filePath);

      if (relative.startsWith("..") || path.isAbsolute(relative)) {
        return new NextResponse("Invalid path", { status: 400 });
      }

      const buffer = await readFile(filePath);
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_MAP[ext] || "application/octet-stream";

      const safeFilename = path.basename(filePath).replace(/["\r\n]/g, "_");

      return new NextResponse(new Uint8Array(buffer), {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Length": buffer.length.toString(),
          "Cache-Control": "private, max-age=3600",
          "X-Content-Type-Options": "nosniff",
          "Content-Disposition": `inline; filename="${safeFilename}"`,
        },
      });
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return new NextResponse("File not found", { status: 404 });
      }

      console.error("Data serving error:", error);

      return new NextResponse("Internal server error", {
        status: 500,
      });
    }
  }

  // Production: Redirect to legacy website
  const filePath = segments
    .filter((segment) => segment !== "legacy")
    .map(encodeURIComponent)
    .join("/");

  return NextResponse.redirect(
    `https://sbssu.ac.in/BusinessImage/${filePath}`,
    302,
  );
}
