"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileText,
  Layers,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { findCategoryByNumber } from "@/constants/page-categories";
import {
  deletePageEntry,
  getDepartmentsForSelect,
  getPageEntries,
  type PageEntryWithDept,
} from "@/lib/actions/page-entries";
import type { PageEntryType } from "@/db/schema";

interface DepartmentOption {
  id: string;
  name: string;
  code: string | null;
}

const PAGE_SIZE = 50;

function safeText(value: string | null | undefined): string {
  return typeof value === "string" ? value : "";
}

function getSafeHref(raw: string | null | undefined): string | null {
  const trimmed = safeText(raw).trim();
  if (!trimmed) return null;
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:")
  ) {
    return null;
  }
  if (
    trimmed.startsWith("/") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://")
  ) {
    return trimmed;
  }
  return null;
}

function formatCreatedAtIst(value: Date | string | null | undefined): string {
  if (!value) return "—";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "—";
  return parsed.toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function PageEntriesAdminPage() {
  const [typeFilter, setTypeFilter] = useState<"all" | PageEntryType>("all");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [appliedSearch, setAppliedSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const [items, setItems] = useState<PageEntryWithDept[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [banner, setBanner] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    void getDepartmentsForSelect()
      .then((list) => setDepartments(list))
      .catch((err) => console.error("Failed to load departments:", err));
  }, []);

  useEffect(() => {
    let active = true;
    setBanner(null);

    startTransition(async () => {
      try {
        const res = await getPageEntries({
          type: typeFilter,
          departmentId: departmentFilter,
          category: categoryFilter,
          search: appliedSearch,
          page,
          pageSize: PAGE_SIZE,
        });

        if (!active) return;
        const sortedItems = [...res.items].sort((a, b) => {
          const tA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const tB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return tB - tA;
        });
        setItems(sortedItems);
        setTotalCount(res.totalCount);
        setHasMore(res.hasMore);
      } catch (err) {
        if (!active) return;
        setBanner({
          type: "error",
          text:
            err instanceof Error ? err.message : "Failed to load page entries.",
        });
      }
    });

    return () => {
      active = false;
    };
  }, [typeFilter, departmentFilter, categoryFilter, appliedSearch, page]);

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPage(1);
    setAppliedSearch(searchInput.trim());
  }

  function handleResetFilters() {
    setTypeFilter("all");
    setDepartmentFilter("all");
    setCategoryFilter("");
    setSearchInput("");
    setAppliedSearch("");
    setPage(1);
  }

  function handleDelete(entry: PageEntryWithDept) {
    if (!confirm(`Delete "${entry.title}"?`)) return;
    setDeletingId(entry.id);
    setBanner(null);

    startTransition(async () => {
      const res = await deletePageEntry(entry.id);
      if (res.ok) {
        setBanner({ type: "success", text: res.message });
        setItems((prev) => prev.filter((row) => row.id !== entry.id));
        setTotalCount((prev) => Math.max(0, prev - 1));
      } else {
        setBanner({ type: "error", text: res.message });
      }
      setDeletingId(null);
    });
  }

  function getCustomPageRoute(entry: PageEntryWithDept): string | null {
    if (entry.type !== "custom" || !entry.slug) return null;
    if (entry.scope === "department" && entry.departmentCode) {
      return `/departments/${entry.departmentCode.toLowerCase()}/pages/${entry.slug}`;
    }
    return `/pages/${entry.slug}`;
  }

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Top Header */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold tracking-wider text-orange-700 uppercase dark:bg-orange-400/15 dark:text-orange-300">
              <Layers className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
              SBSSU Content Registry
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Page Entries Manager
            </h1>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Browse, search, and filter generic entries and custom HTML pages •{" "}
              <strong className="text-slate-700 dark:text-slate-200">
                {PAGE_SIZE}
              </strong>{" "}
              records per page (newest first)
            </p>
          </div>

          <Link
            href="/admin/page-entries/new"
            className="inline-flex items-center justify-center gap-2 self-start rounded-xl bg-orange-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-orange-700 sm:self-auto dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
          >
            <Plus className="h-4 w-4" />
            Create Entry
          </Link>
        </div>

        {/* Status Banner */}
        {banner && (
          <div
            role="status"
            className={`flex items-start justify-between gap-3 rounded-xl border p-4 text-xs font-medium ${
              banner.type === "success"
                ? "border-green-500/30 bg-green-50 text-green-900 dark:border-green-400/30 dark:bg-green-500/10 dark:text-green-200"
                : "border-red-500/30 bg-red-50 text-red-900 dark:text-red-200"
            }`}
          >
            <div className="flex items-center gap-2">
              {banner.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
              )}
              <span>{banner.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setBanner(null)}
              className="cursor-pointer opacity-70 hover:opacity-100"
              aria-label="Dismiss message"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {/* Type Filter */}
            <div>
              <label
                htmlFor="filter-entry-type"
                className="mb-1 block text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
              >
                Entry Type
              </label>
              <select
                id="filter-entry-type"
                value={typeFilter}
                onChange={(e) => {
                  setPage(1);
                  setTypeFilter(e.target.value as "all" | PageEntryType);
                }}
                className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="all">All Types</option>
                <option value="generic">Generic</option>
                <option value="custom">Custom HTML</option>
              </select>
            </div>

            {/* Department Filter */}
            <div>
              <label
                htmlFor="filter-department"
                className="mb-1 block text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
              >
                Department Scope
              </label>
              <select
                id="filter-department"
                value={departmentFilter}
                onChange={(e) => {
                  setPage(1);
                  setDepartmentFilter(e.target.value);
                }}
                className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="all">All Departments & University</option>
                <option value="none">University-Wide (No Dept)</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name} {dept.code ? `(${dept.code})` : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <label
                htmlFor="filter-category"
                className="mb-1 block text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
              >
                Category Number
              </label>
              <input
                id="filter-category"
                type="text"
                value={categoryFilter}
                onChange={(e) => {
                  setPage(1);
                  setCategoryFilter(e.target.value);
                }}
                placeholder="e.g. 201, 202, 2008"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="flex flex-col">
              <label
                htmlFor="filter-search"
                className="mb-1 block text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
              >
                Search Title / Slug / Desc
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute top-2.5 left-3 h-3.5 w-3.5 text-slate-400" />
                  <input
                    id="filter-search"
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search..."
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pr-3 pl-8 text-xs text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="cursor-pointer rounded-xl bg-green-700 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-green-800 dark:bg-green-500 dark:text-slate-950 dark:hover:bg-green-400"
                >
                  Apply
                </button>
              </div>
            </form>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <span>
                Page{" "}
                <strong className="text-slate-900 dark:text-white">
                  {page}
                </strong>{" "}
                of{" "}
                <strong className="text-slate-900 dark:text-white">
                  {totalPages}
                </strong>
              </span>
              <span>•</span>
              <span>
                Total:{" "}
                <strong className="text-orange-600 dark:text-orange-400">
                  {totalCount}
                </strong>
              </span>
            </div>

            <button
              type="button"
              onClick={handleResetFilters}
              className="cursor-pointer text-xs font-semibold text-slate-600 underline-offset-2 hover:text-orange-600 hover:underline dark:text-slate-300 dark:hover:text-orange-400"
            >
              Reset Filters
            </button>
          </div>
        </div>

        {/* Main Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 font-semibold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3.5">Type</th>
                  <th className="px-4 py-3.5">Title & Details</th>
                  <th className="px-4 py-3.5">Department</th>
                  <th className="px-4 py-3.5">Category / Slug</th>
                  <th className="px-4 py-3.5">File / Link / Path</th>
                  <th className="px-4 py-3.5">Created</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {isPending && items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                    >
                      Loading entries...
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-6 py-12 text-center text-slate-500 dark:text-slate-400"
                    >
                      No page entries match the current filters.
                    </td>
                  </tr>
                ) : (
                  items.map((entry) => {
                    const customRoute = getCustomPageRoute(entry);
                    const safeFileHref = getSafeHref(entry.file);
                    const safeLinkHref = getSafeHref(entry.link);
                    const catMeta = findCategoryByNumber(entry.category);

                    return (
                      <tr
                        key={entry.id}
                        className="transition hover:bg-orange-50/40 dark:hover:bg-orange-500/5"
                      >
                        <td className="px-4 py-3.5 whitespace-nowrap">
                          {entry.type === "custom" ? (
                            <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-bold text-orange-700 dark:bg-orange-400/15 dark:text-orange-300">
                              custom
                            </span>
                          ) : (
                            <span className="rounded-full bg-green-600/10 px-2.5 py-0.5 text-[11px] font-bold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                              generic
                            </span>
                          )}
                        </td>

                        <td className="max-w-xs px-4 py-3.5">
                          <div className="font-bold text-slate-900 dark:text-white">
                            {entry.title}
                          </div>
                          {entry.desc && (
                            <p className="mt-0.5 line-clamp-2 text-[11px] text-slate-500 dark:text-slate-400">
                              {entry.desc}
                            </p>
                          )}
                        </td>

                        <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">
                          {entry.departmentName
                            ? `${entry.departmentName}${entry.departmentCode ? ` (${entry.departmentCode})` : ""}`
                            : "University-Wide"}
                        </td>

                        <td className="px-4 py-3.5">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-medium text-slate-800 dark:text-slate-200">
                              {catMeta
                                ? `${catMeta.label} (#${catMeta.categoryNumber})`
                                : entry.category || "—"}
                            </span>
                            {entry.type === "custom" && (
                              <span className="font-mono text-[11px] text-orange-700 dark:text-orange-300">
                                {customRoute ?? entry.slug ?? "—"}
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="max-w-xs px-4 py-3.5">
                          <div className="flex flex-col gap-1 font-mono text-[11px]">
                            {entry.type === "custom" && customRoute && (
                              <Link
                                href={customRoute}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-green-700 hover:underline dark:text-green-400"
                              >
                                <span>{customRoute}</span>
                                <ExternalLink className="h-3 w-3 shrink-0" />
                              </Link>
                            )}
                            {entry.type === "custom" && entry.path && (
                              <span className="truncate text-slate-500 dark:text-slate-400">
                                {entry.path}
                              </span>
                            )}
                            {safeFileHref && (
                              <a
                                href={safeFileHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-slate-700 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400"
                              >
                                <FileText className="h-3 w-3 shrink-0" />
                                <span className="truncate">{entry.file}</span>
                              </a>
                            )}
                            {safeLinkHref && (
                              <a
                                href={safeLinkHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-green-700 hover:underline dark:text-green-400"
                              >
                                <span className="truncate">{entry.link}</span>
                                <ExternalLink className="h-3 w-3 shrink-0" />
                              </a>
                            )}
                            {!customRoute &&
                              !safeFileHref &&
                              !safeLinkHref &&
                              !entry.path && (
                                <span className="text-slate-400 dark:text-slate-600">
                                  —
                                </span>
                              )}
                          </div>
                        </td>

                        <td className="px-4 py-3.5 whitespace-nowrap text-slate-500 dark:text-slate-400">
                          {formatCreatedAtIst(entry.createdAt)}
                        </td>

                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <div className="inline-flex items-center gap-2">
                            <Link
                              href={`/admin/page-entries/${entry.id}`}
                              className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Link>

                            <button
                              type="button"
                              disabled={isPending && deletingId === entry.id}
                              onClick={() => handleDelete(entry)}
                              className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-red-600/10 px-2.5 py-1.5 font-semibold text-red-700 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:text-red-300 dark:hover:bg-red-600 dark:hover:text-white"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              {deletingId === entry.id ? "..." : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination Bar (50 per page) */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            disabled={page <= 1 || isPending}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-800 transition hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </button>

          <span className="text-xs text-slate-500 dark:text-slate-400">
            Page{" "}
            <strong className="text-slate-900 dark:text-white">{page}</strong>{" "}
            of{" "}
            <strong className="text-slate-900 dark:text-white">
              {totalPages}
            </strong>{" "}
            • Showing{" "}
            <strong className="text-orange-600 dark:text-orange-400">
              {items.length}
            </strong>{" "}
            of {totalCount} ({PAGE_SIZE}/page)
          </span>

          <button
            type="button"
            disabled={!hasMore || isPending}
            onClick={() => setPage((prev) => prev + 1)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-green-700 px-5 py-2 text-xs font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-green-500 dark:text-slate-950 dark:hover:bg-green-400"
          >
            Next Page
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
