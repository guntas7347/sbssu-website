"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Quote,
  Search,
  Sparkles,
  Users,
  Briefcase,
  ArrowUpRight,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";

export interface RecruiterItem {
  id: string;
  name: string;
  sector: string;
  logoUrl?: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  roleOrBatch: string;
  highlight?: string;
  quote: string;
  accent: "orange" | "green";
}

const FEATURED_RECRUITERS: RecruiterItem[] = [
  {
    id: "tcs",
    name: "Tata Consultancy Services (TCS)",
    sector: "IT & Consulting",
  },
  { id: "infosys", name: "Infosys", sector: "IT & Digital Services" },
  { id: "wipro", name: "Wipro", sector: "IT & Engineering" },
  { id: "accenture", name: "Accenture", sector: "Consulting & Technology" },
  { id: "ibm", name: "IBM", sector: "Enterprise & Cloud" },
  { id: "zscaler", name: "Zscaler", sector: "Cloud Security" },
  { id: "vvdn", name: "VVDN Technologies", sector: "Embedded & Core Engg." },
  {
    id: "advancetech",
    name: "AdvanceTech India Pvt. Ltd",
    sector: "Embedded & Automation",
  },
  {
    id: "larsen",
    name: "Larsen & Toubro (L&T)",
    sector: "Infrastructure & Core",
  },
  { id: "mahindra", name: "Mahindra Group", sector: "Automotive & Mobility" },
  { id: "techmahindra", name: "Tech Mahindra", sector: "IT & Telecom" },
  { id: "capgemini", name: "Capgemini", sector: "Engineering & Cloud" },
];

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "gagan",
    author: "Gagandeep Kaur",
    roleOrBatch: "B.Tech. CSE • Placed in Blue Chip MNCs",
    highlight: "Technical & Interpersonal Growth",
    quote:
      "SBS has given me immense love and real-world skills. It has enhanced my technical aptitude and interpersonal skills. I am thankful to SBS for all knowledge and experience and making me future ready.",
    accent: "orange",
  },
  {
    id: "rahul",
    author: "Rahul Dhawan",
    roleOrBatch: "B.Tech. CSE • Placed in Accenture",
    highlight: "Placement Cell & Faculty Support",
    quote:
      "I have seen myself evolving as an all-rounder whilst progressing in academics along with my overall personality as a leader. I have got many opportunities from the T&P cell of my college for my placement and the faculty helped me a lot to secure placement.",
    accent: "green",
  },
  {
    id: "daljit",
    author: "Daljit Singh",
    roleOrBatch: "B.Tech. ECE (2018–22) • VVDN Technologies",
    highlight: "Industry Readiness",
    quote:
      "I will recommend this college to a lot of young aspirants who wish to acquire engineering from professionals' expertise, enhancing their abilities and helping them reach new heights.",
    accent: "orange",
  },
  {
    id: "avinash",
    author: "Avinash Arya",
    roleOrBatch:
      "B.Tech. ECE (2018–22) • Associate Cloud Security Engineer, Zscaler",
    highlight: "Campus Environment & Mentorship",
    quote:
      "I have had an amazing time studying at SBS, with a comfortable study environment, friendly faculties, and wonderful resources alongside rich campus activities.",
    accent: "green",
  },
  {
    id: "lila",
    author: "Lila Devi",
    roleOrBatch: "Mother of Ashita Singh (ECE 2017–21) • TCS, Wipro & Infosys",
    highlight: "Parent Perspective",
    quote:
      "SBSSU has given my daughter an opportunity to spread her wings and embark on a rewarding career journey across leading multinational organizations.",
    accent: "orange",
  },
  {
    id: "rajkamal",
    author: "Raj Kamal Syal",
    roleOrBatch: "Father of Alisha (ECE 2016–20) • IBM & Accenture",
    highlight: "Academic Foundation",
    quote:
      "From technical learning to campus support, SBSSU provided a strong academic foundation and career launchpad.",
    accent: "green",
  },
];

