import { getAuth } from "@/lib/getAuth";
import Link from "next/link";

export default async function AdministrationPage() {
  const auth = await getAuth();

  const powers = auth?.rights ?? [];

  const departmentName = auth?.department?.name;
  const departmentCode = auth?.department?.departmentCode?.toLowerCase();

  const centralSections = [
    { name: "Hero Gallery", href: "/admin/content/central/hero-gallery" },
    {
      name: "Vice Chancellor's Message",
      href: "/admin/content/central/vc-message",
    },
    { name: "University Society", href: "/admin/content/central/society" },
    { name: "Board of Governors", href: "/admin/content/central/bog" },
    {
      name: "University Authorities",
      href: "/admin/content/central/authorities",
    },
    {
      name: "Governance Structure",
      href: "/admin/content/central/governance-structure",
    },
    {
      name: "Academic Council",
      href: "/admin/content/central/academic-council",
    },
    {
      name: "Academic Council Meetings",
      href: "/admin/content/central/council-meetings",
    },
    {
      name: "University Committees",
      href: "/admin/content/central/university-committees",
    },
    { name: "RTI Cell", href: "/admin/content/central/rti-cell" },
    {
      name: "University By-Laws",
      href: "/admin/content/central/university-bylaws",
    },
    {
      name: "Academic Regulations",
      href: "/admin/content/central/academic-regulations",
    },
    {
      name: "Courses",
      href: "/admin/content/central/courses",
    },
    {
      name: "fees-structure",
      href: "/admin/content/central/fees-structure",
    },
    {
      name: "academic-eligibility",
      href: "/admin/content/central/academic-eligibility",
    },
    {
      name: "graduation-certificate",
      href: "/admin/content/central/graduation-certificate",
    },
  ];

  const departmentSections = [
    {
      name: "HOD",
      href: `/admin/content/department/${departmentCode}/hod`,
    },
    {
      name: "Board of Studies",
      href: `/admin/content/department/${departmentCode}/bos`,
    },
    {
      name: "Faculty",
      href: `/admin/content/department/${departmentCode}/faculty`,
    },
    {
      name: "course-outcomes",
      href: `/admin/content/department/${departmentCode}/course-outcomes`,
    },
    {
      name: "Labs",
      href: `/admin/content/department/${departmentCode}/labs`,
    },
    {
      name: "funded research",
      href: `/admin/content/department/${departmentCode}/funded-research`,
    },
    {
      name: "student-society",
      href: `/admin/content/department/${departmentCode}/student-society`,
    },
    {
      name: "timetable",
      href: `/admin/content/department/${departmentCode}/timetable`,
    },
    {
      name: "academic-calendar",
      href: `/admin/content/department/${departmentCode}/academic-calendar`,
    },
    {
      name: "Syllabus",
      href: `/admin/content/department/${departmentCode}/syllabus`,
    },
  ];

  const sections = [
    {
      name: "manage_central_content",
      label: "Central",
      sections: centralSections,
    },
    {
      name: "manage_department_content",
      label: `Department - ${departmentName}`,
      sections: departmentSections,
    },
  ];

  // const allowed = sections.filter((s) => powers.includes(s.name));

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
                    {subSection.description ||
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
