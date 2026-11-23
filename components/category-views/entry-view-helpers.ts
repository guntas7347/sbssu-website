export type CategoryUiLayout =
  | "list"
  | "table"
  | "cards"
  | "accordion"
  | "article";

export type FieldSlotKey = "field1" | "field2" | "field3" | "field4" | "field5";

const DEPT_SCOPES = new Set(["all-departments", "department"]);

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

export interface CategoryViewMeta extends CategoryCustomLabels {
  name?: string | null;
  code?: string | null;
  scope?: string | null;
  note?: string | null;
  uiLayout?: string | null;
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

export interface NormalizedField {
  slot: FieldSlotKey;
  label: string;
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

const FIELD_SLOTS: Array<{
  slot: FieldSlotKey;
  labelKey: keyof CategoryCustomLabels;
  fallback: string;
}> = [
  { slot: "field1", labelKey: "field1Label", fallback: "Field 1" },
  { slot: "field2", labelKey: "field2Label", fallback: "Field 2" },
  { slot: "field3", labelKey: "field3Label", fallback: "Field 3" },
  { slot: "field4", labelKey: "field4Label", fallback: "Field 4" },
  { slot: "field5", labelKey: "field5Label", fallback: "Field 5" },
];

function labelOr(value?: string | null, fallback = ""): string {
  return value?.trim() || fallback;
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

export function buildPageUrl(params: {
  html?: boolean;
  scope?: string | null;
  catCode?: string | null;
  slug?: string | null;
  deptCode?: string | null;
}): string | null {
  const scope = (params.scope ?? "university").trim().toLowerCase();
  const catCode = (params.catCode ?? "").trim().toLowerCase();
  const slug = params.html ? (params.slug ?? "").trim().toLowerCase() : null;

  if (!scope || !catCode) return null;
  if (params.html && !slug) return null;

  const baseSegments = DEPT_SCOPES.has(scope)
    ? (() => {
        const deptCode = (params.deptCode ?? "").trim().toLowerCase();
        return deptCode ? [scope, deptCode, catCode] : null;
      })()
    : [scope, catCode];

  if (!baseSegments) return null;

  return params.html
    ? `/html/${[...baseSegments, slug].join("/")}`
    : `/pages/${baseSegments.join("/")}`;
}

export function normalizeEntry(
  raw: RawCategoryEntry,
  category?: CategoryViewMeta | null,
  deptCode?: string | null,
): NormalizedEntry {
  const allFields: NormalizedField[] = FIELD_SLOTS.map(
    ({ slot, labelKey, fallback }) => {
      const value = (raw[slot] ?? "").trim();
      return {
        slot,
        label: labelOr(category?.[labelKey], fallback),
        value,
        isPopulated: value.length > 0,
      };
    },
  );

  const populatedFields = allFields.filter((f) => f.isPopulated);
  const primaryTitle =
    (allFields[0]?.isPopulated
      ? allFields[0].value
      : populatedFields[0]?.value) ||
    category?.name?.trim() ||
    "Untitled Entry";

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
      label: labelOr(category?.file1Label, f2 ? "File 1" : "Download File"),
      href: f1,
      isExternal: isExternalUrl(f1),
    });
  }
  if (f2) {
    files.push({
      key: `${raw.id}-file2`,
      kind: "file",
      label: labelOr(category?.file2Label, "File 2"),
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
      label: labelOr(category?.link1Label, l2 ? "Link 1" : "Open Link"),
      href: l1,
      isExternal: isExternalUrl(l1),
    });
  }
  if (l2) {
    links.push({
      key: `${raw.id}-link2`,
      kind: "link",
      label: labelOr(category?.link2Label, "Link 2"),
      href: l2,
      isExternal: isExternalUrl(l2),
    });
  }

  const hasCustomHtml = Boolean(
    (raw.slug ?? "").trim() || (raw.htmlContent ?? "").trim(),
  );
  const customPageHref = hasCustomHtml
    ? buildPageUrl({
        html: true,
        scope: category?.scope,
        catCode: category?.code,
        slug: raw.slug,
        deptCode,
      })
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
    hasAnyFieldValue: populatedFields.length > 0,
    files,
    links,
    customPageHref,
    previewImageUrl,
    formattedDate: formatEntryDate(raw.createdAt),
  };
}

export function normalizeEntries(
  rows: RawCategoryEntry[],
  category?: CategoryViewMeta | null,
  deptCode?: string | null,
): NormalizedEntry[] {
  return [...rows]
    .sort((a, b) => {
      const orderA = a.displayOrder ?? 0;
      const orderB = b.displayOrder ?? 0;
      if (orderA !== orderB) return orderA - orderB;
      return (a.field1 ?? "").localeCompare(b.field1 ?? "");
    })
    .map((row) => normalizeEntry(row, category, deptCode));
}
