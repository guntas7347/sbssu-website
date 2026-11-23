import Link from "next/link";
import {
  Compass,
  ExternalLink,
  Eye,
  FileText,
  Globe,
  Hourglass,
  Layers,
  StickyNote,
} from "lucide-react";
import { buildPageUrl } from "@/lib/helpers";
import type {
  PublicCategoryPageData,
  RawCategoryEntry,
} from "@/lib/actions/public/public-page-categories";

interface Vision202Props {
  deptCode: string;
  data: PublicCategoryPageData | null;
}

function sortEntries(entries: RawCategoryEntry[]): RawCategoryEntry[] {
  return [...entries].sort((a, b) => {
    const orderA = a.displayOrder ?? 0;
    const orderB = b.displayOrder ?? 0;
    if (orderA !== orderB) return orderA - orderB;
    return (a.field1 ?? "").localeCompare(b.field1 ?? "");
  });
}

function isImagePath(url?: string | null): boolean {
  const clean = (url ?? "").trim();
  if (!clean) return false;
  return /\.(png|jpe?g|webp|gif|avif|svg)(\?|#|$)/i.test(clean);
}

export function Vision202({ deptCode, data }: Vision202Props) {
  if (!data || !data.entries || data.entries.length === 0) {
    return null;
  }

  const { category, department } = data;
  const entries = sortEntries(data.entries);
  const sectionTitle = category.name?.trim() || "Vision";
  const deptName = department?.name?.trim() || deptCode.toUpperCase();

  const labels = {
    field1: category.field1Label?.trim() || "Vision Title",
    field2: category.field2Label?.trim() || "Vision Statement",
    field3: category.field3Label?.trim() || "Strategic Focus",
    field4: category.field4Label?.trim() || "Long-Term Horizon",
    field5: category.field5Label?.trim() || "Notes",
    file1: category.file1Label?.trim() || "Vision Document",
    file2: category.file2Label?.trim() || "Secondary File",
    link1: category.link1Label?.trim() || "Vision Reference Link",
    link2: category.link2Label?.trim() || "Secondary Link",
  };

  return (
    <section
      id="vision-202"
      aria-labelledby="vision-202-heading"
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Top Accent Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[var(--color-secondary,#16a34a)] via-[var(--color-secondary-dark,#4ade80)] to-[var(--color-primary,#f97316)]" />

      <div className="p-6 sm:p-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-secondary,#16a34a)]/10 text-[var(--color-secondary,#16a34a)] dark:bg-[var(--color-secondary-dark,#4ade80)]/15 dark:text-[var(--color-secondary-dark,#4ade80)]">
              <Eye className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  id="vision-202-heading"
                  className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl dark:text-white"
                >
                  {sectionTitle}
                </h2>
                <span className="rounded-full bg-[var(--color-primary,#f97316)]/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-orange-700 dark:bg-[var(--color-primary-dark,#fb923c)]/15 dark:text-[var(--color-primary-dark,#fb923c)]">
                  {category.code || "202"}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Long-term direction & academic aspirations of {deptName}
              </p>
            </div>
          </div>
        </div>

        {/* Entries */}
        <div className="mt-6 space-y-8">
          {entries.map((entry, entryIndex) => {
            const visionTitle =
              entry.field1?.trim() ||
              (entries.length > 1
                ? `${sectionTitle} — ${entryIndex + 1}`
                : `${deptName} Vision`);

            const visionStatement = entry.field2?.trim();

            const pillars = [
              {
                key: "field3",
                label: labels.field3,
                value: entry.field3?.trim(),
                icon: Compass,
              },
              {
                key: "field4",
                label: labels.field4,
                value: entry.field4?.trim(),
                icon: Hourglass,
              },
              {
                key: "field5",
                label: labels.field5,
                value: entry.field5?.trim(),
                icon: StickyNote,
              },
            ].filter(
              (
                item,
              ): item is {
                key: string;
                label: string;
                value: string;
                icon: typeof Compass;
              } => Boolean(item.value),
            );

            const imageCandidate = [
              { url: entry.file1?.trim(), caption: labels.file1 },
              { url: entry.file2?.trim(), caption: labels.file2 },
            ].find((img): img is { url: string; caption: string } =>
              isImagePath(img.url),
            );

            const customPageUrl =
              entry.slug?.trim() || entry.htmlContent?.trim()
                ? buildPageUrl({
                    html: Boolean(entry.htmlContent?.trim()),
                    scope: category.scope || "all-departments",
                    catCode: category.code || "202",
                    slug: entry.slug?.trim() || null,
                    deptCode,
                  })
                : null;

            const actionLinks: Array<{
              key: string;
              href: string;
              label: string;
              kind: "page" | "file" | "link";
            }> = [];

            if (customPageUrl) {
              actionLinks.push({
                key: `${entry.id}-page`,
                href: customPageUrl,
                label: "Explore Vision Details",
                kind: "page",
              });
            }

            if (entry.file1?.trim() && !isImagePath(entry.file1)) {
              actionLinks.push({
                key: `${entry.id}-file1`,
                href: entry.file1.trim(),
                label: labels.file1,
                kind: "file",
              });
            }

            if (entry.file2?.trim() && !isImagePath(entry.file2)) {
              actionLinks.push({
                key: `${entry.id}-file2`,
                href: entry.file2.trim(),
                label: labels.file2,
                kind: "file",
              });
            }

            if (entry.link1?.trim()) {
              actionLinks.push({
                key: `${entry.id}-link1`,
                href: entry.link1.trim(),
                label: labels.link1,
                kind: "link",
              });
            }

            if (entry.link2?.trim()) {
              actionLinks.push({
                key: `${entry.id}-link2`,
                href: entry.link2.trim(),
                label: labels.link2,
                kind: "link",
              });
            }

            return (
              <article
                key={entry.id}
                className={
                  entryIndex > 0
                    ? "border-t border-slate-200 pt-8 dark:border-slate-800"
                    : undefined
                }
              >
                <div
                  className={
                    imageCandidate
                      ? "grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start"
                      : "space-y-5"
                  }
                >
                  <div
                    className={
                      imageCandidate ? "space-y-4 lg:col-span-8" : "space-y-4"
                    }
                  >
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--color-secondary,#16a34a)] uppercase dark:text-[var(--color-secondary-dark,#4ade80)]">
                        <Eye className="h-3.5 w-3.5" />
                        {labels.field1}
                      </span>
                      <h3 className="mt-1 text-lg font-bold text-slate-900 sm:text-2xl dark:text-white">
                        {visionTitle}
                      </h3>
                    </div>

                    {/* Vision Statement Callout */}
                    {visionStatement ? (
                      <blockquote className="rounded-2xl border-l-4 border-[var(--color-secondary,#16a34a)] bg-green-600/5 p-4 sm:p-5 dark:border-[var(--color-secondary-dark,#4ade80)] dark:bg-green-500/10">
                        <p className="mb-1.5 text-[11px] font-bold tracking-wider text-green-800 uppercase dark:text-[var(--color-secondary-dark,#4ade80)]">
                          {labels.field2}
                        </p>
                        <p className="text-sm leading-7 font-medium whitespace-pre-line text-slate-800 sm:text-base dark:text-slate-200">
                          {visionStatement}
                        </p>
                      </blockquote>
                    ) : (
                      pillars.length === 0 && (
                        <p className="rounded-2xl border border-dashed border-slate-200 p-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                          Vision statement will be updated shortly.
                        </p>
                      )
                    )}
                  </div>

                  {imageCandidate && (
                    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xs lg:col-span-4 dark:border-slate-800 dark:bg-slate-950">
                      <img
                        src={imageCandidate.url}
                        alt={`${deptName} — ${imageCandidate.caption}`}
                        className="h-52 w-full object-cover sm:h-60"
                      />
                      <figcaption className="border-t border-slate-200/80 px-3.5 py-2.5 text-xs font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">
                        {imageCandidate.caption}
                      </figcaption>
                    </figure>
                  )}
                </div>

                {/* Strategic Focus, Long-Term Horizon, Notes */}
                {pillars.length > 0 && (
                  <dl
                    className={`mt-5 grid grid-cols-1 gap-4 ${
                      pillars.length >= 3
                        ? "md:grid-cols-3"
                        : pillars.length === 2
                          ? "md:grid-cols-2"
                          : ""
                    }`}
                  >
                    {pillars.map((pillar) => {
                      const PillarIcon = pillar.icon;
                      return (
                        <div
                          key={`${entry.id}-${pillar.key}`}
                          className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4 dark:border-slate-800 dark:bg-slate-950/50"
                        >
                          <dt className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--color-primary,#f97316)] uppercase dark:text-[var(--color-primary-dark,#fb923c)]">
                            <PillarIcon className="h-3.5 w-3.5 shrink-0" />
                            <span>{pillar.label}</span>
                          </dt>
                          <dd className="mt-2 text-xs leading-relaxed whitespace-pre-line text-slate-700 sm:text-sm dark:text-slate-300">
                            {pillar.value}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                )}

                {/* Action Links & Files */}
                {actionLinks.length > 0 && (
                  <div className="mt-5 flex flex-wrap items-center gap-2.5 border-t border-slate-200/80 pt-4 dark:border-slate-800">
                    {actionLinks.map((action) => {
                      const isExternal = /^https?:\/\//i.test(action.href);
                      const Icon =
                        action.kind === "file"
                          ? FileText
                          : action.kind === "page"
                            ? Layers
                            : Globe;

                      return (
                        <Link
                          key={action.key}
                          href={action.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noopener noreferrer" : undefined}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-secondary,#16a34a)]/30 bg-[var(--color-secondary,#16a34a)]/10 px-3.5 py-2 text-xs font-semibold text-green-800 transition hover:bg-[var(--color-secondary,#16a34a)]/20 dark:border-[var(--color-secondary-dark,#4ade80)]/30 dark:bg-[var(--color-secondary-dark,#4ade80)]/15 dark:text-[var(--color-secondary-dark,#4ade80)] dark:hover:bg-[var(--color-secondary-dark,#4ade80)]/25"
                        >
                          <Icon className="h-3.5 w-3.5 shrink-0" />
                          <span>{action.label}</span>
                          <ExternalLink className="h-3 w-3 shrink-0 opacity-80" />
                        </Link>
                      );
                    })}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
