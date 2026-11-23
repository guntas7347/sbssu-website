export type CategoryUiLayout =
  | "list"
  | "table"
  | "cards"
  | "accordion"
  | "article";

export type FieldSlotKey = "field1" | "field2" | "field3" | "field4" | "field5";

export interface CategoryCustomLabels {
  field1Label?: string | null;
  field2Label?: string | null;
  field3Label?: string | null;
  field4Label?: string | null;
  field5Label?: string | null;
  file1Label?: string | null;
  file2Label?: string | null;
  link1Label?: string | null;
  link2Label?: string | null;
}

export interface RawCategoryEntry {
  id: string;
  displayOrder?: number | null;
  field1?: string | null;
  field2?: string | null;
  field3?: string | null;
  field4?: string | null;
  field5?: string | null;
  file1?: string | null;
  file2?: string | null;
  link1?: string | null;
  link2?: string | null;
  slug?: string | null;
  htmlContent?: string | null;
  createdAt?: Date | string | null;
}

export interface CategoryViewMeta extends CategoryCustomLabels {
  name?: string | null;
  code?: string | null;
  note?: string | null;
  uiLayout?: string | null;
}

export interface NormalizedField {
  slot: FieldSlotKey;
  defaultLabel: string;
  value: string;
  isPopulated: boolean;
}

export interface EntryActionItem {
  key: string;
  kind: "file" | "link" | "custom-page";
  label: string;
  href: string;
  isExternal: boolean;
}

export interface NormalizedEntry {
  id: string;
  displayOrder: number;
  primaryTitle: string;
  allFields: NormalizedField[];
  populatedFields: NormalizedField[];
  secondaryFields: NormalizedField[];
  hasAnyFieldValue: boolean;
  files: EntryActionItem[];
  links: EntryActionItem[];
  customPageHref: string | null;
  previewImageUrl: string | null;
  formattedDate: string;
}

const FIELD_DEFS: Array<{
  slot: FieldSlotKey;
  labelProp: keyof CategoryCustomLabels;
  defaultLabel: string;
}> = [
  { slot: "field1", labelProp: "field1Label", defaultLabel: "Field 1" },
  { slot: "field2", labelProp: "field2Label", defaultLabel: "Field 2" },
  { slot: "field3", labelProp: "field3Label", defaultLabel: "Field 3" },
  { slot: "field4", labelProp: "field4Label", defaultLabel: "Field 4" },
  { slot: "field5", labelProp: "field5Label", defaultLabel: "Field 5" },
];

function resolveLabel(custom?: string | null, fallback = ""): string {
  const trimmed = custom?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : fallback;
}

export function normalizeUiLayout(layout?: string | null): CategoryUiLayout {
  const clean = (layout ?? "").trim().toLowerCase();
  if (
    clean === "list" ||
    clean === "table" ||
    clean === "cards" ||
    clean === "accordion" ||
    clean === "article"
  ) {
    return clean;
  }
  return "list";
}

export function formatEntryDate(input?: Date | string | null): string {
  if (!input) return "Date unavailable";
  const date = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export function isImageAssetUrl(url?: string | null): boolean {
  if (!url) return false;
  return /\.(png|jpe?g|webp|gif|avif|svg)(\?.*)?$/i.test(url.trim());
}

export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url.trim());
}

export function parseTableColumnHeaders(
  note?: string | null,
  customLabels?: CategoryCustomLabels | null,
): Record<FieldSlotKey, string> {
  const headers: Record<FieldSlotKey, string> = {
    field1: resolveLabel(customLabels?.field1Label, "Field 1"),
    field2: resolveLabel(customLabels?.field2Label, "Field 2"),
    field3: resolveLabel(customLabels?.field3Label, "Field 3"),
    field4: resolveLabel(customLabels?.field4Label, "Field 4"),
    field5: resolveLabel(customLabels?.field5Label, "Field 5"),
  };

  const hasExplicitFieldLabels = Boolean(
    customLabels?.field1Label?.trim() ||
    customLabels?.field2Label?.trim() ||
    customLabels?.field3Label?.trim() ||
    customLabels?.field4Label?.trim() ||
    customLabels?.field5Label?.trim(),
  );

  // If explicit field labels aren't set, allow optional pipe-delimited note headers as fallback
  if (!hasExplicitFieldLabels && note) {
    const parts = note
      .split("|")
      .map((p) => p.trim())
      .filter(Boolean);

    if (parts.length >= 2) {
      FIELD_DEFS.forEach((def, idx) => {
        if (parts[idx]) {
          headers[def.slot] = parts[idx];
        }
      });
    }
  }

  return headers;
}

