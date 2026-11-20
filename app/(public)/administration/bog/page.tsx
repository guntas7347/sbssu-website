import type { Metadata } from "next";
import { Building2, Landmark, Scale, ShieldCheck, Users } from "lucide-react";

export const metadata: Metadata = {
  title:
    "Board of Governors | Shaheed Bhagat Singh State University, Ferozepur",
  description:
    "Composition of the Board of Governors of Shaheed Bhagat Singh State University (SBSSU), Ferozepur as constituted under the Punjab Act No. 10 of 2021.",
};

interface ExOfficioMember {
  srNo: number;
  designation: string;
  boardDesignation: "Chairman" | "Vice-Chairman" | "Member";
}

interface NominatedCategory {
  srNo: number;
  title: string;
  count: string;
  description: string;
}

const EX_OFFICIO_MEMBERS: readonly ExOfficioMember[] = [
  {
    srNo: 1,
    designation:
      "The Minister In-Charge of the Department of Technical Education and Industrial Training, Punjab",
    boardDesignation: "Chairman",
  },
  {
    srNo: 2,
    designation:
      "Administrative Secretary to Government of Punjab, Department of Technical Education and Industrial Training",
    boardDesignation: "Vice-Chairman",
  },
  {
    srNo: 3,
    designation:
      "Vice-Chancellor of Shaheed Bhagat Singh State University, Ferozepur",
    boardDesignation: "Member",
  },
  {
    srNo: 4,
    designation:
      "Vice-Chancellor, Maharaja Ranjit Singh Punjab Technical University",
    boardDesignation: "Member",
  },
  {
    srNo: 5,
    designation:
      "Administrative Secretary to Government of Punjab, Department of Higher Education",
    boardDesignation: "Member",
  },
  {
    srNo: 6,
    designation:
      "Administrative Secretary to Government of Punjab, Department of Finance",
    boardDesignation: "Member",
  },
  {
    srNo: 7,
    designation:
      "Member of the Punjab Legislative Assembly from Ferozepur (Urban) Assembly Constituency",
    boardDesignation: "Member",
  },
  {
    srNo: 8,
    designation:
      "Member of the Punjab Legislative Assembly from Ferozepur (Rural) Assembly Constituency",
    boardDesignation: "Member",
  },
  {
    srNo: 9,
    designation: "Director, Indian Institute of Management, Amritsar",
    boardDesignation: "Member",
  },
  {
    srNo: 10,
    designation: "Director, Indian Institute of Technology, Ropar",
    boardDesignation: "Member",
  },
  {
    srNo: 11,
    designation:
      "Vice-Chairman, University Grants Commission, New Delhi or his nominee",
    boardDesignation: "Member",
  },
  {
    srNo: 12,
    designation:
      "President of the Confederation of Indian Industry (CII) or his nominee",
    boardDesignation: "Member",
  },
  {
    srNo: 13,
    designation:
      "President of the Progress, Harmony and Development (PHD) Chamber of Commerce and Industry or his nominee",
    boardDesignation: "Member",
  },
] as const;

const NOMINATED_CATEGORIES: readonly NominatedCategory[] = [
  {
    srNo: 1,
    title: "Eminent Industrialists",
    count: "2 Members",
    description:
      "Two members nominated from amongst eminent industrialists on the advice of the State Government.",
  },
  {
    srNo: 2,
    title: "Eminent Educationists",
    count: "2 Members",
    description:
      "Two members nominated from amongst eminent educationists on the advice of the State Government.",
  },
  {
    srNo: 3,
    title: "Heads of Departments (By Rotation)",
    count: "2 Members",
    description:
      "Two Heads of Departments nominated by rotation from amongst the Heads of the Departments of the University.",
  },
] as const;

