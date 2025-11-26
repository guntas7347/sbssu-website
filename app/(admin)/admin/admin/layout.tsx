"use client";

import Header from "@/components/admin/Header";
import Footer from "@/components/admin/Footer";
import Sidebar from "@/components/admin/Sidebar";

export default function PlacementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" flex flex-col">
      <div className="flex flex-1 min-h-screen">
        <Sidebar portal="admin" />
        {children}
      </div>
    </div>
  );
}
