"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { cookies } from "next/headers";
import { Role } from "@/prisma/generated/prisma/client";
import { ActionResponse } from "./types";

export async function loginAction(credentials: {
  username: string;
  password: string;
}): Promise<ActionResponse<{ tempToken: string; otp?: string }>> {
  try {
    const { username, password } = credentials;

    if (!username || !password) {
      return { success: false, error: "Username and password are required." };
    }

    const user = await prisma.user.findUnique({
      where: { username: username.trim() },
    });

    if (!user) {
      return { success: false, error: "Invalid username or password." };
    }

    if (!user.loginEnabled) {
      return { success: false, error: "Account login is disabled. Contact your administrator." };
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return { success: false, error: "Invalid username or password." };
    }

    // Generate 6-digit OTP
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
      { expiresIn: "5m" },
    );

    const wrappedToken = Buffer.from(tempToken).toString("base64url");

    // Output OTP for development verification
    console.log(`[AUTH] Generated OTP for user "${user.username}": ${otp}`);

    return {
      success: true,
      data: {
        tempToken: wrappedToken,
        otp,
      },
    };
  } catch (err: any) {
    console.error("loginAction error:", err);
    return { success: false, error: err.message || "Login failed. Please try again." };
  }
}

export async function verifyOtpAction(data: {
  otp: string;
  tempToken: string;
}): Promise<ActionResponse> {
  try {
    const { otp, tempToken } = data;
    if (!otp || !tempToken) {
      return { success: false, error: "Missing OTP or verification session." };
    }

    let decodedJwt: any;
    try {
      const rawJwt = Buffer.from(tempToken, "base64url").toString();
      decodedJwt = jwt.verify(rawJwt, process.env.JWT_SECRET!);
    } catch {
      return { success: false, error: "Invalid or expired OTP session. Please log in again." };
    }

    const { userId, otpHash, purpose } = decodedJwt;
    if (purpose !== "otp" || !userId || !otpHash) {
      return { success: false, error: "Invalid verification token." };
    }

    const verifyHash = crypto
      .createHash("sha256")
      .update(String(otp).trim())
      .digest("hex");

    if (verifyHash !== otpHash) {
      return { success: false, error: "Incorrect OTP. Please enter the valid code." };
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, loginEnabled: true },
    });

    if (!user || !user.loginEnabled) {
      return { success: false, error: "User not found or login disabled." };
    }

    const sessionToken = jwt.sign(
      { id: user.id, userId: user.id },
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );

    const cookieStore = await cookies();
    cookieStore.set("token", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 24 * 3600,
    });

    return { success: true };
  } catch (err: any) {
    console.error("verifyOtpAction error:", err);
    return { success: false, error: err.message || "Failed to verify OTP." };
  }
}

export async function logoutAction(): Promise<ActionResponse> {
  try {
    const cookieStore = await cookies();
    cookieStore.set("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });
    return { success: true };
  } catch (err: any) {
    console.error("logoutAction error:", err);
    return { success: false, error: err.message || "Failed to log out." };
  }
}

export async function registerAction(data: {
  username: string;
  password: string;
  email: string;
  fullName?: string;
  departmentCode?: string;
  roles?: Role[];
}): Promise<ActionResponse> {
  try {
    const { username, password, email, fullName, departmentCode, roles } = data;

    if (!username || !password || !email) {
      return { success: false, error: "Username, password and email are required." };
    }

    const existing = await prisma.user.findUnique({
      where: { username: username.trim() },
    });
    if (existing) {
      return { success: false, error: "Username already exists." };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    let departmentId: string | null = null;
    if (departmentCode) {
      const dept = await prisma.department.findUnique({
        where: { departmentCode: departmentCode.toUpperCase() },
      });
      departmentId = dept?.id || null;
    }

    const user = await prisma.user.create({
      data: {
        username: username.trim(),
        fullName: fullName?.trim() || username.trim(),
        email: email.trim(),
        passwordHash,
        departmentId,
        roles: roles || ["DEPT_EDITOR"],
      },
    });

    return { success: true, data: { id: user.id, username: user.username } };
  } catch (err: any) {
    console.error("registerAction error:", err);
    return { success: false, error: err.message || "Registration failed." };
  }
}
