"use client";

import Link from "next/link";
import {
  Users,
  Building,
  Scale,
  FileText,
  BookOpen,
  Calendar,
  UserCheck,
  Shield,
  FileCheck,
  Gavel,
} from "lucide-react";

export default function AdministrationPage() {
  const sections = [
    {
      title: "Vice Chancellor",
      description: "Message from the Vice Chancellor",
      icon: UserCheck,
      href: "/administration/vice-chancellor",
      color: "orange",
    },
    {
      title: "Society",
      description: "University Society members and their roles",
      icon: Users,
      href: "/administration/society",
      color: "green",
    },
    {
      title: "Board of Governors",
      description: "BOG members and meeting schedules",
      icon: Building,
      href: "/administration/bog",
      color: "orange",
    },
    {
      title: "Authorities",
      description: "University authorities and administrative hierarchy",
      icon: Shield,
      href: "/administration/authorities",
      color: "green",
    },
    {
      title: "Governance",
      description: "University governance structure and policies",
      icon: Scale,
      href: "/administration/governance",
      color: "orange",
    },
    {
      title: "Academic Council",
      description: "Academic Council members and responsibilities",
      icon: BookOpen,
      href: "/administration/academic-council",
      color: "green",
    },
    {
      title: "Council Meetings",
      description: "Meeting minutes and schedules",
      icon: Calendar,
      href: "/administration/council-meeting",
      color: "orange",
    },
    {
      title: "Committees",
      description: "Various university committees and members",
      icon: Users,
      href: "/administration/committees",
      color: "green",
    },
    {
      title: "RTI Cell",
      description: "Right to Information Cell and procedures",
      icon: FileText,
      href: "/administration/rti-cell",
      color: "orange",
    },
    {
      title: "By-Laws",
      description: "University by-laws and regulations",
      icon: Gavel,
      href: "/administration/by-laws",
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Building className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Administration
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Learn about the leadership and governance structure of SBSSU
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
                    Learn More →
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
