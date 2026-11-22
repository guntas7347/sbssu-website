import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, FileCode2, Layers } from "lucide-react";
import {
  getAllPublicDepartmentEntries,
  getPublicCustomPagesByDept,
} from "@/lib/actions/public/public-page-entries";

export const dynamic = "force-dynamic";

interface DeptCustomPagesProps {
  params: Promise<{ deptCode: string }>;
}

export async function generateMetadata({
  params,
}: DeptCustomPagesProps): Promise<Metadata> {
  const { deptCode } = await params;
  const { department } = await getAllPublicDepartmentEntries(deptCode);

  if (!department) {
    return { title: "Department Not Found | SBSSU" };
  }

  return {
    title: `Custom Pages — ${department.name} (${department.code.toUpperCase()}) | SBSSU`,
    description: `All standalone custom HTML pages published by the ${department.name} at SBSSU Ferozepur.`,
  };
}

export default async function DepartmentCustomPagesDirectory({
  params,
}: DeptCustomPagesProps) {
  const { deptCode } = await params;
  const { department } = await getAllPublicDepartmentEntries(deptCode);

  if (!department) {
    notFound();
  }

  const customPages = await getPublicCustomPagesByDept(department.code);
  const deptSlug = department.code.toLowerCase();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4">
            <Link
              href={`/departments/${deptSlug}`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to {department.code.toUpperCase()} Home
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider uppercase">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
              <FileCode2 className="h-3.5 w-3.5" />
              Custom Pages (#901)
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600/10 px-3 py-1 text-green-700 dark:bg-green-500/15 dark:text-green-400">
              <Layers className="h-3.5 w-3.5" />
              {customPages.length} {customPages.length === 1 ? "Page" : "Pages"}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            {department.name} — Custom Pages
          </h1>
          <p className="mt-2 text-xs text-slate-600 sm:text-sm dark:text-slate-400">
            Standalone custom HTML pages and slugs published under{" "}
            <span className="font-mono text-orange-700 dark:text-orange-400">
              /departments/{deptSlug}/pages/...
            </span>
          </p>
        </header>

        {customPages.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-xs text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No custom HTML pages published for {department.name} yet.
          </div>
        ) : (
          <div className="divide-y divide-slate-200 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
            {customPages.map((pageItem) => (
              <div
                key={pageItem.id}
                className="flex flex-wrap items-center justify-between gap-4 p-5 transition hover:bg-orange-50/30 dark:hover:bg-orange-500/5"
              >
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                      {pageItem.field1?.trim() || pageItem.slug}
                    </h2>
                    <span className="rounded-md bg-green-600/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                      slug: {pageItem.slug}
                    </span>
                  </div>
                  {pageItem.field2 && (
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {pageItem.field2}
                    </p>
                  )}
                  <p className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    {pageItem.href}
                  </p>
                </div>

                <Link
                  href={pageItem.href}
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
                >
                  <span>Open Page</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
