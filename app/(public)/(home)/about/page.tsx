import React from "react";
import {
  Landmark,
  FileText,
  ExternalLink,
  Award,
  Building2,
  Sparkles,
  Globe2,
  Scale,
  CheckCircle2,
  MapPin,
} from "lucide-react";

const milestones = [
  {
    year: "1995",
    badge: "Foundation Stone",
    title: "Establishment of SBSCET",
    description:
      "Established by the Government of Punjab as Shaheed Bhagat Singh College of Engineering & Technology (SBSCET) to promote premier technical education in the border region of Punjab. Initial departments included Computer Science & Engineering, Mechanical Engineering, and Electronics & Communication Engineering.",
    accent: "primary",
  },
  {
    year: "2011",
    badge: "Autonomy & Expansion",
    title: "Upgradation to State Technical Campus (SBSSTC)",
    description:
      "Recognizing its stellar academic credentials and research output, the Government of Punjab upgraded the college into a prestigious State Technical Campus (SBSSTC). New postgraduate M.Tech programs, advanced computational clusters, and high-tech workshops were introduced.",
    accent: "secondary",
  },
  {
    year: "2021-22",
    badge: "University Status",
    title: "Elevation to Full State University (SBSSU)",
    description:
      "Enacted under Punjab State Legislature Act No. 10 of 2021, the institution attained full State University status as Shaheed Bhagat Singh State University (SBSSU), empowering the university to formulate autonomous curricula, grant degrees, and expand into interdisciplinary sciences and humanities.",
    accent: "primary",
  },
];

const campusHighlights = [
  {
    icon: Building2,
    title: "Academic Infrastructure",
    description:
      "State-of-the-art laboratories, high-speed computational facilities, smart seminar halls, and extensive workshop bays catering to B.Tech, M.Tech, BCA, MCA, and PhD scholars.",
    accentClass:
      "bg-primary/10 text-primary dark:bg-primary-dark/15 dark:text-primary-dark",
  },
  {
    icon: Sparkles,
    title: "SECA & Student Societies",
    description:
      "The Society for Extracurricular Activities (SECA) has been the heartbeat of student life for 3 decades, fostering talent in cultural arts, theater, music, and social leadership.",
    accentClass:
      "bg-secondary/10 text-secondary dark:bg-secondary-dark/15 dark:text-secondary-dark",
  },
  {
    icon: Globe2,
    title: "Global Alumni Footprint",
    description:
      "Over 15,000+ engineers and technologists have graduated through our gates, serving leadership roles across Google, Microsoft, ISRO, Indian Railways, and international universities.",
    accentClass:
      "bg-primary/10 text-primary dark:bg-primary-dark/15 dark:text-primary-dark",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      {/* Top Statutory Act Banner */}
      <section className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-white to-secondary/10 p-6 shadow-sm lg:flex-row lg:items-center sm:p-8 dark:border-primary-dark/25 dark:from-primary-dark/15 dark:via-slate-900 dark:to-secondary-dark/15">
            <div className="space-y-2.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-secondary dark:border-secondary-dark/30 dark:bg-secondary-dark/15 dark:text-secondary-dark">
                <Scale className="h-3.5 w-3.5" />
                Statutory Charter • Punjab Act No. 10 of 2021
              </div>

              <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                SBSSU Act 2021 —{" "}
                <span className="text-primary dark:text-primary-dark">
                  University Act
                </span>
              </h1>

              <p className="text-sm leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
                Shaheed Bhagat Singh State University, Ferozepur was established
                and incorporated by the Legislature of the State of Punjab under
                the{" "}
                <strong className="font-semibold text-slate-900 dark:text-white">
                  Shaheed Bhagat Singh State University Act, 2021 (Punjab Act
                  No. 10 of 2021)
                </strong>{" "}
                as an autonomous teaching and affiliating State University for
                higher technical, scientific, and professional education.
              </p>
            </div>

            <div className="shrink-0">
              <a
                href="/data/legacy/45aac882-d7c3-498f-a12a-beb58f4e763b.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-md transition-opacity hover:opacity-95 dark:bg-primary-dark"
              >
                <FileText className="h-4 w-4" />
                <span>View University Act (PDF)</span>
                <ExternalLink className="h-3.5 w-3.5 opacity-85" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl space-y-16 px-4 py-12 sm:px-8">
        {/* University Heritage & Evolution */}
        <section className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary dark:border-primary-dark/25 dark:bg-primary-dark/15 dark:text-primary-dark">
              <Landmark className="h-3.5 w-3.5" />
              University Heritage & Evolution
            </div>

            <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              A Legacy of{" "}
              <span className="text-secondary dark:text-secondary-dark">
                Academic Excellence
              </span>
            </h2>

            <p className="text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
              Shaheed Bhagat Singh State University carries a rich, proud legacy
              of academic excellence. Initially established by the Government of
              Punjab in 1995 as Shaheed Bhagat Singh College of Engineering &
              Technology (SBSCET), our institution was upgraded to a state
              technical campus in 2011 (SBSSTC), and subsequently elevated to
              full State University status (SBSSU) in the academic year 2021-22.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                <CheckCircle2 className="h-4 w-4 text-secondary dark:text-secondary-dark" />
                Govt. of Punjab State University
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                <MapPin className="h-4 w-4 text-primary dark:text-primary-dark" />
                98-Acre Campus • Ferozepur
              </span>
            </div>
          </div>

          {/* Quick Institutional Key Facts Card */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Founded
                </p>
                <p className="mt-1 text-2xl font-black text-primary dark:text-primary-dark">
                  1995
                </p>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                  As SBSCET
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  University Act
                </p>
                <p className="mt-1 text-2xl font-black text-secondary dark:text-secondary-dark">
                  2021
                </p>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                  Act No. 10 of 2021
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Campus Area
                </p>
                <p className="mt-1 text-2xl font-black text-secondary dark:text-secondary-dark">
                  98 Acres
                </p>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                  Green Sanctuary
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800/70">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Alumni Network
                </p>
                <p className="mt-1 text-2xl font-black text-primary dark:text-primary-dark">
                  15,000+
                </p>
                <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-300">
                  Global Technologists
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Chronology of Growth */}
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-secondary dark:border-secondary-dark/25 dark:bg-secondary-dark/15 dark:text-secondary-dark">
              <Award className="h-3.5 w-3.5" />
              Chronology of Growth
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Three Eras, One Unstoppable Spirit
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {milestones.map((item) => {
              const isPrimary = item.accent === "primary";
              return (
                <article
                  key={item.year}
                  className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`font-mono text-2xl font-black ${
                          isPrimary
                            ? "text-primary dark:text-primary-dark"
                            : "text-secondary dark:text-secondary-dark"
                        }`}
                      >
                        {item.year}
                      </span>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          isPrimary
                            ? "bg-primary/10 text-primary dark:bg-primary-dark/15 dark:text-primary-dark"
                            : "bg-secondary/10 text-secondary dark:bg-secondary-dark/15 dark:text-secondary-dark"
                        }`}
                      >
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.description}
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

        {/* Campus Facilities */}
        <section className="space-y-8">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-primary dark:border-primary-dark/25 dark:bg-primary-dark/15 dark:text-primary-dark">
              <Building2 className="h-3.5 w-3.5" />
              Campus Facilities
            </div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              A 98-Acre Green Sanctuary in Ferozepur
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {campusHighlights.map((facility) => {
              const Icon = facility.icon;
              return (
                <article
                  key={facility.title}
                  className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md sm:p-7 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${facility.accentClass}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                    {facility.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {facility.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
