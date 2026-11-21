"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Database,
  ExternalLink,
  FolderKanban,
  Globe,
  Image as ImageIcon,
  Loader2,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PaginationBar } from "@/components/admin/PaginationBar";
import {
  deleteGalleryItem,
  getGallery,
  type AdminGalleryItem,
} from "@/lib/actions/gallery";

export default function AdminGalleryPage() {
  const [items, setItems] = useState<AdminGalleryItem[]>([]);
  const [dbSearch, setDbSearch] = useState("");
  const [clientSearch, setClientSearch] = useState("");
  const [albumFilter, setAlbumFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchGallery = useCallback(async (searchValue: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const trimmed = searchValue.trim();
      const rows = await getGallery(trimmed ? { search: trimmed } : undefined);
      setItems(rows);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load gallery items.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchGallery(dbSearch);
    }, 250);

    return () => clearTimeout(timer);
  }, [dbSearch, fetchGallery]);

  const albums = useMemo(() => {
    const set = new Set<string>();
    for (const item of items) {
      if (item.album) set.add(item.album);
    }
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [items]);

  const filteredItems = useMemo(() => {
    const q = clientSearch.trim().toLowerCase();

    return items.filter((item) => {
      if (albumFilter !== "all" && item.album !== albumFilter) {
        return false;
      }

      if (!q) return true;

      return (
        (item.title?.toLowerCase().includes(q) ?? false) ||
        (item.desc?.toLowerCase().includes(q) ?? false) ||
        item.album.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.departmentCode?.toLowerCase().includes(q) ?? false) ||
        (item.departmentName?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [items, albumFilter, clientSearch]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginatedRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, safePage, pageSize]);

  async function handleDelete(item: AdminGalleryItem) {
    if (deletingId) return;

    const confirmed = window.confirm(
      `Delete gallery item "${item.title || item.album}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      setDeletingId(item.id);
      setError(null);
      await deleteGalleryItem(item.id);
      await fetchGallery(dbSearch);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete gallery item.",
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
    <div className="space-y-6">
      <AdminPageHeader
        badge="SBSSU Admin Portal"
        title="Media Gallery & Albums"
        description="Manage university and department gallery media organized by album."
        backHref="/admin"
        backLabel="Back to Admin Dashboard"
        actionLabel="Add Gallery Item"
        actionHref="/admin/gallery/new"
      />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {/* Search & Album Filter Bar */}
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={clientSearch}
              onChange={(e) => {
                setClientSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Instant filter loaded items..."
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
                className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-md p-1 text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>{" "}
          <div className="relative">
            <Database className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-orange-600 dark:text-orange-400" />
            <input
              type="text"
              value={dbSearch}
              onChange={(e) => {
                setDbSearch(e.target.value);
                setPage(1);
              }}
              placeholder="DB search (album, title, category, dept)..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pr-9 pl-10 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:bg-slate-900"
            />
            {dbSearch && (
              <button
                type="button"
                onClick={() => {
                  setDbSearch("");
                  setPage(1);
                }}
                aria-label="Clear DB search"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 cursor-pointer rounded-md p-1 text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
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
                setAlbumFilter("all");
                setPage(1);
              }}
              className={`inline-flex cursor-pointer items-center gap-1 rounded-lg px-3 py-1 text-xs font-semibold transition ${
                albumFilter === "all"
                  ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-slate-950"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              }`}
            >
              <FolderKanban className="h-3.5 w-3.5" />
              <span>All Albums</span>
            </button>

            {albums.map((albumName) => (
              <button
                key={albumName}
                type="button"
                onClick={() => {
                  setAlbumFilter(albumName);
                  setPage(1);
                }}
                className={`cursor-pointer rounded-lg px-3 py-1 font-mono text-xs font-semibold transition ${
                  albumFilter === albumName
                    ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-slate-950"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {albumName}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span>
              Showing {filteredItems.length} of {items.length} loaded
            </span>
            <button
              type="button"
              onClick={() => void fetchGallery(dbSearch)}
              disabled={isLoading}
              className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 disabled:opacity-50 dark:border-slate-700 dark:text-slate-300 dark:hover:border-orange-400 dark:hover:text-orange-400"
            >
              <RefreshCw
                className={`h-3 w-3 ${isLoading ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        {isLoading && items.length === 0 ? (
          <div className="flex items-center justify-center gap-2 p-10 text-xs text-slate-500 dark:text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin text-orange-600 dark:text-orange-400" />
            <span>Loading gallery items...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/90 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
                  <th className="px-5 py-3.5">Media & Title</th>
                  <th className="px-5 py-3.5">Album & Category</th>
                  <th className="px-5 py-3.5">Scope</th>
                  <th className="px-5 py-3.5">Created</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {paginatedRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-5 py-10 text-center text-xs text-slate-500 dark:text-slate-400"
                    >
                      No gallery items found for the current filter.
                    </td>
                  </tr>
                ) : (
                  paginatedRows.map((item) => (
                    <tr
                      key={item.id}
                      className="transition hover:bg-orange-50/30 dark:hover:bg-orange-500/5"
                    >
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950">
                            <img
                              src={item.path}
                              alt={item.title || item.album}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="truncate font-semibold text-slate-900 dark:text-white">
                              {item.title || "Untitled Media"}
                            </div>
                            {item.desc && (
                              <div className="line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                                {item.desc}
                              </div>
                            )}
                            <a
                              href={item.path}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-0.5 inline-flex items-center gap-1 font-mono text-[11px] text-orange-700 hover:underline dark:text-orange-400"
                            >
                              <ImageIcon className="h-3 w-3" />
                              <span className="truncate">{item.path}</span>
                              <ExternalLink className="h-3 w-3 shrink-0" />
                            </a>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        <div className="font-mono text-xs font-semibold text-slate-900 dark:text-white">
                          {item.album}
                        </div>
                        <div className="mt-1">
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {item.category}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-3.5">
                        {item.departmentId ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                            <Building2 className="h-3 w-3" />
                            <span>
                              {item.departmentCode?.toUpperCase() ||
                                "Department"}
                            </span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-600/10 px-2.5 py-0.5 text-[11px] font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                            <Globe className="h-3 w-3" />
                            <span>University</span>
                          </span>
                        )}
                      </td>

                      <td className="px-5 py-3.5 text-xs text-slate-600 dark:text-slate-400">
                        <div>{formatDate(item.createdAt)}</div>
                        {item.createdBy && (
                          <div className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
                            by{" "}
                            <Link
                              href={`/admin/admin/users/${item.createdBy}`}
                              className="font-mono underline-offset-2 hover:text-orange-600 hover:underline dark:hover:text-orange-400"
                            >
                              {item.createdBy}
                            </Link>
                          </div>
                        )}
                      </td>

                      <td className="px-5 py-3.5 text-right">
                        <button
                          type="button"
                          disabled={deletingId === item.id}
                          onClick={() => void handleDelete(item)}
                          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-red-300 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70"
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
        )}
      </div>

      <PaginationBar
        totalItems={filteredItems.length}
        page={safePage}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        itemLabel="gallery items"
      />
    </div>
  );
}
