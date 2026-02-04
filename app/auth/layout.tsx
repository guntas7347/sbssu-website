// app/admin/layout.tsx
import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";
import "../globals.css";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
