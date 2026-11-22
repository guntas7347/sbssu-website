import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPageEntryByCategoryAndSlug } from "@/lib/actions/public/public-custom-pages";
import { sanitizeHtmlClient } from "@/lib/sanitize-html";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ html: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { html } = await params;
  const entry = await getPageEntryByCategoryAndSlug({
    catCode: "901",
    slug: html,
  });

  if (!entry) {
    return { title: "Page Not Found | SBSSU" };
  }

  const title = entry.field1?.trim() || entry.categoryName || html;

  return {
    title: `${title} | SBSSU`,
    description:
      entry.field2?.trim() ||
      `${title} — Shaheed Bhagat Singh State University, Ferozepur.`,
  };
}

export default async function UniversityCustomHtmlPage({ params }: PageProps) {
  const { html } = await params;
  const entry = await getPageEntryByCategoryAndSlug({
    catCode: "901",
    slug: html,
  });

  if (!entry) {
    notFound();
  }

  const heading = entry.field1?.trim() || entry.categoryName;
  const safeHtml = entry.htmlContent
    ? sanitizeHtmlClient(entry.htmlContent)
    : "";

  const extraFields = [entry.field2, entry.field3, entry.field4, entry.field5]
    .map((v) => v?.trim())
    .filter((v): v is string => Boolean(v));

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 border-b border-slate-200 pb-5 dark:border-slate-800">
        <span className="inline-block rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold tracking-wider text-orange-600 uppercase dark:text-orange-400">
          SBSSU • University Page
        </span>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
          {heading}
        </h1>
        {extraFields.length > 0 && (
          <div className="mt-2 space-y-1">
            {extraFields.map((val, idx) => (
              <p
                key={`uni-field-${idx + 2}`}
                className="whitespace-pre-line text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400"
              >
                {val}
              </p>
            ))}
          </div>
        )}
      </header>

      <article
        className="custom-html-content rounded-2xl border border-slate-200 bg-white p-6 text-slate-800 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </section>
  );
}
