"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  Briefcase,
  Building2,
  GraduationCap,
  Mail,
  Phone,
  Quote,
  Search,
  Sparkles,
  Users,
  ArrowUpRight,
  Copy,
  Check,
  Award,
} from "lucide-react";

interface CoordinatorMessage {
  name: string;
  role: string;
  department?: string;
  initials: string;
  accent: "orange" | "green";
  paragraphs: string[];
}

interface TnpMember {
  name: string;
  designation: string;
  department: string;
  email?: string;
  phone: string;
  isLead?: boolean;
}

const COORDINATOR_MESSAGES: CoordinatorMessage[] = [
  {
    name: "Er. Inderjeet Singh Gill",
    role: "Coordinator, CDC",
    department: "Career Development Centre",
    initials: "IG",
    accent: "orange",
    paragraphs: [
      "SBSSU, Ferozepur carries a legacy of more than 25 years as one of the premier institutes of the region. Technological advancements are changing the world and it becomes a challenging task to cater the needs of the industry and society. However, I am feeling proud in saying that SBSSU is facing the challenge successfully. The institute is contributing to developmental needs of the industry, society and the country on a whole. This is possible due to outstanding efforts of the faculty and bright students who get admission after facing significant competition.",
      "Our alumni have achieved tremendous success in all spheres and this bears an eloquent testimony to our efforts. I take pride in cordially inviting you to participate in our endeavor and look forward to welcoming you to the recruitment program.",
    ],
  },
  {
    name: "Dr. Kamal Khanna",
    role: "Co-coordinator, CDC",
    department: "Career Development Centre",
    initials: "KK",
    accent: "green",
    paragraphs: [
      "SBSSU invites esteemed organizations to visit our campus for the recruitment. Your visit shall provide a platform to utilize the technical knowledge and will motivate young talent of our students establishing a synergetic interface. Besides, we also invite the companies to take Final/Pre-Final year students to be a part of your team.",
      "It would be our proud privilege to welcome you and the recruitment process can be organized at SBSSU, Ferozepur.",
    ],
  },
];

const TNP_TEAM: TnpMember[] = [
  {
    name: "Er. Inderjeet Singh Gill",
    designation: "TPI",
    department: "Electronics & Communication",
    email: "tpiece@sbsstc.ac.in",
    phone: "98159-30650",
    isLead: true,
  },
  {
    name: "Dr. Kamal Khanna",
    designation: "TPO",
    department: "Polytechnic Wing",
    email: "kamalkhanna@sbsstc.ac.in",
    phone: "95010-25533",
    isLead: true,
  },
  {
    name: "Dr. Gurpreet Singh",
    designation: "TPI",
    department: "Civil Engineering",
    email: "tpice@sbsstc.ac.in",
    phone: "99889-95511",
  },
  {
    name: "Mr. Pawan Luthra",
    designation: "TPI",
    department: "Computer Science & Engineering",
    email: "tpicse@sbsstc.ac.in",
    phone: "81460-15900",
  },
  {
    name: "Ms. Navneet Kaur",
    designation: "TPI",
    department: "Electrical Engineering",
    email: "tpiee@sbsstc.ac.in",
    phone: "82880-12021",
  },
  {
    name: "Mr. Munish Kumar",
    designation: "TPI",
    department: "Mechanical Engineering",
    email: "tpime@sbsstc.ac.in",
    phone: "78883-18015",
  },
  {
    name: "Dr. Baljit Singh Bhullar",
    designation: "TPI",
    department: "B.Sc. & MBA, M.Com, B.Com",
    email: "baljit@sbsstc.ac.in",
    phone: "99884-46122",
  },
  {
    name: "Mr. Surinder Singh",
    designation: "TPI",
    department: "Chemical Engineering",
    email: "tpiche@sbsstc.ac.in",
    phone: "82838-01469",
  },
  {
    name: "Ms. Bindu Bala",
    designation: "TPI",
    department: "Computer Applications",
    email: "tpimca@sbsstc.ac.in",
    phone: "81465-89807",
  },
  {
    name: "Ar. Sandeep Singh",
    designation: "TPI",
    department: "Architecture",
    phone: "98887-78800",
  },
];

