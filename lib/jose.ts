// src/lib/jose.ts

"use server";

import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.JWT_SECRET;

if (!secretKey) {
  throw new Error("JWT_SECRET environment variable is not defined.");
}

// Encode the secret into a Uint8Array required by jose
const encodedKey = new TextEncoder().encode(secretKey);

/**
 * Payload interface for your token data
 */
export interface SessionPayload {
  userId: string;
}

/**
 * Create/Sign a JWT token
 * @param payload The data to store inside the token
 * @param expiresIn Expiration time string (e.g., '1d', '2h', '7days')
 */
export async function createJWT(
  payload: SessionPayload,
  expiresIn: string = "1d",
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(encodedKey);
}

/**
 * Verify and decode an incoming JWT token
 * @param token The JWT string from cookies or headers
 * @returns The decoded payload if valid, or throws an error if invalid/expired
 */
export async function decrypt(token: string): Promise<SessionPayload> {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}
