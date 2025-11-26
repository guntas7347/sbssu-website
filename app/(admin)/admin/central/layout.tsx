"use client";

import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";
import Sidebar from "@/components/admin/Sidebar";

export default function CentralLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        <Sidebar portal="central" />
        {children}
      </div>
    </div>
  );
}
