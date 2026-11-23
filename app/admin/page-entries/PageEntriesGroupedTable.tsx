"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  ChevronDown,
  ChevronRight,
  Code2,
  ExternalLink,
  FileCheck2,
  FolderOpen,
  Globe,
  Link2,
  SquarePen,
} from "lucide-react";
import type { AdminPageEntryItem } from "@/lib/actions/admin/page-entries/getPageEntries";

interface CategoryGroup {
  key: string;
  pageCategoryId: string;
  categoryCode: string;
  categoryName: string;
  categoryScope: string;
  departmentId: string | null;
  departmentCode: string | null;
  departmentName: string | null;
  entries: AdminPageEntryItem[];
}

function formatSecondaryFields(item: AdminPageEntryItem): string {
  const parts = [item.field2, item.field3, item.field4, item.field5]
    .map((v) => v?.trim())
    .filter((v): v is string => Boolean(v));
  return parts.length > 0 ? parts.join(" | ") : "";
}

const DEPARTMENT_SCOPES = new Set(["department", "all-departments"]);

function getPublicHref(item: AdminPageEntryItem): string {
  const scopeSlug = (item.categoryScope || "university").trim().toLowerCase();
  const catSlug = item.categoryCode.trim().toLowerCase();
  const deptSlug = item.departmentCode?.trim().toLowerCase() || null;
  const isCustom = Boolean(item.slug || item.htmlPath || item.htmlContent);

  if (isCustom && item.slug) {
    return deptSlug
      ? `/departments/${deptSlug}/custom-pages/${item.slug}`
      : `/custom-pages/${item.slug}`;
  }

  if (DEPARTMENT_SCOPES.has(scopeSlug) && deptSlug) {
    return `/pages/${scopeSlug}/${deptSlug}/${catSlug}`;
  }

  return `/pages/${scopeSlug}/${catSlug}`;
}

export function PageEntriesGroupedTable({
  entries,
  isSearching = false,
}: {
  entries: AdminPageEntryItem[];
  isSearching?: boolean;
}) {
  const [expandedKeys, setExpandedKeys] = useState<Record<string, boolean>>({});

  const groups = useMemo<CategoryGroup[]>(() => {
    const map = new Map<string, CategoryGroup>();

    for (const item of entries) {
      const key = `${item.pageCategoryId}::${item.departmentId ?? "global"}`;
      let group = map.get(key);
      if (!group) {
        group = {
          key,
          pageCategoryId: item.pageCategoryId,
          categoryCode: item.categoryCode,
          categoryName: item.categoryName,
          categoryScope: item.categoryScope,
          departmentId: item.departmentId,
          departmentCode: item.departmentCode,
          departmentName: item.departmentName,
          entries: [],
        };
        map.set(key, group);
      }
      group.entries.push(item);
    }

    for (const group of map.values()) {
      group.entries.sort((a, b) => a.displayOrder - b.displayOrder);
    }

    return Array.from(map.values());
  }, [entries]);

  const toggleGroup = (key: string) => {
    setExpandedKeys((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const setAll = (open: boolean) => {
    const next: Record<string, boolean> = {};
    for (const g of groups) next[g.key] = open;
    setExpandedKeys(next);
  };

  if (groups.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-5 py-10 text-center text-xs text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        No page entries match the current search or filter.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between px-1 text-xs text-slate-500 dark:text-slate-400">
        <span>
          {groups.length} {groups.length === 1 ? "category" : "categories"}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAll(true)}
            className="font-semibold text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400"
          >
            Expand all
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => setAll(false)}
            className="font-semibold text-slate-600 hover:text-orange-600 dark:text-slate-300 dark:hover:text-orange-400"
          >
            Collapse all
          </button>
        </div>
      </div>

      {groups.map((group) => {
        const isOpen = isSearching || Boolean(expandedKeys[group.key]);

        return (
          <div
            key={group.key}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <button
              type="button"
              onClick={() => toggleGroup(group.key)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-5 py-3.5 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/60"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </span>

                <FolderOpen className="h-4 w-4 shrink-0 text-orange-600 dark:text-orange-400" />

                <span className="shrink-0 rounded bg-orange-500/10 px-2 py-0.5 font-mono text-xs font-bold text-orange-700 dark:text-orange-400">
                  {group.categoryCode}
                </span>

                <span className="truncate text-sm font-bold text-slate-900 dark:text-white">
                  {group.categoryName}
                </span>

                {group.departmentId ? (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                    <Building2 className="h-3 w-3" />
                    <span>{group.departmentCode?.toUpperCase() || "Dept"}</span>
                  </span>
                ) : (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-green-600/10 px-2.5 py-0.5 text-[11px] font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                    <Globe className="h-3 w-3" />
                    <span>{group.categoryScope || "University"}</span>
                  </span>
                )}
              </div>

              <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 font-mono text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {group.entries.length}{" "}
                {group.entries.length === 1 ? "entry" : "entries"}
              </span>
            </button>

            {isOpen && (
              <div className="overflow-x-auto border-t border-slate-200 dark:border-slate-800">
                <table className="w-full border-collapse text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/90 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
                      <th className="w-16 px-5 py-2.5">Order</th>
                      <th className="px-5 py-2.5">Fields</th>
                      <th className="px-5 py-2.5">Assets / Route</th>
                      <th className="px-5 py-2.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {group.entries.map((item) => {
                      const hasFile = Boolean(item.file1 || item.file2);
                      const hasLink = Boolean(item.link1 || item.link2);
                      const isCustom = Boolean(
                        item.slug || item.htmlPath || item.htmlContent,
                      );
                      const publicHref = getPublicHref(item);
                      const secondaryFields = formatSecondaryFields(item);

                      return (
                        <tr
                          key={item.id}
                          className="transition hover:bg-orange-50/30 dark:hover:bg-orange-500/5"
                        >
                          <td className="px-5 py-3 font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                            {item.displayOrder}
                          </td>
                          <td className="px-5 py-3">
                            <div className="font-semibold text-slate-900 dark:text-white">
                              {item.field1 || ""}
                            </div>
                            <div className="mt-0.5 line-clamp-1 text-xs text-slate-500 dark:text-slate-400">
                              {secondaryFields}
                            </div>
                          </td>
                          <td className="px-5 py-3">
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
                                target="_blank"
                                className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[11px] text-slate-600 transition hover:bg-orange-500/10 hover:text-orange-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-orange-400"
                              >
                                <span>View</span>
                                <ExternalLink className="h-3 w-3" />
                              </Link>
                            </div>
                          </td>
                          <td className="px-5 py-3 text-right">
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
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
