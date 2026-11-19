// src/lib/actions/users.ts
"use server";

import { db } from "@/db/drizzel";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import type { SSOUserPayload } from "@/app/api/auth/callback/route";

export async function upsertUser(ssoUser: SSOUserPayload) {
  if (!ssoUser.email) {
    throw new Error("Email is required from SSO payload to upsert user.");
  }

  // Check if user already exists by email
  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, ssoUser.email),
  });

  if (existingUser) {
    // Update existing core user details
    const [updatedUser] = await db
      .update(usersTable)
      .set({
        username: ssoUser.username ?? existingUser.username,
        fullName: ssoUser.fullName ?? existingUser.fullName,
        phone: ssoUser.mobile ?? existingUser.phone,
      })
      .where(eq(usersTable.email, ssoUser.email))
      .returning();

    return updatedUser;
  } else {
    // Insert new user record with only core fields
    const [newUser] = await db
      .insert(usersTable)
      .values({
        email: ssoUser.email,
        username: ssoUser.username || null,
        fullName: ssoUser.fullName || null,
        phone: ssoUser.mobile || null,
      })
      .returning();

    return newUser;
  }
}
