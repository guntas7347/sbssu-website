import Link from "next/link";
import { ArrowUpRight, FolderKanban } from "lucide-react";
import { buildPageUrl } from "@/lib/helpers";
import {
  getPublicScopeDirectory,
  type ScopeDirectoryCategoryItem,
} from "@/lib/actions/public/public-page-categories";

interface MoreDepartmentCategoriesProps {
  deptCode: string;
  deptName?: string | null;
  scope?: string;
  minCode?: number;
}

export async function MoreDepartmentCategories({
  deptCode,
  deptName,
  scope = "all-departments",
  minCode = 208,
}: MoreDepartmentCategoriesProps) {
  const directory = await getPublicScopeDirectory(scope);
  const rawCategories: ScopeDirectoryCategoryItem[] =
    directory?.categories ?? [];

  const categories = rawCategories
    .filter((cat) => {
      const numeric = Number(cat.code);
      return Number.isNaN(numeric) ? true : numeric >= minCode;
    })
    .sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true }));

  if (categories.length === 0) {
    return null;
  }

  const resolvedDeptName = deptName?.trim() || deptCode.toUpperCase();
  const normalizedDeptCode = deptCode.trim().toLowerCase();
  const fallbackDeptHref = `/departments/${encodeURIComponent(normalizedDeptCode)}`;

  return (
    <section
      id="more-categories"
      aria-labelledby="more-categories-heading"
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-[var(--color-secondary,#16a34a)] via-[var(--color-primary,#f97316)] to-[var(--color-primary-dark,#fb923c)]" />

      <div className="p-6 sm:p-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-secondary,#16a34a)]/10 text-[var(--color-secondary,#16a34a)] dark:bg-[var(--color-secondary-dark,#4ade80)]/15 dark:text-[var(--color-secondary-dark,#4ade80)]">
              <FolderKanban className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="more-categories-heading"
                className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl dark:text-white"
              >
                Explore More in {resolvedDeptName}
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Additional academic sections, records & resources for{" "}
                {resolvedDeptName}
              </p>
            </div>
          </div>

          <span className="rounded-full bg-[var(--color-primary,#f97316)]/10 px-3 py-1 text-xs font-bold text-orange-800 dark:bg-[var(--color-primary-dark,#fb923c)]/15 dark:text-[var(--color-primary-dark,#fb923c)]">
            {categories.length}{" "}
            {categories.length === 1 ? "Section" : "Sections"}
          </span>
        </div>

        {/* Category Links Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const title = cat.name?.trim() || "Department Section";
            const builtHref = buildPageUrl({
              html: false,
              scope: directory?.scope || scope,
              catCode: cat.code?.trim() || null,
              slug: null,
              deptCode: normalizedDeptCode,
            });

            const rawFallbackHref = cat.href?.trim();
            const resolvedFallbackHref = rawFallbackHref
              ? rawFallbackHref.includes("[deptCode]")
                ? rawFallbackHref.replace(
                    /\[deptCode\]/g,
                    encodeURIComponent(normalizedDeptCode),
                  )
                : rawFallbackHref
              : fallbackDeptHref;

            const href = builtHref || resolvedFallbackHref;
            const isExternal = /^https?:\/\//i.test(href);

            return (
              <Link
                key={cat.id}
                href={href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-4 transition hover:-translate-y-0.5 hover:border-[var(--color-primary,#f97316)]/45 hover:bg-white hover:shadow-xs dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-[var(--color-primary-dark,#fb923c)]/45 dark:hover:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 transition group-hover:text-[var(--color-primary,#f97316)] sm:text-base dark:text-white dark:group-hover:text-[var(--color-primary-dark,#fb923c)]">
                      {title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {cat.singleEntry
                        ? "Department overview record"
                        : `${cat.entryCount} ${cat.entryCount === 1 ? "item" : "items"} available`}
                    </p>
                  </div>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition group-hover:border-[var(--color-primary,#f97316)]/35 group-hover:text-[var(--color-primary,#f97316)] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:text-[var(--color-primary-dark,#fb923c)]">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-200/70 pt-2.5 text-[11px] font-semibold dark:border-slate-800">
                  <span className="text-[var(--color-secondary,#16a34a)] dark:text-[var(--color-secondary-dark,#4ade80)]">
                    Open Page
                  </span>
                  <span className="rounded-full bg-green-600/10 px-2 py-0.5 text-green-800 dark:bg-green-500/15 dark:text-[var(--color-secondary-dark,#4ade80)]">
                    {cat.entryCount}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
