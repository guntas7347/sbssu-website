import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-xs sm:p-12 dark:border-slate-800 dark:bg-slate-900">
          <p className="font-mono text-xs font-bold tracking-widest text-orange-600 uppercase dark:text-orange-400">
            404 Not Found
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Page Not Found
          </h1>

          <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
            The page or resource you requested could not be found on the SBSSU
            website.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
            >
              Back to Home
            </Link>

            <Link
              href="/departments"
              className="inline-flex items-center justify-center rounded-xl border border-green-700/30 bg-green-600/10 px-5 py-2.5 text-xs font-semibold text-green-800 transition hover:bg-green-600/20 dark:border-green-500/30 dark:bg-green-500/15 dark:text-green-300 dark:hover:bg-green-500/25"
            >
              Browse Departments
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
