import Link from "next/link";
import {
  Award,
  BookOpen,
  Clock,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  Layers,
  Sparkles,
} from "lucide-react";
import { buildPageUrl } from "@/lib/helpers";
import type {
  PublicCategoryPageData,
  RawCategoryEntry,
} from "@/lib/actions/public/public-page-categories";

interface Courses205Props {
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

export function Courses205({ deptCode, data }: Courses205Props) {
  if (!data || !data.entries || data.entries.length === 0) {
    return null;
  }

  const { category, department } = data;
  const entries = sortEntries(data.entries);
  const sectionTitle = category.name?.trim() || "Academic Programs & Courses";
  const deptName = department?.name?.trim() || deptCode.toUpperCase();

  const labels = {
    field1: category.field1Label?.trim() || "Program / Course Name",
    field2: category.field2Label?.trim() || "Degree Level / Type",
    field3: category.field3Label?.trim() || "Duration & Structure",
    field4: category.field4Label?.trim() || "Eligibility, Intake & Credits",
    field5: category.field5Label?.trim() || "Specializations & Remarks",
    file1: category.file1Label?.trim() || "Curriculum / Brochure File",
    file2: category.file2Label?.trim() || "Syllabus / Scheme File",
    link1: category.link1Label?.trim() || "Program Details Link",
    link2: category.link2Label?.trim() || "Admissions / Course Link",
  };

  return (
    <section
      id="courses-205"
      aria-labelledby="courses-205-heading"
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-[var(--color-primary,#f97316)] via-[var(--color-primary-dark,#fb923c)] to-[var(--color-secondary,#16a34a)]" />

      <div className="p-6 sm:p-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary,#f97316)]/10 text-[var(--color-primary,#f97316)] dark:bg-[var(--color-primary-dark,#fb923c)]/15 dark:text-[var(--color-primary-dark,#fb923c)]">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="courses-205-heading"
                className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl dark:text-white"
              >
                {sectionTitle}
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Academic programs, eligibility, duration & syllabi for{" "}
                {deptName}
              </p>
            </div>
          </div>

          <span className="rounded-full bg-[var(--color-secondary,#16a34a)]/10 px-3 py-1 text-xs font-bold text-green-800 dark:bg-[var(--color-secondary-dark,#4ade80)]/15 dark:text-[var(--color-secondary-dark,#4ade80)]">
            {entries.length} {entries.length === 1 ? "Program" : "Programs"}
          </span>
        </div>

        {/* Course Cards Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {entries.map((entry, idx) => {
            const programName =
              entry.field1?.trim() || `Academic Program ${idx + 1}`;
            const degreeLevel = entry.field2?.trim();
            const duration = entry.field3?.trim();
            const eligibilityIntake = entry.field4?.trim();
            const specializations = entry.field5?.trim();

            const imagePreview = [
              { url: entry.file1?.trim(), label: labels.file1 },
              { url: entry.file2?.trim(), label: labels.file2 },
            ].find((img): img is { url: string; label: string } =>
              isImagePath(img.url),
            );

            const customPageUrl =
              entry.slug?.trim() || entry.htmlContent?.trim()
                ? buildPageUrl({
                    html: Boolean(entry.htmlContent?.trim()),
                    scope: category.scope || "all-departments",
                    catCode: category.code || "205",
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
                label: "Program Page",
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
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-[var(--color-primary,#f97316)]/35 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-[var(--color-primary-dark,#fb923c)]/35"
              >
                <div className="space-y-4">
                  {/* Top Badge + Title */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                        {labels.field1}
                      </span>
                      {degreeLevel && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-secondary,#16a34a)]/10 px-2.5 py-0.5 text-[11px] font-bold text-green-800 dark:bg-[var(--color-secondary-dark,#4ade80)]/15 dark:text-[var(--color-secondary-dark,#4ade80)]">
                          <Award className="h-3 w-3 shrink-0" />
                          <span>{degreeLevel}</span>
                        </span>
                      )}
                    </div>

                    <h3 className="mt-1.5 text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                      {programName}
                    </h3>
                  </div>

                  {imagePreview && (
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                      <img
                        src={imagePreview.url}
                        alt={`${programName} — ${imagePreview.label}`}
                        className="h-40 w-full object-cover"
                      />
                    </div>
                  )}

                  {/* Duration & Eligibility / Intake */}
                  {(duration || eligibilityIntake) && (
                    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      {duration && (
                        <div className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                          <dt className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--color-primary,#f97316)] uppercase dark:text-[var(--color-primary-dark,#fb923c)]">
                            <Clock className="h-3.5 w-3.5 shrink-0" />
                            <span>{labels.field3}</span>
                          </dt>
                          <dd className="mt-1 text-xs leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
                            {duration}
                          </dd>
                        </div>
                      )}

                      {eligibilityIntake && (
                        <div className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                          <dt className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-[var(--color-secondary,#16a34a)] uppercase dark:text-[var(--color-secondary-dark,#4ade80)]">
                            <BookOpen className="h-3.5 w-3.5 shrink-0" />
                            <span>{labels.field4}</span>
                          </dt>
                          <dd className="mt-1 text-xs leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
                            {eligibilityIntake}
                          </dd>
                        </div>
                      )}
                    </dl>
                  )}

                  {/* Specializations & Remarks */}
                  {specializations && (
                    <div className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                      <p className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                        <Sparkles className="h-3.5 w-3.5 shrink-0 text-[var(--color-primary,#f97316)] dark:text-[var(--color-primary-dark,#fb923c)]" />
                        <span>{labels.field5}</span>
                      </p>
                      <p className="mt-1 text-xs leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
                        {specializations}
                      </p>
                    </div>
                  )}
                </div>

                {/* Files & Links */}
                {actionLinks.length > 0 && (
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-200/80 pt-3.5 dark:border-slate-800">
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
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-primary,#f97316)]/30 bg-[var(--color-primary,#f97316)]/10 px-3 py-1.5 text-xs font-semibold text-orange-800 transition hover:bg-[var(--color-primary,#f97316)]/20 dark:border-[var(--color-primary-dark,#fb923c)]/30 dark:bg-[var(--color-primary-dark,#fb923c)]/15 dark:text-[var(--color-primary-dark,#fb923c)] dark:hover:bg-[var(--color-primary-dark,#fb923c)]/25"
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
