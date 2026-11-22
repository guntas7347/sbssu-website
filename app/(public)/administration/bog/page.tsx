import type { Metadata } from "next";
import { ExternalLink, FileText, Landmark } from "lucide-react";
import { getPageCategory } from "@/lib/actions/public/public-page-categories";

export const metadata: Metadata = {
  title:
    "Board of Governors | Shaheed Bhagat Singh State University, Ferozepur",
  description:
    "Board of Governors of Shaheed Bhagat Singh State University (SBSSU), Ferozepur.",
};

export default async function BoardOfGovernorsPage() {
  const { category, entries } = await getPageCategory("101", "university");

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold tracking-wider text-orange-700 uppercase dark:bg-orange-500/15 dark:text-orange-400">
            <Landmark className="h-3.5 w-3.5" />
            Governance
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {category?.name || "Board of Governors"}
          </h1>

          {category?.note && (
            <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
              {category.note}
            </p>
          )}
        </header>

        {entries.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No Board of Governors records available yet.
          </div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry) => (
              <article
                key={entry.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-orange-500/40 sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900 dark:hover:border-orange-400/40"
              >
                <div className="space-y-1">
                  {entry.title && (
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      {entry.title}
                    </h2>
                  )}

                  {entry.desc && (
                    <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
                      {entry.desc}
                    </p>
                  )}
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {entry.file1 && (
                    <a
                      href={entry.file1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-orange-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>File 1</span>
                    </a>
                  )}
                  {entry.file2 && (
                    <a
                      href={entry.file2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl bg-orange-600 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>File 2</span>
                    </a>
                  )}
                  {entry.link1 && (
                    <a
                      href={entry.link1}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-orange-500/40 hover:text-orange-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-orange-400/40 dark:hover:text-orange-300"
                    >
                      <span>Link 1</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {entry.link2 && (
                    <a
                      href={entry.link2}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-orange-500/40 hover:text-orange-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-orange-400/40 dark:hover:text-orange-300"
                    >
                      <span>Link 2</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
