// src/components/admin/AdminSidebarShell.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun } from "lucide-react";

interface AdminSidebarShellProps {
  children: React.ReactNode;
  user: any;
}

export default function AdminSidebarShell({
  children,
  user,
}: AdminSidebarShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", href: "/admin" },
    { name: "Manage Departments", href: "/admin/admin/manage-departments" },
    { name: "Manage Users", href: "/admin/admin/users" },
    { name: "Legacy Manager", href: "/admin/admin/legacy-manager" },
    { name: "Gallery", href: "/admin/gallery" },
    { name: "Notices", href: "/admin/notices" },
    { name: "Page Entries", href: "/admin/page-entries" },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-200 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 font-bold text-lg">
          Admin Portal
        </div>

        <nav className="p-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/"
            className="block px-4 py-2.5 rounded-lg text-sm font-medium transition-color text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Main Website
          </Link>
          <button
            className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${"text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
          >
            Sign Out
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col md:pl-64">
        {/* TOP NAVBAR */}
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-6 sticky top-0 z-40">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            ☰
          </button>
          <div className="text-sm font-medium">
            Welcome,{" "}
            <span className="font-semibold">
              {user?.fullName || user?.email}
            </span>
          </div>
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
            className="p-1 rounded bg-slate-100 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            {darkMode ? (
              <Sun className="size-6 text-amber-400" />
            ) : (
              <Moon className="size-6 text-slate-300" />
            )}
          </button>
        </header>

        {/* PAGE CONTENT */}
        <main className="grow p-6">{children}</main>
      </div>
    </div>
  );
}
