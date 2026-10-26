"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePathAction(
  path: string,
  type?: "page" | "layout"
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  try {
    if (!path) {
      return { success: false, error: "Missing path to revalidate" };
    }
    revalidatePath(path, type);
    return { success: true, message: `Revalidated ${path}` };
  } catch (err: any) {
    console.error("revalidatePathAction error:", err);
    return { success: false, error: err.message || "Failed to revalidate" };
  }
}
