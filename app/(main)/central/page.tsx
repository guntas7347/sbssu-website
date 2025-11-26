"use client";

import Link from "next/link";
import {
  Computer,
  BookOpen,
  Users,
  Wrench,
  HeartPulse,
  Trophy,
} from "lucide-react";

export default function CentralPage() {
  const centralFacilities = [
    {
      title: "Computer Center",
      description:
        "500+ high-speed computers with latest software and internet connectivity",
      icon: Computer,
      href: "/central/computer-center",
      color: "orange",
    },
    {
      title: "Central Library",
      description:
        "50,000+ books, journals, and digital resources with modern reading halls",
      icon: BookOpen,
      href: "/central/library",
      color: "green",
    },
    {
      title: "GDG (Google Developer Group)",
      description:
        "Technology education through workshops, hackathons, and community events",
      icon: Users,
      href: "/central/gdg",
      color: "orange",
    },
    {
      title: "Workshops",
      description:
        "Skill development workshops on latest technologies and industry trends",
      icon: Wrench,
      href: "/central/workshops",
      color: "green",
    },
    {
      title: "Health Center",
      description:
        "24x7 medical facility with qualified doctors and emergency services",
      icon: HeartPulse,
      href: "/central/health",
      color: "orange",
    },
    {
      title: "Sports Complex",
      description:
        "Multi-sport facilities including cricket, football, basketball, and gym",
      icon: Trophy,
      href: "/central/sports",
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Computer className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Central Facilities
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            World-class facilities supporting academic excellence and holistic
            development
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {centralFacilities.map((facility) => {
              const Icon = facility.icon;
              return (
                <Link
                  key={facility.title}
                  href={facility.href}
                  className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-orange-600 transition group"
                >
                  <div
                    className={`w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-600 transition`}
                  >
                    <Icon
                      className={`w-8 h-8 text-orange-600 group-hover:text-white transition`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {facility.title}
                  </h3>
                  <p className="text-gray-600">{facility.description}</p>
                  <div className="mt-4 text-orange-600 font-semibold group-hover:translate-x-2 transition inline-block">
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
