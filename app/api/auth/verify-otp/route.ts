import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { send } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { otp, tempToken } = await req.json();
    if (!otp || !tempToken) return send(400, "Missing data");

    let decodedJwt: any;
    try {
      const rawJwt = Buffer.from(tempToken, "base64url").toString();
      decodedJwt = jwt.verify(rawJwt, process.env.JWT_SECRET!);
    } catch {
      return send(401, "Invalid or expired token");
    }

    const { userId, otpHash, purpose } = decodedJwt;
    if (purpose !== "otp" || !userId || !otpHash)
      return send(401, "Invalid token");

    const verifyHash = crypto
      .createHash("sha256")
      .update(String(otp))
      .digest("hex");

    if (verifyHash !== otpHash) return send(401, "Invalid OTP");

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true },
    });

    if (!user) return send(404, "User not found");

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1d",
    });

    const headers = new Headers({
      "Set-Cookie": `token=${token}; HttpOnly; Path=/; Max-Age=${
        24 * 3600
      }; SameSite=Lax; Secure`,
    });

    return send(200, "OK", null, headers);
  } catch (err) {
    console.error(err);
    return send(500, "Server error");
  }
}
