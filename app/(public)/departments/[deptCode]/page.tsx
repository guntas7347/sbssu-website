import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Award,
  BookOpen,
  Building2,
  Compass,
  ExternalLink,
  Eye,
  FileText,
  FlaskConical,
  GraduationCap,
  Landmark,
  Layers,
  Link2,
  Target,
  UserCheck,
  Users,
} from "lucide-react";
import { LegacyInfoBanner } from "@/components/LegacyInfoBanner";
import {
  getAllPublicDepartmentEntries,
  type PublicDepartmentEntryItem,
} from "@/lib/actions/public/public-page-entries";

export const dynamic = "force-dynamic";

interface DeptPageProps {
  params: Promise<{ deptCode: string }>;
}

const HOME_CATEGORY_CODES = new Set([
  "205", // About Department (single)
  "206", // Vision (single)
  "207", // Mission (single)
  "208", // HOD Details (single)
  "209", // Courses Offered (list)
  "210", // PEOs, POs & PSOs (single)
  "211", // Faculty Directory (list)
  "212", // Board of Studies (BoS) (list)
  "213", // Research, Publications & Grants (list)
]);

interface EntryActionLink {
  href: string;
  label: string;
  isExternal: boolean;
}

function sortByDisplayOrder(
  a: PublicDepartmentEntryItem,
  b: PublicDepartmentEntryItem,
): number {
  const orderA = a.displayOrder ?? 0;
  const orderB = b.displayOrder ?? 0;
  if (orderA !== orderB) return orderA - orderB;
  return (a.field1 ?? "").localeCompare(b.field1 ?? "");
}

function getNonEmptyFields(entry: PublicDepartmentEntryItem): string[] {
  return [entry.field1, entry.field2, entry.field3, entry.field4, entry.field5]
    .map((v) => v?.trim())
    .filter((v): v is string => Boolean(v));
}

function getSecondaryFields(entry: PublicDepartmentEntryItem): string[] {
  return [entry.field2, entry.field3, entry.field4, entry.field5]
    .map((v) => v?.trim())
    .filter((v): v is string => Boolean(v));
}

function getEntryLinks(
  entry: PublicDepartmentEntryItem,
  deptSlug: string,
): EntryActionLink[] {
  const links: EntryActionLink[] = [];
  const isCustom = Boolean(entry.slug || entry.htmlContent);

  if (isCustom && entry.slug) {
    links.push({
      href: `/departments/${deptSlug}/custom-pages/${entry.slug}`,
      label: "Open Page",
      isExternal: false,
    });
  }

  if (entry.file1) {
    links.push({
      href: entry.file1,
      label: entry.file2 ? "File 1" : "View Document",
      isExternal: /^https?:\/\//i.test(entry.file1),
    });
  }

  if (entry.file2) {
    links.push({
      href: entry.file2,
      label: "File 2",
      isExternal: /^https?:\/\//i.test(entry.file2),
    });
  }

  if (entry.link1) {
    links.push({
      href: entry.link1,
      label: entry.link2 ? "Link 1" : "Visit Link",
      isExternal: /^https?:\/\//i.test(entry.link1),
    });
  }

  if (entry.link2) {
    links.push({
      href: entry.link2,
      label: entry.link2 || "Link 2",
      isExternal: /^https?:\/\//i.test(entry.link2),
    });
  }

  return links;
}

function EntryFieldsList({
  entry,
  skipPrimary = false,
}: {
  entry: PublicDepartmentEntryItem;
  skipPrimary?: boolean;
}) {
  const fields = skipPrimary
    ? getSecondaryFields(entry)
    : getNonEmptyFields(entry);

  if (fields.length === 0) return null;

  return (
    <div className="mt-2 space-y-1">
      {fields.map((val, idx) => (
        <p
          key={`${entry.id}-f-${idx}`}
          className="whitespace-pre-line text-xs leading-relaxed text-slate-600 dark:text-slate-400"
        >
          {val}
        </p>
      ))}
    </div>
  );
}

export async function generateMetadata({
  params,
}: DeptPageProps): Promise<Metadata> {
  const { deptCode } = await params;
  const { department } = await getAllPublicDepartmentEntries(deptCode);

  if (!department) {
    return { title: "Department Not Found | SBSSU" };
  }

  return {
    title: `${department.name} (${department.code.toUpperCase()}) | SBSSU`,
    description: `Official academic overview, faculty, courses, research, and circulars for the ${department.name} at Shaheed Bhagat Singh State University, Ferozepur.`,
  };
}

