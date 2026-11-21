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
  Target,
  UserCheck,
  Users,
} from "lucide-react";
import { LegacyInfoBanner } from "@/components/LegacyInfoBanner";
import {
  findCategoryByNumber,
  PAGE_CATEGORY_MAP,
} from "@/constants/page-categories";
import {
  getAllPublicDepartmentEntries,
  type PublicPageEntryItem,
} from "@/lib/actions/public-page-entries";

export const dynamic = "force-dynamic";

interface DeptPageProps {
  params: Promise<{ deptCode: string }>;
}

const HOME_CATEGORY_NUMBERS = new Set([
  "205", // About Department (single)
  "206", // Vision (single)
  "207", // Mission (single)
  "208", // HOD Details (single)
  "209", // Courses Offered (categorical)
  "210", // PEOs, POs & PSOs (single)
  "211", // Faculty Directory (categorical)
  "212", // Board of Studies (BoS) (categorical)
  "213", // Research, Publications & Grants (categorical)
]);

function resolveEntryHref(
  entry: PublicPageEntryItem,
  deptSlug: string,
): { href: string | null; isExternal: boolean; label: string } {
  if (entry.type === "custom" && entry.slug) {
    return {
      href: `/departments/${deptSlug}/pages/${entry.slug}`,
      isExternal: false,
      label: "Open Page",
    };
  }
  if (entry.file) {
    return {
      href: entry.file,
      isExternal: /^https?:\/\//i.test(entry.file),
      label: "View Document",
    };
  }
  if (entry.link) {
    return {
      href: entry.link,
      isExternal: /^https?:\/\//i.test(entry.link),
      label: "Visit Link",
    };
  }
  return { href: null, isExternal: false, label: "" };
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

  const byCategory = (catNum: string): PublicPageEntryItem[] =>
    entries.filter((e) => (e.category ?? "").trim() === catNum);

  // Single-entry department home sections (always accessing [0] from array)
  const aboutEntry = byCategory("205")[0] ?? null;
  const visionEntry = byCategory("206")[0] ?? null;
  const missionEntry = byCategory("207")[0] ?? null;
  const hodEntry = byCategory("208")[0] ?? null;
  const peoEntry = byCategory("210")[0] ?? null;

  // Categorical department home sections
  const coursesEntries = byCategory("209");
  const facultyEntries = byCategory("211");
  const bosEntries = byCategory("212");
  const researchEntries = byCategory("213");

  // Remaining department categories (Timetable 201, Syllabus 202, Labs 203, Committees 204, Custom Pages 901, etc.)
  const otherGroupsMap = new Map<
    string,
    { code: string; label: string; items: PublicPageEntryItem[] }
  >();

  for (const entry of entries) {
    const code = (entry.category ?? "").trim();
    if (HOME_CATEGORY_NUMBERS.has(code)) continue;

    const key = code || "general";
    const meta = findCategoryByNumber(code);
    const label =
      meta?.label ?? (code ? `Category ${code}` : "Department Resources");

    const existing = otherGroupsMap.get(key);
    if (existing) {
      existing.items.push(entry);
    } else {
      otherGroupsMap.set(key, { code: key, label, items: [entry] });
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
                    {aboutEntry.title?.trim() || "About the Department"}
                  </h2>
                </div>
                {aboutEntry.desc && (
                  <p className="mt-4 whitespace-pre-line text-xs leading-relaxed text-slate-700 sm:text-sm dark:text-slate-300">
                    {aboutEntry.desc}
                  </p>
                )}
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
                        {visionEntry.title?.trim() || "Vision"}
                      </h2>
                    </div>
                    {visionEntry.desc && (
                      <p className="mt-4 whitespace-pre-line text-xs leading-relaxed text-slate-700 sm:text-sm dark:text-slate-300">
                        {visionEntry.desc}
                      </p>
                    )}
                  </div>
                )}

                {missionEntry && (
                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-7 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
                        <Target className="h-5 w-5" />
                      </div>
                      <h2 className="text-base font-bold text-slate-900 sm:text-lg dark:text-white">
                        {missionEntry.title?.trim() || "Mission"}
                      </h2>
                    </div>
                    {missionEntry.desc && (
                      <p className="mt-4 whitespace-pre-line text-xs leading-relaxed text-slate-700 sm:text-sm dark:text-slate-300">
                        {missionEntry.desc}
                      </p>
                    )}
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
              {hodEntry.file && (
                <div className="shrink-0">
                  <img
                    src={hodEntry.file}
                    alt={hodEntry.title?.trim() || "Head of Department"}
                    className="h-36 w-36 rounded-2xl border border-slate-200 object-cover shadow-xs dark:border-slate-700"
                  />
                </div>
              )}

              <div className="min-w-0 flex-1 space-y-2.5">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  {hodEntry.title?.trim() || "Head of Department"}
                </h3>
                {hodEntry.desc && (
                  <p className="whitespace-pre-line text-xs leading-relaxed text-slate-700 sm:text-sm dark:text-slate-300">
                    {hodEntry.desc}
                  </p>
                )}
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
                const action = resolveEntryHref(course, deptSlug);
                return (
                  <div
                    key={course.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60"
                  >
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {course.title?.trim() || "Academic Program"}
                      </h3>
                      {course.desc && (
                        <p className="mt-2 inline-flex rounded-lg bg-green-600/10 px-2.5 py-1 font-mono text-xs font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                          {course.desc}
                        </p>
                      )}
                    </div>

                    {action.href && (
                      <div className="mt-4 pt-2">
                        <Link
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
                    {peoEntry.title?.trim() ||
                      "PEOs, POs & PSOs (Outcome Framework)"}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Programme Educational Objectives & Outcomes
                  </p>
                </div>
              </div>

              {(() => {
                const action = resolveEntryHref(peoEntry, deptSlug);
                if (!action.href) return null;
                return (
                  <Link
                    href={action.href}
                    target={action.isExternal ? "_blank" : undefined}
                    rel={action.isExternal ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
                  >
                    <span>{action.label}</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                );
              })()}
            </div>

            {peoEntry.desc && (
              <p className="mt-4 whitespace-pre-line text-xs leading-relaxed text-slate-700 sm:text-sm dark:text-slate-300">
                {peoEntry.desc}
              </p>
            )}
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
                const action = resolveEntryHref(member, deptSlug);
                const isImage = Boolean(
                  member.file &&
                  /\.(png|jpe?g|webp|gif)$/i.test(member.file.trim()),
                );

                return (
                  <div
                    key={member.id}
                    className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60"
                  >
                    <div className="flex items-start gap-3.5">
                      {isImage && member.file && (
                        <img
                          src={member.file}
                          alt={member.title?.trim() || "Faculty member"}
                          className="h-14 w-14 shrink-0 rounded-xl border border-slate-200 object-cover dark:border-slate-700"
                        />
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          {member.title?.trim() || "Faculty Member"}
                        </h3>
                        {member.desc && (
                          <p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                            {member.desc}
                          </p>
                        )}
                      </div>
                    </div>

                    {action.href && !isImage && (
                      <div className="mt-3 border-t border-slate-200/70 pt-2.5 dark:border-slate-800">
                        <Link
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
                const action = resolveEntryHref(item, deptSlug);
                return (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-3.5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.title?.trim() || "Board of Studies Notification"}
                      </p>
                      {item.desc && (
                        <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                          {item.desc}
                        </p>
                      )}
                    </div>

                    {action.href && (
                      <Link
                        href={action.href}
                        target={action.isExternal ? "_blank" : undefined}
                        rel={
                          action.isExternal ? "noopener noreferrer" : undefined
                        }
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-700 transition hover:bg-orange-500/20 dark:text-orange-300"
                      >
                        <span>{action.label}</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
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
                const action = resolveEntryHref(item, deptSlug);
                return (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-3.5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.title?.trim() || "Research Entry"}
                      </p>
                      {item.desc && (
                        <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                          {item.desc}
                        </p>
                      )}
                    </div>

                    {action.href && (
                      <Link
                        href={action.href}
                        target={action.isExternal ? "_blank" : undefined}
                        rel={
                          action.isExternal ? "noopener noreferrer" : undefined
                        }
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-green-600/30 bg-green-600/10 px-3 py-1.5 text-xs font-semibold text-green-700 transition hover:bg-green-600/20 dark:text-green-300"
                      >
                        <span>{action.label}</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {/* 8. Other Department Categories (Timetable, Syllabus, Labs, Committees, Custom Pages) */}
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
                const action = resolveEntryHref(item, deptSlug);
                return (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 py-3.5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {item.title?.trim() || item.desc?.trim() || "Entry"}
                      </p>
                      {item.title && item.desc && (
                        <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">
                          {item.desc}
                        </p>
                      )}
                    </div>

                    {action.href && (
                      <Link
                        href={action.href}
                        target={action.isExternal ? "_blank" : undefined}
                        rel={
                          action.isExternal ? "noopener noreferrer" : undefined
                        }
                        className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-semibold text-orange-700 transition hover:bg-orange-500/20 dark:text-orange-300"
                      >
                        <span>{action.label}</span>
                        <ExternalLink className="h-3 w-3" />
                      </Link>
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
