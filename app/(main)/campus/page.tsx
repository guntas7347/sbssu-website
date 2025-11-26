"use client";

import Link from "next/link";
import {
  Building2,
  ShoppingBag,
  Map,
  Camera,
  Hotel,
  Bus,
  Utensils,
  Stethoscope,
} from "lucide-react";

export default function CampusPage() {
  const campusSections = [
    {
      title: "Hostels",
      description:
        "Comfortable accommodation for boys and girls with modern facilities",
      icon: Hotel,
      href: "/campus/hostels",
      color: "orange",
    },
    {
      title: "Shopping Complex",
      description:
        "On-campus shopping facilities including stationary, photocopying, and more",
      icon: ShoppingBag,
      href: "/campus/shopping",
      color: "green",
    },
    {
      title: "Campus Tour",
      description: "Take a virtual tour of our beautiful 98-acre campus",
      icon: Camera,
      href: "/campus/tour",
      color: "orange",
    },
    {
      title: "University Map",
      description:
        "Interactive campus map showing all buildings and facilities",
      icon: Map,
      href: "/campus/map",
      color: "green",
    },
    {
      title: "Transportation",
      description: "University bus service and parking facilities",
      icon: Bus,
      href: "/campus/transport",
      color: "orange",
    },
    {
      title: "Cafeteria",
      description: "Hygienic food at affordable prices",
      icon: Utensils,
      href: "/campus/cafeteria",
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Building2 className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Campus Life</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Explore our vibrant campus spread across 98 acres with world-class
            facilities
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campusSections.map((section) => {
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
                  <p className="text-gray-600">{section.description}</p>
                  <div className="mt-4 text-orange-600 font-semibold group-hover:translate-x-2 transition inline-block">
                    Explore →
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
