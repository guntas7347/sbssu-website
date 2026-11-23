// app/admin/page-entries/page.tsx
import { redirect } from "next/navigation";
import { canAccessAdminRoute } from "@/lib/actions/auth";
import AdminDashboardPage from "./AdminDashboardPage";

export default async function PageEntriesPage() {
  const allowed = await canAccessAdminRoute("/admin");

  console.log(allowed);

  if (!allowed) redirect("/page-not-found");

  return <AdminDashboardPage />;
}
