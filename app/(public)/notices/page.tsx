"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Bell,
  Calendar,
  ExternalLink,
  FileText,
  Filter,
  ChevronRight,
  ChevronLeft,
  X,
  Hash,
  Layers,
  ShieldAlert,
} from "lucide-react";
import { notice_categories, NOTICE_LEVELS } from "@/constants/categories";
import {
  getPublicNotices,
  PublicNoticeItem,
} from "@/lib/actions/public/public-notices";

const PAGE_SIZE = 20;

export default function PublicNoticesPage() {
  const [level, setLevel] = useState<string>("all");
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState<number>(1);

  const [notices, setNotices] = useState<PublicNoticeItem[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [selectedNotice, setSelectedNotice] = useState<PublicNoticeItem | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;
    setErrorMsg(null);

    startTransition(async () => {
      try {
        const res = await getPublicNotices({
          level,
          category,
          page,
          pageSize: PAGE_SIZE,
        });
        if (!active) return;
        setNotices(res.notices);
        setTotalCount(res.totalCount);
        setHasMore(res.hasMore);
      } catch (err) {
        if (!active) return;
        setErrorMsg(
          err instanceof Error ? err.message : "Failed to load notices.",
        );
      }
    });

    return () => {
      active = false;
    };
  }, [level, category, page]);

  function handleLevelChange(nextLevel: string) {
    setPage(1);
    setLevel(nextLevel);
  }

  function handleCategoryChange(nextCategory: string) {
    setPage(1);
    setCategory(nextCategory);
  }

  function handleNextPage() {
    if (!hasMore || isPending) return;
    setPage((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePrevPage() {
    if (page <= 1 || isPending) return;
    setPage((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold tracking-wider text-orange-700 uppercase dark:bg-orange-400/15 dark:text-orange-300">
              <Bell className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
              Official Circulars & Announcements
            </span>
            <h1 className="mt-2.5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              University Notices
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Sorted by latest first • {PAGE_SIZE} notices per page
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-right dark:border-slate-800 dark:bg-slate-950">
            <span className="block text-[11px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              Total Matching
            </span>
            <span className="text-xl font-extrabold text-orange-600 dark:text-orange-400">
              {totalCount}
            </span>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:items-center">
            <div>
              <label
                htmlFor="filter-level"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
              >
                <ShieldAlert className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                Level
              </label>
              <select
                id="filter-level"
                value={level}
                onChange={(e) => handleLevelChange(e.target.value)}
                className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="all">All Levels</option>
                {NOTICE_LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="filter-category"
                className="mb-1.5 flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
              >
                <Layers className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                Category
              </label>
              <select
                id="filter-category"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
                className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="all">All Categories</option>
                {notice_categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between gap-3 pt-2 lg:justify-end lg:pt-6">
              {(level !== "all" || category !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setLevel("all");
                    setCategory("all");
                    setPage(1);
                  }}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  <Filter className="h-3.5 w-3.5" />
                  Reset Filters
                </button>
              )}
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Page {page}
              </span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {errorMsg && (
          <div
            role="alert"
            className="rounded-xl border border-red-500/30 bg-red-50 p-4 text-sm text-red-900 dark:text-red-200"
          >
            {errorMsg}
          </div>
        )}

        {/* Cards Grid */}
        {isPending && notices.length === 0 ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="h-52 animate-pulse rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
              />
            ))}
          </div>
        ) : notices.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No notices match the selected level or category.
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 transition-opacity ${
              isPending ? "opacity-65" : "opacity-100"
            }`}
          >
            {notices.map((notice) => (
              <article
                key={notice.id}
                onClick={() => setSelectedNotice(notice)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedNotice(notice);
                  }
                }}
                className="group flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-xs transition hover:-translate-y-0.5 hover:border-orange-500/60 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-orange-400/60"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {notice.level && (
                        <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-bold text-orange-700 dark:bg-orange-400/15 dark:text-orange-300">
                          {notice.level}
                        </span>
                      )}
                      {notice.category && (
                        <span className="rounded-full bg-green-50 px-2.5 py-0.5 text-[11px] font-semibold text-green-800 dark:bg-green-500/15 dark:text-green-300">
                          {notice.category}
                        </span>
                      )}
                    </div>
                    {notice.refNumber && (
                      <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">
                        {notice.refNumber}
                      </span>
                    )}
                  </div>

                  <h2 className="mt-3.5 line-clamp-2 text-lg font-bold text-slate-900 transition group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                    {notice.title}
                  </h2>

                  {notice.description && (
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                      {notice.description}
                    </p>
                  )}
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </span>

                  <span className="inline-flex items-center gap-1 font-semibold text-orange-600 dark:text-orange-400">
                    View Notice
                    <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination Below Cards */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <button
            type="button"
            disabled={page <= 1 || isPending}
            onClick={handlePrevPage}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-800 transition hover:border-orange-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous Page
          </button>

          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Page{" "}
            <strong className="text-slate-900 dark:text-white">{page}</strong> •
            Showing{" "}
            <strong className="text-orange-600 dark:text-orange-400">
              {notices.length}
            </strong>{" "}
            of {totalCount}
          </span>

          <button
            type="button"
            disabled={!hasMore || isPending}
            onClick={handleNextPage}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-green-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-green-500 dark:text-slate-950 dark:hover:bg-green-400"
          >
            {isPending ? "Loading..." : "Next Page"}
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="notice-modal-heading"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-xs"
          onClick={() => setSelectedNotice(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8 dark:border-slate-800 dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  {selectedNotice.level && (
                    <span className="rounded-full bg-orange-500/10 px-3 py-0.5 text-xs font-bold text-orange-700 dark:bg-orange-400/15 dark:text-orange-300">
                      {selectedNotice.level}
                    </span>
                  )}
                  {selectedNotice.category && (
                    <span className="rounded-full bg-green-50 px-3 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-500/15 dark:text-green-300">
                      {selectedNotice.category}
                    </span>
                  )}
                </div>
                <h2
                  id="notice-modal-heading"
                  className="text-xl font-extrabold text-slate-900 sm:text-2xl dark:text-white"
                >
                  {selectedNotice.title}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Close notice modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-green-600 dark:text-green-400" />
                Published: {new Date(selectedNotice.createdAt).toLocaleString()}
              </span>
              {selectedNotice.refNumber && (
                <span className="inline-flex items-center gap-1.5 font-mono">
                  <Hash className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  Ref: {selectedNotice.refNumber}
                </span>
              )}
            </div>

            <div className="mt-5 whitespace-pre-line rounded-xl border border-slate-100 bg-slate-50/80 p-4 text-sm leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
              {selectedNotice.description ||
                "No additional description provided for this notice."}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
              {selectedNotice.file ? (
                <a
                  href={selectedNotice.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-orange-700 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
                >
                  <FileText className="h-4 w-4" />
                  Open Attachment in New Tab
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : (
                <span className="text-xs text-slate-400 dark:text-slate-500">
                  No file attached
                </span>
              )}

              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
