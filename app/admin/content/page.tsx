import { getAuth } from "@/lib/getAuth";
import Link from "next/link";

export default async function AdministrationPage() {
  const auth = await getAuth();

  const departmentName = auth?.department?.name;
  const departmentCode = auth?.department?.departmentCode?.toLowerCase();

  const centralSections = [
    { name: "Hero Gallery", href: "/admin/content/admin/hero-gallery" },
    {
      name: "Vice Chancellor's Message",
      href: "/admin/content/admin/vc-message",
    },
    { name: "University Society", href: "/admin/content/admin/society" },
    { name: "Board of Governors", href: "/admin/content/admin/bog" },
    {
      name: "University Authorities",
      href: "/admin/content/admin/authorities",
    },
    {
      name: "Governance Structure",
      href: "/admin/content/admin/governance-structure",
    },
    {
      name: "Academic Council",
      href: "/admin/content/admin/academic-council",
    },
    {
      name: "Academic Council Meetings",
      href: "/admin/content/admin/council-meetings",
    },
    {
      name: "University Committees",
      href: "/admin/content/admin/university-committees",
    },
    { name: "RTI Cell", href: "/admin/content/admin/rti-cell" },
    {
      name: "University By-Laws",
      href: "/admin/content/admin/university-bylaws",
    },
    {
      name: "Academic Regulations",
      href: "/admin/content/admin/academic-regulations",
    },
    {
      name: "Courses",
      href: "/admin/content/admin/courses",
    },
    {
      name: "fees-structure",
      href: "/admin/content/admin/fees-structure",
    },
    {
      name: "academic-eligibility",
      href: "/admin/content/admin/academic-eligibility",
    },
    {
      name: "graduation-certificate",
      href: "/admin/content/admin/graduation-certificate",
    },
  ];

  const departmentSections = [
    {
      name: "HOD",
      href: `/admin/content/${departmentCode}/hod`,
    },
    {
      name: "Board of Studies",
      href: `/admin/content/${departmentCode}/bos`,
    },
    {
      name: "Faculty",
      href: `/admin/content/${departmentCode}/faculty`,
    },
    {
      name: "course-outcomes",
      href: `/admin/content/${departmentCode}/course-outcomes`,
    },
    {
      name: "Labs",
      href: `/admin/content/${departmentCode}/labs`,
    },
    {
      name: "funded research",
      href: `/admin/content/${departmentCode}/funded-research`,
    },
    {
      name: "student-society",
      href: `/admin/content/${departmentCode}/student-society`,
    },
    {
      name: "timetable",
      href: `/admin/content/${departmentCode}/timetable`,
    },
    {
      name: "academic-calendar",
      href: `/admin/content/${departmentCode}/academic-calendar`,
    },
    {
      name: "Syllabus",
      href: `/admin/content/${departmentCode}/syllabus`,
    },
  ];
  const sections =
    departmentCode === "admin"
      ? [
          {
            name: "manage_central_content",
            label: "Central",
            sections: centralSections,
          },
        ]
      : [
          {
            name: "manage_department_content",
            label: `Department - ${departmentName}`,
            sections: departmentSections,
          },
        ];

  const allowed = sections;

  return (
    <main className="flex-1 p-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10 pb-4 border-b border-gray-200">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 tracking-tight">
            Content Editor
          </h1>
          <p className="text-lg text-gray-500">
            Manage website content and documents efficiently
          </p>
        </header>

        {allowed.map((section, idx) => (
          <section key={idx} className="mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-l-4 border-indigo-500 pl-3">
              {section.label}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {section.sections.map((subSection) => (
                <Link
                  key={subSection.name}
                  href={subSection.href}
                  className="group block bg-white rounded-xl shadow-lg p-6 transition-all duration-300 ease-in-out hover:shadow-2xl hover:ring-2 hover:ring-indigo-500 transform hover:-translate-y-1"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {subSection.name}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-600">
                    {subSection?.description ||
                      "Click to edit content and manage attachments"}
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
