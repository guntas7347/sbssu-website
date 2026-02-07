import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { send } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return send(400, "Missing credentials");
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return send(401, "Invalid User");

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return send(401, "Invalid Password");

    // generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    const jti = crypto.randomBytes(16).toString("hex");

    const tempToken = jwt.sign(
      {
        userId: user.id,
        otpHash,
        purpose: "otp",
        jti,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "2m" },
    );

    const wrapped = Buffer.from(tempToken).toString("base64url");

    return send(200, "OTP generated", {
      tempToken: wrapped,
      otp,
    });
  } catch (err) {
    console.error(err);
    return send(500, "Internal server error");
  }
}