function getInitials(name: string): string {
  const cleaned = name.replace(/\(.*?\)/g, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return `${words[0][0]}${words[1][0]}`.toUpperCase();
}

export default function TnpRecruitersPage() {
  const [search, setSearch] = useState("");
  const [selectedSector, setSelectedSector] = useState<string>("All");

  const sectors = useMemo(() => {
    const unique = Array.from(
      new Set(FEATURED_RECRUITERS.map((r) => r.sector)),
    );
    return ["All", ...unique];
  }, []);

  const filteredRecruiters = useMemo(() => {
    const q = search.trim().toLowerCase();
    return FEATURED_RECRUITERS.filter((item) => {
      const matchesSector =
        selectedSector === "All" || item.sector === selectedSector;
      const matchesQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.sector.toLowerCase().includes(q);
      return matchesSector && matchesQuery;
    });
  }, [search, selectedSector]);

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Hero Banner */}
      <section className="relative overflow-hidden border-b border-neutral-200/80 bg-white dark:border-neutral-800/80 dark:bg-neutral-900">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-28 right-0 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl dark:bg-orange-400/10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-28 left-8 h-80 w-80 rounded-full bg-green-600/10 blur-3xl dark:bg-green-400/10"
        />

        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-orange-700 uppercase dark:border-orange-400/25 dark:bg-orange-500/10 dark:text-orange-300">
                <Sparkles className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                Training &amp; Placement Cell • SBSSU Ferozepur
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl dark:text-white">
                Testimonials and{" "}
                <span className="text-orange-600 dark:text-orange-400">
                  Our Recruiters
                </span>
              </h1>

              <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
                Organizations recruiting talent from Shaheed Bhagat Singh State
                University (SBSSU), Ferozepur, alongside reflections from
                students, alumni, and parents.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/placements"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-800 transition hover:border-orange-500/50 hover:text-orange-600 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-200 dark:hover:text-orange-400"
              >
                <Briefcase className="h-4 w-4" />
                Placement Records
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-orange-700 dark:bg-orange-500 dark:text-neutral-950 dark:hover:bg-orange-400"
              >
                <Building2 className="h-4 w-4" />
                Recruit With Us
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Recruiters Section */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <span className="text-xs font-bold tracking-wider text-green-700 uppercase dark:text-green-400">
              Industry Partners
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
              Our Recruiters
            </h2>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Leading technology, engineering, infrastructure, and enterprise
              recruiters engaging with SBSSU graduates.
            </p>
          </div>

          <div className="relative w-full sm:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search company or domain..."
              aria-label="Search recruiters"
              className="w-full rounded-xl border border-neutral-300 bg-white py-2.5 pr-3.5 pl-10 text-sm text-neutral-900 placeholder-neutral-400 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-500 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
            />
          </div>
        </div>

        {/* Sector Filter Pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {sectors.map((sector) => {
            const active = selectedSector === sector;
            return (
              <button
                key={sector}
                type="button"
                onClick={() => setSelectedSector(sector)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                  active
                    ? "bg-orange-600 text-white shadow-xs dark:bg-orange-500 dark:text-neutral-950"
                    : "border border-neutral-200 bg-white text-neutral-700 hover:border-orange-500/40 hover:text-orange-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:text-orange-400"
                }`}
              >
                {sector}
              </button>
            );
          })}
        </div>

        {/* Recruiters Grid */}
        {filteredRecruiters.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center dark:border-neutral-700 dark:bg-neutral-900">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              No matching recruiters found.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedSector("All");
              }}
              className="mt-3 text-xs font-semibold text-orange-600 hover:underline dark:text-orange-400"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredRecruiters.map((company, index) => {
              const useOrangeBadge = index % 2 === 0;
              return (
                <div
                  key={company.id}
                  className="group flex items-center gap-3.5 rounded-2xl border border-neutral-200 bg-white p-4 shadow-xs transition hover:border-orange-500/40 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-orange-400/40"
                >
                  {company.logoUrl ? (
                    <img
                      src={company.logoUrl}
                      alt={company.name}
                      className="h-12 w-12 shrink-0 rounded-xl border border-neutral-100 bg-white object-contain p-1.5 dark:border-neutral-800"
                    />
                  ) : (
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                        useOrangeBadge
                          ? "bg-orange-500/12 text-orange-700 dark:bg-orange-400/12 dark:text-orange-300"
                          : "bg-green-600/12 text-green-800 dark:bg-green-400/12 dark:text-green-300"
                      }`}
                    >
                      {getInitials(company.name)}
                    </div>
                  )}

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-neutral-900 group-hover:text-orange-600 dark:text-white dark:group-hover:text-orange-400">
                      {company.name}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-neutral-500 dark:text-neutral-400">
                      {company.sector}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Testimonials Section */}
      <section className="border-t border-neutral-200/80 bg-white py-12 sm:py-16 dark:border-neutral-800/80 dark:bg-neutral-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <span className="text-xs font-bold tracking-wider text-orange-600 uppercase dark:text-orange-400">
                Campus Voices
              </span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
                Testimonials
              </h2>
            </div>
            <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400">
              Experiences shared by students, graduates, and families from
              Shaheed Bhagat Singh State University, Ferozepur.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((item) => {
              const isOrange = item.accent === "orange";
              return (
                <article
                  key={item.id}
                  className="flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs dark:border-neutral-800 dark:bg-neutral-900"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                          isOrange
                            ? "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300"
                            : "bg-green-50 text-green-800 dark:bg-green-500/10 dark:text-green-300"
                        }`}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {item.highlight ?? "SBSSU Community"}
                      </span>
                      <Quote
                        className={`h-5 w-5 shrink-0 ${
                          isOrange
                            ? "text-orange-500/50 dark:text-orange-400/50"
                            : "text-green-600/50 dark:text-green-400/50"
                        }`}
                      />
                    </div>

                    <p className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 flex items-center gap-3 border-t border-neutral-100 pt-4 dark:border-neutral-800">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xs font-bold ${
                        isOrange
                          ? "bg-orange-500/15 text-orange-700 dark:bg-orange-400/15 dark:text-orange-300"
                          : "bg-green-600/15 text-green-800 dark:bg-green-400/15 dark:text-green-300"
                      }`}
                    >
                      {getInitials(item.author)}
                    </div>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-neutral-900 dark:text-white">
                        {item.author}
                      </h3>
                      <p className="truncate text-xs text-neutral-500 dark:text-neutral-400">
                        {item.roleOrBatch}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Bottom Callout */}
          <div className="mt-12 flex flex-col items-start justify-between gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:flex-row sm:items-center sm:p-8 dark:border-neutral-800 dark:bg-neutral-950/70">
            <div className="flex items-start gap-3.5">
              <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600/15 text-green-800 dark:bg-green-400/15 dark:text-green-300">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 sm:text-lg dark:text-white">
                  Planning a Campus Placement or Pre-Placement Talk?
                </h3>
                <p className="mt-0.5 text-sm text-neutral-600 dark:text-neutral-400">
                  Connect with the Career Development Centre at SBSSU, Moga
                  Road, Firozpur (01632-242138).
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/placement"
                className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-800 transition hover:border-orange-500/50 hover:text-orange-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:text-orange-400"
              >
                <Users className="h-3.5 w-3.5" />
                CDC Team
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-xl bg-green-700 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-green-800 dark:bg-green-500 dark:text-neutral-950 dark:hover:bg-green-400"
              >
                Contact CDC
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
