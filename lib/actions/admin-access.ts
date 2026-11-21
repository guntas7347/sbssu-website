"use server";

import { getCurrentUser } from "@/lib/actions/auth";

export type PortalRight = "admin" | "hod";

interface RouteRule {
  prefix: string;
  requiredRights: PortalRight[];
}

// Ordered from most specific prefix to general /admin prefix
const ADMIN_ROUTE_RULES: RouteRule[] = [
  { prefix: "/admin/admin", requiredRights: ["admin"] },
  { prefix: "/admin/gallery", requiredRights: ["admin", "hod"] },
  { prefix: "/admin/notices", requiredRights: ["admin", "hod"] },
  { prefix: "/admin/page-categories", requiredRights: ["admin", "hod"] },
  { prefix: "/admin/page-entries", requiredRights: ["admin", "hod"] },
  { prefix: "/admin", requiredRights: ["admin", "hod"] },
];

export interface AdminRouteAccessResult {
  allowed: boolean;
  user: Awaited<ReturnType<typeof getCurrentUser>>;
  matchedPrefix: string | null;
}

export async function checkAdminRouteAccess(
  pathname: string,
): Promise<AdminRouteAccessResult> {
  const user = await getCurrentUser();
  if (!user || !Array.isArray(user.rights)) {
    return { allowed: false, user: null, matchedPrefix: null };
  }

  const normalizedPath = pathname.split("?")[0].replace(/\/+$/, "") || "/admin";

  const matchedRule = ADMIN_ROUTE_RULES.find(
    (rule) =>
      normalizedPath === rule.prefix ||
      normalizedPath.startsWith(`${rule.prefix}/`),
  );

  if (!matchedRule) {
    return { allowed: false, user, matchedPrefix: null };
  }

  const allowed = matchedRule.requiredRights.some((right) =>
    user.rights!.includes(right),
  );

  return {
    allowed,
    user,
    matchedPrefix: matchedRule.prefix,
  };
}
