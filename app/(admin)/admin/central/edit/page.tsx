"use client";

import {
  MessageSquare,
  Users,
  Shield,
  Network,
  BookOpen,
  Calendar,
  Building2,
  Info,
  FileText,
} from "lucide-react";
import Link from "next/link";

export default function AdministrationPage() {
  const sections = [
    {
      name: "Hero Gallery",
      href: " /admin/central/edit/hero-gallery",
      description: "",
    },
    {
      name: "Vice Chancellor's Message",
      href: " /admin/central/edit/vc-message",
      description: "",
    },
    {
      name: "University Society",
      href: " /admin/central/edit/society",
      description: "",
    },
    {
      name: "Board of Governors",
      href: " /admin/central/edit/bog",
      description: "",
    },
    {
      name: "University Authorities",
      href: " /admin/central/edit/authorities",
      description: "",
    },
    {
      name: "Governance Structure",
      href: " /admin/central/edit/governance-structure",
      description: "",
    },
    {
      name: "Academic Council",
      href: " /admin/central/edit/academic-council",
      description: "",
    },
    {
      name: "Academic Council Meetings",
      href: " /admin/central/edit/council-meetings",
      description: "",
    },
    {
      name: "University Committees",
      href: " /admin/central/edit/university-committees",
      description: "",
    },
    {
      name: "RTI Cell",
      href: " /admin/central/edit/rti-cell",
      description: "",
    },
    {
      name: "University By-Laws",
      href: " /admin/central/edit/university-bylaws",
      description: "",
    },
    {
      name: "academic-regulations",
      href: " /admin/central/edit/academic-regulations",
      description: "",
    },
  ];

  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit</h1>
          <p className="text-gray-600">Manage website content and documents</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            return (
              <Link
                key={section.name}
                href={section.href}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all hover:scale-105"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {section.name}
                </h3>
                <p className="text-sm text-gray-600">
                  {section.description ||
                    "Click to edit content and manage attachments"}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
