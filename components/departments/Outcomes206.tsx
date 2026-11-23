import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Compass,
  ExternalLink,
  FileCheck2,
  FileText,
  Globe,
  Layers,
  Target,
} from "lucide-react";
import { buildPageUrl } from "@/lib/helpers";
import type {
  PublicCategoryPageData,
  RawCategoryEntry,
} from "@/lib/actions/public/public-page-categories";

interface Outcomes206Props {
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

export function Outcomes206({ deptCode, data }: Outcomes206Props) {
  if (!data || !data.entries || data.entries.length === 0) {
    return null;
  }

  const { category, department } = data;
  const entries = sortEntries(data.entries);
  const sectionTitle = category.name?.trim() || "PEOs, POs & PSOs";
  const deptName = department?.name?.trim() || deptCode.toUpperCase();

  const labels = {
    field1: category.field1Label?.trim() || "Outcome Framework Title",
    field2:
      category.field2Label?.trim() || "PEOs (Program Educational Objectives)",
    field3: category.field3Label?.trim() || "POs (Program Outcomes)",
    field4: category.field4Label?.trim() || "PSOs (Program Specific Outcomes)",
    field5: category.field5Label?.trim() || "Accreditation & Mapping Notes",
    file1: category.file1Label?.trim() || "OBE / CO-PO Matrix Document",
    file2: category.file2Label?.trim() || "Supporting Document",
    link1: category.link1Label?.trim() || "Outcome Framework Link",
    link2: category.link2Label?.trim() || "Additional Link",
  };

  return (
    <section
      id="outcomes-206"
      aria-labelledby="outcomes-206-heading"
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-[var(--color-secondary,#16a34a)] via-[var(--color-secondary-dark,#4ade80)] to-[var(--color-primary,#f97316)]" />

      <div className="p-6 sm:p-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-secondary,#16a34a)]/10 text-[var(--color-secondary,#16a34a)] dark:bg-[var(--color-secondary-dark,#4ade80)]/15 dark:text-[var(--color-secondary-dark,#4ade80)]">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="outcomes-206-heading"
                className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl dark:text-white"
              >
                {sectionTitle}
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Outcome-Based Education (OBE) objectives & graduate attributes
                for {deptName}
              </p>
            </div>
          </div>
        </div>

        {/* Entries */}
        <div className="mt-6 space-y-8">
          {entries.map((entry, entryIndex) => {
            const frameworkTitle =
              entry.field1?.trim() ||
              (entries.length > 1
                ? `${sectionTitle} — ${entryIndex + 1}`
                : `${deptName} Outcome Framework`);

            const outcomePillars = [
              {
                key: "field2",
                badge: "PEOs",
                label: labels.field2,
                value: entry.field2?.trim(),
                icon: Compass,
                accent: "primary" as const,
              },
              {
                key: "field3",
                badge: "POs",
                label: labels.field3,
                value: entry.field3?.trim(),
                icon: CheckCircle2,
                accent: "secondary" as const,
              },
              {
                key: "field4",
                badge: "PSOs",
                label: labels.field4,
                value: entry.field4?.trim(),
                icon: Target,
                accent: "primary" as const,
              },
            ].filter(
              (
                item,
              ): item is {
                key: string;
                badge: string;
                label: string;
                value: string;
                icon: typeof Compass;
                accent: "primary" | "secondary";
              } => Boolean(item.value),
            );

            const accreditationNotes = entry.field5?.trim();

            const imagePreview = [
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
                    catCode: category.code || "206",
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
                label: "View Complete OBE Matrix",
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
                <div className="mb-5">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--color-secondary,#16a34a)] uppercase dark:text-[var(--color-secondary-dark,#4ade80)]">
                    <Award className="h-3.5 w-3.5" />
                    {labels.field1}
                  </span>
                  <h3 className="mt-1 text-lg font-bold text-slate-900 sm:text-xl dark:text-white">
                    {frameworkTitle}
                  </h3>
                </div>

                {/* PEOs, POs, PSOs Cards */}
                {outcomePillars.length > 0 ? (
                  <div className="space-y-4">
                    {outcomePillars.map((pillar) => {
                      const PillarIcon = pillar.icon;
                      const isPrimary = pillar.accent === "primary";

                      return (
                        <div
                          key={`${entry.id}-${pillar.key}`}
                          className="rounded-2xl border border-slate-200/90 bg-slate-50/70 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/60"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={
                                isPrimary
                                  ? "inline-flex items-center gap-1 rounded-lg bg-[var(--color-primary,#f97316)]/10 px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-orange-800 uppercase dark:bg-[var(--color-primary-dark,#fb923c)]/15 dark:text-[var(--color-primary-dark,#fb923c)]"
                                  : "inline-flex items-center gap-1 rounded-lg bg-[var(--color-secondary,#16a34a)]/10 px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-green-800 uppercase dark:bg-[var(--color-secondary-dark,#4ade80)]/15 dark:text-[var(--color-secondary-dark,#4ade80)]"
                              }
                            >
                              <PillarIcon className="h-3.5 w-3.5 shrink-0" />
                              <span>{pillar.badge}</span>
                            </span>
                            <h4 className="text-xs font-bold text-slate-800 sm:text-sm dark:text-slate-200">
                              {pillar.label}
                            </h4>
                          </div>

                          <p className="mt-3 text-xs leading-relaxed whitespace-pre-line text-slate-700 sm:text-sm dark:text-slate-300">
                            {pillar.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  !accreditationNotes && (
                    <p className="rounded-2xl border border-dashed border-slate-200 p-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                      Program educational objectives and outcomes will be
                      updated shortly.
                    </p>
                  )
                )}

                {/* Accreditation & Mapping Notes (field5) */}
                {accreditationNotes && (
                  <div className="mt-4 rounded-2xl border border-green-600/20 bg-green-600/5 p-4 dark:border-[var(--color-secondary-dark,#4ade80)]/20 dark:bg-green-500/10">
                    <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-green-800 uppercase dark:text-[var(--color-secondary-dark,#4ade80)]">
                      <FileCheck2 className="h-3.5 w-3.5 shrink-0" />
                      <span>{labels.field5}</span>
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed whitespace-pre-line text-slate-700 sm:text-sm dark:text-slate-300">
                      {accreditationNotes}
                    </p>
                  </div>
                )}

                {imagePreview && (
                  <figure className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950">
                    <img
                      src={imagePreview.url}
                      alt={`${frameworkTitle} — ${imagePreview.caption}`}
                      className="max-h-72 w-full object-contain"
                    />
                    <figcaption className="border-t border-slate-200/80 px-4 py-2 text-xs font-medium text-slate-600 dark:border-slate-800 dark:text-slate-400">
                      {imagePreview.caption}
                    </figcaption>
                  </figure>
                )}

                {/* Matrix Files & Links */}
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
