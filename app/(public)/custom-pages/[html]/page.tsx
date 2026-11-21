import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { loadUniversityCustomPage } from "@/lib/custom-page-loader";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ html: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { html } = await params;
  const page = await loadUniversityCustomPage(html);
  if (!page) {
    return { title: "Page Not Found | SBSSU" };
  }
  return {
    title: `${page.title} | SBSSU`,
  };
}

export default async function UniversityCustomHtmlPage({ params }: PageProps) {
  const { html } = await params;
  const page = await loadUniversityCustomPage(html);

  if (!page) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 border-b border-slate-200 pb-5 dark:border-slate-800">
        <span className="inline-block rounded-full bg-orange-500/10 px-3 py-1 text-xs font-bold tracking-wider text-orange-600 uppercase dark:text-orange-400">
          SBSSU • University Page
        </span>
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
