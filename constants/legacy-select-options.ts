export type LegacyLookupMode = "record" | "category";

export type LegacySelectTuple = readonly [
  label: string,
  id: number,
  mode: LegacyLookupMode,
];

export const LEGACY_SELECT_OPTIONS = [
  // Administration
  ["Board of Governors Meetings", 12, "category"],
  ["Finance Committee Meetings", 1123, "category"],
  ["Building Works Meetings", 1134, "category"],
  ["Internal Quality Assurance Committee Meetings", 1135, "category"],
  ["Academic Council Meetings", 1112, "category"],
  ["Academic Council Committee", 1150, "category"],
  ["Committees", 213, "record"],

  // Academics
  ["Office Bearers", 31, "category"],
  ["Academic Regulations", 1200, "category"],
  ["Academic Link", 35003, "category"],
  ["Courses", 1145, "category"],
  ["Eligibility", 1147, "category"],
  ["Fee Detail", 1146, "category"],
  ["Notices", 35004, "category"],
  ["Notifications", 35005, "category"],
  ["Extension of Approvals (AICTE)", 1948, "category"],
  ["Academic Calendar", 1125, "category"],
  ["Gradation Certificate", 1148, "category"],

  // Central
  ["Computer Centre", 225, "record"],
  ["Library", 226, "record"],
  ["Workshop", 227, "record"],
  ["Sports", 228, "record"],
  ["Health Centre", 229, "record"],

  // Campus
  ["Academic Area", 230, "record"],
  ["Student Hostels", 231, "record"],
  ["Market Complex", 232, "record"],
  ["Sports Complex", 233, "record"],
  ["Symposium for Extra-Curricular Activities (SECA)", 35006, "record"],
  ["Indian Society for Technical Education (ISTE)", 35007, "record"],
  ["National Service Scheme (NSS)", 35008, "record"],
  ["National Cadet Corps (NCC)", 35009, "record"],
  ["Association of Revolutionary Bees (AREV)", 35010, "record"],

  // Examination
  ["Office Bearers", 31, "category"],
  ["Date Sheet", 21, "category"],
  ["NAD", 34, "category"],
  ["Notices", 34, "category"],
  ["Important Notices", 1139, "category"],
  ["Notices", 23, "category"],
  ["Download Form", 34, "category"],
  ["Question Paper Template", 34, "category"],

  // Placement
  ["Memorandum of Understanding", 1143, "category"],

  // Research & Development
  ["Research Projects", 2006, "record"],
  ["PhD Admissions Guidelines", 2001, "record"],
  ["PhD Regulations", 2002, "record"],
  ["PhD Registered Candidates", 2003, "record"],
  ["PhD Vacant Slots", 2004, "record"],
  ["Notices", 2005, "record"],
] as const satisfies readonly LegacySelectTuple[];

export interface ParsedLegacyOption {
  label: string;
  id: number;
  mode: LegacyLookupMode;
}

export function getParsedLegacyOptions(): ParsedLegacyOption[] {
  return LEGACY_SELECT_OPTIONS.map(([label, id, mode]) => ({
    label,
    id,
    mode,
  }));
}

export function resolveLegacyOptionByIdAndMode(
  id?: number | null,
  mode?: string | null,
): ParsedLegacyOption | undefined {
  const options = getParsedLegacyOptions();
  if (id !== null && id !== undefined) {
    const normalizedMode =
      mode === "record" || mode === "category" ? mode : null;
    const exact = options.find(
      (opt) =>
        opt.id === id && (!normalizedMode || opt.mode === normalizedMode),
    );
    if (exact) return exact;
  }
  return options[0];
}
