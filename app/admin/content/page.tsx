import { getAuth } from "@/lib/getAuth";
import prisma from "@/lib/prisma";
import Link from "next/link";

interface SectionItem {
  name: string;
  href: string;
  description?: string;
}

interface SectionGroup {
  name: string;
  label: string;
  sections: SectionItem[];
}

export default async function AdministrationPage({
  searchParams,
}: {
  searchParams?: Promise<{ dept?: string }>;
}) {
  const auth = await getAuth();
  const sp = searchParams ? await searchParams : {};

  const userRoles = auth?.roles || [];
  const isSuperAdmin = userRoles.includes("SUPER_ADMIN");
  const isCentralEditor = userRoles.includes("CENTRAL_EDITOR");
  const departmentName = auth?.department?.name || "Department";
  const userDeptCode = auth?.department?.departmentCode?.toLowerCase() || "cse";

  const centralSections: SectionItem[] = [
    { name: "Hero Gallery", href: "/admin/content/admin/hero-gallery", description: "Manage homepage hero image carousel" },
    {
      name: "Vice Chancellor's Message",
      href: "/admin/content/admin/vc-message",
      description: "Update VC picture, profile and message",
    },
    { name: "University Society", href: "/admin/content/admin/society", description: "Manage registered university society members" },
    { name: "Board of Governors", href: "/admin/content/admin/bog", description: "BOG meeting minutes and member lists" },
    {
      name: "University Authorities",
      href: "/admin/content/admin/authorities",
      description: "Leadership team and administrative authorities",
    },
    {
      name: "Governance Structure",
      href: "/admin/content/admin/governance-structure",
      description: "University administrative hierarchy documents",
    },
    {
      name: "Academic Council",
      href: "/admin/content/admin/academic-council",
      description: "Academic council composition and policies",
    },
    {
      name: "Academic Council Meetings",
      href: "/admin/content/admin/council-meetings",
      description: "Minutes and agendas of council meetings",
    },
    {
      name: "University Committees",
      href: "/admin/content/admin/university-committees",
      description: "Internal committees, chairpersons and circulars",
    },
    { name: "RTI Cell", href: "/admin/content/admin/rti-cell", description: "Right to Information contact details and officers" },
    {
      name: "University By-Laws",
      href: "/admin/content/admin/university-bylaws",
      description: "Acts, statutes, ordinances and regulations",
    },
    {
      name: "Academic Regulations",
      href: "/admin/content/admin/academic-regulations",
      description: "Rules for examinations, grading and attendance",
    },
    {
      name: "Courses",
      href: "/admin/content/admin/courses",
      description: "Degree programmes and course overview PDFs",
    },
    {
      name: "Fees Structure",
      href: "/admin/content/admin/fees-structure",
      description: "Semester and annual tuition fee schedule",
    },
    {
      name: "Academic Eligibility",
      href: "/admin/content/admin/academic-eligibility",
      description: "Admission criteria and eligibility criteria",
    },
    {
      name: "Graduation Certificate",
      href: "/admin/content/admin/graduation-certificate",
      description: "Convocation and degree certificate info",
    },
  ];

  const getDeptSections = (code: string): SectionItem[] => [
    { name: "HOD Profile & Message", href: `/admin/content/${code}/hod`, description: "Head of department bio, picture, contact" },
    { name: "Board of Studies (BOS)", href: `/admin/content/${code}/bos`, description: "Curriculum committee members and meeting records" },
    { name: "Faculty Directory", href: `/admin/content/${code}/faculty`, description: "Teaching staff, designations and research profiles" },
    { name: "Course Outcomes (CO/PO)", href: `/admin/content/${code}/course-outcomes`, description: "Program outcomes and learning metrics" },
    { name: "Laboratories", href: `/admin/content/${code}/labs`, description: "Lab facilities, major equipment and manuals" },
    { name: "Funded Research", href: `/admin/content/${code}/funded-research`, description: "Sponsored R&D projects and grants" },
    { name: "Student Societies", href: `/admin/content/${code}/student-society`, description: "Technical clubs and departmental student chapters" },
    { name: "Timetable", href: `/admin/content/${code}/timetable`, description: "Semester class routines and schedules" },
    { name: "Academic Calendar", href: `/admin/content/${code}/academic-calendar`, description: "Session dates, mid-terms and holidays" },
    { name: "Syllabus", href: `/admin/content/${code}/syllabus`, description: "Curriculum scheme and semester syllabus documents" },
  ];

  const allDepartments = isSuperAdmin
    ? await prisma.department.findMany({
        where: { departmentCode: { not: "ADMIN" } },
        orderBy: { name: "asc" },
        select: { id: true, name: true, departmentCode: true },
      })
    : [];

  const selectedDeptCode = isSuperAdmin && sp.dept
    ? sp.dept.toLowerCase()
    : userDeptCode;

  const selectedDeptObj = allDepartments.find(
    (d) => d.departmentCode.toLowerCase() === selectedDeptCode
  );

  const sections: SectionGroup[] = [];

  if (isSuperAdmin || isCentralEditor || userDeptCode === "admin") {
    sections.push({
      name: "manage_central_content",
      label: "Central University Content",
      sections: centralSections,
    });
  }

  if (isSuperAdmin) {
    sections.push({
      name: "manage_department_content",
      label: `Department Content — ${selectedDeptObj?.name || selectedDeptCode.toUpperCase()}`,
      sections: getDeptSections(selectedDeptCode),
    });
  } else if (userDeptCode !== "admin") {
    sections.push({
      name: "manage_department_content",
      label: `Department Content — ${departmentName}`,
      sections: getDeptSections(userDeptCode),
    });
  }

  return (
    <main className="flex-1 p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 pb-4 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Content Management System (CMS)
          </h1>
          <p className="text-lg text-gray-500">
            Edit and publish structured pages, faculty directories, notices and documents.
          </p>

          {isSuperAdmin && allDepartments.length > 0 && (
            <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-xl">
              <span className="text-sm font-semibold text-orange-900 mr-3">
                Select Department to Edit:
              </span>
              <div className="inline-flex flex-wrap gap-2 mt-2">
                {allDepartments.map((dept) => {
                  const dCode = dept.departmentCode.toLowerCase();
                  const isActive = dCode === selectedDeptCode;
                  return (
                    <Link
                      key={dept.id}
                      href={`/admin/content?dept=${dCode}`}
                      className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                        isActive
                          ? "bg-orange-600 text-white shadow-sm"
                          : "bg-white text-gray-700 hover:bg-orange-100 border border-gray-200"
                      }`}
                    >
                      {dept.name} ({dept.departmentCode})
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </header>

        {sections.map((section, idx) => (
          <section key={idx} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-orange-500 pl-3">
              {section.label}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {section.sections.map((subSection) => (
                <Link
                  key={subSection.name}
                  href={subSection.href}
                  className="group block bg-white rounded-xl shadow-sm border border-gray-200 p-6 transition-all duration-200 hover:shadow-md hover:border-orange-500 transform hover:-translate-y-0.5"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {subSection.name}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-600">
                    {subSection.description || "Click to edit content and manage attachments"}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
