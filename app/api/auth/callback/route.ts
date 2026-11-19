// app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";

import { createJWT, SessionPayload } from "@/lib/jose";
import { upsertUser } from "@/lib/actions/users";

export interface SSOUserPayload {
  username?: string;
  fullName?: string;
  role?: string;
  email: string;
  mobile?: string;
}

export interface SSOTokenResponse {
  success: boolean;
  message?: string;
  user?: SSOUserPayload;
}

function getPublicOrigin(req: NextRequest): string {
  const host = req.headers.get("x-forwarded-host");
  const proto = req.headers.get("x-forwarded-proto");

  if (!host || !proto) {
    throw new Error("Missing forwarded host or protocol");
  }

  if (host.includes(",") || proto.includes(",") || /[\s/@\\?#]/.test(host)) {
    throw new Error("Invalid forwarded host or protocol");
  }

  if (proto !== "https" && proto !== "http") {
    throw new Error("Invalid forwarded protocol");
  }

  const url = new URL(`${proto}://${host}`);

  if (
    url.hostname.length === 0 ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error("Invalid forwarded origin");
  }

  return url.origin;
}

function getNormalizedSsoUrl(): string {
  const rawUrl = process.env.SSO_URL || "https://sso.sbssu.ac.in";
  let url = (rawUrl || "").trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `http://${url}`;
  }
  return url.replace(/\/+$/, "");
}

export async function exchangeCodeForUser(
  code: string,
): Promise<SSOUserPayload> {
  const baseUrl = getNormalizedSsoUrl();

  const primaryEndpoint = `${baseUrl}/api/auth/token/s1`;
  const fallbackEndpoint = `${baseUrl}/api/token/s1`;

  let res = await fetch(primaryEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
    cache: "no-store",
  });

  if (res.status === 404) {
    res = await fetch(fallbackEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
      cache: "no-store",
    });
  }

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(
      errorBody.message ||
        `SSO token exchange failed with status ${res.status}`,
    );
  }

  const data: SSOTokenResponse = await res.json();
  if (!data.success || !data.user) {
    throw new Error(data.message || "Invalid or missing user payload from SSO");
  }

  return data.user;
}

async function processCallback(req: NextRequest, code: string | null) {
  const origin = getPublicOrigin(req);

  if (!code) {
    const loginUrl = new URL("/login", origin);
    loginUrl.searchParams.set("error", "Missing authorization code from SSO");
    return NextResponse.redirect(loginUrl);
  }

  try {
    const ssoUser = await exchangeCodeForUser(code);

    if (!ssoUser || !ssoUser.email) {
      throw new Error("Empty or invalid user payload returned from SSO");
    }

    if (ssoUser.role?.toLocaleLowerCase() === "student")
      throw new Error("Student Login Not Allowed");

    // Upsert user into database with clean schema fields
    const user = await upsertUser(ssoUser);

    // Build JWT session payload containing ONLY userId
    const payload: SessionPayload = {
      userId: user.id,
    };

    const token = await createJWT(payload, "1d");

    const destination = "/admin";

    const finalRedirectUrl = new URL(destination, origin).toString();
    const response = NextResponse.redirect(finalRedirectUrl);

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error: unknown) {
    console.error("SSO Callback error:", error);
    const message =
      error instanceof Error
        ? error.message
        : "Failed to complete SSO authentication";
    const loginUrl = new URL("/admin/login", origin);
    loginUrl.searchParams.set("error", message);
    return NextResponse.redirect(loginUrl);
  }
}

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  return processCallback(req, code);
}

export async function POST(req: NextRequest) {
  let code = req.nextUrl.searchParams.get("code");

  if (!code) {
    try {
      const contentType = req.headers.get("content-type") || "";
      if (contentType.includes("application/json")) {
        const body = await req.json();
        code = body?.code || null;
      } else if (
        contentType.includes("application/x-www-form-urlencoded") ||
        contentType.includes("multipart/form-data")
      ) {
        const formData = await req.formData();
        code = (formData.get("code") as string) || null;
      }
    } catch (err) {
      console.warn("SSO Callback: Failed to parse POST body:", err);
    }
  }

  return processCallback(req, code);
}
