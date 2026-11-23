import Link from "next/link";
import { ArrowRight, ChevronRight, FolderOpen, Home } from "lucide-react";
import type { PublicScopeDirectoryData } from "@/lib/actions/public/public-page-categories";

interface ScopeDirectoryRendererProps {
  data: PublicScopeDirectoryData;
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

export function ScopeDirectoryRenderer({ data }: ScopeDirectoryRendererProps) {
  const heading = formatScopeHeading(data.scope);

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6 lg:py-10">
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
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {heading}
          </span>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary)]/10 px-3 py-0.5 text-[11px] font-bold tracking-wider text-[var(--color-primary)] uppercase dark:bg-[var(--color-primary-dark)]/15 dark:text-[var(--color-primary-dark)]">
              Portal Section
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              {heading} — Pages & Resources
            </h1>
          </div>

          <span className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {data.categories.length}{" "}
            {data.categories.length === 1 ? "Section" : "Sections"}
          </span>
        </div>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data.categories.map((cat) => (
          <Link
            key={cat.id}
            href={cat.href}
            className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition hover:border-[var(--color-primary)]/50 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-[var(--color-primary-dark)]/50"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] dark:bg-[var(--color-primary-dark)]/15 dark:text-[var(--color-primary-dark)]">
                  <FolderOpen className="h-4 w-4" />
                </span>

                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  {cat.entryCount} {cat.entryCount === 1 ? "item" : "items"}
                </span>
              </div>

              <h2 className="text-base font-bold leading-snug text-slate-900 group-hover:text-[var(--color-primary)] dark:text-white dark:group-hover:text-[var(--color-primary-dark)]">
                {cat.name}
              </h2>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-xs font-semibold text-[var(--color-secondary)] dark:border-slate-800/80 dark:text-[var(--color-secondary-dark)]">
              <span>View Page</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
