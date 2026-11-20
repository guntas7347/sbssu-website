import type { Metadata } from "next";
import { Award, GraduationCap, Landmark, ShieldCheck } from "lucide-react";
import { LegacyInfoBanner } from "@/components/LegacyInfoBanner";

export const metadata: Metadata = {
  title: "Academic Council | Shaheed Bhagat Singh State University, Ferozepur",
  description:
    "Composition of the Academic Council of Shaheed Bhagat Singh State University (SBSSU), Ferozepur.",
};

interface AcademicCouncilMember {
  srNo: number;
  postOrCategory: string;
  designation: "Chairman" | "Member";
  nominatedNote?: string;
}

const ACADEMIC_COUNCIL_MEMBERS: readonly AcademicCouncilMember[] = [
  {
    srNo: 1,
    postOrCategory: "Vice-Chancellor",
    designation: "Chairman",
  },
  {
    srNo: 2,
    postOrCategory: "Dean of Faculties",
    designation: "Member",
  },
  {
    srNo: 3,
    postOrCategory: "Head of Department(s) of University",
    designation: "Member",
  },
  {
    srNo: 4,
    postOrCategory:
      "Principals of three colleges situated in the State to be nominated by the Board",
    designation: "Member",
    nominatedNote: "3 Principals (Nominated by Board)",
  },
  {
    srNo: 5,
    postOrCategory: "Director, Indian Institute of Technology, Ropar (Punjab)",
    designation: "Member",
  },
  {
    srNo: 6,
    postOrCategory:
      "Director, Department of Technical Education and Industrial Training, Punjab",
    designation: "Member",
  },
  {
    srNo: 7,
    postOrCategory: "Two eminent industrialists to be nominated by the Board",
    designation: "Member",
    nominatedNote: "2 Industrialists (Nominated by Board)",
  },
  {
    srNo: 8,
    postOrCategory: "Two eminent educationists to be nominated by the Board",
    designation: "Member",
    nominatedNote: "2 Educationists (Nominated by Board)",
  },
] as const;

export default function AcademicCouncilPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Page Header */}
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider uppercase">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
              <GraduationCap className="h-3.5 w-3.5" />
              Academic Governance
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600/10 px-3 py-1 text-green-700 dark:bg-green-500/15 dark:text-green-400">
              <Landmark className="h-3.5 w-3.5" />
              SBSSU, Ferozepur
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Academic Council
          </h1>

          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
            Principal academic body of Shaheed Bhagat Singh State University,
            Ferozepur, overseeing courses of study, curricula, academic
            standards, and examinations.
          </p>
        </header>
        {/* Composition Table */}
        <section
          aria-labelledby="academic-council-heading"
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2
                  id="academic-council-heading"
                  className="text-base font-bold tracking-tight text-slate-900 sm:text-lg dark:text-white"
                >
                  Composition of the Academic Council
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Ex-officio posts and Board-nominated members
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600/10 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-500/15 dark:text-green-400">
              <Award className="h-3.5 w-3.5" />
              {ACADEMIC_COUNCIL_MEMBERS.length} Statutory Entries
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
                <tr>
                  <th className="w-20 px-6 py-3.5">Sr. No.</th>
                  <th className="px-6 py-3.5">Name / Ex-Officio Post</th>
                  <th className="w-44 px-6 py-3.5 text-right sm:text-left">
                    Designation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {ACADEMIC_COUNCIL_MEMBERS.map((member) => {
                  const isChairman = member.designation === "Chairman";

                  return (
                    <tr
                      key={member.srNo}
                      className="transition hover:bg-orange-50/40 dark:hover:bg-orange-500/5"
                    >
                      <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {String(member.srNo).padStart(2, "0")}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900 dark:text-slate-100">
                          {member.postOrCategory}
                        </div>
                        {member.nominatedNote && (
                          <div className="mt-1 text-[11px] font-medium text-slate-500 dark:text-slate-400">
                            {member.nominatedNote}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right whitespace-nowrap sm:text-left">
                        <span
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${
                            isChairman
                              ? "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:border-orange-400/30 dark:bg-orange-500/15 dark:text-orange-300"
                              : "border-green-600/30 bg-green-600/10 text-green-800 dark:border-green-400/30 dark:bg-green-500/15 dark:text-green-300"
                          }`}
                        >
                          {member.designation}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>{" "}
        <LegacyInfoBanner href="/legacy-website?Id=1150&mode=category" />
      </div>
    </main>
  );
}
