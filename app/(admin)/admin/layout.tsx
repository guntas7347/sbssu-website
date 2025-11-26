// app/admin/layout.tsx
import Header from "@/components/admin/Header";
import { AdminProvider } from "./AdminContext";

import "./globals.css";
import Footer from "@/components/admin/Footer";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <AdminProvider>
          <Header />
          {children}
          <Footer />
        </AdminProvider>
      </body>
    </html>
  );
}
