"use client";

import { useMemo, useState } from "react";
import { Database, ListOrdered, RefreshCw, Search, X } from "lucide-react";
import type { ScopeConfig } from "@/lib/actions/configs";
import type { AdminPageEntryItem } from "@/lib/actions/admin/page-entries/getPageEntries";
import { PaginationBar } from "@/components/admin/PaginationBar";
import { PageEntriesGroupedTable } from "./PageEntriesGroupedTable";
import Link from "next/link";

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
        (item.field1?.toLowerCase().includes(q) ?? false) ||
        (item.field2?.toLowerCase().includes(q) ?? false) ||
        (item.field3?.toLowerCase().includes(q) ?? false) ||
        (item.field4?.toLowerCase().includes(q) ?? false) ||
        (item.field5?.toLowerCase().includes(q) ?? false) ||
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

  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 md:grid-cols-2">
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

          <div className="relative">
            <Database className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-orange-600 dark:text-orange-400" />
            <input
              type="text"
              value={dbSearch}
              onChange={(e) => {
                onDbSearchChange(e.target.value);
                onPageChange(1);
              }}
              placeholder="DB search (fields, category, dept, slug)..."
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
            <Link
              href="/admin/page-entries/order"
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:border-orange-400 dark:hover:text-orange-400"
            >
              <ListOrdered className="h-3 w-3" />
              <span>Change Order</span>
            </Link>
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

      <PageEntriesGroupedTable
        entries={filteredEntries}
        isSearching={Boolean(clientSearch.trim() || dbSearch.trim())}
      />

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
