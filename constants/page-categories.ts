export type PageCategoryLevel = "dept" | "central";

export interface PageCategoryItem {
  label: string;
  categoryNumber: string; // Stored in page_entries.category (e.g. "101" or "1")
  rights: string[]; // Required rights (empty [] = any user with matching level right)
  level: PageCategoryLevel; // "dept" = requires "hod" right, "central" = requires "admin" right
  readonly isCustomPage?: boolean;
}

export const PAGE_CATEGORY_MAP: readonly PageCategoryItem[] = [
  // Central ("admin" right) Categories
  {
    label: "Custom Page (Standalone URL)",
    categoryNumber: "900",
    rights: ["admin"],
    level: "central",
    isCustomPage: true,
  },
  {
    label: "Fees Structure",
    categoryNumber: "101",
    rights: ["admin", "manage_fees"],
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
  },
  {
    label: "Department Timetable",
    categoryNumber: "201",
    rights: ["hod", "academics"],
    level: "dept",
  },
  {
    label: "Scheme & Syllabus",
    categoryNumber: "202",
    rights: ["hod", "academics"],
    level: "dept",
  },
  {
    label: "Laboratories & Infrastructure",
    categoryNumber: "203",
    rights: ["hod", "manage_dept_labs"],
    level: "dept",
  },
  {
    label: "Department Committees & Societies",
    categoryNumber: "204",
    rights: ["hod"],
    level: "dept",
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

export function findCategoryByNumber(
  categoryNumber: string | null | undefined,
): PageCategoryItem | undefined {
  const clean = (categoryNumber ?? "").trim();
  if (!clean) return undefined;
  return PAGE_CATEGORY_MAP.find((item) => item.categoryNumber === clean);
}
