"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AlertTriangle, FolderTree, Info, Lock } from "lucide-react";
import type { CategoryChoice } from "@/lib/actions/admin/page-entries/getPageEntryForEditor";

interface CategoryScopeSelectorProps {
  selectedCategoryId: string;
  onSelectCategory: (cat: CategoryChoice) => void;
  categories: CategoryChoice[];
  isNewEntry?: boolean;
  onSingleEntryBlockedChange?: (blocked: boolean) => void;
}

export function CategoryScopeSelector({
  selectedCategoryId,
  onSelectCategory,
  categories,
  isNewEntry = true,
  onSingleEntryBlockedChange,
}: CategoryScopeSelectorProps) {
  const pathname = usePathname();
  const activeCategory =
    categories.find((c) => c.id === selectedCategoryId) ?? null;

  const existingEntryHref = activeCategory?.existingEntryId
    ? `/admin/page-entries/${activeCategory.existingEntryId}`
    : null;

  const isAlreadyOnExistingEntry = Boolean(
    existingEntryHref && pathname === existingEntryHref,
  );

  const isSingleEntryBlocked = Boolean(
    isNewEntry &&
    activeCategory?.singleEntry &&
    existingEntryHref &&
    !isAlreadyOnExistingEntry,
  );

  useEffect(() => {
    onSingleEntryBlockedChange?.(isSingleEntryBlocked);
  }, [isSingleEntryBlocked, onSingleEntryBlockedChange]);

  const grouped = new Map<string, CategoryChoice[]>();
  for (const cat of categories) {
    const key = cat.scopeLabel || cat.scope || "General";
    const list = grouped.get(key) ?? [];
    list.push(cat);
    grouped.set(key, list);
  }

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/50">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-200">
            1.{" "}
            {isNewEntry
              ? "Choose Scope & Category"
              : "Assigned Scope & Category"}
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            {isNewEntry
              ? "Select a category for this entry."
              : "Category cannot be changed after the entry is created. You may delete the entry itself."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!isNewEntry && (
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
              <Lock className="h-3 w-3" />
              <span>Locked</span>
            </span>
          )}

          {activeCategory && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-700 dark:text-orange-400">
              <FolderTree className="h-3.5 w-3.5" />
              <span>
                {activeCategory.scopeLabel || activeCategory.scope} ·{" "}
                {activeCategory.code}
              </span>
            </span>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="category-select" className="sr-only">
          Category
        </label>
        <select
          id="category-select"
          value={selectedCategoryId}
          disabled={!isNewEntry}
          onChange={(e) => {
            if (!isNewEntry) return;
            const chosen = categories.find((c) => c.id === e.target.value);
            if (chosen) onSelectCategory(chosen);
          }}
          className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-medium text-slate-900 focus:border-orange-500 focus:outline-none disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 sm:text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-orange-400 dark:disabled:bg-slate-800/70 dark:disabled:text-slate-400"
        >
          <option value="">— Select Category —</option>
          {Array.from(grouped.entries()).map(([scopeTitle, items]) => (
            <optgroup key={scopeTitle} label={scopeTitle}>
              {items.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  [{cat.code}] {cat.name}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {isSingleEntryBlocked && existingEntryHref && (
        <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/40 bg-amber-500/15 px-3.5 py-3 text-xs text-amber-950 dark:border-amber-400/35 dark:bg-amber-500/15 dark:text-amber-100">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
          <div className="space-y-1">
            <p className="font-bold text-amber-900 dark:text-amber-200">
              This category allows only a single entry.
            </p>
            <p>
              An entry already exists for this category. Edit it instead:{" "}
              <Link
                href={existingEntryHref}
                className="font-semibold underline underline-offset-2 hover:text-amber-700 dark:hover:text-amber-300"
              >
                {existingEntryHref}
              </Link>
            </p>
          </div>
        </div>
      )}

      {/* {activeCategory?.note && (
        <div className="flex items-start gap-2.5 rounded-xl border border-orange-500/25 bg-orange-500/10 px-3.5 py-2.5 text-xs text-slate-800 dark:border-orange-400/25 dark:bg-orange-500/10 dark:text-slate-200">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-orange-600 dark:text-orange-400" />
          <div>
            <span className="font-bold text-orange-800 dark:text-orange-300">
              How to fill this category:{" "}
            </span>
            <span>{activeCategory.note}</span>
          </div>
        </div>
      )} */}
    </div>
  );
}
