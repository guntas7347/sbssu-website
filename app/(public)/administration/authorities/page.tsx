"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Mail,
  Check,
  Copy,
  Users,
  ShieldCheck,
  GraduationCap,
  Briefcase,
} from "lucide-react";

type AuthorityCategory =
  | "All"
  | "Executive & Deans"
  | "Heads of Department"
  | "Cells & Administration";

interface Authority {
  sno: number;
  designation: string;
  name: string;
  email: string;
  category: Exclude<AuthorityCategory, "All">;
  profileHref?: string;
}

const authoritiesData: Authority[] = [
  {
    sno: 1,
    designation: "Vice Chancellor",
    name: "Prof. Dr. Suresh Kumar Sharma",
    email: "vc@sbssu.ac.in",
    category: "Executive & Deans",
    profileHref: "/vc",
  },
  {
    sno: 2,
    designation: "Registrar",
    name: "Dr. Rajeev Arora",
    email: "registrar@sbssu.ac.in",
    category: "Executive & Deans",
  },
  {
    sno: 3,
    designation: "Finance Officer",
    name: "Dr. Vaishali Goyal",
    email: "fo@sbssu.ac.in",
    category: "Executive & Deans",
  },
  {
    sno: 4,
    designation: "Dean Academics",
    name: "Dr. Rajeev Kumar Garg",
    email: "deanacademics@sbssu.ac.in",
    category: "Executive & Deans",
  },
  {
    sno: 5,
    designation: "Dean R&D",
    name: "Dr. Vishal Sharma",
    email: "deanrandd@sbssu.ac.in",
    category: "Executive & Deans",
  },
  {
    sno: 6,
    designation: "Dean DSW",
    name: "Dr. Sunny Behal",
    email: "dsw@sbssu.ac.in",
    category: "Executive & Deans",
  },
  {
    sno: 7,
    designation: "Dean Planning",
    name: "Dr. A.K Asati",
    email: "dean_pandd@sbssu.ac.in",
    category: "Executive & Deans",
  },
  {
    sno: 8,
    designation: "Dean Consultancy",
    name: "Dr. Balpreet Kaur",
    email: "deanconsultancy@sbssu.ac.in",
    category: "Executive & Deans",
  },
  {
    sno: 9,
    designation: "COE",
    name: "Dr. Rajni",
    email: "coe@sbssu.ac.in",
    category: "Cells & Administration",
  },
  {
    sno: 10,
    designation: "TPO",
    name: "Mr. Inderjeet Gill",
    email: "tpo@sbssu.ac.in",
    category: "Cells & Administration",
  },
  {
    sno: 11,
    designation: "HOD EE",
    name: "Dr. Jaswinder Kaur",
    email: "hodee@sbssu.ac.in",
    category: "Heads of Department",
  },
  {
    sno: 12,
    designation: "HOD CSE",
    name: "Dr. Sonika Jindal",
    email: "hodcse@sbssu.ac.in",
    category: "Heads of Department",
  },
  {
    sno: 13,
    designation: "HOD ECE",
    name: "Dr. Vikram Mutneja",
    email: "hodece@sbssu.ac.in",
    category: "Heads of Department",
  },
  {
    sno: 14,
    designation: "HOD ME",
    name: "Dr. Manjinder Singh",
    email: "hodme@sbssu.ac.in",
    category: "Heads of Department",
  },
  {
    sno: 15,
    designation: "HOD Agriculture",
    name: "Dr. Balpreet Kaur",
    email: "hodagri@sbssu.ac.in",
    category: "Heads of Department",
  },
  {
    sno: 16,
    designation: "HOD CHEM",
    name: "Dr. Pankaj Kalra",
    email: "hodche@sbssu.ac.in",
    category: "Heads of Department",
  },
  {
    sno: 17,
    designation: "HOD Civil",
    name: "Dr. Parampreet Kaur",
    email: "hodce@sbssu.ac.in",
    category: "Heads of Department",
  },
  {
    sno: 18,
    designation: "HOD DASH",
    name: "Dr. Rakesh Kumar",
    email: "hoddash@sbssu.ac.in",
    category: "Heads of Department",
  },
  {
    sno: 19,
    designation: "HOD CA",
    name: "Ms. Bindu Bala",
    email: "hodca@sbssu.ac.in",
    category: "Heads of Department",
  },
  {
    sno: 20,
    designation: "HOD UBS",
    name: "Dr. R.P Singh",
    email: "hodmca@sbssu.ac.in",
    category: "Heads of Department",
  },
  {
    sno: 21,
    designation: "HOD Architecture",
    name: "Ar. Avinash Singh",
    email: "hodarch@sbssu.ac.in",
    category: "Heads of Department",
  },
  {
    sno: 22,
    designation: "HOD CC",
    name: "Mr. Japinder Singh",
    email: "japinder@sbssu.ac.in",
    category: "Heads of Department",
  },
  {
    sno: 23,
    designation: "Principal Polywing",
    name: "Dr. Kiranjeet Kaur",
    email: "principal.poly@sbssu.ac.in",
    category: "Cells & Administration",
  },
  {
    sno: 24,
    designation: "System Analyst",
    name: "Mr. Japinder Singh",
    email: "japinder@sbssu.ac.in",
    category: "Cells & Administration",
  },
  {
    sno: 25,
    designation: "Web Administrator",
    name: "Mr. Amardeep Chopra",
    email: "amardeep@sbssu.ac.in",
    category: "Cells & Administration",
  },
  {
    sno: 26,
    designation: "DR Accounts",
    name: "Dr. Rakesh Kumar",
    email: "draccount@sbssu.ac.in",
    category: "Cells & Administration",
  },
  {
    sno: 27,
    designation: "DR Establishment",
    name: "Dr. J.P Singla",
    email: "drestb@sbssu.ac.in",
    category: "Cells & Administration",
  },
];

