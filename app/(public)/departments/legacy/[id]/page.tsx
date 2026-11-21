import React from "react";
import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { db } from "@/db/drizzel";
import { legacyWebsites, type LegacyWebsite } from "@/db/schema";
import {
  LegacyDepartmentView,
  type DeptLegacyDataMap,
  type DeptTabConfig,
} from "./LegacyDepartmentView";

type Props = {
  params: Promise<{ id: string }>;
};

export interface DepartmentLegacyMapping {
  name: string;
  /** Legacy BusinessDetail.Category ID (same as ?Id=... in dptArch.aspx) */
  categoryId: number;
}

/**
 * Map each department slug to its single legacy `Category` ID.
 * Tabs are automatically separated by `ContactNo` just like `getdata` / `getdata1`.
 */
export const DEPARTMENT_CATEGORY_MAP: Record<string, DepartmentLegacyMapping> =
  {
    chemical: {
      name: "Chemical Engineering",
      categoryId: 6,
    },
    civil: {
      name: "Civil Engineering",
      categoryId: 5,
    },
    cse: {
      name: "Computer Science & Engineering",
      categoryId: 8,
    },
    ece: {
      name: "Electronics & Communication Engineering",
      categoryId: 9,
    },
    electrical: {
      name: "Electrical Engineering",
      categoryId: 7,
    },
    mechanical: {
      name: "Mechanical Engineering",
      categoryId: 4,
    },
    arch: {
      name: "School of Architecture",
      categoryId: 1,
    },
    dash: {
      name: "Applied Sciences & Humanities",
      categoryId: 3,
    },
    ca: {
      name: "Computer Applications",
      categoryId: 2,
    },
    ubs: {
      name: "University Business School",
      categoryId: 13,
    },
    polywing: {
      name: "PolyWing",
      categoryId: 11,
    },
    agriculture: {
      name: "Agriculture Department",
      categoryId: 14,
    },
  };

const TAB_SECTIONS: Array<{
  id: string;
  label: string;
  contactTag: string;
  single?: boolean;
}> = [
  {
    id: "overview",
    label: "Department & Head",
    contactTag: "Department",
    single: true,
  },
  { id: "faculty", label: "Faculty Profiles", contactTag: "Faculty" },
  {
    id: "society",
    label: "Student Society",
    contactTag: "StudentSociety",
    single: true,
  },
  { id: "labs", label: "Laboratories", contactTag: "Labortries" },
  { id: "bos", label: "Board of Studies", contactTag: "BOS" },
  { id: "co", label: "Course Outcomes", contactTag: "CourseOutcome" },
  { id: "research", label: "Funded Research", contactTag: "FundResearch" },
  {
    id: "feedback",
    label: "Student Survey / Feedback Form",
    contactTag: "Form",
  },
  { id: "timetable", label: "Time Table", contactTag: "TimeTable" },
  { id: "syllabus", label: "Syllabus", contactTag: "Examination" },
];

export default async function LegacyDepartmentPage({ params }: Props) {
  const { id: rawSlug } = await params;
  const deptKey = decodeURIComponent(rawSlug).trim().toLowerCase();

  const deptConfig = DEPARTMENT_CATEGORY_MAP[deptKey];
  if (!deptConfig) {
    notFound();
  }

  // Single query replacing all 10 `getdata` / `getdata1` calls for this department
  const rows: LegacyWebsite[] = await db
    .select()
    .from(legacyWebsites)
    .where(eq(legacyWebsites.category, deptConfig.categoryId))
    .orderBy(asc(legacyWebsites.id));

  // Group rows by ContactNo (trimmed, case-insensitive to be safe)
  const bySection = new Map<string, LegacyWebsite[]>();
  for (const row of rows) {
    const tag = (row.contactNo ?? "").trim().toLowerCase();
    if (!tag) continue;
    const list = bySection.get(tag) ?? [];
    list.push(row);
    bySection.set(tag, list);
  }

  const recordsById: DeptLegacyDataMap["recordsById"] = {};
  const recordsByCategory: DeptLegacyDataMap["recordsByCategory"] = {};

  const viewTabs: DeptTabConfig[] = TAB_SECTIONS.map((section, idx) => {
    const matched = bySection.get(section.contactTag.toLowerCase()) ?? [];

    if (matched.length === 0) {
      return {
        id: section.id,
        label: section.label,
      };
    }

    const syntheticKey = 10000 + idx;

    if (section.single) {
      recordsById[syntheticKey] = matched[0];
      return {
        id: section.id,
        label: section.label,
        recordId: syntheticKey,
      };
    }

    recordsByCategory[syntheticKey] = matched;
    return {
      id: section.id,
      label: section.label,
      categoryId: syntheticKey,
    };
  });

  return (
    <LegacyDepartmentView
      departmentName={deptConfig.name}
      tabs={viewTabs}
      data={{ recordsById, recordsByCategory }}
    />
  );
}
