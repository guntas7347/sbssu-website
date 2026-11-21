import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Layers } from "lucide-react";
import { getAllPublicDepartments } from "@/lib/actions/public/public-page-entries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Academic Departments | SBSSU",
  description:
    "Browse academic departments at Shaheed Bhagat Singh State University, Ferozepur.",
};

export default async function DepartmentsDirectoryPage() {
  const departments = await getAllPublicDepartments();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider uppercase">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
              <Layers className="h-3.5 w-3.5" />
              SBSSU Ferozepur
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600/10 px-3 py-1 text-green-700 dark:bg-green-500/15 dark:text-green-400">
              <Building2 className="h-3.5 w-3.5" />
              {departments.length}{" "}
              {departments.length === 1 ? "Department" : "Departments"}
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
            Academic Departments
          </h1>
          <p className="mt-2 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
            Select a department to view its overview, vision and mission, HOD
            details, courses offered, faculty, and resources.
          </p>
        </header>

        {/* Basic Department Cards */}
        {departments.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-xs text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No departments available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => {
              const slug = dept.code.toLowerCase();
              return (
                <Link
                  key={dept.id}
                  href={`/departments/${slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs transition hover:border-orange-500/50 hover:bg-orange-50/30 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-orange-400/50 dark:hover:bg-orange-500/5"
                >
                  <div className="min-w-0">
                    <span className="inline-block rounded-md bg-green-600/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-green-700 uppercase dark:bg-green-500/15 dark:text-green-400">
                      {dept.code}
                    </span>
                    <h2 className="mt-2 text-sm font-bold text-slate-900 transition group-hover:text-orange-600 sm:text-base dark:text-white dark:group-hover:text-orange-400">
                      {dept.name}
                    </h2>
                  </div>

                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-orange-600 dark:group-hover:text-orange-400" />
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
