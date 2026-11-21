"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  ExternalLink,
  FileText,
  Globe,
  Lock,
  Search,
  SquarePen,
  X,
} from "lucide-react";
import { PaginationBar } from "@/components/admin/PaginationBar";
import { AdminPageCategoryItem } from "@/lib/actions/admin/page-categories/getAllPageCategories";

interface PageCategoriesTableClientProps {
  initialCategories: AdminPageCategoryItem[];
}

export function PageCategoriesTableClient({
  initialCategories,
}: PageCategoriesTableClientProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);

  const filteredCategories = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return initialCategories;

    return initialCategories.filter(
      (item) =>
        item.code.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        (item.departmentCode?.toLowerCase().includes(q) ?? false) ||
        (item.departmentName?.toLowerCase().includes(q) ?? false) ||
        (!item.departmentId && "global".includes(q)),
    );
  }, [initialCategories, searchQuery]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCategories.length / pageSize),
  );
  const safePage = Math.min(page, totalPages);

  const paginatedRows = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filteredCategories.slice(start, start + pageSize);
  }, [filteredCategories, safePage, pageSize]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800 dark:bg-slate-900">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Filter by code, name, department, or global..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pr-9 pl-10 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:bg-slate-900"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setPage(1);
              }}
              aria-label="Clear search"
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {filteredCategories.length} matching of {initialCategories.length}{" "}
          total
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/90 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
                <th className="px-5 py-3.5">Code</th>
                <th className="px-5 py-3.5">Page / Category Name</th>
                <th className="px-5 py-3.5">Scope</th>
                <th className="px-5 py-3.5">Route</th>
                <th className="px-5 py-3.5">Entries</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {paginatedRows.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-xs text-slate-500 dark:text-slate-400"
                  >
                    {searchQuery
                      ? `No categories match "${searchQuery}".`
                      : "No page categories found yet."}
                  </td>
                </tr>
              ) : (
                paginatedRows.map((cat) => {
                  const deptSlug = cat.departmentCode?.toLowerCase();
                  const publicHref = deptSlug
                    ? `/departments/${deptSlug}/page/${cat.code}`
                    : `/page/${cat.code}`;

                  return (
                    <tr
                      key={cat.id}
                      className="transition hover:bg-orange-50/30 dark:hover:bg-orange-500/5"
                    >
                      <td className="px-5 py-3.5 font-mono text-xs font-bold text-orange-700 dark:text-orange-400">
                        {cat.code}
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-slate-900 dark:text-white">
                        {cat.name}
                      </td>
                      <td className="px-5 py-3.5">
                        {cat.scope === "department" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                            <Building2 className="h-3 w-3" />
                            <span>
                              {cat.departmentCode
                                ? `DEPT · ${cat.departmentCode.toUpperCase()}`
                                : "DEPARTMENT"}
                            </span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-green-600/10 px-2.5 py-0.5 text-[11px] font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                            <Globe className="h-3 w-3" />
                            <span>
                              {(cat.scope || "university").toUpperCase()}
                            </span>
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        {cat.permanent ? (
                          <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                            internal
                          </span>
                        ) : (
                          <Link
                            href={publicHref}
                            className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 font-mono text-[11px] font-semibold text-slate-700 transition hover:bg-orange-500/10 hover:text-orange-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-orange-400"
                          >
                            <span>{publicHref}</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        )}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          <FileText className="h-3 w-3" />
                          {cat.entryCount}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {cat.canEdit ? (
                          <Link
                            href={`/admin/page-categories/${cat.id}`}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
                          >
                            <SquarePen className="h-3.5 w-3.5" />
                            <span>Edit</span>
                          </Link>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                            <Lock className="h-3 w-3" />
                            <span>Global</span>
                          </span>
                        )}
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
        totalItems={filteredCategories.length}
        page={safePage}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        itemLabel="categories"
      />
    </div>
  );
}
