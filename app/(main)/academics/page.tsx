"use client";

import Link from "next/link";
import {
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  DollarSign,
  CheckCircle,
  Award,
} from "lucide-react";

export default function AcademicsPage() {
  const sections = [
    {
      title: "Academic Regulations",
      description: "Rules and regulations for academic programs",
      icon: FileText,
      href: "/academics/academic-regulations",
      color: "orange",
    },
    {
      title: "Academic Calendar",
      description: "Academic session dates and important events",
      icon: Calendar,
      href: "/academics/academic-calendar",
      color: "green",
    },
    {
      title: "Syllabus",
      description: "Course syllabi for all programs and semesters",
      icon: BookOpen,
      href: "/academics/syllabus",
      color: "orange",
    },
    {
      title: "Courses",
      description: "Programs offered by the university",
      icon: GraduationCap,
      href: "/academics/courses",
      color: "green",
    },
    {
      title: "Fee Details",
      description: "Fee structure for all programs",
      icon: DollarSign,
      href: "/academics/fee-detail",
      color: "orange",
    },
    {
      title: "Eligibility",
      description: "Admission eligibility criteria",
      icon: CheckCircle,
      href: "/academics/eligibility",
      color: "green",
    },
    {
      title: "Gradation Certificate",
      description: "Apply for degree and certificates",
      icon: Award,
      href: "/academics/gradation-certificate",
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <GraduationCap className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academics</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Comprehensive academic information for students and faculty
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
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
                  <p className="text-gray-600 mb-4">{section.description}</p>
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
