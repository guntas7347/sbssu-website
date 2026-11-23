import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Award,
  Building2,
  ExternalLink,
  FileText,
  Landmark,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { getPublicCategoryPageData } from "@/lib/actions/public/public-page-categories";

export const metadata: Metadata = {
  title:
    "Board of Governors | Shaheed Bhagat Singh State University, Ferozepur",
  description:
    "Apex statutory governing body of Shaheed Bhagat Singh State University (SBSSU), Ferozepur.",
};

function getInitials(name?: string | null): string {
  if (!name) return "BG";
  const words = name
    .replace(/^(prof\.|dr\.|sh\.|smt\.|mr\.|ms\.|mrs\.)\s+/i, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return "BG";
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase();
}

export default async function BoardOfGovernorsPage() {
  const data = await getPublicCategoryPageData({
    scope: "university",
    catCode: "101",
  });

  if (!data) notFound();

  const { category, entries } = data;

  const sortedEntries = [...entries].sort((a, b) => {
    const orderA = a.displayOrder ?? 0;
    const orderB = b.displayOrder ?? 0;
    if (orderA !== orderB) return orderA - orderB;
    return (a.field1 ?? "").localeCompare(b.field1 ?? "");
  });

  // First entry (lowest displayOrder) is highlighted as Chairperson / Presiding Officer
  const [chairperson, ...members] = sortedEntries;

  const field2Heading = category.field2Label?.trim() || "Designation / Role";
  const field3Heading = category.field3Label?.trim() || "Affiliation / Office";
  const field4Heading = category.field4Label?.trim() || "Tenure / Nominee";
  const field5Heading = category.field5Label?.trim() || "Remarks";

  const file1Text = category.file1Label?.trim() || "Official Notification";
  const file2Text = category.file2Label?.trim() || "Annexure / Document";
  const link1Text = category.link1Label?.trim() || "Official Profile";
  const link2Text = category.link2Label?.trim() || "Reference Link";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Statutory Hero Banner */}
        <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 shadow-xs sm:p-10 dark:border-slate-800 dark:bg-slate-900">
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[var(--color-primary)]/10 blur-3xl dark:bg-[var(--color-primary-dark)]/10" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[var(--color-secondary)]/10 blur-3xl dark:bg-[var(--color-secondary-dark)]/10" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/10 px-3.5 py-1 text-xs font-bold tracking-wider text-[var(--color-primary)] uppercase dark:border-[var(--color-primary-dark)]/30 dark:bg-[var(--color-primary-dark)]/15 dark:text-[var(--color-primary-dark)]">
                <Landmark className="h-3.5 w-3.5" />
                <span>Statutory Governance Body</span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                {category.name || "Board of Governors"}
              </h1>

              <p className="text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
                The Board of Governors is the apex executive and policy-making
                authority of Shaheed Bhagat Singh State University, Ferozepur,
                guiding academic excellence, institutional administration, and
                strategic development.
              </p>
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60">
                <span className="block text-[11px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                  Total Members
                </span>
                <span className="mt-0.5 block text-xl font-bold text-slate-900 dark:text-white">
                  {sortedEntries.length}
                </span>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50/90 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/60">
                <span className="block text-[11px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                  Authority
                </span>
                <span className="mt-0.5 inline-flex items-center gap-1.5 text-sm font-bold text-[var(--color-secondary)] dark:text-[var(--color-secondary-dark)]">
                  <ShieldCheck className="h-4 w-4" />
                  <span>SBSSU Act</span>
                </span>
              </div>
            </div>
          </div>
        </header>

        {sortedEntries.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            No Board of Governors records available yet.
          </div>
        ) : (
          <>
            {/* Featured Presiding Member / Chairperson */}
            {chairperson && (
              <section aria-label="Presiding Officer" className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                  <Award className="h-4 w-4 text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]" />
                  <span>Presiding Authority</span>
                </div>

                <article className="relative overflow-hidden rounded-3xl border-2 border-[var(--color-primary)]/35 bg-white p-6 shadow-xs sm:p-8 dark:border-[var(--color-primary-dark)]/35 dark:bg-slate-900">
                  <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-base font-bold text-white shadow-xs sm:h-16 sm:w-16 sm:text-lg dark:bg-[var(--color-primary-dark)] dark:text-slate-950">
                        {getInitials(chairperson.field1)}
                      </div>

                      <div className="space-y-2">
                        {chairperson.field2 && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-secondary)]/10 px-3 py-0.5 text-xs font-bold text-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)]/15 dark:text-[var(--color-secondary-dark)]">
                            <UserCheck className="h-3.5 w-3.5" />
                            <span>{chairperson.field2}</span>
                          </span>
                        )}

                        <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-white">
                          {chairperson.field1 ||
                            "Chairperson, Board of Governors"}
                        </h2>

                        <div className="flex flex-wrap gap-x-6 gap-y-1.5 pt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-300">
                          {chairperson.field3 && (
                            <span className="inline-flex items-center gap-1.5">
                              <Building2 className="h-4 w-4 shrink-0 text-slate-400" />
                              <span>{chairperson.field3}</span>
                            </span>
                          )}
                          {chairperson.field4 && (
                            <span className="text-slate-500 dark:text-slate-400">
                              <strong className="font-semibold text-slate-700 dark:text-slate-200">
                                {field4Heading}:
                              </strong>{" "}
                              {chairperson.field4}
                            </span>
                          )}
                          {chairperson.field5 && (
                            <span className="text-slate-500 dark:text-slate-400">
                              <strong className="font-semibold text-slate-700 dark:text-slate-200">
                                {field5Heading}:
                              </strong>{" "}
                              {chairperson.field5}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {(chairperson.file1 ||
                      chairperson.file2 ||
                      chairperson.link1 ||
                      chairperson.link2) && (
                      <div className="flex shrink-0 flex-wrap items-center gap-2.5">
                        {chairperson.file1 && (
                          <a
                            href={chairperson.file1}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-[var(--color-primary-dark)] dark:text-slate-950"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            <span>{file1Text}</span>
                          </a>
                        )}
                        {chairperson.file2 && (
                          <a
                            href={chairperson.file2}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-[var(--color-primary-dark)] dark:text-slate-950"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            <span>{file2Text}</span>
                          </a>
                        )}
                        {chairperson.link1 && (
                          <a
                            href={chairperson.link1}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-[var(--color-primary-dark)]/40 dark:hover:text-[var(--color-primary-dark)]"
                          >
                            <span>{link1Text}</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {chairperson.link2 && (
                          <a
                            href={chairperson.link2}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-[var(--color-primary-dark)]/40 dark:hover:text-[var(--color-primary-dark)]"
                          >
                            <span>{link2Text}</span>
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              </section>
            )}

            {/* Members Roster Grid */}
            {members.length > 0 && (
              <section aria-label="Board Members" className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                    Members of the Board
                  </h2>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    Ordered by statutory precedence
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {members.map((member, index) => {
                    const hasActions = Boolean(
                      member.file1 ||
                      member.file2 ||
                      member.link1 ||
                      member.link2,
                    );

                    return (
                      <article
                        key={member.id}
                        className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition hover:border-[var(--color-primary)]/45 hover:shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:hover:border-[var(--color-primary-dark)]/45"
                      >
                        <div className="space-y-3.5">
                          {/* Top Row: Avatar + Precedence Badge */}
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-bold text-slate-700 transition group-hover:bg-[var(--color-primary)]/10 group-hover:text-[var(--color-primary)] dark:bg-slate-800 dark:text-slate-200 dark:group-hover:bg-[var(--color-primary-dark)]/15 dark:group-hover:text-[var(--color-primary-dark)]">
                              {getInitials(member.field1)}
                            </div>

                            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                              #{String(index + 2).padStart(2, "0")}
                            </span>
                          </div>

                          {/* Name & Primary Role */}
                          <div className="space-y-1">
                            <h3 className="text-base font-bold leading-snug text-slate-900 dark:text-white">
                              {member.field1 || "Board Member"}
                            </h3>

                            {member.field2 && (
                              <p
                                title={field2Heading}
                                className="text-xs font-semibold text-[var(--color-secondary)] dark:text-[var(--color-secondary-dark)]"
                              >
                                {member.field2}
                              </p>
                            )}
                          </div>

                          {/* Structured Metadata */}
                          {(member.field3 ||
                            member.field4 ||
                            member.field5) && (
                            <dl className="space-y-1.5 border-t border-slate-100 pt-3 text-xs dark:border-slate-800/80">
                              {member.field3 && (
                                <div>
                                  <dt className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                                    {field3Heading}
                                  </dt>
                                  <dd className="mt-0.5 whitespace-pre-line font-medium text-slate-700 dark:text-slate-300">
                                    {member.field3}
                                  </dd>
                                </div>
                              )}
                              {member.field4 && (
                                <div>
                                  <dt className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                                    {field4Heading}
                                  </dt>
                                  <dd className="mt-0.5 whitespace-pre-line font-medium text-slate-700 dark:text-slate-300">
                                    {member.field4}
                                  </dd>
                                </div>
                              )}
                              {member.field5 && (
                                <div>
                                  <dt className="text-[10px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">
                                    {field5Heading}
                                  </dt>
                                  <dd className="mt-0.5 whitespace-pre-line text-slate-600 dark:text-slate-400">
                                    {member.field5}
                                  </dd>
                                </div>
                              )}
                            </dl>
                          )}
                        </div>

                        {/* Optional Files & Links */}
                        {hasActions && (
                          <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3.5 dark:border-slate-800/80">
                            {member.file1 && (
                              <a
                                href={member.file1}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-primary)]/10 px-2.5 py-1.5 text-[11px] font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white dark:bg-[var(--color-primary-dark)]/15 dark:text-[var(--color-primary-dark)] dark:hover:bg-[var(--color-primary-dark)] dark:hover:text-slate-950"
                              >
                                <FileText className="h-3 w-3" />
                                <span>{file1Text}</span>
                              </a>
                            )}
                            {member.file2 && (
                              <a
                                href={member.file2}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-primary)]/10 px-2.5 py-1.5 text-[11px] font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-primary)] hover:text-white dark:bg-[var(--color-primary-dark)]/15 dark:text-[var(--color-primary-dark)] dark:hover:bg-[var(--color-primary-dark)] dark:hover:text-slate-950"
                              >
                                <FileText className="h-3 w-3" />
                                <span>{file2Text}</span>
                              </a>
                            )}
                            {member.link1 && (
                              <a
                                href={member.link1}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-[var(--color-primary-dark)]/40 dark:hover:text-[var(--color-primary-dark)]"
                              >
                                <span>{link1Text}</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                            {member.link2 && (
                              <a
                                href={member.link2}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:border-[var(--color-primary)]/40 hover:text-[var(--color-primary)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-[var(--color-primary-dark)]/40 dark:hover:text-[var(--color-primary-dark)]"
                              >
                                <span>{link2Text}</span>
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </main>
  );
}
