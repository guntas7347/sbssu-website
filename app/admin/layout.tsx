// app/admin/layout.tsx
import { getCurrentUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import React from "react";
import AdminSidebarShell from "@/components/admin/AdminSidebarShell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  // Secure server-side access check
  const hasAccess =
    user &&
    Array.isArray(user.rights) &&
    (user.rights.includes("admin") || user.rights.includes("allow_login"));

  if (!hasAccess) {
    redirect("/");
  }

  return <AdminSidebarShell user={user}>{children}</AdminSidebarShell>;
}
