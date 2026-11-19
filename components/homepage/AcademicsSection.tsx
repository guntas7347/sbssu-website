import React from "react";
import { Cpu, Wrench, Building, BookMarked, ArrowRight } from "lucide-react";

const programs = [
  {
    icon: Cpu,
    title: "Computer Science & Engineering",
    description:
      "Cutting-edge curriculum covering AI, Machine Learning, Full-Stack Development, and Cloud Architectures.",
    seats: "120 Seats",
  },
  {
    icon: Wrench,
    title: "Mechanical & Automation Engineering",
    description:
      "Hands-on training in robotics, thermal engineering, CAD/CAM design, and modern manufacturing labs.",
    seats: "90 Seats",
  },
  {
    icon: Building,
    title: "Civil & Infrastructure Engineering",
    description:
      "Focusing on sustainable smart structures, structural analysis, surveying, and urban planning.",
    seats: "60 Seats",
  },
  {
    icon: BookMarked,
    title: "Management & Applied Sciences",
    description:
      "Comprehensive MBA and professional business management programs molding corporate leaders.",
    seats: "60 Seats",
  },
];

export function AcademicsSection() {
  return (
    <section
      id="academics"
      className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-secondary-light dark:text-secondary-dark px-3 py-1 rounded-full bg-secondary-light/10">
            Excellence in Education
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mt-3 mb-4">
            Academic Departments & Programs
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
            Equipping students with industry-standard skills through rigorous
            academic frameworks and practical exposure.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programs.map((prog, index) => {
            const Icon = prog.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary-dark/10 text-primary dark:text-primary-dark flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                    {prog.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                    {prog.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-secondary-light dark:text-secondary-dark uppercase tracking-wide">
                    {prog.seats}
                  </span>
                  <span className="text-sm font-semibold text-primary dark:text-primary-dark flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
