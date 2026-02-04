// app/admin/layout.tsx
import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";
import "../globals.css";
import Sidebar from "@/components/admin/Sidebar";
import { getAuth } from "@/lib/getAuth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getAuth();

  if (!auth) redirect("/auth/login");

  return (
    <html>
      <body>
        <Header user={auth} />
        <div className="flex flex-1 min-h-screen">
          <Sidebar rights={auth?.rights} />
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
