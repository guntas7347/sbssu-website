import Link from "next/link";
import {
  Building2,
  Compass,
  ExternalLink,
  FileText,
  Globe,
  Layers,
  Sparkles,
} from "lucide-react";
import { buildPageUrl } from "@/lib/helpers";
import type { PublicCategoryPageData } from "@/lib/actions/public/public-page-categories";
import { RawCategoryEntry } from "../category-views/entry-view-helpers";

interface AboutDepartment201Props {
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

export function AboutDepartment201({
  deptCode,
  data,
}: AboutDepartment201Props) {
  if (!data || !data.entries || data.entries.length === 0) {
    return null;
  }

  const { category, department } = data;
  const entries = sortEntries(data.entries);
  const sectionTitle = category.name?.trim() || "About Department";
  const deptName = department?.name?.trim() || deptCode.toUpperCase();

  // Dynamic labels from DB category record with clear fallbacks
  const labels = {
    field1: category.field1Label?.trim() || "Overview Heading",
    field2: category.field2Label?.trim() || "Department Overview",
    field3: category.field3Label?.trim() || "Academic Focus & Highlights",
    field4: category.field4Label?.trim() || "Establishment & Scope",
    field5: category.field5Label?.trim() || "Additional Information",
    file1: category.file1Label?.trim() || "Department Brochure / File",
    file2: category.file2Label?.trim() || "Supplementary Document",
    link1: category.link1Label?.trim() || "Department Portal",
    link2: category.link2Label?.trim() || "External Reference",
  };

  return (
    <section
      id="about-201"
      aria-labelledby="about-201-heading"
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Top Accent Bar using @theme primary & secondary */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[var(--color-primary,#f97316)] via-[var(--color-primary-dark,#fb923c)] to-[var(--color-secondary,#16a34a)]" />

      <div className="p-6 sm:p-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary,#f97316)]/10 text-[var(--color-primary,#f97316)] dark:bg-[var(--color-primary-dark,#fb923c)]/15 dark:text-[var(--color-primary-dark,#fb923c)]">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2
                  id="about-201-heading"
                  className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl dark:text-white"
                >
                  {sectionTitle}
                </h2>
                <span className="rounded-full bg-[var(--color-secondary,#16a34a)]/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--color-secondary,#16a34a)] dark:bg-[var(--color-secondary-dark,#4ade80)]/15 dark:text-[var(--color-secondary-dark,#4ade80)]">
                  {category.code || "201"}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Profile & academic introduction for {deptName}
              </p>
            </div>
          </div>
        </div>

        {/* Entries */}
        <div className="mt-6 space-y-8">
          {entries.map((entry, entryIndex) => {
            const heading =
              entry.field1?.trim() ||
              (entries.length > 1
                ? `${sectionTitle} — Part ${entryIndex + 1}`
                : `Welcome to ${deptName}`);

            const leadBody = entry.field2?.trim();

            const secondaryBlocks = [
              {
                key: "field3",
                label: labels.field3,
                value: entry.field3?.trim(),
              },
              {
                key: "field4",
                label: labels.field4,
                value: entry.field4?.trim(),
              },
              {
                key: "field5",
                label: labels.field5,
                value: entry.field5?.trim(),
              },
            ].filter(
              (item): item is { key: string; label: string; value: string } =>
                Boolean(item.value),
            );

            // Check if file1 or file2 is an image so we can showcase it visually
            const imageCandidates = [
              { url: entry.file1?.trim(), caption: labels.file1 },
              { url: entry.file2?.trim(), caption: labels.file2 },
            ].filter((img): img is { url: string; caption: string } =>
              isImagePath(img.url),
            );
            const heroImage = imageCandidates[0] ?? null;

            // Custom/HTML page URL via buildPageUrl
            const customPageUrl =
              entry.slug?.trim() || entry.htmlContent?.trim()
                ? buildPageUrl({
                    html: Boolean(entry.htmlContent?.trim()),
                    scope: category.scope || "department",
                    catCode: category.code || "201",
                    slug: entry.slug?.trim() || null,
                    deptCode,
                  })
                : null;

            // All non-image files + links + custom page action
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
                label: "Read Full Overview",
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
                    heroImage
                      ? "grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start"
                      : "space-y-5"
                  }
                >
                  {/* Main Text Column */}
                  <div
                    className={
                      heroImage ? "space-y-5 lg:col-span-8" : "space-y-5"
                    }
                  >
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--color-primary,#f97316)] uppercase dark:text-[var(--color-primary-dark,#fb923c)]">
                        <Building2 className="h-3.5 w-3.5" />
                        {labels.field1}
                      </span>
                      <h3 className="mt-1 text-lg font-bold text-slate-900 sm:text-2xl dark:text-white">
                        {heading}
                      </h3>
                    </div>

                    {leadBody ? (
                      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/60">
                        <p className="mb-1.5 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                          {labels.field2}
                        </p>
                        <p className="text-sm leading-7 whitespace-pre-line text-slate-700 sm:text-[15px] dark:text-slate-300">
                          {leadBody}
                        </p>
                      </div>
                    ) : (
                      secondaryBlocks.length === 0 && (
                        <p className="rounded-2xl border border-dashed border-slate-200 p-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                          Department overview details will be updated shortly.
                        </p>
                      )
                    )}
                  </div>

                  {/* Optional Hero Image Column (if file1 or file2 is an image) */}
                  {heroImage && (
                    <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-xs lg:col-span-4 dark:border-slate-800 dark:bg-slate-950">
                      <img
                        src={heroImage.url}
                        alt={`${deptName} — ${heroImage.caption}`}
                        className="h-56 w-full object-cover sm:h-64"
                      />
                      <figcaption className="border-t border-slate-200/80 px-3.5 py-2.5 text-xs font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">
                        {heroImage.caption}
                      </figcaption>
                    </figure>
                  )}
                </div>

                {/* Secondary Structured Highlights (field3, field4, field5) */}
                {secondaryBlocks.length > 0 && (
                  <dl
                    className={`mt-5 grid grid-cols-1 gap-4 ${
                      secondaryBlocks.length >= 3
                        ? "md:grid-cols-3"
                        : secondaryBlocks.length === 2
                          ? "md:grid-cols-2"
                          : ""
                    }`}
                  >
                    {secondaryBlocks.map((block) => (
                      <div
                        key={`${entry.id}-${block.key}`}
                        className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-950/50"
                      >
                        <dt className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--color-secondary,#16a34a)] uppercase dark:text-[var(--color-secondary-dark,#4ade80)]">
                          <Sparkles className="h-3.5 w-3.5 shrink-0" />
                          <span>{block.label}</span>
                        </dt>
                        <dd className="mt-2 text-xs leading-relaxed whitespace-pre-line text-slate-700 sm:text-sm dark:text-slate-300">
                          {block.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                )}

                {/* Action Links & Documents */}
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
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-primary,#f97316)]/30 bg-[var(--color-primary,#f97316)]/10 px-3.5 py-2 text-xs font-semibold text-orange-800 transition hover:bg-[var(--color-primary,#f97316)]/20 dark:border-[var(--color-primary-dark,#fb923c)]/30 dark:bg-[var(--color-primary-dark,#fb923c)]/15 dark:text-[var(--color-primary-dark,#fb923c)] dark:hover:bg-[var(--color-primary-dark,#fb923c)]/25"
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
