import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { randomUUID } from "crypto";
import { send } from "@/lib/utils";

const cloud = true; // toggle

export async function POST(request: Request) {
  try {
    const data = await request.formData();

    let folderName = "other";
    const folderEntry = data.get("folder");
    if (typeof folderEntry === "string") folderName = folderEntry;

    const fileEntry = data.get("file");
    if (!(fileEntry instanceof File)) {
      return send(400, "No file found");
    }

    const file = fileEntry;

    // 5 MB limit
    if (file.size > 1024 * 1024 * 5) {
      return send(413, "File too large (max 5 MB)");
    }

    /* ================= CLOUDINARY ================= */

    if (cloud) {
      const isImage = file.type.startsWith("image/");

      const resourceType = isImage ? "auto" : "raw";

      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", process.env.CLOUDINARY_UNSIGNED_PRESET!);
      form.append("folder", folderName);

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/${resourceType}/upload`,
        {
          method: "POST",
          body: form,
        },
      );

      if (!res.ok) return send(500, "Cloudinary upload failed");

      const json = await res.json();

      return send(200, "Uploaded", {
        path: json.secure_url,
        publicId: json.public_id,
      });
    }

    /* ================= LOCAL ================= */

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop();
    const filename = `${randomUUID()}.${ext}`;

    const uploadDir = join(process.cwd(), "uploads", folderName);
    await mkdir(uploadDir, { recursive: true });

    const filePath = join(uploadDir, filename);
    await writeFile(filePath, buffer);

    return send(200, "Uploaded", {
      path: `/uploads/${folderName}/${filename}`,
    });
  } catch (err) {
    console.error(err);
    return send(500, "Server error");
  }
}