const HIGHLIGHTS = [
  {
    label: "Institutional Legacy",
    value: "25+ Years",
    sub: "Premier technical & professional education in Punjab",
    icon: Award,
  },
  {
    label: "Academic Streams",
    value: "10+ Wings",
    sub: "Engineering, Architecture, Management, Sciences & Polytechnic",
    icon: GraduationCap,
  },
  {
    label: "Hiring Programs",
    value: "FTE & Internships",
    sub: "Final & Pre-Final year campus recruitment drives",
    icon: Briefcase,
  },
  {
    label: "Dedicated T&P Cell",
    value: "10 Coordinators",
    sub: "Department-wise Training & Placement In-charges",
    icon: Users,
  },
];

function getInitials(name: string): string {
  const cleaned = name.replace(/^(Er\.|Dr\.|Mr\.|Ms\.|Ar\.)\s*/i, "").trim();
  const parts = cleaned.split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function TrainingAndPlacementPage() {
  const [query, setQuery] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filteredTeam = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return TNP_TEAM;
    return TNP_TEAM.filter(
      (member) =>
        member.name.toLowerCase().includes(q) ||
        member.department.toLowerCase().includes(q) ||
        member.designation.toLowerCase().includes(q) ||
        (member.email && member.email.toLowerCase().includes(q)) ||
        member.phone.replace(/[^0-9]/g, "").includes(q.replace(/[^0-9]/g, "")),
    );
  }, [query]);

  const handleCopy = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(null), 1800);
    } catch {
      // Ignore clipboard permission errors silently
    }
  };

  return (
    <main className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      {/* Hero Section */}
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
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/25 bg-orange-50 px-3.5 py-1 text-xs font-semibold tracking-wide text-orange-700 uppercase dark:border-orange-400/25 dark:bg-orange-500/10 dark:text-orange-300">
                <Sparkles className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                Career Development Centre (CDC)
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl dark:text-white">
                Training &amp; Placement Cell{" "}
                <span className="text-orange-600 dark:text-orange-400">
                  SBSSU Ferozepur
                </span>
              </h1>

              <p className="mt-5 text-base leading-relaxed text-neutral-600 sm:text-lg dark:text-neutral-300">
                Shaheed Bhagat Singh State University (SBSSU), Ferozepur carries
                a legacy of more than 25 years as one of the premier institutes
                of the region. Technological advancements are changing the
                world, making it challenging to cater to the evolving needs of
                industry and society. The university strives to meet these
                challenges through quality education, industry-institute
                interactions and professional development.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <a
                  href="#tnp-team"
                  className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-3 text-sm font-semibold text-white shadow-xs transition hover:bg-orange-700 dark:bg-orange-500 dark:text-neutral-950 dark:hover:bg-orange-400"
                >
                  <Users className="h-4 w-4" />
                  Meet T&amp;P Coordinators
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-xl border border-green-600/30 bg-green-50 px-5 py-3 text-sm font-semibold text-green-800 transition hover:bg-green-100 dark:border-green-400/30 dark:bg-green-500/10 dark:text-green-300 dark:hover:bg-green-500/20"
                >
                  <Building2 className="h-4 w-4" />
                  Invite for Campus Recruitment
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Key Metrics Strip Card */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
              {HIGHLIGHTS.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="flex items-start gap-3.5 rounded-2xl border border-neutral-200/90 bg-neutral-50/80 p-4 dark:border-neutral-800 dark:bg-neutral-950/70"
                  >
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-400/10 dark:text-orange-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
                        {item.label}
                      </p>
                      <p className="mt-0.5 text-lg font-bold text-neutral-900 dark:text-white">
                        {item.value}
                      </p>
                      <p className="mt-0.5 text-xs text-neutral-600 dark:text-neutral-400">
                        {item.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Messages from CDC Coordinators */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold tracking-wider text-green-700 uppercase dark:text-green-400">
              Leadership Desk
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
              Messages from CDC Coordinators
            </h2>
          </div>
          <p className="max-w-md text-sm text-neutral-600 dark:text-neutral-400">
            Building enduring partnerships between industry leaders and SBSSU
            talent across engineering, management, sciences, and architecture.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {COORDINATOR_MESSAGES.map((person) => {
            const isOrange = person.accent === "orange";
            return (
              <article
                key={person.name}
                className="relative flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-6 shadow-xs sm:p-8 dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div>
                  {/* Header Badge */}
                  <div className="flex items-center justify-between gap-4 border-b border-neutral-100 pb-5 dark:border-neutral-800">
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl text-base font-bold ${
                          isOrange
                            ? "bg-orange-500/15 text-orange-700 dark:bg-orange-400/15 dark:text-orange-300"
                            : "bg-green-600/15 text-green-800 dark:bg-green-400/15 dark:text-green-300"
                        }`}
                      >
                        {person.initials}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                          {person.name}
                        </h3>
                        <p
                          className={`text-sm font-semibold ${
                            isOrange
                              ? "text-orange-600 dark:text-orange-400"
                              : "text-green-700 dark:text-green-400"
                          }`}
                        >
                          {person.role}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                        isOrange
                          ? "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"
                          : "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400"
                      }`}
                    >
                      <Quote className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Message Body */}
                  <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-700 sm:text-[15px] dark:text-neutral-300">
                    {person.paragraphs.map((para, idx) => (
                      <p key={idx}>{para}</p>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 text-xs text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                  <span>Shaheed Bhagat Singh State University, Ferozepur</span>
                  <span className="font-medium text-neutral-700 dark:text-neutral-300">
                    {person.role}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Training & Placement Team Directory */}
      <section
        id="tnp-team"
        className="border-t border-neutral-200/80 bg-white py-12 sm:py-16 dark:border-neutral-800/80 dark:bg-neutral-900/50"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold tracking-wider text-orange-600 uppercase dark:text-orange-400">
                Departmental Representatives
              </span>
              <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl dark:text-white">
                Training &amp; Placement Team
              </h2>
              <p className="mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                Connect directly with the Training &amp; Placement Officer (TPO)
                or department Training &amp; Placement In-charges (TPI).
              </p>
            </div>

            {/* Search Filter */}
            <div className="relative w-full md:w-80">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, branch, or email..."
                aria-label="Search Training and Placement team"
                className="w-full rounded-xl border border-neutral-300 bg-white py-2.5 pr-3.5 pl-10 text-sm text-neutral-900 placeholder-neutral-400 transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none dark:border-neutral-700 dark:bg-neutral-950 dark:text-white dark:placeholder-neutral-500 dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
              />
            </div>
          </div>

          {filteredTeam.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 p-10 text-center dark:border-neutral-700 dark:bg-neutral-900">
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                No coordinators matched &ldquo;{query}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-3 text-xs font-semibold text-orange-600 hover:underline dark:text-orange-400"
              >
                Reset search filter
              </button>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTeam.map((member) => {
                const telHref = `tel:+91${member.phone.replace(/[^0-9]/g, "")}`;
                const phoneCopyKey = `${member.name}-phone`;
                const emailCopyKey = `${member.name}-email`;

                return (
                  <div
                    key={`${member.name}-${member.department}`}
                    className="group flex flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs transition hover:border-orange-500/40 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-orange-400/40"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${
                              member.isLead
                                ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-neutral-950"
                                : "bg-green-600/10 text-green-800 dark:bg-green-400/10 dark:text-green-300"
                            }`}
                          >
                            {getInitials(member.name)}
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-neutral-900 dark:text-white">
                              {member.name}
                            </h3>
                            <span className="mt-0.5 inline-flex items-center rounded-md bg-orange-50 px-2 py-0.5 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
                              {member.designation} — {member.department}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2.5 border-t border-neutral-100 pt-4 text-sm dark:border-neutral-800">
                      {/* Phone */}
                      <div className="flex items-center justify-between gap-2">
                        <a
                          href={telHref}
                          className="inline-flex items-center gap-2 font-medium text-neutral-800 transition hover:text-green-700 dark:text-neutral-200 dark:hover:text-green-400"
                        >
                          <Phone className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
                          <span>{member.phone}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopy(member.phone, phoneCopyKey)}
                          title="Copy phone number"
                          className="rounded-md p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                        >
                          {copiedKey === phoneCopyKey ? (
                            <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                          ) : (
                            <Copy className="h-3.5 w-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Email */}
                      {member.email ? (
                        <div className="flex items-center justify-between gap-2">
                          <a
                            href={`mailto:${member.email}`}
                            className="inline-flex min-w-0 items-center gap-2 truncate text-neutral-600 transition hover:text-orange-600 dark:text-neutral-300 dark:hover:text-orange-400"
                          >
                            <Mail className="h-4 w-4 shrink-0 text-orange-600 dark:text-orange-400" />
                            <span className="truncate">{member.email}</span>
                          </a>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy(member.email!, emailCopyKey)
                            }
                            title="Copy email address"
                            className="rounded-md p-1.5 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
                          >
                            {copiedKey === emailCopyKey ? (
                              <Check className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-neutral-500">
                          <Mail className="h-4 w-4 shrink-0" />
                          <span>Contact via direct phone</span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
