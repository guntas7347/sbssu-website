import Link from "next/link";
import { Building2, ChevronRight, Home } from "lucide-react";
import { EntryAccordionView } from "@/components/category-views/EntryAccordionView";
import { EntryArticleView } from "@/components/category-views/EntryArticleView";
import { EntryCardsView } from "@/components/category-views/EntryCardsView";
import { EntryListView } from "@/components/category-views/EntryListView";
import { EntryTableView } from "@/components/category-views/EntryTableView";
import type { PublicCategoryPageData } from "@/lib/actions/public/public-page-categories";

interface CategoryPageRendererProps {
  data: PublicCategoryPageData;
}

function formatScopeHeading(scope: string): string {
  return scope
    .split("-")
    .map((part) =>
      part.length <= 3
        ? part.toUpperCase()
        : part.charAt(0).toUpperCase() + part.slice(1),
    )
    .join(" ");
}

export function CategoryPageRenderer({ data }: CategoryPageRendererProps) {
  const { category, department, entries } = data;
  const deptCode = department?.code ?? null;

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:py-10">
      {/* Breadcrumb + Header Card */}
      <header className="space-y-3 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 transition hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)]"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
          </Link>

          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="capitalize">
            {formatScopeHeading(category.scope)}
          </span>

          {department && (
            <>
              <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
              <Link
                href={`/departments/${department.code.toLowerCase()}`}
                className="transition hover:text-[var(--color-primary)] dark:hover:text-[var(--color-primary-dark)]"
              >
                {department.name}
              </Link>
            </>
          )}

          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {category.name}
          </span>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)]/10 px-3 py-0.5 text-[11px] font-bold tracking-wider text-[var(--color-primary)] uppercase dark:bg-[var(--color-primary-dark)]/15 dark:text-[var(--color-primary-dark)]">
              {formatScopeHeading(category.scope)}
            </span>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {category.name}
            </h1>
          </div>

          {department && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-secondary)]/10 px-3.5 py-1.5 text-xs font-semibold text-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)]/15 dark:text-[var(--color-secondary-dark)]">
              <Building2 className="h-3.5 w-3.5" />
              <span>{department.name}</span>
            </span>
          )}
        </div>
      </header>

      {/* Dynamic View Switcher */}
      {category.uiLayout === "table" && (
        <EntryTableView
          entries={entries}
          category={category}
          deptCode={deptCode}
        />
      )}
      {category.uiLayout === "cards" && (
        <EntryCardsView
          entries={entries}
          category={category}
          deptCode={deptCode}
        />
      )}
      {category.uiLayout === "accordion" && (
        <EntryAccordionView
          entries={entries}
          category={category}
          deptCode={deptCode}
        />
      )}
      {category.uiLayout === "article" && (
        <EntryArticleView
          entries={entries}
          category={category}
          deptCode={deptCode}
        />
      )}
      {category.uiLayout === "list" && (
        <EntryListView
          entries={entries}
          category={category}
          deptCode={deptCode}
        />
      )}
    </main>
  );
}
