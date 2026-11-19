import React from "react";
import { ShieldCheck, Trophy, Wifi, Users } from "lucide-react";

const features = [
  {
    icon: Trophy,
    title: "Sports & Athletics",
    description:
      "Expansive playgrounds, indoor badminton courts, gymnasiums, and annual athletic meets.",
  },
  {
    icon: Wifi,
    title: "High-Speed Campus Wi-Fi",
    description:
      "Seamless fiber optic connectivity across academic blocks, labs, and student residential hostels.",
  },
  {
    icon: ShieldCheck,
    title: "Secure & Green Campus",
    description:
      "24/7 CCTV surveillance, campus security personnel, and lush eco-friendly botanical pathways.",
  },
  {
    icon: Users,
    title: "Student Clubs & Societies",
    description:
      "Active coding clubs, cultural societies, robotics forums, and National Service Scheme (NSS) units.",
  },
];

export function CampusLifeSection() {
  return (
    <section
      id="campus"
      className="py-20 bg-white dark:bg-slate-900 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-primary-dark px-3 py-1 rounded-full bg-primary/10">
              Student Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Life at SBSSU Ferozepur
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              Beyond academics, SBSSU fosters a vibrant ecosystem designed to
              nurture holistic personality development, teamwork, and leadership
              through diverse co-curricular activities.
            </p>
            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary-light text-white font-semibold text-sm shadow hover:opacity-95 transition-all"
              >
                Schedule Campus Tour
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary-light/10 text-secondary-light dark:text-secondary-dark flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
