import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { otp, tempToken } = await req.json();
    if (!otp || !tempToken)
      return new Response("Missing data", { status: 400 });

    // Decode base64url-wrapped JWT
    let decodedJwt: any;
    try {
      const rawJwt = Buffer.from(tempToken, "base64url").toString();
      decodedJwt = jwt.verify(rawJwt, process.env.JWT_SECRET!);
    } catch {
      return new Response("Invalid or expired token", { status: 401 });
    }

    const { userId, otpHash, purpose } = decodedJwt;
    if (purpose !== "otp" || !userId || !otpHash)
      return new Response("Invalid token", { status: 401 });

    const verifyHash = crypto
      .createHash("sha256")
      .update(String(otp))
      .digest("hex");

    if (verifyHash !== otpHash)
      return new Response("Invalid OTP", { status: 401 });

    // Fetch latest user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        username: true,
        email: true,
        portals: true,
        rights: true,
        loginEnabled: true,
        department: {
          select: {
            id: true,
            name: true,
            departmentCode: true,
          },
        },
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) return new Response("User not found", { status: 404 });

    // Issue login token with id + portals
    const token = jwt.sign(
      {
        id: user.id,
        portals: user.portals,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    const headers = new Headers({
      "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=${
        7 * 24 * 3600
      }; SameSite=Lax; Secure`,
    });

    return NextResponse.json(user, { status: 200, headers });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
