"use client";

import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  backHref?: string;
  backLabel?: string;
  actionLabel?: string;
  actionHref?: string;
  onActionClick?: () => void;
}

export function AdminPageHeader({
  title,
  description,
  badge,
  backHref,
  backLabel = "Back",
  actionLabel,
  actionHref,
  onActionClick,
}: AdminPageHeaderProps) {
  return (
    <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-7 dark:border-slate-800 dark:bg-slate-900">
      {backHref && (
        <div className="mb-3">
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{backLabel}</span>
          </Link>
        </div>
      )}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            {badge && (
              <span className="inline-flex items-center rounded-full bg-orange-500/10 px-3 py-1 text-[11px] font-bold tracking-wider text-orange-700 uppercase dark:bg-orange-500/15 dark:text-orange-400">
                {badge}
              </span>
            )}
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
              {title}
            </h1>
          </div>

          {description && (
            <p className="text-xs text-slate-600 sm:text-sm dark:text-slate-400">
              {description}
            </p>
          )}
        </div>

        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
          >
            <Plus className="h-4 w-4" />
            <span>{actionLabel}</span>
          </Link>
        )}

        {actionLabel && !actionHref && onActionClick && (
          <button
            type="button"
            onClick={onActionClick}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-orange-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
          >
            <Plus className="h-4 w-4" />
            <span>{actionLabel}</span>
          </button>
        )}
      </div>
    </header>
  );
}
