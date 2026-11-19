import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLegacyRecordById,
  getLegacyRecordsByCategory,
  resolveLegacyData,
} from "@/lib/actions/legacy-website";
import type { LegacyWebsite } from "@/db/schema";

type Props = {
  searchParams: Promise<{
    Id?: string;
    mode?: string;
  }>;
};

export default async function LegacyWebsitePage({ searchParams }: Props) {
  const { Id, mode } = await searchParams;

  if (!Id) {
    return (
      <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950">
        <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary dark:bg-secondary-dark/15 dark:text-secondary-dark">
            Archive Viewer
          </span>

          <h1 className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white">
            Legacy Website Preview
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Preview archived pages from the legacy SBSSU portal recreated in the
            new system. Enter an ID below to view the archived content.
          </p>

          <form method="GET" className="mt-6 space-y-4">
            <div>
              <label
                htmlFor="Id"
                className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Legacy Website ID
              </label>

              <input
                id="Id"
                name="Id"
                type="number"
                min="0"
                required
                placeholder="e.g. 1150"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-primary-dark dark:focus:ring-primary-dark/20"
              />
            </div>

            {mode && <input type="hidden" name="mode" value={mode} />}

            <button
              type="submit"
              className="w-full cursor-pointer rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95 dark:bg-primary-dark"
            >
              View Legacy Content
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-slate-700 dark:border-primary-dark/25 dark:bg-primary-dark/10 dark:text-slate-200">
            <h2 className="font-bold text-primary dark:text-primary-dark">
              How do I find the ID?
            </h2>
            <ol className="mt-2 list-decimal space-y-1.5 pl-5 text-xs sm:text-sm">
              <li>Open the original SBSSU website or a legacy link.</li>
              <li>
                Locate the query parameter such as{" "}
                <code className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-xs dark:bg-slate-800">
                  ?Id=1150
                </code>
                .
              </li>
              <li>
                Enter the numeric value after{" "}
                <code className="font-mono text-xs">Id=</code> above.
              </li>
            </ol>
            <p className="mt-2.5 text-xs text-slate-600 dark:text-slate-400">
              For example, in{" "}
              <code className="font-mono">BSSDetail.aspx?Id=1150</code>, the ID
              is <strong>1150</strong>.
            </p>
          </div>

          <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
            Note: Depending on the original ASPX route, an ID may correspond to
            either a single record or an entire category.
          </p>
        </div>
      </main>
    );
  }

  if (!/^\d+$/.test(Id)) {
    notFound();
  }

  const id = Number(Id);

  if (mode === "record") {
    const record = await getLegacyRecordById(id);
    if (!record) notFound();
    return <LegacyLayout id={id} record={record} />;
  }

  if (mode === "category") {
    const records = await getLegacyRecordsByCategory(id);
    if (records.length === 0) notFound();
    return (
      <LegacyLayout id={id} record={records[0]} categoryRecords={records} />
    );
  }

  const data = await resolveLegacyData(id);

  if (data.mode !== "auto") {
    notFound();
  }

  const { recordById, recordsByCategory } = data;

  if (recordById && recordsByCategory.length > 0) {
    return (
      <LegacyLayout id={id}>
        <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary dark:bg-primary-dark/15 dark:text-primary-dark">
            Ambiguous Legacy ID #{id}
          </span>
          <h2 className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white">
            Choose how to view this page
          </h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Both an individual record and a category match ID {id}.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <Link
              href={`/legacy-website?Id=${id}&mode=record`}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-primary hover:bg-primary/5 dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-primary-dark dark:hover:bg-primary-dark/10"
            >
              <div className="text-sm font-bold text-primary dark:text-primary-dark">
                View individual record
              </div>
              <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                {recordById.name || `Record #${recordById.id}`}
              </p>
            </Link>

            <Link
              href={`/legacy-website?Id=${id}&mode=category`}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:border-secondary hover:bg-secondary/5 dark:border-slate-800 dark:bg-slate-800/60 dark:hover:border-secondary-dark dark:hover:bg-secondary-dark/10"
            >
              <div className="text-sm font-bold text-secondary dark:text-secondary-dark">
                View category listing
              </div>
              <p className="mt-1 text-sm font-medium text-slate-700 dark:text-slate-200">
                {recordsByCategory.length} archived{" "}
                {recordsByCategory.length === 1 ? "record" : "records"} found
              </p>
            </Link>
          </div>
        </div>
      </LegacyLayout>
    );
  }

  if (recordById) {
    return <LegacyLayout id={id} record={recordById} />;
  }

  if (recordsByCategory.length > 0) {
    return (
      <LegacyLayout
        id={id}
        record={recordsByCategory[0]}
        categoryRecords={recordsByCategory}
      />
    );
  }

  notFound();
}

function LegacyLayout({
  id,
  record,
  categoryRecords,
  children,
}: {
  id: number;
  record?: LegacyWebsite;
  categoryRecords?: LegacyWebsite[];
  children?: React.ReactNode;
}) {
  return (
    <main className="min-h-[calc(100vh-8rem)] bg-slate-50 px-4 py-10 text-slate-900 sm:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-secondary dark:text-secondary-dark">
              SBSSU Legacy Archive • ID #{id}
            </span>
            <h1 className="text-lg font-extrabold text-slate-900 sm:text-xl dark:text-white">
              {categoryRecords
                ? `Category Archive (${categoryRecords.length} items)`
                : record?.name || "Archived Record"}
            </h1>
          </div>

          <Link
            href="/legacy-website"
            className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-primary-dark dark:hover:text-primary-dark"
          >
            Lookup Another ID
          </Link>
        </div>

        {children ? (
          children
        ) : categoryRecords ? (
          <div className="space-y-6">
            {categoryRecords.map((item) => (
              <LegacyRecordCard key={item.id} item={item} />
            ))}
          </div>
        ) : record ? (
          <LegacyRecordCard item={record} />
        ) : null}
      </div>
    </main>
  );
}

function LegacyRecordCard({ item }: { item: LegacyWebsite }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <span className="font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
            Record #{item.id}
            {item.category !== null ? ` • Category #${item.category}` : ""}
          </span>
          {item.name && (
            <h2 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              {item.name}
            </h2>
          )}
        </div>
        {(item.image || item.company) && (
          <div className="flex flex-wrap items-center gap-2">
            {item.image && (
              <a
                href={`/data/legacy/${item.image}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-95 dark:bg-primary-dark"
              >
                Open Attachment 1
              </a>
            )}

            {item.company && (
              <a
                href={`/data/legacy/${item.company}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-95 dark:bg-primary-dark"
              >
                Open Attachment 2
              </a>
            )}
          </div>
        )}
      </div>

      {item.description ? (
        <div
          className="legacy-content prose prose-slate mt-5 max-w-none overflow-x-auto text-sm leading-relaxed dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      ) : (
        <p className="mt-4 text-sm italic text-slate-500 dark:text-slate-400">
          No HTML description available for this archived record.
        </p>
      )}
    </article>
  );
}
