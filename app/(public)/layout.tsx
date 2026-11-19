import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 selection:bg-primary selection:text-white">
      {/* Global Header */}
      <Header />

      {/* Page Content */}
      <main className="flex-grow">{children}</main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
