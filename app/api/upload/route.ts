import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import verifyAuth from "@/lib/auth";
import { randomUUID } from "crypto";

export async function POST(request: Request) {
  try {
    // const auth = await verifyAuth("central");
    // if (!auth.ok) return auth.response!;

    // Process file
    const data = await request.formData();

    let folderName = "other";
    const folderEntry = data.get("folder");
    if (typeof folderEntry === "string") {
      folderName = folderEntry;
    }

    const fileEntry = data.get("file");
    if (!(fileEntry instanceof File)) {
      return NextResponse.json({ message: "No file found." }, { status: 400 });
    }

    const file = fileEntry; // type: File

    // 1 MB limit
    if (file.size > 1024 * 1024 * 5)
      return NextResponse.json(
        { message: "File too large (max 1 MB)" },
        { status: 413 }
      );

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop();
    const filename = `${randomUUID()}.${ext}`;

    const uploadDir = join(process.cwd(), "uploads", folderName);
    await mkdir(uploadDir, { recursive: true });

    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${folderName}/${filename}`;
    return NextResponse.json({ path: publicUrl }, { status: 200 });
  } catch (error) {
    console.error("File upload failed:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
