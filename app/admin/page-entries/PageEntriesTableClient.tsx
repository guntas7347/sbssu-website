"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Code2,
  Database,
  ExternalLink,
  FileCheck2,
  Globe,
  Link2,
  RefreshCw,
  Search,
  SquarePen,
  X,
} from "lucide-react";
import type { ScopeConfig } from "@/lib/actions/configs";
import type { AdminPageEntryItem } from "@/lib/actions/admin/page-entries/getPageEntries";
import { PaginationBar } from "@/components/admin/PaginationBar";

interface PageEntriesTableClientProps {
  initialEntries: AdminPageEntryItem[];
  allowedScopes: ScopeConfig[];
  totalCount: number;
  page: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  dbSearch: string;
  onDbSearchChange: (value: string) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function PageEntriesTableClient({
  initialEntries,
  allowedScopes,
  totalCount,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
  dbSearch,
  onDbSearchChange,
  onRefresh,
  isRefreshing = false,
}: PageEntriesTableClientProps) {
  const [clientSearch, setClientSearch] = useState("");
  const [scopeFilter, setScopeFilter] = useState("all");

  const filteredEntries = useMemo(() => {
    const q = clientSearch.trim().toLowerCase();

    return initialEntries.filter((item) => {
      const itemScope = item.categoryScope || "university";
      if (scopeFilter !== "all" && itemScope !== scopeFilter) {
        return false;
      }

      if (!q) return true;

      return (
        item.title?.toLowerCase().includes(q) ||
        (item.desc?.toLowerCase().includes(q) ?? false) ||
        item.categoryCode.toLowerCase().includes(q) ||
        item.categoryName.toLowerCase().includes(q) ||
        (item.departmentCode?.toLowerCase().includes(q) ?? false) ||
        (item.departmentName?.toLowerCase().includes(q) ?? false) ||
        (item.slug?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [initialEntries, clientSearch, scopeFilter]);

  const hasClientFilter = Boolean(clientSearch.trim()) || scopeFilter !== "all";
  const barTotalItems = hasClientFilter ? filteredEntries.length : totalCount;
  const totalPages = Math.max(1, Math.ceil(barTotalItems / pageSize));
  const safePage = Math.min(page, totalPages);

  function getPublicHref(item: AdminPageEntryItem): string {
    const isCustom = Boolean(item.slug || item.htmlPath);
    const deptSlug = item.departmentCode?.toLowerCase();

    if (isCustom && item.slug) {
      return deptSlug
        ? `/departments/${deptSlug}/custom-pages/${item.slug}`
        : `/custom-pages/${item.slug}`;
    }

    return deptSlug
      ? `/departments/${deptSlug}/page/${item.categoryCode}`
      : `/page/${item.categoryCode}`;
  }

  return (
    <div className="space-y-4">
      {/* Dual Search + Scope Filter Bar */}
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 md:grid-cols-2">
          {/* Instant Client-side Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={clientSearch}
              onChange={(e) => {
                setClientSearch(e.target.value);
                onPageChange(1);
              }}
              placeholder="Instant Search loaded rows..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pr-9 pl-10 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-green-500 dark:focus:bg-slate-900"
            />
            {clientSearch && (
              <button
                type="button"
                onClick={() => {
                  setClientSearch("");
                  onPageChange(1);
                }}
                aria-label="Clear instant filter"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* DB-level Search */}
          <div className="relative">
            <Database className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-orange-600 dark:text-orange-400" />
            <input
              type="text"
              value={dbSearch}
              onChange={(e) => {
                onDbSearchChange(e.target.value);
                onPageChange(1);
              }}
              placeholder="DB search (title, category, dept, slug)..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pr-9 pl-10 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:bg-slate-900"
            />
            {dbSearch && (
              <button
                type="button"
                onClick={() => {
                  onDbSearchChange("");
                  onPageChange(1);
                }}
                aria-label="Clear DB search"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          {allowedScopes.length > 1 ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {[
                { key: "all", label: "All Scopes" },
                ...allowedScopes.map((s) => ({ key: s.key, label: s.label })),
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => {
                    setScopeFilter(tab.key);
                    onPageChange(1);
                  }}
                  className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                    scopeFilter === tab.key
                      ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-slate-950"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>
              Showing {filteredEntries.length} loaded ({totalCount} total)
            </span>
            <button
              type="button"
              onClick={onRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:border-orange-400 dark:hover:text-orange-400"
            >
              <RefreshCw
                className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Title & Details</th>
                <th className="px-5 py-3.5">Scope</th>
                <th className="px-5 py-3.5">Assets / Route</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {filteredEntries.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-xs text-slate-500 dark:text-slate-400"
                  >
                    No page entries match the current search or filter.
                  </td>
                </tr>
              ) : (
                filteredEntries.map((item) => {
                  const hasFile = Boolean(item.file1 || item.file2);
                  const hasLink = Boolean(item.link1 || item.link2);
                  const isCustom = Boolean(item.slug || item.htmlPath);
                  const publicHref = getPublicHref(item);

                  return (
                    <tr
                      key={item.id}
                      className="transition hover:bg-orange-50/30 dark:hover:bg-orange-500/5"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <span className="rounded bg-orange-500/10 px-2 py-0.5 font-mono text-xs font-bold text-orange-700 dark:text-orange-400">
                            {item.categoryCode}
                          </span>
                          <span className="font-medium text-slate-800 dark:text-slate-200">
                            {item.categoryName}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {item.title || item.categoryName}
                        </div>
                        {item.desc && (
                          <div className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                            {item.desc}
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        {item.departmentId ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                            <Building2 className="h-3 w-3" />
                            <span>
                              {item.departmentCode?.toUpperCase() || "Dept"}
                            </span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-600/10 px-2.5 py-0.5 text-[11px] font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                            <Globe className="h-3 w-3" />
                            <span>University</span>
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {isCustom && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                              <Code2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                              <span>Custom</span>
                            </span>
                          )}
                          {hasFile && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                              <FileCheck2 className="h-3 w-3 text-orange-600 dark:text-orange-400" />
                              <span>Files</span>
                            </span>
                          )}
                          {hasLink && (
                            <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                              <Link2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                              <span>Links</span>
                            </span>
                          )}
                          <Link
                            href={publicHref}
                            className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600 transition hover:bg-orange-500/10 hover:text-orange-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-orange-400"
                          >
                            <span>View</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          href={`/admin/page-entries/${item.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
                        >
                          <SquarePen className="h-3.5 w-3.5" />
                          <span>Edit</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PaginationBar
        totalItems={barTotalItems}
        page={safePage}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        itemLabel="entries"
      />
    </div>
  );
}
