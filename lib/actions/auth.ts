// src/lib/actions/auth.ts
"use server";

import { cookies } from "next/headers";
import { decrypt, SessionPayload } from "@/lib/jose";
import { db } from "@/db/drizzel";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Retrieves the currently authenticated user from the session cookie
 * by decrypting the JWT and querying the fresh database record.
 *
 * @returns The user object from the database, or null if unauthenticated/invalid.
 */
export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return null;
    }

    // 1. Decrypt and verify the JWT token
    const payload = (await decrypt(token)) as SessionPayload;

    if (!payload || !payload.userId) {
      return null;
    }

    // 2. Fetch the fresh user record from the database using the ID from the token
    const user = await db.query.usersTable.findFirst({
      where: eq(usersTable.id, payload.userId),
      with: {
        department: true, // Optionally include department relation if needed
      },
    });

    if (!user) return null;

    return user;
  } catch (error) {
    // Token is expired, tampered with, or database query failed
    console.error("getCurrentUser error:", error);
    return null;
  }
}
