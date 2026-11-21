// src/components/admin/AdminSidebarShell.tsx
"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  History,
  Image as ImageIcon,
  LayoutDashboard,
  LogOut,
  Menu,
  Megaphone,
  Moon,
  ShieldCheck,
  Sun,
  Users,
  X,
} from "lucide-react";

export interface DepartmentInfo {
  id: string;
  name: string;
  code: string;
  createdBy: string | null;
  hodId: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CurrentAdminUser {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  username: string | null;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  departmentId: string | null;
  rights: string[] | null;
  department: DepartmentInfo | null;
}

interface AdminSidebarShellProps {
  children: React.ReactNode;
  user: CurrentAdminUser | null;
  onSignOut?: () => void | Promise<void>;
}

type NavCategory = "Overview" | "Administration" | "Content & Media";

interface NavItem {
  name: string;
  href: string;
  category: NavCategory;
  icon: React.ComponentType<{ className?: string }>;
  /**
   * Required right(s) to view this link.
   * - Omit or pass [] to make visible to any authenticated admin user.
   * - Pass an array of rights if ANY matching right grants access (or "*" / "SUPER_ADMIN" for full access).
   */
  requiredRights?: string[];
}

const NAV_CATEGORIES: NavCategory[] = [
  "Overview",
  "Administration",
  "Content & Media",
];

const NAV_ITEMS: NavItem[] = [
  {
    name: "Dashboard",
    href: "/admin",
    category: "Overview",
    icon: LayoutDashboard,
  },
  {
    name: "Manage Departments",
    href: "/admin/admin/manage-departments",
    category: "Administration",
    icon: Building2,
    requiredRights: ["MANAGE_DEPARTMENTS", "ADMIN_DEPARTMENTS", "SUPER_ADMIN"],
  },
  {
    name: "Manage Users",
    href: "/admin/admin/users",
    category: "Administration",
    icon: Users,
    requiredRights: ["MANAGE_USERS", "ADMIN_USERS", "SUPER_ADMIN"],
  },
  {
    name: "Legacy Manager",
    href: "/admin/admin/legacy-manager",
    category: "Administration",
    icon: History,
    requiredRights: ["MANAGE_LEGACY", "LEGACY_MANAGER", "SUPER_ADMIN"],
  },
  {
    name: "Gallery",
    href: "/admin/gallery",
    category: "Content & Media",
    icon: ImageIcon,
    requiredRights: [
      "MANAGE_GALLERY",
      "GALLERY",
      "CONTENT_MANAGER",
      "SUPER_ADMIN",
    ],
  },
  {
    name: "Notices",
    href: "/admin/notices",
    category: "Content & Media",
    icon: Megaphone,
    requiredRights: [
      "MANAGE_NOTICES",
      "NOTICES",
      "CONTENT_MANAGER",
      "SUPER_ADMIN",
    ],
  },
  {
    name: "Page Entries",
    href: "/admin/page-entries",
    category: "Content & Media",
    icon: FileText,
    requiredRights: [
      "MANAGE_PAGES",
      "PAGE_ENTRIES",
      "CONTENT_MANAGER",
      "SUPER_ADMIN",
    ],
  },
];

function hasAccess(
  userRights: string[] | null | undefined,
  requiredRights?: string[],
) {
  if (process.env.NODE_ENV === "development") return true;

  if (!requiredRights || requiredRights.length === 0) return true;
  if (!userRights || userRights.length === 0) return false;

  const normalizedUserRights = new Set(
    userRights.map((r) => r.trim().toUpperCase()),
  );
  if (
    normalizedUserRights.has("*") ||
    normalizedUserRights.has("SUPER_ADMIN")
  ) {
    return true;
  }

  return requiredRights.some((req) =>
    normalizedUserRights.has(req.trim().toUpperCase()),
  );
}

function getInitials(name?: string | null, email?: string | null) {
  const source = (name || email || "AD").trim();
  const parts = source.split(/\s+/);
  if (parts.length >= 2) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

export default function AdminSidebarShell({
  children,
  user,
  onSignOut,
}: AdminSidebarShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const pathname = usePathname();

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      return next;
    });
  };

  const groupedNav = useMemo(() => {
    const visibleItems = NAV_ITEMS.filter((item) =>
      hasAccess(user?.rights, item.requiredRights),
    );
    return NAV_CATEGORIES.map((category) => ({
      category,
      items: visibleItems.filter((item) => item.category === category),
    })).filter((group) => group.items.length > 0);
  }, [user?.rights]);

  const userRights = user?.rights ?? [];
  const displayName =
    user?.fullName || user?.username || user?.email || "Administrator";
  const initials = getInitials(user?.fullName, user?.email);

  const isRouteActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* MOBILE BACKDROP */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-xs md:hidden"
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-200 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 ${isCollapsed ? "md:w-20" : "md:w-64"} w-64`}
      >
        {/* BRAND HEADER */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 min-w-0"
            title="SBSSU Website Admin Portal"
          >
            <img src="/sbssu-logo.png" alt="" className="size-9" />
            {!isCollapsed && (
              <div className="leading-tight truncate">
                <span className="block font-bold text-sm tracking-tight text-slate-900 dark:text-white truncate">
                  SBSSU Website
                </span>
                <span className="block text-[11px] font-medium text-primary dark:text-primary-dark truncate">
                  Admin Portal
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Button */}
          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden md:flex h-7 w-7 items-center justify-center rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-primary-dark hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close sidebar"
            className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* CATEGORIZED NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {groupedNav.map((group) => (
            <div key={group.category} className="space-y-1">
              {!isCollapsed && (
                <div className="px-3 pb-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                  {group.category}
                </div>
              )}

              {group.items.map((item) => {
                const Icon = item.icon;
                const active = isRouteActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    title={isCollapsed ? item.name : undefined}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-primary dark:bg-primary-dark text-white dark:text-slate-950 shadow-xs"
                        : "text-slate-600 dark:text-slate-400 hover:bg-primary/10 dark:hover:bg-primary-dark/15 hover:text-primary dark:hover:text-primary-dark"
                    } ${isCollapsed ? "justify-center px-2" : ""}`}
                  >
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        active
                          ? "text-white dark:text-slate-950"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    />
                    {!isCollapsed && (
                      <span className="truncate">{item.name}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* SIDEBAR FOOTER ACTIONS */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-1 shrink-0">
          <Link
            href="/"
            target="_blank"
            title={isCollapsed ? "Main Website" : undefined}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-secondary/10 dark:hover:bg-secondary-dark/15 hover:text-secondary dark:hover:text-secondary-dark transition-colors ${
              isCollapsed ? "justify-center px-2" : ""
            }`}
          >
            <ExternalLink className="w-4 h-4 shrink-0 text-secondary dark:text-secondary-dark" />
            {!isCollapsed && <span className="truncate">Main Website</span>}
          </Link>

          <button
            type="button"
            onClick={onSignOut}
            title={isCollapsed ? "Sign Out" : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer ${
              isCollapsed ? "justify-center px-2" : ""
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span className="truncate">Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ease-in-out ${
          isCollapsed ? "md:pl-20" : "md:pl-64"
        }`}
      >
        {/* TOP NAVBAR */}
        <header className="min-h-16 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xs border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 px-4 sm:px-6 py-2 sticky top-0 z-30">
          {/* Left: Mobile Drawer Trigger + Portal Title + User Summary */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="md:hidden p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="h-9 w-9 rounded-full bg-primary/15 dark:bg-primary-dark/20 text-primary dark:text-primary-dark font-semibold text-xs flex items-center justify-center shrink-0">
              {initials}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-primary dark:text-primary-dark">
                  SBSSU Website Admin Portal
                </span>
                <span className="text-slate-300 dark:text-slate-700 hidden sm:inline">
                  •
                </span>
                <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {displayName}
                </span>
              </div>

              {/* User Basic Details: Email, Phone, Username, Department */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {user?.username && <span>@{user.username}</span>}
                {user?.email && <span className="truncate">{user.email}</span>}
                {user?.phone && <span>{user.phone}</span>}
                <span className="inline-flex items-center gap-1 font-medium text-secondary dark:text-secondary-dark">
                  <Building2 className="w-3.5 h-3.5 shrink-0" />
                  {user?.department
                    ? `${user.department.name} (${user.department.code})`
                    : user?.departmentId
                      ? `Dept ID: ${user.departmentId}`
                      : "No Department"}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Rights Badges + Dark Mode Toggle */}
          <div className="flex items-center gap-2.5 ml-auto">
            <div className="hidden lg:flex items-center gap-1.5 flex-wrap max-w-md justify-end">
              <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 dark:text-slate-400 mr-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-secondary dark:text-secondary-dark" />
                Rights:
              </span>
              {userRights.length > 0 ? (
                userRights.map((right) => (
                  <span
                    key={right}
                    className="px-2 py-0.5 text-[11px] font-medium rounded-full bg-secondary/10 dark:bg-secondary-dark/15 text-secondary dark:text-secondary-dark border border-secondary/25 dark:border-secondary-dark/30"
                  >
                    {right}
                  </span>
                ))
              ) : (
                <span className="px-2 py-0.5 text-[11px] rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  Standard Access
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode"
              title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-primary/40 dark:hover:border-primary-dark/40 transition-colors cursor-pointer"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-primary-dark" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              )}
            </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
