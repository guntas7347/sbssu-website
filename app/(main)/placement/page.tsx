"use client";

import Link from "next/link";
import {
  Users,
  Award,
  Briefcase,
  TrendingUp,
  ChevronRight,
  Building2,
  Target,
  GraduationCap,
} from "lucide-react";

export default function PlacementPage() {
  const subPages = [
    {
      title: "Placement Records",
      description:
        "View our comprehensive placement statistics and company-wise placement data",
      icon: TrendingUp,
      href: "/placement/records",
      color: "orange",
    },
    {
      title: "Student Testimonials",
      description: "Read success stories from our placed students",
      icon: Award,
      href: "/placement/testimonials",
      color: "green",
    },
    {
      title: "Training & Placement Team",
      description: "Meet our dedicated training and placement team members",
      icon: Users,
      href: "/placement/team",
      color: "orange",
    },
  ];

  const stats = [
    {
      label: "Companies Visited",
      value: "150+",
      icon: Building2,
      color: "orange",
    },
    {
      label: "Students Placed",
      value: "850+",
      icon: GraduationCap,
      color: "green",
    },
    {
      label: "Highest Package",
      value: "₹24 LPA",
      icon: TrendingUp,
      color: "orange",
    },
    {
      label: "Average Package",
      value: "₹6.5 LPA",
      icon: Target,
      color: "green",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative h-[400px] bg-gradient-to-r from-orange-600 to-green-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 w-full">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Training & Placement
              </h1>
            </div>
            <p className="text-lg md:text-xl max-w-3xl">
              Empowering students with industry-ready skills and connecting them
              with top recruiters
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Placement Overview
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-green-600 mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              const bgColor =
                stat.color === "orange" ? "bg-orange-100" : "bg-green-100";
              const iconColor =
                stat.color === "orange" ? "text-orange-600" : "text-green-600";
              const borderColor =
                stat.color === "orange"
                  ? "border-orange-600"
                  : "border-green-600";

              return (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition border-t-4 ${borderColor}`}
                >
                  <div
                    className={`w-12 h-12 ${bgColor} rounded-full flex items-center justify-center mb-4`}
                  >
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800 mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              About Training & Placement Cell
            </h3>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-4">
                The Training and Placement Cell at SBSSU plays a pivotal role in
                bridging the gap between academia and industry. We are committed
                to ensuring that our students are well-prepared for the
                professional world through comprehensive training programs,
                skill development workshops, and placement drives.
              </p>
              <p className="mb-4">
                Our dedicated team works tirelessly to invite top companies from
                various sectors including IT, Core Engineering, Management, and
                Research Organizations. We maintain strong industry connections
                and ensure that our students get opportunities to showcase their
                talent to leading recruiters.
              </p>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Explore More
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-green-600 mx-auto mb-12"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {subPages.map((page, index) => {
              const Icon = page.icon;
              const bgColor =
                page.color === "orange" ? "bg-orange-100" : "bg-green-100";
              const iconColor =
                page.color === "orange" ? "text-orange-600" : "text-green-600";
              const hoverBg =
                page.color === "orange"
                  ? "group-hover:bg-orange-600"
                  : "group-hover:bg-green-600";

              return (
                <Link
                  key={index}
                  href={page.href}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition group p-8"
                >
                  <div
                    className={`w-16 h-16 ${bgColor} rounded-full flex items-center justify-center mb-6 ${hoverBg} transition`}
                  >
                    <Icon
                      className={`w-8 h-8 ${iconColor} group-hover:text-white transition`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {page.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{page.description}</p>
                  <div className="flex items-center text-orange-600 font-semibold group-hover:gap-2 transition-all">
                    Learn More
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-orange-600 to-green-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              For Recruiters
            </h3>
            <p className="text-lg mb-6 max-w-2xl">
              Interested in recruiting from SBSSU? Contact our placement cell to
              schedule campus drives and connect with our talented students.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:placements@sbssu.ac.in"
                className="inline-flex items-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Contact Placement Cell
                <ChevronRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