export default async function DepartmentPublicPage({ params }: DeptPageProps) {
  const { deptCode } = await params;
  const { department, entries } = await getAllPublicDepartmentEntries(deptCode);

  if (!department) {
    notFound();
  }

  const deptSlug = department.code.toLowerCase();
  const legacyUrl = `/departments/legacy/${encodeURIComponent(deptSlug)}`;
  const orderedEntries = [...entries].sort(sortByDisplayOrder);

  const byCategoryCode = (code: string): PublicDepartmentEntryItem[] =>
    orderedEntries.filter((e) => (e.categoryCode ?? "").trim() === code);

  // Single-entry department home sections
  const aboutEntry = byCategoryCode("205")[0] ?? null;
  const visionEntry = byCategoryCode("206")[0] ?? null;
  const missionEntry = byCategoryCode("207")[0] ?? null;
  const hodEntry = byCategoryCode("208")[0] ?? null;
  const peoEntry = byCategoryCode("210")[0] ?? null;

  // Multi-entry department home sections
  const coursesEntries = byCategoryCode("209");
  const facultyEntries = byCategoryCode("211");
  const bosEntries = byCategoryCode("212");
  const researchEntries = byCategoryCode("213");

  // Remaining department categories
  const otherGroupsMap = new Map<
    string,
    { code: string; label: string; items: PublicDepartmentEntryItem[] }
  >();

  for (const entry of orderedEntries) {
    const code = (entry.categoryCode ?? "").trim();
    if (HOME_CATEGORY_CODES.has(code)) continue;

    const key = entry.pageCategoryId || code || "general";
    const label =
      entry.categoryName?.trim() ||
      (code ? `Category ${code}` : "Department Resources");

    const existing = otherGroupsMap.get(key);
    if (existing) {
      existing.items.push(entry);
    } else {
      otherGroupsMap.set(key, { code: code || key, label, items: [entry] });
    }
  }

  const otherSections = Array.from(otherGroupsMap.values());

  const navLinks = [
    aboutEntry || visionEntry || missionEntry
      ? { id: "overview", label: "Overview & Vision" }
      : null,
    hodEntry ? { id: "hod", label: "HOD Desk" } : null,
    coursesEntries.length > 0 ? { id: "courses", label: "Courses" } : null,
    peoEntry ? { id: "outcomes", label: "PEOs / POs / PSOs" } : null,
    facultyEntries.length > 0 ? { id: "faculty", label: "Faculty" } : null,
    bosEntries.length > 0 ? { id: "bos", label: "Board of Studies" } : null,
    researchEntries.length > 0 ? { id: "research", label: "Research" } : null,
    ...otherSections.map((sec) => ({
      id: `cat-${sec.code}`,
      label: sec.label,
    })),
  ].filter(Boolean) as Array<{ id: string; label: string }>;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Hero Header */}
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4">
            <Link
              href="/departments"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Departments
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider uppercase">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
              <Building2 className="h-3.5 w-3.5" />
              {department.code.toUpperCase()}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600/10 px-3 py-1 text-green-700 dark:bg-green-500/15 dark:text-green-400">
              <Layers className="h-3.5 w-3.5" />
              SBSSU Academic Department
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
            {department.name}
          </h1>

          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
            Shaheed Bhagat Singh State University, Ferozepur — Academic
            programs, faculty directory, outcomes, and official departmental
            resources.
          </p>

          <LegacyInfoBanner
            href={legacyUrl}
            label={`Looking for older ${department.code.toUpperCase()} circulars, syllabi, or pages from the legacy portal?`}
            actionText="Open Legacy Archive"
            className="mt-5 mb-0"
          />
        </header>

        {/* Sticky Section Quick-Jump Bar */}
        {navLinks.length > 0 && (
          <nav
            aria-label="Department sections"
            className="sticky top-3 z-20 flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-xs backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/95"
          >
            <span className="px-2 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
              Sections:
            </span>
            {navLinks.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-orange-500/40 hover:bg-orange-500/10 hover:text-orange-700 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300 dark:hover:border-orange-400/40 dark:hover:bg-orange-500/15 dark:hover:text-orange-300"
              >
                {item.label}
              </a>
            ))}
          </nav>
        )}

        {/* 1. About Department (205) + Vision (206) & Mission (207) */}
        {(aboutEntry || visionEntry || missionEntry) && (
          <section id="overview" className="scroll-mt-20 space-y-6">
            {aboutEntry && (
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2.5 border-b border-slate-200 pb-4 dark:border-slate-800">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                    <Compass className="h-5 w-5" />
                  </div>
                  <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                    {aboutEntry.field1?.trim() ||
                      aboutEntry.categoryName ||
                      "About the Department"}
                  </h2>
                </div>
                <EntryFieldsList entry={aboutEntry} skipPrimary />
              </div>
            )}

            {(visionEntry || missionEntry) && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {visionEntry && (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-7 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600/10 text-green-700 dark:bg-green-500/15 dark:text-green-400">
                        <Eye className="h-5 w-5" />
                      </div>
                      <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                        {visionEntry.field1?.trim() ||
                          visionEntry.categoryName ||
                          "Vision"}
                      </h2>
                    </div>
                    <EntryFieldsList entry={visionEntry} skipPrimary />
                  </div>
                )}

                {missionEntry && (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-7 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                        <Target className="h-5 w-5" />
                      </div>
                      <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                        {missionEntry.field1?.trim() ||
                          missionEntry.categoryName ||
                          "Mission"}
                      </h2>
                    </div>
                    <EntryFieldsList entry={missionEntry} skipPrimary />
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* 2. Head of Department Desk (208) */}
        {hodEntry && (
          <section
            id="hod"
            className="scroll-mt-20 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-2.5 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600/10 text-green-700 dark:bg-green-500/15 dark:text-green-400">
                <UserCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                  Head of Department
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Leadership & Message
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-start">
              {hodEntry.file1 && (
                <div className="shrink-0">
                  <img
                    src={hodEntry.file1}
                    alt={hodEntry.field1?.trim() || "Head of Department"}
                    className="h-36 w-36 rounded-2xl border border-slate-200 object-cover shadow-xs dark:border-slate-700"
                  />
                </div>
              )}

              <div className="min-w-0 flex-1 space-y-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {hodEntry.field1?.trim() || "Head of Department"}
                </h3>
                <EntryFieldsList entry={hodEntry} skipPrimary />
              </div>
            </div>
          </section>
        )}

        {/* 3. Courses Offered (209) */}
        {coursesEntries.length > 0 && (
          <section
            id="courses"
            className="scroll-mt-20 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                  Courses Offered
                </h2>
              </div>
              <span className="rounded-full bg-orange-500/10 px-3 py-1 font-mono text-xs font-bold text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                {coursesEntries.length}{" "}
                {coursesEntries.length === 1 ? "Program" : "Programs"}
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {coursesEntries.map((course) => {
                const links = getEntryLinks(course, deptSlug);
                const extraFields = getSecondaryFields(course);
                return (
                  <div
                    key={course.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {course.field1?.trim() || "Academic Program"}
                      </h3>
                      {extraFields.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {extraFields.map((val, idx) => (
                            <span
                              key={`${course.id}-c-${idx}`}
                              className="inline-flex rounded-lg bg-green-600/10 px-2.5 py-1 font-mono text-xs font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400"
                            >
                              {val}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {links.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-3 border-t border-slate-200/70 pt-2.5 dark:border-slate-800">
                        {links.map((action) => (
                          <Link
                            key={`${course.id}-${action.label}`}
                            href={action.href}
                            target={action.isExternal ? "_blank" : undefined}
                            rel={
                              action.isExternal
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="inline-flex items-center gap-1 text-xs font-semibold text-orange-700 hover:underline dark:text-orange-400"
                          >
                            <span>{action.label}</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 4. PEOs, POs & PSOs (210) */}
        {peoEntry && (
          <section
            id="outcomes"
            className="scroll-mt-20 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600/10 text-green-700 dark:bg-green-500/15 dark:text-green-400">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                    {peoEntry.field1?.trim() ||
                      peoEntry.categoryName ||
                      "PEOs, POs & PSOs (Outcome Framework)"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Programme Educational Objectives & Outcomes
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {getEntryLinks(peoEntry, deptSlug).map((action) => (
                  <Link
                    key={`${peoEntry.id}-${action.label}`}
                    href={action.href}
                    target={action.isExternal ? "_blank" : undefined}
                    rel={action.isExternal ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
                  >
                    <span>{action.label}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>

            <EntryFieldsList entry={peoEntry} skipPrimary />
          </section>
        )}

        {/* 5. Faculty Directory (211) */}
        {facultyEntries.length > 0 && (
          <section
            id="faculty"
            className="scroll-mt-20 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                  <Users className="h-5 w-5" />
                </div>
                <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                  Faculty Directory
                </h2>
              </div>
              <span className="rounded-full bg-green-600/10 px-3 py-1 font-mono text-xs font-bold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                {facultyEntries.length} Members
              </span>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {facultyEntries.map((member) => {
                const isPhoto = Boolean(
                  member.file1 &&
                  /\.(png|jpe?g|webp|gif)$/i.test(member.file1.trim()),
                );
                const extraLinks = getEntryLinks(member, deptSlug).filter(
                  (l) => !(isPhoto && l.href === member.file1),
                );

                return (
                  <div
                    key={member.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60"
                  >
                    <div className="flex items-start gap-3.5">
                      {isPhoto && member.file1 && (
                        <img
                          src={member.file1}
                          alt={member.field1?.trim() || "Faculty member"}
                          className="h-14 w-14 shrink-0 rounded-xl border border-slate-200 object-cover dark:border-slate-700"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {member.field1?.trim() || "Faculty Member"}
                        </h3>
                        <EntryFieldsList entry={member} skipPrimary />
                      </div>
                    </div>

                    {extraLinks.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-3 border-t border-slate-200/70 pt-2.5 dark:border-slate-800">
                        {extraLinks.map((action) => (
                          <Link
                            key={`${member.id}-${action.label}`}
                            href={action.href}
                            target={action.isExternal ? "_blank" : undefined}
                            rel={
                              action.isExternal
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="inline-flex items-center gap-1 text-xs font-semibold text-orange-700 hover:underline dark:text-orange-400"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            <span>{action.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 6. Board of Studies (212) */}
        {bosEntries.length > 0 && (
          <section
            id="bos"
            className="scroll-mt-20 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center gap-2.5 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600/10 text-green-700 dark:bg-green-500/15 dark:text-green-400">
                <Landmark className="h-5 w-5" />
              </div>
              <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                Board of Studies (BoS)
              </h2>
            </div>

            <ul className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
              {bosEntries.map((item) => {
                const links = getEntryLinks(item, deptSlug);
                return (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-3.5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.field1?.trim() || "Board of Studies Notification"}
                      </p>
                      <EntryFieldsList entry={item} skipPrimary />
                    </div>

                    {links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {links.map((action) => (
                          <Link
                            key={`${item.id}-${action.label}`}
                            href={action.href}
                            target={action.isExternal ? "_blank" : undefined}
                            rel={
                              action.isExternal
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-700 transition hover:bg-orange-500/20 dark:text-orange-300"
                          >
                            <span>{action.label}</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* 7. Research, Publications & Grants (213) */}
        {researchEntries.length > 0 && (
          <section
            id="research"
            className="scroll-mt-20 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                  <FlaskConical className="h-5 w-5" />
                </div>
                <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                  Research, Publications & Grants
                </h2>
              </div>
              <span className="rounded-full bg-orange-500/10 px-3 py-1 font-mono text-xs font-bold text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                {researchEntries.length}
              </span>
            </div>

            <ul className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
              {researchEntries.map((item) => {
                const links = getEntryLinks(item, deptSlug);
                return (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-3.5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.field1?.trim() || "Research Entry"}
                      </p>
                      <EntryFieldsList entry={item} skipPrimary />
                    </div>

                    {links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {links.map((action) => (
                          <Link
                            key={`${item.id}-${action.label}`}
                            href={action.href}
                            target={action.isExternal ? "_blank" : undefined}
                            rel={
                              action.isExternal
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-green-600/30 bg-green-600/10 px-3 py-1.5 text-xs font-semibold text-green-700 transition hover:bg-green-600/20 dark:text-green-300"
                          >
                            <span>{action.label}</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* 8. Other Department Categories */}
        {otherSections.map((section) => (
          <section
            key={section.code}
            id={`cat-${section.code}`}
            className="scroll-mt-20 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600/10 text-green-700 dark:bg-green-500/15 dark:text-green-400">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                  {section.label}
                </h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 font-mono text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {section.items.length}
              </span>
            </div>

            <ul className="mt-4 divide-y divide-slate-200 dark:divide-slate-800">
              {section.items.map((item) => {
                const links = getEntryLinks(item, deptSlug);
                const allFields = getNonEmptyFields(item);
                const primaryLabel =
                  allFields[0] || item.categoryName || "Entry";
                return (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-3.5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {primaryLabel}
                      </p>
                      <EntryFieldsList entry={item} skipPrimary />
                    </div>

                    {links.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {links.map((action) => (
                          <Link
                            key={`${item.id}-${action.label}`}
                            href={action.href}
                            target={action.isExternal ? "_blank" : undefined}
                            rel={
                              action.isExternal
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-700 transition hover:bg-orange-500/20 dark:text-orange-300"
                          >
                            <Link2 className="h-3 w-3" />
                            <span>{action.label}</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}

        {/* Empty State if Nothing Published Yet */}
        {entries.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              No entries published yet for {department.name}
            </p>
            <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
              Use the legacy portal archive banner above to access older
              departmental records.
            </p>
          </div>
        )}

        {/* Bottom Legacy Banner */}
        <LegacyInfoBanner
          href={legacyUrl}
          label="Need older departmental syllabi, circulars, or pages?"
          actionText="Browse Legacy Archive"
        />
      </div>
    </main>
  );
}
