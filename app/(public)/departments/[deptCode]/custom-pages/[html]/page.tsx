import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { loadDepartmentCustomPage } from "@/lib/custom-page-loader";

export const dynamic = "force-dynamic";

interface DeptPageProps {
  params: Promise<{ deptCode: string; html: string }>;
}

export async function generateMetadata({
  params,
}: DeptPageProps): Promise<Metadata> {
  const { deptCode, html } = await params;
  const page = await loadDepartmentCustomPage(deptCode, html);
  if (!page) {
    return { title: "Page Not Found | SBSSU" };
  }
  return {
    title: `${page.title} | ${page.departmentName ?? deptCode.toUpperCase()} | SBSSU`,
  };
}

export default async function DepartmentCustomHtmlPage({
  params,
}: DeptPageProps) {
  const { deptCode, html } = await params;
  const page = await loadDepartmentCustomPage(deptCode, html);

  if (!page) {
    notFound();
  }

  const deptSlug = (page.departmentCode ?? deptCode).toLowerCase();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider uppercase">
          <Link
            href={`/departments/${deptSlug}`}
            className="rounded-full bg-green-600/10 px-3 py-1 text-green-700 transition hover:bg-green-600/20 dark:text-green-400"
          >
            {page.departmentName ?? deptCode.toUpperCase()}
          </Link>
          <span className="rounded-full bg-orange-500/10 px-3 py-1 text-orange-600 dark:text-orange-400">
            Department Page
          </span>
        </div>

        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          {page.title}
        </h1>
      </header>

      <article
        className="custom-html-content rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        dangerouslySetInnerHTML={{ __html: page.html }}
      />
    </section>
  );
}
