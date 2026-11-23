import Link from "next/link";
import {
  BookOpen,
  ExternalLink,
  FileText,
  FlaskConical,
  Globe,
  GraduationCap,
  Layers,
  Mail,
  Users,
} from "lucide-react";
import { buildPageUrl } from "@/lib/helpers";
import type {
  PublicCategoryPageData,
  RawCategoryEntry,
} from "@/lib/actions/public/public-page-categories";

interface Faculty207Props {
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
    .replace(/^(dr\.?|prof\.?|mr\.?|ms\.?|mrs\.?|er\.?)\s+/i, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (parts.length === 0) return "FM";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function Faculty207({ deptCode, data }: Faculty207Props) {
  if (!data || !data.entries || data.entries.length === 0) {
    return null;
  }

  const { category, department } = data;
  const entries = sortEntries(data.entries);
  const sectionTitle = category.name?.trim() || "Faculty Directory";
  const deptName = department?.name?.trim() || deptCode.toUpperCase();

  const labels = {
    field1: category.field1Label?.trim() || "Faculty Name",
    field2: category.field2Label?.trim() || "Designation",
    field3: category.field3Label?.trim() || "Qualifications & Specialization",
    field4: category.field4Label?.trim() || "Research Areas & Experience",
    field5: category.field5Label?.trim() || "Email, Cabin & Contact",
    file1: category.file1Label?.trim() || "Faculty Photo / File",
    file2: category.file2Label?.trim() || "CV / Dossier File",
    link1: category.link1Label?.trim() || "Academic / Research Profile",
    link2: category.link2Label?.trim() || "Publications / Lab Link",
  };

  return (
    <section
      id="faculty-207"
      aria-labelledby="faculty-207-heading"
      className="scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-[var(--color-primary,#f97316)] via-[var(--color-primary-dark,#fb923c)] to-[var(--color-secondary,#16a34a)]" />

      <div className="p-6 sm:p-8">
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary,#f97316)]/10 text-[var(--color-primary,#f97316)] dark:bg-[var(--color-primary-dark,#fb923c)]/15 dark:text-[var(--color-primary-dark,#fb923c)]">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <h2
                id="faculty-207-heading"
                className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl dark:text-white"
              >
                {sectionTitle}
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Teaching & research faculty members of {deptName}
              </p>
            </div>
          </div>

          <span className="rounded-full bg-[var(--color-secondary,#16a34a)]/10 px-3 py-1 text-xs font-bold text-green-800 dark:bg-[var(--color-secondary-dark,#4ade80)]/15 dark:text-[var(--color-secondary-dark,#4ade80)]">
            {entries.length} {entries.length === 1 ? "Member" : "Members"}
          </span>
        </div>

        {/* Faculty Cards Grid */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">
          {entries.map((member, idx) => {
            const name = member.field1?.trim() || `Faculty Member ${idx + 1}`;
            const designation = member.field2?.trim();
            const qualifications = member.field3?.trim();
            const researchExp = member.field4?.trim();
            const contactInfo = member.field5?.trim();

            const hasPhoto = isImagePath(member.file1);
            const photoUrl = hasPhoto ? member.file1!.trim() : null;

            const customPageUrl =
              member.slug?.trim() || member.htmlContent?.trim()
                ? buildPageUrl({
                    html: Boolean(member.htmlContent?.trim()),
                    scope: category.scope || "all-departments",
                    catCode: category.code || "207",
                    slug: member.slug?.trim() || null,
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
                key: `${member.id}-page`,
                href: customPageUrl,
                label: "Faculty Profile",
                kind: "page",
              });
            }

            if (member.file1?.trim() && !hasPhoto) {
              actionLinks.push({
                key: `${member.id}-file1`,
                href: member.file1.trim(),
                label: labels.file1,
                kind: "file",
              });
            }

            if (member.file2?.trim()) {
              actionLinks.push({
                key: `${member.id}-file2`,
                href: member.file2.trim(),
                label: labels.file2,
                kind: "file",
              });
            }

            if (member.link1?.trim()) {
              actionLinks.push({
                key: `${member.id}-link1`,
                href: member.link1.trim(),
                label: labels.link1,
                kind: "link",
              });
            }

            if (member.link2?.trim()) {
              actionLinks.push({
                key: `${member.id}-link2`,
                href: member.link2.trim(),
                label: labels.link2,
                kind: "link",
              });
            }

            const detailRows = [
              {
                key: "field3",
                label: labels.field3,
                value: qualifications,
                icon: GraduationCap,
              },
              {
                key: "field4",
                label: labels.field4,
                value: researchExp,
                icon: FlaskConical,
              },
              {
                key: "field5",
                label: labels.field5,
                value: contactInfo,
                icon: Mail,
              },
            ].filter(
              (
                row,
              ): row is {
                key: string;
                label: string;
                value: string;
                icon: typeof BookOpen;
              } => Boolean(row.value),
            );

            return (
              <article
                key={member.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-5 transition hover:border-[var(--color-primary,#f97316)]/35 dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-[var(--color-primary-dark,#fb923c)]/35"
              >
                <div className="space-y-4">
                  {/* Profile Header */}
                  <div className="flex items-start gap-4">
                    {photoUrl ? (
                      <img
                        src={photoUrl}
                        alt={name}
                        className="h-16 w-16 shrink-0 rounded-2xl border border-slate-200 object-cover shadow-2xs sm:h-20 sm:w-20 dark:border-slate-700"
                      />
                    ) : (
                      <div
                        aria-label={`${name} avatar`}
                        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-[var(--color-secondary,#16a34a)]/25 bg-gradient-to-br from-green-600/10 to-orange-500/10 text-base font-extrabold text-[var(--color-secondary,#16a34a)] sm:h-20 sm:w-20 sm:text-lg dark:border-[var(--color-secondary-dark,#4ade80)]/25 dark:text-[var(--color-secondary-dark,#4ade80)]"
                      >
                        {getInitials(name)}
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                        {name}
                      </h3>
                      {designation && (
                        <p className="mt-1 inline-flex flex-wrap items-center rounded-lg bg-[var(--color-primary,#f97316)]/10 px-2.5 py-0.5 text-xs font-semibold text-orange-800 dark:bg-[var(--color-primary-dark,#fb923c)]/15 dark:text-[var(--color-primary-dark,#fb923c)]">
                          {designation}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Qualifications, Research & Contact */}
                  {detailRows.length > 0 && (
                    <dl className="space-y-2.5">
                      {detailRows.map((row) => {
                        const RowIcon = row.icon;
                        return (
                          <div
                            key={`${member.id}-${row.key}`}
                            className="rounded-xl border border-slate-200/80 bg-white p-3 dark:border-slate-800 dark:bg-slate-900"
                          >
                            <dt className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                              <RowIcon className="h-3.5 w-3.5 shrink-0 text-[var(--color-secondary,#16a34a)] dark:text-[var(--color-secondary-dark,#4ade80)]" />
                              <span>{row.label}</span>
                            </dt>
                            <dd className="mt-1 text-xs leading-relaxed whitespace-pre-line text-slate-700 dark:text-slate-300">
                              {row.value}
                            </dd>
                          </div>
                        );
                      })}
                    </dl>
                  )}
                </div>

                {/* CV, Scholar & External Links */}
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
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-secondary,#16a34a)]/30 bg-[var(--color-secondary,#16a34a)]/10 px-3 py-1.5 text-xs font-semibold text-green-800 transition hover:bg-[var(--color-secondary,#16a34a)]/20 dark:border-[var(--color-secondary-dark,#4ade80)]/30 dark:bg-[var(--color-secondary-dark,#4ade80)]/15 dark:text-[var(--color-secondary-dark,#4ade80)] dark:hover:bg-[var(--color-secondary-dark,#4ade80)]/25"
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