export function normalizeEntry(
  raw: RawCategoryEntry,
  options?: {
    categoryName?: string | null;
    deptCode?: string | null;
    labels?: CategoryCustomLabels | null;
  },
): NormalizedEntry {
  const labels = options?.labels;

  const allFields: NormalizedField[] = FIELD_DEFS.map((def) => {
    const trimmed = (raw[def.slot] ?? "").trim();
    const resolvedLabel = resolveLabel(
      labels?.[def.labelProp],
      def.defaultLabel,
    );
    return {
      slot: def.slot,
      defaultLabel: resolvedLabel,
      value: trimmed,
      isPopulated: trimmed.length > 0,
    };
  });

  const populatedFields = allFields.filter((f) => f.isPopulated);
  const hasAnyFieldValue = populatedFields.length > 0;

  const primaryField = allFields[0]?.isPopulated
    ? allFields[0].value
    : (populatedFields[0]?.value ?? "");

  const primaryTitle =
    primaryField || options?.categoryName?.trim() || "Untitled Entry";

  const secondaryFields = populatedFields.filter(
    (f) => f.value !== primaryTitle,
  );

  const files: EntryActionItem[] = [];
  const f1 = (raw.file1 ?? "").trim();
  const f2 = (raw.file2 ?? "").trim();
  if (f1) {
    files.push({
      key: `${raw.id}-file1`,
      kind: "file",
      label: resolveLabel(labels?.file1Label, f2 ? "File 1" : "Download File"),
      href: f1,
      isExternal: isExternalUrl(f1),
    });
  }
  if (f2) {
    files.push({
      key: `${raw.id}-file2`,
      kind: "file",
      label: resolveLabel(labels?.file2Label, "File 2"),
      href: f2,
      isExternal: isExternalUrl(f2),
    });
  }

  const links: EntryActionItem[] = [];
  const l1 = (raw.link1 ?? "").trim();
  const l2 = (raw.link2 ?? "").trim();
  if (l1) {
    links.push({
      key: `${raw.id}-link1`,
      kind: "link",
      label: resolveLabel(labels?.link1Label, l2 ? "Link 1" : "Open Link"),
      href: l1,
      isExternal: isExternalUrl(l1),
    });
  }
  if (l2) {
    links.push({
      key: `${raw.id}-link2`,
      kind: "link",
      label: resolveLabel(labels?.link2Label, "Link 2"),
      href: l2,
      isExternal: isExternalUrl(l2),
    });
  }

  const cleanSlug = (raw.slug ?? "").trim();
  const cleanDept = (options?.deptCode ?? "").trim().toLowerCase();
  const customPageHref =
    cleanSlug || (raw.htmlContent ?? "").trim()
      ? cleanSlug
        ? cleanDept
          ? `/departments/${cleanDept}/custom-pages/${cleanSlug}`
          : `/custom-pages/${cleanSlug}`
        : null
      : null;

  const previewImageUrl = isImageAssetUrl(f1)
    ? f1
    : isImageAssetUrl(f2)
      ? f2
      : null;

  return {
    id: raw.id,
    displayOrder: raw.displayOrder ?? 0,
    primaryTitle,
    allFields,
    populatedFields,
    secondaryFields,
    hasAnyFieldValue,
    files,
    links,
    customPageHref,
    previewImageUrl,
    formattedDate: formatEntryDate(raw.createdAt),
  };
}

export function normalizeEntries(
  rows: RawCategoryEntry[],
  options?: {
    categoryName?: string | null;
    deptCode?: string | null;
    labels?: CategoryCustomLabels | null;
  },
): NormalizedEntry[] {
  return [...rows]
    .sort((a, b) => {
      const orderA = a.displayOrder ?? 0;
      const orderB = b.displayOrder ?? 0;
      if (orderA !== orderB) return orderA - orderB;
      return (a.field1 ?? "").localeCompare(b.field1 ?? "");
    })
    .map((row) => normalizeEntry(row, options));
}
