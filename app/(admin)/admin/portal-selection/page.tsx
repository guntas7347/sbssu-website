"use client";

import {
  GraduationCap,
  Shield,
  BookOpen,
  Building2,
  Briefcase,
} from "lucide-react";

export default function PortalSelectionPage() {
  const portals = [
    {
      name: "Admin Portal",
      description: "Manage departments, users, and system configuration",
      icon: Shield,
      href: "/admin/admin/dashboard",
      gradient: "from-red-500 to-red-600",
    },
    {
      name: "Central Portal",
      description: "University administration, academics, and notices",
      icon: BookOpen,
      href: "/admin/central/dashboard",
      gradient: "from-orange-500 to-orange-600",
    },
    {
      name: "Departmental Portal",
      description: "Manage department content, faculty, and resources",
      icon: Building2,
      href: "/admin/departmental/dashboard",
      gradient: "from-green-500 to-green-600",
    },
    {
      name: "Placement Portal",
      description: "Track and manage student placement records",
      icon: Briefcase,
      href: "/admin/placement/dashboard",
      gradient: "from-blue-500 to-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 via-orange-600 to-green-600 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-12">
          <div className="bg-white w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <GraduationCap className="w-16 h-16 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            Welcome, Dr. Rajesh Kumar
          </h1>
          <p className="text-xl text-orange-100">Select a portal to continue</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <button
                key={portal.name}
                onClick={() => (window.location.href = portal.href)}
                className="bg-white rounded-2xl shadow-2xl p-8 hover:scale-105 transition-transform duration-300 group"
              >
                <div
                  className={`bg-gradient-to-br ${portal.gradient} w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {portal.name}
                </h2>
                <p className="text-gray-600">{portal.description}</p>
              </button>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <button
            onClick={() => (window.location.href = "/admin/login")}
            className="text-white hover:text-orange-100 font-medium transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
