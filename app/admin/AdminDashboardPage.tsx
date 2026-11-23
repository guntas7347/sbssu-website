"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  FileText,
  FolderTree,
  Globe,
  History,
  Image as ImageIcon,
  Loader2,
  Megaphone,
  Plus,
  RefreshCw,
  ShieldCheck,
  User as UserIcon,
  Users,
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getCurrentUser } from "@/lib/actions/auth";
import { getGallery, type AdminGalleryItem } from "@/lib/actions/gallery";
import { getNotices, type AdminNoticeItem } from "@/lib/actions/notices";
import { revalidateCurrentScopeCache } from "@/lib/actions/users";

type CurrentUser = Awaited<ReturnType<typeof getCurrentUser>>;

export default function AdminDashboardPage() {
  const [user, setUser] = useState<CurrentUser>(null);
  const [recentNotices, setRecentNotices] = useState<AdminNoticeItem[]>([]);
  const [recentGallery, setRecentGallery] = useState<AdminGalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [revalidating, setRevalidating] = useState(false);
  const [cacheMessage, setCacheMessage] = useState<string | null>(null);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const currentUser = await getCurrentUser();
      if (!currentUser) {
        throw new Error("Unauthorized: Please log in.");
      }
      setUser(currentUser);

      const rights = Array.isArray(currentUser.rights)
        ? currentUser.rights
        : [];
      const hasWorkspaceAccess =
        rights.includes("admin") || rights.includes("hod");

      if (hasWorkspaceAccess) {
        const [noticesData, galleryData] = await Promise.all([
          getNotices().catch(() => []),
          getGallery().catch(() => []),
        ]);
        setRecentNotices(noticesData.slice(0, 5));
        setRecentGallery(galleryData.slice(0, 4));
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load admin dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  async function handleRevalidateCache() {
    if (revalidating) return;
    try {
      setRevalidating(true);
      setCacheMessage(null);
      setError(null);
      await revalidateCurrentScopeCache();
      setCacheMessage("Public pages for your scope have been refreshed.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to refresh public cache.",
      );
    } finally {
      setRevalidating(false);
    }
  }

  const rights = Array.isArray(user?.rights) ? user.rights : [];
  const isAdmin = rights.includes("admin");
  const isHod = rights.includes("hod");

  const scopeLabel =
    isAdmin && isHod
      ? user?.department
        ? `University-Wide & ${user.department.code.toUpperCase()} (${user.department.name})`
        : "University-Wide & HOD"
      : isAdmin
        ? "University-Wide (Central)"
        : isHod
          ? user?.department
            ? `${user.department.code.toUpperCase()} · ${user.department.name}`
            : "Department Scope"
          : "Limited Access";

  const contentModules = [
    {
      title: "Notices & Circulars",
      description:
        "Publish university, central, or department notices with attachments.",
      href: "/admin/notices",
      newHref: "/admin/notices/new",
      newLabel: "New Notice",
      icon: Megaphone,
      accent: "orange",
    },
    {
      title: "Page Categories",
      description:
        "Organize structural sections and category codes for portal pages.",
      href: "/admin/page-categories",
      icon: FolderTree,
      accent: "green",
    },
    {
      title: "Page Entries",
      description:
        "Manage documents, links, and custom HTML pages within categories.",
      href: "/admin/page-entries",
      newHref: "/admin/page-entries/new",
      newLabel: "New Entry",
      icon: FileText,
      accent: "orange",
    },
    {
      title: "Gallery & Albums",
      description:
        "Upload campus and department photos grouped into named albums.",
      href: "/admin/gallery",
      newHref: "/admin/gallery/new",
      newLabel: "Add Media",
      icon: ImageIcon,
      accent: "green",
    },
  ];

  const adminModules = [
    {
      title: "Manage Departments",
      description:
        "Create and update academic departments and HOD assignments.",
      href: "/admin/admin/manage-departments",
      icon: Building2,
    },
    {
      title: "Manage Users",
      description: "Inspect portal accounts, rights, and department mappings.",
      href: "/admin/admin/users",
      icon: Users,
    },
    {
      title: "Legacy Manager",
      description: "Import and migrate legacy notices and historical records.",
      href: "/admin/admin/legacy-manager",
      icon: History,
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="SBSSU Ferozepur · Admin Portal"
        title={
          user
            ? `Welcome, ${user.fullName || user.username || "Administrator"}`
            : "Admin Dashboard"
        }
        description="Manage portal content, notices, gallery albums, and institutional records within your assigned scope."
      />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {cacheMessage && (
        <div className="flex items-center gap-2 rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-xs font-medium text-green-800 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-300">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>{cacheMessage}</span>
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white p-12 text-xs text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <Loader2 className="h-4 w-4 animate-spin text-orange-600 dark:text-orange-400" />
          <span>Loading workspace...</span>
        </div>
      ) : (
        user && (
          <>
            {/* Active Session & Scope Card */}
            <section className="flex flex-col justify-between gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs lg:flex-row lg:items-center dark:border-slate-800 dark:bg-slate-900">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                    {isAdmin ? (
                      <Globe className="h-3.5 w-3.5" />
                    ) : (
                      <Building2 className="h-3.5 w-3.5" />
                    )}
                    <span>{scopeLabel}</span>
                  </span>

                  {rights.map((r) => (
                    <span
                      key={r}
                      className="inline-flex items-center gap-1 rounded-full bg-green-600/10 px-2.5 py-1 font-mono text-[11px] font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400"
                    >
                      <ShieldCheck className="h-3 w-3" />
                      <span>{r}</span>
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
                  {user.username && (
                    <span>
                      Username:{" "}
                      <strong className="font-mono text-slate-800 dark:text-slate-200">
                        {user.username}
                      </strong>
                    </span>
                  )}
                  {user.email && <span>{user.email}</span>}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href={`/admin/admin/users/${user.id}`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
                >
                  <UserIcon className="h-3.5 w-3.5" />
                  <span>My Profile</span>
                </Link>

                <button
                  type="button"
                  disabled={revalidating}
                  onClick={() => void handleRevalidateCache()}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-green-700 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-green-800 disabled:opacity-60 dark:bg-green-500 dark:text-slate-950 dark:hover:bg-green-400"
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 ${revalidating ? "animate-spin" : ""}`}
                  />
                  <span>
                    {revalidating ? "Refreshing..." : "Refresh Public Cache"}
                  </span>
                </button>
              </div>
            </section>

            {/* Content & Media Modules (admin & hod) */}
            {(isAdmin || isHod) && (
              <section className="space-y-3">
                <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                  Content & Media
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {contentModules.map((mod) => {
                    const Icon = mod.icon;
                    return (
                      <div
                        key={mod.href}
                        className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-orange-500/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-orange-400/50"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div
                              className={`flex h-10 w-10 items-center justify-center rounded-2xl ${
                                mod.accent === "orange"
                                  ? "bg-orange-500/10 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400"
                                  : "bg-green-600/10 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <Link
                              href={mod.href}
                              aria-label={`Open ${mod.title}`}
                              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                            >
                              <ArrowUpRight className="h-4 w-4" />
                            </Link>
                          </div>

                          <div>
                            <Link
                              href={mod.href}
                              className="text-sm font-bold text-slate-900 hover:text-orange-600 dark:text-white dark:hover:text-orange-400"
                            >
                              {mod.title}
                            </Link>
                            <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                              {mod.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                          <Link
                            href={mod.href}
                            className="inline-flex flex-1 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                          >
                            Manage
                          </Link>

                          {mod.newHref && (
                            <Link
                              href={mod.newHref}
                              className="inline-flex items-center justify-center gap-1 rounded-xl bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
                            >
                              <Plus className="h-3.5 w-3.5" />
                              <span>{mod.newLabel}</span>
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Administration Modules (admin only) */}
            {isAdmin && (
              <section className="space-y-3">
                <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                  Administration
                </h2>
                <div className="grid gap-4 md:grid-cols-3">
                  {adminModules.map((mod) => {
                    const Icon = mod.icon;
                    return (
                      <Link
                        key={mod.href}
                        href={mod.href}
                        className="group flex items-start justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-orange-500/60 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-orange-400/60"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 transition group-hover:bg-orange-500/10 group-hover:text-orange-600 dark:bg-slate-800 dark:text-slate-300 dark:group-hover:bg-orange-500/15 dark:group-hover:text-orange-400">
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                              {mod.title}
                            </div>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                              {mod.description}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:text-orange-600 dark:group-hover:text-orange-400" />
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Recent Scoped Activity */}
            {(isAdmin || isHod) && (
              <section className="grid gap-6 lg:grid-cols-2">
                {/* Recent Notices */}
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                      Recent Notices in Your Scope
                    </h3>
                    <Link
                      href="/admin/notices"
                      className="text-xs font-semibold text-orange-600 hover:underline dark:text-orange-400"
                    >
                      View all
                    </Link>
                  </div>

                  {recentNotices.length === 0 ? (
                    <p className="py-6 text-center text-xs text-slate-400">
                      No notices found.
                    </p>
                  ) : (
                    <ul className="divide-y divide-slate-200 dark:divide-slate-800">
                      {recentNotices.map((notice) => (
                        <li
                          key={notice.id}
                          className="flex items-center justify-between gap-3 py-2.5 text-xs"
                        >
                          <div className="min-w-0">
                            <div className="truncate font-semibold text-slate-900 dark:text-white">
                              {notice.title}
                            </div>
                            <div className="mt-0.5 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                              <span className="uppercase">{notice.level}</span>
                              {notice.departmentCode && (
                                <span className="font-mono">
                                  · {notice.departmentCode.toUpperCase()}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="shrink-0 font-mono text-[11px] text-slate-400">
                            {new Date(notice.createdAt).toLocaleDateString(
                              "en-IN",
                              { day: "2-digit", month: "short" },
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Recent Gallery Items */}
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                      Recent Gallery Media
                    </h3>
                    <Link
                      href="/admin/gallery"
                      className="text-xs font-semibold text-green-700 hover:underline dark:text-green-400"
                    >
                      View all
                    </Link>
                  </div>

                  {recentGallery.length === 0 ? (
                    <p className="py-6 text-center text-xs text-slate-400">
                      No gallery items found.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      {recentGallery.map((item) => (
                        <div
                          key={item.id}
                          className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
                        >
                          <div className="aspect-[16/10] w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                            <img
                              src={item.path}
                              alt={item.title || item.album}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="p-2.5">
                            <div className="truncate font-mono text-[11px] font-semibold text-slate-900 dark:text-white">
                              {item.album}
                            </div>
                            <div className="truncate text-[11px] text-slate-500 dark:text-slate-400">
                              {item.title || item.category}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}
          </>
        )
      )}
    </div>
  );
}
