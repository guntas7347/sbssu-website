"use server";

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "data");
const MAX_HTML_SIZE = 5 * 1024 * 1024; // 5 MB

function sanitizeFolder(folder?: string): string {
  if (!folder) return "";
  return folder
    .trim()
    .replace(/^\/+|\/+$/g, "")
    .split("/")
    .filter((segment) => segment && segment !== "." && segment !== "..")
    .map((segment) => segment.replace(/[^a-zA-Z0-9_-]/g, "_"))
    .filter(Boolean)
    .join("/");
}

export interface SaveHtmlFileResult {
  success: boolean;
  path: string | null;
  filename: string | null;
  error: string | null;
}

export async function saveHtmlContentFile(
  htmlContent: string,
  folder = "custom-pages",
): Promise<SaveHtmlFileResult> {
  try {
    const trimmed = htmlContent.trim();
    if (!trimmed) {
      throw new Error("HTML content cannot be empty.");
    }

    const buffer = Buffer.from(trimmed, "utf-8");
    if (buffer.byteLength > MAX_HTML_SIZE) {
      throw new Error("HTML content must not exceed 5 MB.");
    }

    const safeFolder = sanitizeFolder(folder);
    const targetDir = safeFolder
      ? path.join(/* turbopackIgnore: true */ UPLOAD_DIR, safeFolder)
      : UPLOAD_DIR;

    await mkdir(targetDir, { recursive: true });

    const filename = `${randomUUID()}.html`;
    const filePath = path.join(/* turbopackIgnore: true */ targetDir, filename);

    await writeFile(filePath, buffer, { flag: "wx" });

    const publicPath = safeFolder
      ? `/data/${safeFolder}/${filename}`
      : `/data/${filename}`;

    return {
      success: true,
      path: publicPath,
      filename,
      error: null,
    };
  } catch (error) {
    console.error("Failed to save HTML file:", error);
    return {
      success: false,
      path: null,
      filename: null,
      error:
        error instanceof Error ? error.message : "Failed to save HTML file.",
    };
  }
}
