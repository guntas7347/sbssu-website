import React from "react";
import Link from "next/link";
import {
  Award,
  Briefcase,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  GraduationCap,
  IndianRupee,
  RotateCcw,
  Search,
  TrendingUp,
} from "lucide-react";
import { getPaginatedPlacements } from "@/lib/actions/placements";

type PageProps = {
  searchParams: Promise<{
    page?: string;
    q?: string;
    year?: string;
    branch?: string;
    course?: string;
  }>;
};

const PLACEMENTS_PAGE_SIZE = 100;

function buildPageHref(
  baseParams: {
    q?: string;
    year?: string;
    branch?: string;
    course?: string;
  },
  targetPage: number,
): string {
  const sp = new URLSearchParams();
  if (targetPage > 1) sp.set("page", String(targetPage));
  if (baseParams.q) sp.set("q", baseParams.q);
  if (baseParams.year) sp.set("year", baseParams.year);
  if (baseParams.branch) sp.set("branch", baseParams.branch);
  if (baseParams.course) sp.set("course", baseParams.course);
  const qs = sp.toString();
  return qs ? `?${qs}` : "/placements";
}

function getVisiblePages(
  current: number,
  total: number,
): Array<number | "..."> {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }
  const pages: Array<number | "..."> = [1];
  if (current > 3) pages.push("...");
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let p = start; p <= end; p++) {
    pages.push(p);
  }
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}

function formatPackage(pkg: string | null): string {
  const trimmed = pkg?.trim();
  if (!trimmed) return "—";
  const num = Number(trimmed);
  if (!Number.isNaN(num)) {
    return `${Number.isInteger(num) ? num : num.toFixed(2)} LPA`;
  }
  return trimmed.toLowerCase().endsWith("lpa") ? trimmed : `${trimmed} LPA`;
}

