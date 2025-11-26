import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const PUBLIC_PATHS = [
  "/admin/login",
  "/admin/otp",
  "/admin/forgot-password",
  "/admin/reset-otp",
  "/admin/reset-password",
];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow all public routes
  if (PUBLIC_PATHS.includes(pathname)) return NextResponse.next();

  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect(new URL("/admin/login", req.url));

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const portals: string[] = decoded.portals || [];

    // protect by portal-level access
    if (pathname.startsWith("/admin/central") && !portals.includes("central"))
      throw new Error();

    if (
      pathname.startsWith("/admin/department") &&
      !portals.includes("department")
    )
      throw new Error();

    if (
      pathname.startsWith("/admin/placement") &&
      !portals.includes("placement")
    )
      throw new Error();

    if (pathname.startsWith("/admin/admin") && !portals.includes("admin"))
      throw new Error();

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
