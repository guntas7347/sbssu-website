"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Bell,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Calendar,
  FileText,
} from "lucide-react";
import { getLatestNoticesCarousel } from "@/lib/actions/notices";
import type { Notice } from "@/db/schema";

export function NoticesSection() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;

    async function loadLatest() {
      try {
        const rows = await getLatestNoticesCarousel(20);
        if (active) {
          setNotices(rows);
          setOffset(0);
        }
      } catch (err) {
        console.error("Failed to load latest notices carousel:", err);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadLatest();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (paused || notices.length <= 1) return;
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % notices.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [paused, notices.length]);

  const orderedNotices =
    notices.length > 0
      ? [...notices.slice(offset), ...notices.slice(0, offset)]
      : [];

  function handleStep(direction: -1 | 1) {
    if (notices.length === 0) return;
    setOffset((prev) => (prev + direction + notices.length) % notices.length);
  }

  return (
    <section
      aria-labelledby="latest-notices-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Section Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold tracking-wider text-orange-700 uppercase dark:bg-orange-400/15 dark:text-orange-300">
            <Bell className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
            Latest 20 Notices
          </span>
          <h2
            id="latest-notices-heading"
            className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Recent Announcements
          </h2>
        </div>

        <div className="flex items-center gap-2.5">
          {notices.length > 1 && (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleStep(-1)}
                aria-label="Move notices left"
                className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => handleStep(1)}
                aria-label="Move notices right"
                className="cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-2 text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}

          <Link
            href="/notices"
            className="inline-flex items-center gap-1.5 rounded-xl bg-green-700 px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-green-800 dark:bg-green-500 dark:text-slate-950 dark:hover:bg-green-400"
          >
            View All Notices
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Moving Track */}
      {loading ? (
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-44 animate-pulse rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
            />
          ))}
        </div>
      ) : orderedNotices.length === 0 ? (
        <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50/60 p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
          No notices published yet.{" "}
          <Link
            href="/notices"
            className="font-semibold text-orange-600 underline dark:text-orange-400"
          >
            Go to Notices
          </Link>
        </div>
      ) : (
        <div className="mt-6 overflow-hidden">
          <div className="flex gap-4 transition-transform duration-500 ease-out">
            {orderedNotices.map((notice) => (
              <Link
                key={notice.id}
                href="/notices"
                className="flex w-72 shrink-0 flex-col justify-between rounded-xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-orange-500 hover:bg-white sm:w-80 dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-orange-400 dark:hover:bg-slate-900"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-bold text-orange-700 dark:bg-orange-400/15 dark:text-orange-300">
                      {notice.category || "General"}
                    </span>
                    {notice.level && (
                      <span className="rounded-full bg-green-50 px-2 py-0.5 text-[10px] font-semibold text-green-800 dark:bg-green-500/15 dark:text-green-300">
                        {notice.level}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 line-clamp-2 text-sm font-bold text-slate-900 dark:text-white">
                    {notice.title}
                  </h3>

                  {notice.description && (
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                      {notice.description}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-3 text-[11px] text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3 w-3 text-green-600 dark:text-green-400" />
                    {new Date(notice.createdAt).toLocaleDateString()}
                  </span>
                  {notice.file && (
                    <span className="inline-flex items-center gap-1 font-semibold text-orange-600 dark:text-orange-400">
                      <FileText className="h-3 w-3" />
                      File
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
