"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";

export interface UploadActionResult {
  success: boolean;
  url?: string;
  path?: string;
  publicId?: string;
  error?: string;
}

export async function uploadFileAction(
  formData: FormData,
  folder?: string,
): Promise<UploadActionResult> {
  try {
    const fileEntry = formData.get("file");

    if (!(fileEntry instanceof File) || fileEntry.size === 0) {
      return { success: false, error: "No file provided for upload." };
    }

    // 5 MB limit
    if (fileEntry.size > 5 * 1024 * 1024) {
      return { success: false, error: "File exceeds 5 MB limit." };
    }

    // Validate the optional folder to prevent path traversal
    const folderName = folder?.trim();

    if (folderName && !/^[a-zA-Z0-9_-]+$/.test(folderName)) {
      return { success: false, error: "Invalid folder name." };
    }

    const buffer = Buffer.from(await fileEntry.arrayBuffer());

    // Restrict extension characters
    const originalExt = fileEntry.name.split(".").pop() || "bin";
    const ext = /^[a-zA-Z0-9]+$/.test(originalExt)
      ? originalExt.toLowerCase()
      : "bin";

    const filename = `${randomUUID()}.${ext}`;

    const uploadDir = folderName
      ? join(process.cwd(), "data", "uploads", folderName)
      : join(process.cwd(), "data", "uploads");

    await mkdir(uploadDir, { recursive: true });

    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const relativeUrl = folderName
      ? `/data/uploads/${folderName}/${filename}`
      : `/data/uploads/${filename}`;

    return {
      success: true,
      url: relativeUrl,
      path: relativeUrl,
      publicId: filename,
    };
  } catch (err: unknown) {
    console.error("uploadFileAction error:", err);

    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to upload file.",
    };
  }
}
