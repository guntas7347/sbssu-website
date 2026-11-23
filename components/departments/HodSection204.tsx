import Link from "next/link";
import {
  Building2,
  Clock,
  ExternalLink,
  FileText,
  Globe,
  Layers,
  Mail,
  Quote,
  UserCheck,
} from "lucide-react";
import { buildPageUrl } from "@/lib/helpers";
import type {
  PublicCategoryPageData,
  RawCategoryEntry,
} from "@/lib/actions/public/public-page-categories";

interface HodSection204Props {
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

function getInitials(name: string): string {
  const parts = name
    .replace(/^(dr\.?|prof\.?|mr\.?|ms\.?|mrs\.?)\s+/i, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "HOD";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function HodSection204({ deptCode, data }: HodSection204Props) {
  if (!data || !data.entries || data.entries.length === 0) {
    return null;
  }

  const { category, department } = data;
  const entries = sortEntries(data.entries);
  const sectionTitle = category.name?.trim() || "Head of Department";
  const deptName = department?.name?.trim() || deptCode.toUpperCase();

  const labels = {
    field1: category.field1Label?.trim() || "HOD Name",
    field2: category.field2Label?.trim() || "Designation & Qualifications",
    field3: category.field3Label?.trim() || "Message from HOD",
    field4: category.field4Label?.trim() || "Office & Consultation Hours",
    field5: category.field5Label?.trim() || "Contact & Email",
    file1: category.file1Label?.trim() || "HOD Portrait / File",
    file2: category.file2Label?.trim() || "CV / Profile Attachment",
    link1: category.link1Label?.trim() || "Faculty / Google Scholar Profile",
    link2: category.link2Label?.trim() || "Additional Link",
  };

  return (
    <section
      id="hod-204"
      aria-labelledby="hod-204-heading"
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-[var(--color-secondary,#16a34a)] via-[var(--color-primary,#f97316)] to-[var(--color-primary-dark,#fb923c)]" />

      <div className="p-6 sm:p-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-secondary,#16a34a)]/10 text-[var(--color-secondary,#16a34a)] dark:bg-[var(--color-secondary-dark,#4ade80)]/15 dark:text-[var(--color-secondary-dark,#4ade80)]">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="hod-204-heading"
                className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl dark:text-white"
              >
                {sectionTitle}
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Academic leadership & desk message for {deptName}
              </p>
            </div>
          </div>
        </div>

        {/* Entries */}
        <div className="mt-6 space-y-8">
          {entries.map((entry, entryIndex) => {
            const hodName =
              entry.field1?.trim() || `Head of Department — ${deptName}`;
            const designation = entry.field2?.trim();
            const message = entry.field3?.trim();

            const officeInfo = [
              {
                key: "field4",
                label: labels.field4,
                value: entry.field4?.trim(),
                icon: Clock,
              },
              {
                key: "field5",
                label: labels.field5,
                value: entry.field5?.trim(),
                icon: Mail,
              },
            ].filter(
              (
                item,
              ): item is {
                key: string;
                label: string;
                value: string;
                icon: typeof Clock;
              } => Boolean(item.value),
            );

            const hasPortrait = isImagePath(entry.file1);
            const portraitUrl = hasPortrait ? entry.file1!.trim() : null;

            const customPageUrl =
              entry.slug?.trim() || entry.htmlContent?.trim()
                ? buildPageUrl({
                    html: Boolean(entry.htmlContent?.trim()),
                    scope: category.scope || "all-departments",
                    catCode: category.code || "204",
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
                label: "View Full HOD Profile",
                kind: "page",
              });
            }

            if (entry.file1?.trim() && !hasPortrait) {
              actionLinks.push({
                key: `${entry.id}-file1`,
                href: entry.file1.trim(),
                label: labels.file1,
                kind: "file",
              });
            }

            if (entry.file2?.trim()) {
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
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                  {/* Portrait / Fallback Monogram Card */}
                  <div className="flex shrink-0 flex-col items-center sm:items-start">
                    {portraitUrl ? (
                      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-1.5 shadow-xs dark:border-slate-800 dark:bg-slate-950">
                        <img
                          src={portraitUrl}
                          alt={`${hodName} — ${sectionTitle}`}
                          className="h-44 w-44 rounded-xl object-cover sm:h-48 sm:w-48"
                        />
                      </div>
                    ) : (
                      <div
                        aria-label={`${hodName} monogram`}
                        className="flex h-44 w-44 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-secondary,#16a34a)]/35 bg-gradient-to-br from-green-600/10 via-slate-50 to-orange-500/10 p-4 text-center shadow-xs sm:h-48 sm:w-48 dark:border-[var(--color-secondary-dark,#4ade80)]/30 dark:from-green-500/15 dark:via-slate-950 dark:to-orange-500/15"
                      >
                        <span className="text-3xl font-extrabold tracking-tight text-[var(--color-secondary,#16a34a)] dark:text-[var(--color-secondary-dark,#4ade80)]">
                          {getInitials(hodName)}
                        </span>
                        <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-slate-600 uppercase shadow-2xs dark:bg-slate-900 dark:text-slate-300">
                          <Building2 className="h-3 w-3 text-[var(--color-primary,#f97316)] dark:text-[var(--color-primary-dark,#fb923c)]" />
                          Head of Dept.
                        </span>
                      </div>
                    )}
                  </div>

                  {/* HOD Details & Desk Message */}
                  <div className="min-w-0 flex-1 space-y-5">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--color-secondary,#16a34a)] uppercase dark:text-[var(--color-secondary-dark,#4ade80)]">
                        <UserCheck className="h-3.5 w-3.5" />
                        {labels.field1}
                      </span>
                      <h3 className="mt-1 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
                        {hodName}
                      </h3>
                      {designation && (
                        <p className="mt-1.5 inline-flex flex-wrap items-center gap-1.5 rounded-xl bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-800 sm:text-sm dark:bg-[var(--color-primary-dark,#fb923c)]/15 dark:text-[var(--color-primary-dark,#fb923c)]">
                          {designation}
                        </p>
                      )}
                    </div>

                    {/* Message from HOD */}
                    {message ? (
                      <blockquote className="relative rounded-2xl border border-slate-200/80 bg-slate-50/75 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/60">
                        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                          <Quote className="h-3.5 w-3.5 text-[var(--color-primary,#f97316)] dark:text-[var(--color-primary-dark,#fb923c)]" />
                          <span>{labels.field3}</span>
                        </div>
                        <p className="text-sm leading-7 whitespace-pre-line text-slate-700 sm:text-[15px] dark:text-slate-300">
                          {message}
                        </p>
                      </blockquote>
                    ) : (
                      officeInfo.length === 0 && (
                        <p className="rounded-2xl border border-dashed border-slate-200 p-4 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
                          Leadership profile details will be updated shortly.
                        </p>
                      )
                    )}

                    {/* Office & Contact Cards (field4 & field5) */}
                    {officeInfo.length > 0 && (
                      <dl
                        className={`grid grid-cols-1 gap-3.5 ${
                          officeInfo.length === 2 ? "sm:grid-cols-2" : ""
                        }`}
                      >
                        {officeInfo.map((info) => {
                          const InfoIcon = info.icon;
                          return (
                            <div
                              key={`${entry.id}-${info.key}`}
                              className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-3.5 dark:border-slate-800 dark:bg-slate-950/50"
                            >
                              <dt className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--color-primary,#f97316)] uppercase dark:text-[var(--color-primary-dark,#fb923c)]">
                                <InfoIcon className="h-3.5 w-3.5 shrink-0" />
                                <span>{info.label}</span>
                              </dt>
                              <dd className="mt-1.5 text-xs leading-relaxed whitespace-pre-line text-slate-700 sm:text-sm dark:text-slate-300">
                                {info.value}
                              </dd>
                            </div>
                          );
                        })}
                      </dl>
                    )}

                    {/* CV, Scholar & External Links */}
                    {actionLinks.length > 0 && (
                      <div className="flex flex-wrap items-center gap-2.5 border-t border-slate-200/80 pt-4 dark:border-slate-800">
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
                              rel={
                                isExternal ? "noopener noreferrer" : undefined
                              }
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
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
