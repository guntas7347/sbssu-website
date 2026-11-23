import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, Layers } from "lucide-react";
import { LegacyInfoBanner } from "@/components/LegacyInfoBanner";
import { AboutDepartment201 } from "@/components/departments/AboutDepartment201";
import { Vision202 } from "@/components/departments/Vision202";
import {
  getPublicCategoryPageData,
  type PublicCategoryPageData,
} from "@/lib/actions/public/public-page-categories";
import { Mission203 } from "@/components/departments/Mission203";
import {
  DepartmentNavbar,
  DepartmentNavLink,
} from "@/components/departments/DepartmentNavbar";
import { HodSection204 } from "@/components/departments/HodSection204";
import { Courses205 } from "@/components/departments/Courses205";
import { Outcomes206 } from "@/components/departments/Outcomes206";
import { Faculty207 } from "@/components/departments/Faculty207";
import { MoreDepartmentCategories } from "@/components/departments/MoreDepartmentCategories";

export const dynamic = "force-static";
export const dynamicParams = true;

interface DeptPageProps {
  params: Promise<{ deptCode: string }>;
}

const DEPARTMENT_CAT_CODES = [
  "201",
  "202",
  "203",
  "204",
  "205",
  "206",
  "207",
] as const;

type DepartmentCatCode = (typeof DEPARTMENT_CAT_CODES)[number];

interface DepartmentPageBundle {
  department: NonNullable<PublicCategoryPageData["department"]>;
  categories: Record<DepartmentCatCode, PublicCategoryPageData | null>;
}

async function getDepartmentPageBundle(
  deptCode: string,
): Promise<DepartmentPageBundle | null> {
  const results = await Promise.all(
    DEPARTMENT_CAT_CODES.map((catCode) =>
      getPublicCategoryPageData({
        scope: "all-departments",
        catCode,
        deptCode,
      }),
    ),
  );

  const categories = {} as Record<
    DepartmentCatCode,
    PublicCategoryPageData | null
  >;
  let department: PublicCategoryPageData["department"] = null;

  DEPARTMENT_CAT_CODES.forEach((code, index) => {
    const item = results[index] ?? null;
    categories[code] = item;
    if (!department && item?.department) {
      department = item.department;
    }
  });

  if (!department) {
    return null;
  }

  return {
    department,
    categories,
  };
}

export async function generateMetadata({
  params,
}: DeptPageProps): Promise<Metadata> {
  const { deptCode } = await params;
  const pageData = await getDepartmentPageBundle(deptCode);

  if (!pageData) {
    return { title: "Department Not Found | SBSSU" };
  }

  const { department } = pageData;
  return {
    title: `${department.name} (${department.code.toUpperCase()}) | SBSSU`,
    description: `Official academic overview and departmental details for the ${department.name} at Shaheed Bhagat Singh State University, Ferozepur.`,
  };
}

export default async function DepartmentPublicPage({ params }: DeptPageProps) {
  const { deptCode } = await params;
  const pageData = await getDepartmentPageBundle(deptCode);

  if (!pageData) {
    notFound();
  }

  const { department, categories } = pageData;
  const deptSlug = department.code.toLowerCase();
  const deptCodeUpper = department.code.toUpperCase();
  const legacyUrl = `/departments/legacy/${encodeURIComponent(deptSlug)}`;

  const navItems: DepartmentNavLink[] = [
    {
      id: "about-201",
      label: categories["201"]?.category.name?.trim() || "About Department",
    },
    {
      id: "vision-202",
      label: categories["202"]?.category.name?.trim() || "Vision",
    },
    {
      id: "mission-203",
      label: categories["203"]?.category.name?.trim() || "Mission",
    },
    {
      id: "hod-204",
      label: categories["204"]?.category.name?.trim() || "Head of Department",
    },
    {
      id: "courses-205",
      label:
        categories["205"]?.category.name?.trim() ||
        "Academic Programs & Courses",
    },
    {
      id: "outcomes-206",
      label: categories["206"]?.category.name?.trim() || "PEOs, POs & PSOs",
    },
    {
      id: "faculty-207",
      label: categories["207"]?.category.name?.trim() || "Faculty Directory",
    },
    {
      id: "more-categories",
      label: "More Categories",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Department Hero Header */}
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-4">
            <Link
              href="/departments"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-[var(--color-primary,#f97316)] dark:text-slate-400 dark:hover:text-[var(--color-primary-dark,#fb923c)]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All Departments
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider uppercase">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-primary,#f97316)]/10 px-3 py-1 text-orange-700 dark:bg-[var(--color-primary-dark,#fb923c)]/15 dark:text-[var(--color-primary-dark,#fb923c)]">
              <Building2 className="h-3.5 w-3.5" />
              {deptCodeUpper}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-secondary,#16a34a)]/10 px-3 py-1 text-green-700 dark:bg-[var(--color-secondary-dark,#4ade80)]/15 dark:text-[var(--color-secondary-dark,#4ade80)]">
              <Layers className="h-3.5 w-3.5" />
              SBSSU Academic Department
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
            {department.name}
          </h1>

          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
            Shaheed Bhagat Singh State University, Ferozepur — Academic
            programs, leadership, faculty directory, outcomes, and official
            departmental resources.
          </p>

          <LegacyInfoBanner
            href={legacyUrl}
            label={`Looking for older ${deptCodeUpper} circulars, syllabi, or pages from the legacy portal?`}
            actionText="Open Legacy Archive"
            className="mt-5 mb-0"
          />
        </header>
        <DepartmentNavbar
          deptCode={department.code}
          deptName={department.name}
          items={navItems}
        />

        <AboutDepartment201 deptCode={deptSlug} data={categories["201"]} />
        <Vision202 deptCode={deptSlug} data={categories["202"]} />
        <Mission203 deptCode={deptSlug} data={categories["203"]} />
        <HodSection204 deptCode={deptSlug} data={categories["204"]} />
        <Courses205 deptCode={deptSlug} data={categories["205"]} />
        <Outcomes206 deptCode={deptSlug} data={categories["206"]} />
        <Faculty207 deptCode={deptSlug} data={categories["207"]} />
        <MoreDepartmentCategories
          deptCode={deptSlug}
          deptName={department.name}
          scope="all-departments"
        />
      </div>
    </main>
  );
}
