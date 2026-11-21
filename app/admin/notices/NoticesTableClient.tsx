"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  Database,
  ExternalLink,
  FileText,
  Globe,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { PaginationBar } from "@/components/admin/PaginationBar";
import { deleteNotice, type AdminNoticeItem } from "@/lib/actions/notices";
import Link from "next/link";

interface NoticesTableClientProps {
  initialNotices: AdminNoticeItem[];
  dbSearch: string;
  onDbSearchChange: (value: string) => void;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export function NoticesTableClient({
  initialNotices,
  dbSearch,
  onDbSearchChange,
  onRefresh,
  isRefreshing = false,
}: NoticesTableClientProps) {
  const [clientSearch, setClientSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const availableLevels = useMemo(() => {
    const set = new Set<string>();
    for (const item of initialNotices) {
      if (item.level) set.add(item.level);
    }
    return Array.from(set);
  }, [initialNotices]);

  const filteredNotices = useMemo(() => {
    const q = clientSearch.trim().toLowerCase();

    return initialNotices.filter((item) => {
      if (levelFilter !== "all" && item.level !== levelFilter) {
        return false;
      }

      if (!q) return true;

      return (
        item.title.toLowerCase().includes(q) ||
        (item.description?.toLowerCase().includes(q) ?? false) ||
        (item.refNumber?.toLowerCase().includes(q) ?? false) ||
        (item.category?.toLowerCase().includes(q) ?? false) ||
        (item.level?.toLowerCase().includes(q) ?? false) ||
        (item.departmentCode?.toLowerCase().includes(q) ?? false) ||
        (item.departmentName?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [initialNotices, clientSearch, levelFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredNotices.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginatedRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredNotices.slice(start, start + pageSize);
  }, [filteredNotices, safePage, pageSize]);

  async function handleDelete(item: AdminNoticeItem) {
    if (deletingId) return;

    const confirmed = window.confirm(
      `Delete notice "${item.title}"? This action cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      setDeletingId(item.id);
      setDeleteError(null);
      await deleteNotice(item.id);
      onRefresh();
    } catch (err) {
      setDeleteError(
        err instanceof Error ? err.message : "Failed to delete notice.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  function formatDate(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-4">
      {deleteError && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {deleteError}
        </div>
      )}

      {/* Search & Level Filter Bar */}
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 md:grid-cols-2">
          {/* Instant Client Search */}
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={clientSearch}
              onChange={(e) => {
                setClientSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Instant filter loaded notices..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pr-9 pl-10 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-green-600 focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-green-500 dark:focus:bg-slate-900"
            />
            {clientSearch && (
              <button
                type="button"
                onClick={() => {
                  setClientSearch("");
                  setPage(1);
                }}
                aria-label="Clear instant filter"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>{" "}
          {/* DB-level Search */}
          <div className="relative">
            <Database className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-orange-600 dark:text-orange-400" />
            <input
              type="text"
              value={dbSearch}
              onChange={(e) => {
                onDbSearchChange(e.target.value);
                setPage(1);
              }}
              placeholder="DB search (title, ref no, category, dept)..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pr-9 pl-10 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:bg-slate-900"
            />
            {dbSearch && (
              <button
                type="button"
                onClick={() => {
                  onDbSearchChange("");
                  setPage(1);
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
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                setLevelFilter("all");
                setPage(1);
              }}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                levelFilter === "all"
                  ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-slate-950"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              All Levels
            </button>
            {availableLevels.map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => {
                  setLevelFilter(lvl);
                  setPage(1);
                }}
                className={`rounded-lg px-3 py-1 text-xs font-semibold capitalize transition ${
                  levelFilter === lvl
                    ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-slate-950"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>
              Showing {filteredNotices.length} of {initialNotices.length} loaded
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
                <th className="px-5 py-3.5">Notice & Ref No.</th>
                <th className="px-5 py-3.5">Level & Scope</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Published</th>
                <th className="px-5 py-3.5">Attachment</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {paginatedRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-xs text-slate-500 dark:text-slate-400"
                  >
                    No notices match the current search or filter.
                  </td>
                </tr>
              ) : (
                paginatedRows.map((item) => (
                  <tr
                    key={item.id}
                    className="transition hover:bg-orange-50/30 dark:hover:bg-orange-500/5"
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {item.title}
                      </div>
                      {item.refNumber && (
                        <div className="mt-0.5 font-mono text-[11px] font-semibold text-orange-700 dark:text-orange-400">
                          Ref: {item.refNumber}
                        </div>
                      )}
                      {item.description && (
                        <div className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                          {item.description}
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.level === "department" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-orange-700 capitalize dark:bg-orange-500/15 dark:text-orange-400">
                            <Building2 className="h-3 w-3" />
                            <span>
                              {item.departmentCode?.toUpperCase() ||
                                "Department"}
                            </span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-600/10 px-2.5 py-0.5 text-[11px] font-semibold text-green-700 capitalize dark:bg-green-500/15 dark:text-green-400">
                            <Globe className="h-3 w-3" />
                            <span>{item.level || "General"}</span>
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {item.category || "—"}
                      </span>
                    </td>

                    <td className="px-5 py-3.5 text-xs text-slate-600 dark:text-slate-400">
                      <div>{formatDate(item.createdAt)}</div>
                      {item.createdBy && (
                        <div className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
                          by{" "}
                          <Link
                            href={`/admin/admin/users/${item.createdBy}`}
                            className="font-mono underline-offset-2 text-orange-400 hover:text-orange-600 hover:underline dark:text-orange-200 dark:hover:text-orange-400"
                          >
                            {item.createdBy}
                          </Link>
                        </div>
                      )}
                    </td>

                    <td className="px-5 py-3.5">
                      {item.file ? (
                        <a
                          href={item.file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
                        >
                          <FileText className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                          <span>View File</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400">No file</span>
                      )}
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <button
                        type="button"
                        disabled={deletingId === item.id}
                        onClick={() => handleDelete(item)}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70"
                      >
                        {deletingId === item.id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="h-3.5 w-3.5" />
                        )}
                        <span>Delete</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <PaginationBar
        totalItems={filteredNotices.length}
        page={safePage}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        itemLabel="notices"
      />
    </div>
  );
}
