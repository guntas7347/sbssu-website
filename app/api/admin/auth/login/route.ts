import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { username } });
  if (!user) return new Response("Invalid User", { status: 401 });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return new Response("Invalid Password", { status: 401 });

  // generate OTP and hash it before embedding in token
  const otp = String(Math.floor(100000 + Math.random() * 900000)).padStart(
    6,
    "0"
  );
  const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
  const jti = crypto.randomBytes(16).toString("hex");

  // send OTP out-of-band (email/SMS) - replace with real sender
  console.log("OTP (send to user via email/SMS):", otp);

  const tempSecret = process.env.JWT_SECRET!;
  const tempToken = jwt.sign(
    { userId: user.id, otpHash, purpose: "otp", jti },
    tempSecret,
    { expiresIn: "2m" }
  );

  // optional: wrap to remove dots for easier transport (base64url)
  const wrapped = Buffer.from(tempToken).toString("base64url");

  return NextResponse.json({ tempToken: wrapped }, { status: 200 });
}
