import Link from "next/link";
import {
  GraduationCap,
  Users,
  FileText,
  Target,
  FlaskConical,
  TrendingUp,
  UsersRound,
  ClipboardList,
  Calendar,
} from "lucide-react";
import prisma from "@/lib/prisma";

export default async function DepartmentDetailPage({ params }) {
  const { dept } = await params;
  const department = await prisma.department.findFirst({
    where: { departmentCode: dept.toUpperCase() },
  });

  if (!department) {
    return (
      <div>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  const sections = [
    {
      title: "Department & Head",
      icon: GraduationCap,
      href: `/departments/${dept}/head`,
      color: "orange",
    },
    {
      title: "Faculty Profiles",
      icon: Users,
      href: `/departments/${dept}/faculty`,
      color: "green",
    },
    {
      title: "Board of Studies",
      icon: FileText,
      href: `/departments/${dept}/bos`,
      color: "orange",
    },
    {
      title: "Course Outcomes",
      icon: Target,
      href: `/departments/${dept}/outcomes`,
      color: "green",
    },
    {
      title: "Laboratories",
      icon: FlaskConical,
      href: `/departments/${dept}/labs`,
      color: "orange",
    },
    {
      title: "Funded Research",
      icon: TrendingUp,
      href: `/departments/${dept}/research`,
      color: "green",
    },
    {
      title: "Student Society",
      icon: UsersRound,
      href: `/departments/${dept}/society`,
      color: "orange",
    },
    {
      title: "Student Survey Form",
      icon: ClipboardList,
      href: `/departments/${dept}/survey`,
      color: "green",
    },
    {
      title: "Time Table",
      icon: Calendar,
      href: `/departments/${dept}/timetable`,
      color: "orange",
    },
  ];

  return (
    <div>
      <div className="bg-linear-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <GraduationCap className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {department.name}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Established in {department.establishmentYear} |{" "}
            {department.location}
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              About the Department
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {department.description}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.title}
                  href={section.href}
                  className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-orange-600 transition group"
                >
                  <div
                    className={`w-16 h-16 bg-${section.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-${section.color}-600 transition`}
                  >
                    <Icon
                      className={`w-8 h-8 text-${section.color}-600 group-hover:text-white transition`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {section.title}
                  </h3>
                  <div className="text-orange-600 font-semibold group-hover:translate-x-2 transition inline-block">
                    View Details →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
