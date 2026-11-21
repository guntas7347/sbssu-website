export type PageCategoryLevel = "dept" | "central";
export type PageCategoryMode = "single" | "categorical";

export interface PageCategoryItem {
  label: string;
  categoryNumber: string; // Stored in page_entries.category (e.g. "101", "201")
  rights: string[]; // Required rights (empty [] = any user with matching level right)
  level: PageCategoryLevel; // "dept" = requires "hod" right, "central" = requires "admin" right
  mode?: PageCategoryMode; // Defaults to "categorical"; "single" allows only one entry per scope
  readonly note?: string; // Editor guidance shown next to category select
  readonly showOnDeptHome?: boolean; // Featured directly on /departments/[deptCode] home page
  readonly isCustomPage?: boolean;
}

export const PAGE_CATEGORY_MAP: readonly PageCategoryItem[] = [
  // Central ("admin" right) Categories
  {
    label: "Custom Page",
    categoryNumber: "900",
    rights: ["admin"],
    level: "central",
    isCustomPage: true,
    note: "Slug & HTML Content required. Generates a standalone university-wide custom page.",
  },
  {
    label: "Board of Governors",
    categoryNumber: "101",
    rights: ["admin"],
    level: "central",
  },
  {
    label: "Academic Calendar",
    categoryNumber: "102",
    rights: ["admin", "academics"],
    level: "central",
  },
  {
    label: "Admissions & Prospectus",
    categoryNumber: "103",
    rights: ["admin", "manage_admissions"],
    level: "central",
  },
  {
    label: "Ordinances & Rules",
    categoryNumber: "104",
    rights: ["admin"],
    level: "central",
  },
  {
    label: "Training & Placement",
    categoryNumber: "105",
    rights: ["admin", "manage_tp"],
    level: "central",
  },

  // Department ("hod" right) Categories
  {
    label: "Department Custom Page (Standalone URL)",
    categoryNumber: "901",
    rights: ["hod"],
    level: "dept",
    isCustomPage: true,
    note: "Slug & HTML Content required. Generates a standalone page under your department URL.",
  },
  {
    label: "Department Timetable",
    categoryNumber: "201",
    rights: ["hod", "academics"],
    level: "dept",
    note: "Title: Semester / Class (e.g. B.Tech CSE 5th Sem), Upload: Timetable PDF or Paste HTML.",
  },
  {
    label: "Scheme & Syllabus",
    categoryNumber: "202",
    rights: ["hod", "academics"],
    level: "dept",
    note: "Title: Program & Batch (e.g. B.Tech CSE Scheme 2026), Upload: Syllabus PDF.",
  },
  {
    label: "Laboratories & Infrastructure",
    categoryNumber: "203",
    rights: ["hod", "manage_dept_labs"],
    level: "dept",
    note: "Title: Lab Name, Desc: Equipment & room details, Upload: Lab photo (optional).",
  },
  {
    label: "Department Committees & Societies",
    categoryNumber: "204",
    rights: ["hod"],
    level: "dept",
    note: "Title: Committee / Society Name, Desc: Coordinator & activities.",
  },

  // Department Home Page Categories (205 - 213)
  {
    label: "About Department",
    categoryNumber: "205",
    rights: ["hod"],
    level: "dept",
    mode: "single",
    showOnDeptHome: true,
    note: "Title: Optional (defaults to About Department), Desc: Department overview, history & highlights",
  },
  {
    label: "Vision",
    categoryNumber: "206",
    rights: ["hod"],
    level: "dept",
    mode: "single",
    showOnDeptHome: true,
    note: "Title: Optional (defaults to Vision), Desc: Department Vision statement",
  },
  {
    label: "Mission",
    categoryNumber: "207",
    rights: ["hod"],
    level: "dept",
    mode: "single",
    showOnDeptHome: true,
    note: "Title: Optional (defaults to Mission), Desc: Department Mission points",
  },
  {
    label: "HOD Details",
    categoryNumber: "208",
    rights: ["hod"],
    level: "dept",
    mode: "single",
    showOnDeptHome: true,
    note: "Title: HOD Name & Qualification, Desc: HOD Message / Contact, Upload: HOD Photo",
  },
  {
    label: "Courses Offered",
    categoryNumber: "209",
    rights: ["hod"],
    level: "dept",
    showOnDeptHome: true,
    note: "Title: Course Name (e.g. B.Tech CSE), Desc: Duration & Intake / Seats (e.g. 4 Years · 120 Seats)",
  },
  {
    label: "PEOs, POs & PSOs",
    categoryNumber: "210",
    rights: ["hod", "academics"],
    level: "dept",
    mode: "single",
    showOnDeptHome: true,
    note: "Title: Program Name (e.g. B.Tech Outcome Framework), Desc: Summary or Paste HTML / Upload NBA PEO-PO-PSO PDF",
  },
  {
    label: "Faculty Directory",
    categoryNumber: "211",
    rights: ["hod"],
    level: "dept",
    showOnDeptHome: true,
    note: "Title: Faculty Name & Designation, Desc: Qualification, Specialization & Email, Upload: Profile Photo / CV",
  },
  {
    label: "Board of Studies (BoS)",
    categoryNumber: "212",
    rights: ["hod", "academics"],
    level: "dept",
    showOnDeptHome: true,
    note: "Title: BoS Notification / Committee Title, Desc: Term & Key Members, Upload: BoS Constitution / Minutes PDF",
  },
  {
    label: "Research, Publications & Grants",
    categoryNumber: "213",
    rights: ["hod"],
    level: "dept",
    showOnDeptHome: true,
    note: "Title: Project / Publication / Patent Title, Desc: Investigators, Journal / Funding Agency & Year, Upload: Report / PDF",
  },
] as const;

export interface CurrentUserLike {
  id: string;
  rights: string[] | null;
  departmentId?: string | null;
  departmentName?: string | null;
  departmentCode?: string | null;
  department?: {
    id?: string | null;
    name?: string | null;
    code?: string | null;
  } | null;
}

export function getAllowedPageCategories(
  user: CurrentUserLike | null | undefined,
): PageCategoryItem[] {
  if (!user) return [];

  const rights = user.rights ?? [];
  const canCentral = rights.includes("admin");
  const canDept = rights.includes("hod");

  if (!canCentral && !canDept) return [];

  return PAGE_CATEGORY_MAP.filter((item) => {
    if (item.level === "central" && !canCentral) return false;
    if (item.level === "dept" && !canDept) return false;
    if (item.rights.length === 0) return true;

    return item.rights.some((reqRight) => rights.includes(reqRight));
  });
}

export function getPublicCategoriesByLevel(
  level: PageCategoryLevel,
): PageCategoryItem[] {
  return PAGE_CATEGORY_MAP.filter((item) => item.level === level);
}

export function getDeptHomeCategories(): PageCategoryItem[] {
  return PAGE_CATEGORY_MAP.filter(
    (item) => item.level === "dept" && item.showOnDeptHome,
  );
}

export function findCategoryByNumber(
  categoryNumber: string | null | undefined,
): PageCategoryItem | undefined {
  const clean = (categoryNumber ?? "").trim();
  if (!clean) return undefined;
  return PAGE_CATEGORY_MAP.find((item) => item.categoryNumber === clean);
}

export function isSingleEntryCategory(
  categoryNumber: string | null | undefined,
): boolean {
  return findCategoryByNumber(categoryNumber)?.mode === "single";
}