function getRoleBadgeStyle(role: ExOfficioMember["boardDesignation"]): string {
  if (role === "Chairman") {
    return "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:border-orange-400/30 dark:bg-orange-500/15 dark:text-orange-300";
  }
  if (role === "Vice-Chairman") {
    return "border-green-600/30 bg-green-600/10 text-green-800 dark:border-green-400/30 dark:bg-green-500/15 dark:text-green-300";
  }
  return "border-slate-300 bg-slate-100 text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300";
}

export default function BoardOfGovernorsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Page Header */}
        <header className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold tracking-wider uppercase">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-orange-700 dark:bg-orange-500/15 dark:text-orange-400">
              <Landmark className="h-3.5 w-3.5" />
              Statutory Governance
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600/10 px-3 py-1 text-green-700 dark:bg-green-500/15 dark:text-green-400">
              <Scale className="h-3.5 w-3.5" />
              Punjab Act No. 10 of 2021
            </span>
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Board of Governors
          </h1>

          <p className="mt-2 max-w-3xl text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
            Apex governing body of Shaheed Bhagat Singh State University,
            Ferozepur, constituted under the Shaheed Bhagat Singh State
            University Act, 2021 (Punjab Act No. 10 of 2021).
          </p>
        </header>

        {/* Ex-Officio Members Table */}
        <section
          aria-labelledby="ex-officio-heading"
          className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-6 py-5 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2
                  id="ex-officio-heading"
                  className="text-base font-bold tracking-tight text-slate-900 sm:text-lg dark:text-white"
                >
                  Ex-Officio Members
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Statutory members by virtue of office held
                </p>
              </div>
            </div>

            <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              {EX_OFFICIO_MEMBERS.length} Ex-Officio Members
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
                <tr>
                  <th className="w-20 px-6 py-3.5">Sr. No.</th>
                  <th className="px-6 py-3.5">Name / Designation</th>
                  <th className="w-48 px-6 py-3.5 text-right sm:text-left">
                    Board Designation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {EX_OFFICIO_MEMBERS.map((member) => (
                  <tr
                    key={member.srNo}
                    className="transition hover:bg-orange-50/40 dark:hover:bg-orange-500/5"
                  >
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {String(member.srNo).padStart(2, "0")}
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">
                      {member.designation}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap sm:text-left">
                      <span
                        className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold ${getRoleBadgeStyle(
                          member.boardDesignation,
                        )}`}
                      >
                        {member.boardDesignation}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Nominated Members Section */}
        <section
          aria-labelledby="nominated-heading"
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-5 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600/10 text-green-700 dark:bg-green-500/15 dark:text-green-400">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h2
                  id="nominated-heading"
                  className="text-base font-bold tracking-tight text-slate-900 sm:text-lg dark:text-white"
                >
                  Nominated Members of the Board
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Nominated by the Chancellor on the advice of the State
                  Government
                </p>
              </div>
            </div>

            <span className="rounded-full bg-green-600/10 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-500/15 dark:text-green-400">
              Term: 3 Years (Eligible for Re-nomination)
            </span>
          </div>

          <p className="mt-5 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-xs leading-relaxed text-slate-700 sm:text-sm dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-300">
            Apart from the above Ex-Officio Members of the Board, the{" "}
            <strong className="font-semibold text-slate-900 dark:text-white">
              Chancellor
            </strong>{" "}
            shall, on the advice of the State Government, nominate the following
            members of the Board for a period of{" "}
            <strong className="font-semibold text-orange-600 dark:text-orange-400">
              three years
            </strong>
            , and they shall be eligible for re-nomination for another term of
            the same period, namely:
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {NOMINATED_CATEGORIES.map((item) => (
              <div
                key={item.srNo}
                className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-5 transition hover:border-orange-500/40 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:border-orange-400/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/10 font-mono text-xs font-bold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                      {item.srNo}
                    </span>
                    <span className="rounded-full bg-green-600/10 px-2.5 py-0.5 text-[11px] font-bold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                      {item.count}
                    </span>
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1.5 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-1.5 border-t border-slate-200/80 pt-3 text-[11px] font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400">
                  <Building2 className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                  <span>Nominated Member Category</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