export default async function PlacementsPage({ searchParams }: PageProps) {
  const resolved = await searchParams;

  const page =
    resolved.page && /^\d+$/.test(resolved.page) ? Number(resolved.page) : 1;
  const q = resolved.q?.trim() || undefined;
  const year =
    resolved.year && /^\d{4}$/.test(resolved.year)
      ? Number(resolved.year)
      : undefined;
  const branch = resolved.branch?.trim() || undefined;
  const course = resolved.course?.trim() || undefined;

  const {
    records,
    totalCount,
    totalPages,
    currentPage,
    pageSize,
    filters,
    stats,
  } = await getPaginatedPlacements({
    page,
    pageSize: PLACEMENTS_PAGE_SIZE,
    search: q,
    passingYear: year,
    branch,
    course,
  });

  const hasActiveFilters = Boolean(q || year || branch || course);
  const startRecord = totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endRecord = Math.min(currentPage * pageSize, totalCount);

  const preservedParams = {
    q,
    year: year ? String(year) : undefined,
    branch,
    course,
  };

  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Header Banner */}
      <section className="relative overflow-hidden border-b border-neutral-200/80 bg-white dark:border-neutral-800/80 dark:bg-neutral-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-400/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 left-8 h-72 w-72 rounded-full bg-green-600/10 blur-3xl dark:bg-green-400/10"
        />

        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-orange-700 uppercase dark:border-orange-400/25 dark:bg-orange-500/10 dark:text-orange-300">
                <span className="h-2 w-2 rounded-full bg-green-600 dark:bg-green-400" />
                Career Development Centre • Placement Archive
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
                Student{" "}
                <span className="text-orange-600 dark:text-orange-400">
                  Placement Records
                </span>
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base dark:text-neutral-300">
                Campus placement and internship-cum-placement records across
                Shaheed Bhagat Singh State University, Ferozepur.
              </p>
            </div>

            <Link
              href="/tnp"
              className="inline-flex items-center gap-2 self-start rounded-xl border border-green-600/30 bg-green-50 px-4 py-2.5 text-sm font-semibold text-green-800 transition hover:bg-green-100 lg:self-auto dark:border-green-400/30 dark:bg-green-500/10 dark:text-green-300 dark:hover:bg-green-500/20"
            >
              <Briefcase className="h-4 w-4" />
              T&P Cell Directory
            </Link>
          </div>

          {/* Summary KPI Cards */}
          <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-2xl border border-neutral-200/90 bg-neutral-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                  Total Selections
                </span>
                <Award className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="mt-2 text-2xl font-bold text-neutral-900 dark:text-white">
                {stats.totalOffers.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/90 bg-neutral-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                  Recruiting Companies
                </span>
                <Building2 className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <p className="mt-2 text-2xl font-bold text-neutral-900 dark:text-white">
                {stats.uniqueCompanies.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/90 bg-neutral-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                  Highest Package
                </span>
                <TrendingUp className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              </div>
              <p className="mt-2 text-2xl font-bold text-neutral-900 dark:text-white">
                {stats.highestPackage !== null
                  ? `${stats.highestPackage} LPA`
                  : "—"}
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200/90 bg-neutral-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                  Average Package
                </span>
                <IndianRupee className="h-4 w-4 text-green-600 dark:text-green-400" />
              </div>
              <p className="mt-2 text-2xl font-bold text-neutral-900 dark:text-white">
                {stats.averagePackage !== null
                  ? `${stats.averagePackage} LPA`
                  : "—"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Bar & Records Section */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <form
          method="GET"
          action="/placement/records"
          className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-xs sm:p-5 dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-12">
            <div className="relative sm:col-span-2 lg:col-span-5">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                name="q"
                defaultValue={q ?? ""}
                placeholder="Search student, company, job role, or month..."
                aria-label="Search placement records"
                className="w-full rounded-xl border border-neutral-300 bg-white py-2.5 pr-3.5 pl-10 text-sm text-neutral-900 placeholder-neutral-400 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder-neutral-500 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
              />
            </div>

            <div className="lg:col-span-2">
              <select
                name="year"
                defaultValue={year ? String(year) : ""}
                aria-label="Filter by passing year"
                className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
              >
                <option value="">All Passing Years</option>
                {filters.years.map((y) => (
                  <option key={y} value={y}>
                    Batch {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-2">
              <select
                name="course"
                defaultValue={course ?? ""}
                aria-label="Filter by course"
                className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
              >
                <option value="">All Courses</option>
                {filters.courses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 lg:col-span-3">
              <select
                name="branch"
                defaultValue={branch ?? ""}
                aria-label="Filter by branch"
                className="w-full rounded-xl border border-neutral-300 bg-white px-3.5 py-2.5 text-sm text-neutral-900 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
              >
                <option value="">All Branches</option>
                {filters.branches.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:text-neutral-950 dark:hover:bg-orange-400"
              >
                <Filter className="h-4 w-4" />
                Apply
              </button>

              {hasActiveFilters && (
                <Link
                  href="/placements"
                  title="Reset all filters"
                  className="inline-flex shrink-0 items-center justify-center rounded-xl border border-neutral-300 p-2.5 text-neutral-600 transition hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                >
                  <RotateCcw className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </form>

        {/* Range & Page Status Bar */}
        <div className="mt-6 flex flex-col justify-between gap-2 text-sm text-neutral-600 sm:flex-row sm:items-center dark:text-neutral-400">
          <p>
            Showing{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              {startRecord.toLocaleString("en-IN")}–
              {endRecord.toLocaleString("en-IN")}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              {totalCount.toLocaleString("en-IN")}
            </span>{" "}
            placement records ({pageSize} per page)
          </p>
          <p>
            Page{" "}
            <span className="font-semibold text-orange-600 dark:text-orange-400">
              {currentPage}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-neutral-900 dark:text-white">
              {totalPages}
            </span>
          </p>
        </div>

        {records.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-neutral-300 bg-white p-12 text-center dark:border-neutral-700 dark:bg-neutral-900">
            <GraduationCap className="mx-auto h-10 w-10 text-neutral-400" />
            <h2 className="mt-3 text-base font-semibold text-neutral-900 dark:text-white">
              No placement records found
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Try clearing your filters or searching with a different keyword.
            </p>
            {hasActiveFilters && (
              <Link
                href="/placements"
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white hover:bg-orange-700 dark:bg-orange-500 dark:text-neutral-950"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset Filters
              </Link>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="mt-4 hidden overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs lg:block dark:border-neutral-800 dark:bg-neutral-900">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-neutral-200 text-left text-sm dark:divide-neutral-800">
                  <thead className="bg-neutral-100/80 text-xs font-semibold tracking-wider text-neutral-600 uppercase dark:bg-neutral-950/80 dark:text-neutral-400">
                    <tr>
                      <th scope="col" className="w-16 px-4 py-3.5">
                        Sr.
                      </th>
                      <th scope="col" className="px-4 py-3.5">
                        Student Name
                      </th>
                      <th scope="col" className="px-4 py-3.5">
                        Course & Branch
                      </th>
                      <th scope="col" className="px-4 py-3.5">
                        Company Name
                      </th>
                      <th scope="col" className="px-4 py-3.5">
                        Job Title
                      </th>
                      <th scope="col" className="px-4 py-3.5">
                        Package
                      </th>
                      <th scope="col" className="px-4 py-3.5 text-right">
                        Month / Year
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
                    {records.map((item, idx) => {
                      const displaySr =
                        item.sr?.trim() ||
                        String((currentPage - 1) * pageSize + idx + 1);
                      return (
                        <tr
                          key={item.id}
                          className="transition hover:bg-orange-50/40 dark:hover:bg-orange-500/5"
                        >
                          <td className="px-4 py-3.5 font-mono text-xs text-neutral-500 dark:text-neutral-400">
                            {displaySr}
                          </td>
                          <td className="px-4 py-3.5 font-semibold text-neutral-900 dark:text-white">
                            {item.studentName?.trim() || "—"}
                          </td>
                          <td className="px-4 py-3.5">
                            <div className="flex items-center gap-1.5">
                              {item.course?.trim() && (
                                <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                                  {item.course.trim()}
                                </span>
                              )}
                              {item.branch?.trim() && (
                                <span className="rounded-md bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
                                  {item.branch.trim()}
                                </span>
                              )}
                              {!item.course?.trim() && !item.branch?.trim() && (
                                <span className="text-neutral-400">—</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3.5 font-medium text-neutral-800 dark:text-neutral-200">
                            {item.companyName?.trim() || "—"}
                          </td>
                          <td className="max-w-xs px-4 py-3.5 text-neutral-600 dark:text-neutral-300">
                            {item.jobTitle?.trim() || "—"}
                          </td>
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-500/10 dark:text-green-300">
                              {formatPackage(item.packageLpa)}
                            </span>
                          </td>
                          <td className="px-4 py-3.5 text-right text-xs whitespace-nowrap text-neutral-600 dark:text-neutral-400">
                            {item.month?.trim() || item.passingYear !== null ? (
                              <>
                                {item.month?.trim() && (
                                  <span className="font-medium text-neutral-800 dark:text-neutral-200">
                                    {item.month.trim()}
                                  </span>
                                )}
                                {item.month?.trim() && item.passingYear !== null
                                  ? " • "
                                  : ""}
                                {item.passingYear !== null
                                  ? item.passingYear
                                  : ""}
                              </>
                            ) : (
                              "—"
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile & Tablet Card List */}
            <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:hidden">
              {records.map((item, idx) => {
                const displaySr =
                  item.sr?.trim() ||
                  String((currentPage - 1) * pageSize + idx + 1);
                return (
                  <article
                    key={item.id}
                    className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-4 shadow-xs dark:border-neutral-800 dark:bg-neutral-900"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="font-mono text-[11px] text-neutral-400">
                            #{displaySr}
                          </span>
                          <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                            {item.studentName?.trim() || "—"}
                          </h3>
                        </div>
                        <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-500/10 dark:text-green-300">
                          {formatPackage(item.packageLpa)}
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center gap-1.5">
                        {item.course?.trim() && (
                          <span className="rounded-md bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                            {item.course.trim()}
                          </span>
                        )}
                        {item.branch?.trim() && (
                          <span className="rounded-md bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
                            {item.branch.trim()}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 space-y-1 text-sm">
                        <p className="font-semibold text-neutral-800 dark:text-neutral-200">
                          {item.companyName?.trim() || "—"}
                        </p>
                        <p className="text-xs leading-relaxed text-neutral-600 dark:text-neutral-400">
                          {item.jobTitle?.trim() || "—"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between border-t border-neutral-100 pt-2.5 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                        {item.month?.trim() || "—"}
                      </span>
                      <span>
                        {item.passingYear !== null
                          ? `Batch ${item.passingYear}`
                          : "—"}
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Pagination Footer (100 per page) */}
            {totalPages > 1 && (
              <nav
                aria-label="Placement records pagination"
                className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white px-4 py-4 shadow-xs sm:flex-row sm:px-6 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Records{" "}
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {startRecord}–{endRecord}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-neutral-900 dark:text-white">
                    {totalCount}
                  </span>
                </p>

                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  <Link
                    href={buildPageHref(preservedParams, 1)}
                    aria-disabled={currentPage === 1}
                    tabIndex={currentPage === 1 ? -1 : undefined}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-medium transition ${
                      currentPage === 1
                        ? "pointer-events-none border-neutral-200 text-neutral-300 dark:border-neutral-800 dark:text-neutral-600"
                        : "border-neutral-300 text-neutral-700 hover:border-orange-500/50 hover:text-orange-600 dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-orange-400"
                    }`}
                    title="First page"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Link>

                  <Link
                    href={buildPageHref(
                      preservedParams,
                      Math.max(1, currentPage - 1),
                    )}
                    aria-disabled={currentPage === 1}
                    tabIndex={currentPage === 1 ? -1 : undefined}
                    className={`inline-flex h-9 items-center gap-1 rounded-xl border px-3 text-xs font-semibold transition ${
                      currentPage === 1
                        ? "pointer-events-none border-neutral-200 text-neutral-300 dark:border-neutral-800 dark:text-neutral-600"
                        : "border-neutral-300 text-neutral-700 hover:border-orange-500/50 hover:text-orange-600 dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-orange-400"
                    }`}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </Link>

                  {visiblePages.map((p, i) =>
                    p === "..." ? (
                      <span
                        key={`ellipsis-${i}`}
                        className="px-2 text-xs text-neutral-400"
                      >
                        ...
                      </span>
                    ) : (
                      <Link
                        key={p}
                        href={buildPageHref(preservedParams, p)}
                        aria-current={p === currentPage ? "page" : undefined}
                        className={`inline-flex h-9 min-w-9 items-center justify-center rounded-xl px-3 text-xs font-semibold transition ${
                          p === currentPage
                            ? "bg-orange-600 text-white shadow-xs dark:bg-orange-500 dark:text-neutral-950"
                            : "border border-neutral-300 text-neutral-700 hover:border-orange-500/50 hover:text-orange-600 dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-orange-400"
                        }`}
                      >
                        {p}
                      </Link>
                    ),
                  )}

                  <Link
                    href={buildPageHref(
                      preservedParams,
                      Math.min(totalPages, currentPage + 1),
                    )}
                    aria-disabled={currentPage === totalPages}
                    tabIndex={currentPage === totalPages ? -1 : undefined}
                    className={`inline-flex h-9 items-center gap-1 rounded-xl border px-3 text-xs font-semibold transition ${
                      currentPage === totalPages
                        ? "pointer-events-none border-neutral-200 text-neutral-300 dark:border-neutral-800 dark:text-neutral-600"
                        : "border-neutral-300 text-neutral-700 hover:border-orange-500/50 hover:text-orange-600 dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-orange-400"
                    }`}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Link>

                  <Link
                    href={buildPageHref(preservedParams, totalPages)}
                    aria-disabled={currentPage === totalPages}
                    tabIndex={currentPage === totalPages ? -1 : undefined}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-medium transition ${
                      currentPage === totalPages
                        ? "pointer-events-none border-neutral-200 text-neutral-300 dark:border-neutral-800 dark:text-neutral-600"
                        : "border-neutral-300 text-neutral-700 hover:border-orange-500/50 hover:text-orange-600 dark:border-neutral-700 dark:text-neutral-200 dark:hover:text-orange-400"
                    }`}
                    title="Last page"
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Link>
                </div>
              </nav>
            )}
          </>
        )}
      </section>
    </main>
  );
}