const categories: AuthorityCategory[] = [
  "All",
  "Executive & Deans",
  "Heads of Department",
  "Cells & Administration",
];

export default function AuthoritiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<AuthorityCategory>("All");
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const filteredAuthorities = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return authoritiesData.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.designation.toLowerCase().includes(q) ||
        item.email.toLowerCase().includes(q) ||
        String(item.sno) === q
      );
    });
  }, [searchQuery, selectedCategory]);

  const handleCopyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => {
        setCopiedEmail((prev) => (prev === email ? null : prev));
      }, 1800);
    } catch {
      // Fallback if clipboard API is unavailable
    }
  };

  const stats = [
    {
      label: "Total Officials",
      value: authoritiesData.length,
      icon: Users,
      accentClass:
        "bg-primary/10 dark:bg-primary-dark/15 text-primary dark:text-primary-dark",
    },
    {
      label: "Executive & Deans",
      value: authoritiesData.filter((a) => a.category === "Executive & Deans")
        .length,
      icon: ShieldCheck,
      accentClass:
        "bg-secondary/10 dark:bg-secondary-dark/15 text-secondary dark:text-secondary-dark",
    },
    {
      label: "Heads of Department",
      value: authoritiesData.filter((a) => a.category === "Heads of Department")
        .length,
      icon: GraduationCap,
      accentClass:
        "bg-primary/10 dark:bg-primary-dark/15 text-primary dark:text-primary-dark",
    },
    {
      label: "Cells & Admin Wing",
      value: authoritiesData.filter(
        (a) => a.category === "Cells & Administration",
      ).length,
      icon: Briefcase,
      accentClass:
        "bg-secondary/10 dark:bg-secondary-dark/15 text-secondary dark:text-secondary-dark",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Page Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 space-y-8">
        {/* Heading & Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-secondary/10 dark:bg-secondary-dark/15 text-secondary dark:text-secondary-dark border border-secondary/20 dark:border-secondary-dark/25">
              University Directory
            </span>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              SBSSU{" "}
              <span className="text-primary dark:text-primary-dark">
                Authorities
              </span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl">
              Official contact directory of university leadership, deans, heads
              of departments, and administrative officers at Shaheed Bhagat
              Singh State University, Ferozepur.
            </p>
          </div>
        </div>

        {/* Stat Strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 sm:p-5 flex items-center gap-4 shadow-sm"
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${stat.accentClass}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-none">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Search & Filter Toolbar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 shadow-sm">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, designation, or email..."
              aria-label="Search authorities"
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-primary-dark"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-primary dark:bg-primary-dark text-white shadow-sm"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-xs uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  <th className="py-3.5 px-5 font-bold w-20">S.No</th>
                  <th className="py-3.5 px-5 font-bold">Designation</th>
                  <th className="py-3.5 px-5 font-bold">Name</th>
                  <th className="py-3.5 px-5 font-bold">Email</th>
                  <th className="py-3.5 px-5 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
                {filteredAuthorities.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-12 px-6 text-center text-slate-500 dark:text-slate-400"
                    >
                      No authorities match your current filter or search query.
                    </td>
                  </tr>
                ) : (
                  filteredAuthorities.map((person) => {
                    const isCopied = copiedEmail === person.email;
                    return (
                      <tr
                        key={`${person.sno}-${person.designation}`}
                        className="hover:bg-slate-50/90 dark:hover:bg-slate-800/40 transition-colors"
                      >
                        <td className="py-4 px-5 font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                          {person.sno}
                        </td>
                        <td className="py-4 px-5 font-bold text-slate-900 dark:text-white">
                          <span className="inline-flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-secondary dark:bg-secondary-dark shrink-0" />
                            {person.profileHref ? (
                              <Link
                                href={person.profileHref}
                                className="text-primary dark:text-primary-dark hover:underline"
                              >
                                {person.designation}
                              </Link>
                            ) : (
                              person.designation
                            )}
                          </span>
                        </td>
                        <td className="py-4 px-5 font-medium text-slate-700 dark:text-slate-200">
                          {person.name}
                        </td>
                        <td className="py-4 px-5">
                          <a
                            href={`mailto:${person.email}`}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-primary dark:text-primary-dark hover:underline"
                          >
                            <Mail className="w-3.5 h-3.5 shrink-0" />
                            <span>{person.email}</span>
                          </a>
                        </td>
                        <td className="py-4 px-5 text-right">
                          <button
                            type="button"
                            onClick={() => handleCopyEmail(person.email)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white dark:hover:bg-primary-dark dark:hover:text-white transition-colors cursor-pointer"
                            title={`Copy ${person.email}`}
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-secondary dark:text-secondary-dark" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-3">
          {filteredAuthorities.length === 0 ? (
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center text-sm text-slate-500 dark:text-slate-400">
              No authorities match your current filter or search query.
            </div>
          ) : (
            filteredAuthorities.map((person) => {
              const isCopied = copiedEmail === person.email;
              return (
                <div
                  key={`${person.sno}-${person.designation}-mobile`}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-secondary/10 dark:bg-secondary-dark/15 text-secondary dark:text-secondary-dark">
                        #{person.sno} • {person.designation}
                      </span>
                      <h2 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                        {person.name}
                      </h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyEmail(person.email)}
                      className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-primary hover:text-white dark:hover:bg-primary-dark transition-colors shrink-0 cursor-pointer"
                      aria-label={`Copy email ${person.email}`}
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-secondary dark:text-secondary-dark" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center gap-2 text-xs font-semibold text-primary dark:text-primary-dark pt-2 border-t border-slate-100 dark:border-slate-800"
                  >
                    <Mail className="w-3.5 h-3.5 shrink-0" />
                    <span>{person.email}</span>
                  </a>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
