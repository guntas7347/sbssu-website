import React from "react";
import {
  Eye,
  Compass,
  Cpu,
  Building2,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

const missionPillars = [
  {
    number: "01",
    icon: Cpu,
    title: "Technical & Managerial Competence",
    description:
      "Development of technically competent manpower with requisite analytical, theoretical and managerial skill and practical exposure.",
    accent: "primary",
  },
  {
    number: "02",
    icon: Building2,
    title: "Conducive Learning & Research Ecosystem",
    description:
      "All round development of students, staff and faculty by providing conducive environment and infrastructure for learning, skill development and research.",
    accent: "secondary",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Adaptability, Excellence & Ethics",
    description:
      "Imbibing versatility, adaptability and yearning for excellence amongst students with highest ethical values as their inner strength.",
    accent: "primary",
  },
];

const coreValues = [
  "Industry & Societal Responsiveness",
  "Analytical & Practical Rigor",
  "Research & Skill Innovation",
  "Ethical Integrity & Leadership",
];

export default function VisionMissionPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-8">
        {/* Page Title */}
        <section className="space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-secondary dark:border-secondary-dark/30 dark:bg-secondary-dark/15 dark:text-secondary-dark">
            <Sparkles className="h-3.5 w-3.5" />
            Institutional Direction • SBSSU Ferozepur
          </div>

          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Vision &{" "}
            <span className="text-primary dark:text-primary-dark">Mission</span>
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
            Guiding principles that shape academic excellence, research
            innovation, and holistic character formation at Shaheed Bhagat Singh
            State University.
          </p>
        </section>

        {/* Vision Statement Hero Card */}
        <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/10 via-white to-secondary/10 p-8 shadow-sm sm:p-10 dark:border-primary-dark/25 dark:from-primary-dark/15 dark:via-slate-900 dark:to-secondary-dark/15">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-4xl space-y-4">
              <div className="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm dark:bg-primary-dark">
                <Eye className="h-4 w-4" />
                Our Vision
              </div>

              <blockquote className="text-xl font-extrabold leading-snug text-slate-900 sm:text-3xl dark:text-white">
                “To be identified as preferred destination for professional
                studies responsive to industrial and societal needs of the
                country.”
              </blockquote>
            </div>

            <div className="hidden h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-white/80 text-primary shadow-sm lg:flex dark:border-primary-dark/25 dark:bg-slate-900/80 dark:text-primary-dark">
              <Eye className="h-11 w-11" />
            </div>
          </div>

          {/* Core Pillars Strip */}
          <div className="mt-8 flex flex-wrap gap-2.5 border-t border-slate-200/80 pt-6 dark:border-slate-800">
            {coreValues.map((value) => (
              <span
                key={value}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-200"
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-secondary dark:text-secondary-dark" />
                {value}
              </span>
            ))}
          </div>
        </section>

        {/* Mission Section */}
        <section className="space-y-6">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-secondary dark:border-secondary-dark/25 dark:bg-secondary-dark/15 dark:text-secondary-dark">
                <Compass className="h-3.5 w-3.5" />
                Our Mission
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                Three Commitments Driving SBSSU
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {missionPillars.map((pillar) => {
              const Icon = pillar.icon;
              const isPrimary = pillar.accent === "primary";

              return (
                <article
                  key={pillar.number}
                  className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                          isPrimary
                            ? "bg-primary/10 text-primary dark:bg-primary-dark/15 dark:text-primary-dark"
                            : "bg-secondary/10 text-secondary dark:bg-secondary-dark/15 dark:text-secondary-dark"
                        }`}
                      >
                        <Icon className="h-6 w-6" />
                      </div>

                      <span
                        className={`font-mono text-2xl font-black ${
                          isPrimary
                            ? "text-primary/35 dark:text-primary-dark/35"
                            : "text-secondary/35 dark:text-secondary-dark/35"
                        }`}
                      >
                        {pillar.number}
                      </span>
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                      {pillar.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                      {pillar.description}
                    </p>
                  </div>

                  <div
                    className={`mt-6 h-1 w-16 rounded-full ${
                      isPrimary
                        ? "bg-primary dark:bg-primary-dark"
                        : "bg-secondary dark:bg-secondary-dark"
                    }`}
                  />
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
