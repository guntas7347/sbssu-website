"use client";

import {
  BookOpen,
  ChevronsUpDown,
  Eye,
  LayoutGrid,
  List,
  Table2,
} from "lucide-react";
import { EntryAccordionView } from "@/components/category-views/EntryAccordionView";
import { EntryArticleView } from "@/components/category-views/EntryArticleView";
import { EntryCardsView } from "@/components/category-views/EntryCardsView";
import { EntryListView } from "@/components/category-views/EntryListView";
import { EntryTableView } from "@/components/category-views/EntryTableView";
import {
  normalizeUiLayout,
  type CategoryCustomLabels,
  type CategoryUiLayout,
  type RawCategoryEntry,
} from "@/components/category-views/entry-view-helpers";

export interface CategoryUiLayoutSelectorProps {
  value: string;
  onSelect: (layout: CategoryUiLayout) => void;
  catName?: string | null;
  catScope?: string | null;
  catNote?: string | null;
  catLabels?: CategoryCustomLabels | null;
  disabled?: boolean;
}

const LAYOUT_OPTIONS: Array<{
  key: CategoryUiLayout;
  label: string;
  hint: string;
  icon: typeof List;
}> = [
  {
    key: "list",
    label: "List",
    hint: "Stacked rows for notices, circulars & syllabi",
    icon: List,
  },
  {
    key: "table",
    label: "Table",
    hint: "Structured columns across entries",
    icon: Table2,
  },
  {
    key: "cards",
    label: "Cards",
    hint: "Responsive grid for faculty, courses & committees",
    icon: LayoutGrid,
  },
  {
    key: "accordion",
    label: "Accordion",
    hint: "Expandable items for FAQs, rules & guidelines",
    icon: ChevronsUpDown,
  },
  {
    key: "article",
    label: "Article",
    hint: "Full-width blocks for single or narrative pages",
    icon: BookOpen,
  },
];

function buildSampleEntries(
  catName?: string | null,
  catScope?: string | null,
): RawCategoryEntry[] {
  const titleBase = catName?.trim() || "Academic Notification";
  const isDept = catScope === "department" || catScope === "all-departments";
  const unitLabel = isDept
    ? "Department of Computer Science & Engineering"
    : "Shaheed Bhagat Singh State University, Ferozepur";

  return [
    {
      id: "sample-entry-1",
      displayOrder: 1,
      field1: `${titleBase} — Session 2026–27`,
      field2: unitLabel,
      field3: "Ref. No. SBSSU/2026/104",
      field4: "Applicable for Odd & Even Semesters",
      field5: "Approved by Competent Authority",
      file1: "#sample-file-1",
      file2: "#sample-file-2",
      link1: "#sample-link-1",
      link2: null,
      createdAt: new Date("2026-11-18T10:00:00+05:30"),
    },
    {
      id: "sample-entry-2",
      displayOrder: 2,
      field1: `Revised Schedule & Guidelines — ${titleBase}`,
      field2: isDept ? "B.Tech / M.Tech Programs" : "University Academic Wing",
      field3: "Effective Immediately",
      field4: null,
      field5: null,
      file1: "#sample-file-3",
      file2: null,
      link1: "#sample-link-2",
      link2: "#sample-link-3",
      createdAt: new Date("2026-11-22T14:30:00+05:30"),
    },
  ];
}

export function CategoryUiLayoutSelector({
  value,
  onSelect,
  catName,
  catScope,
  catNote,
  catLabels,
  disabled = false,
}: CategoryUiLayoutSelectorProps) {
  const selectedLayout = normalizeUiLayout(value);
  const sampleEntries = buildSampleEntries(catName, catScope);
  const sampleCategory = {
    name: catName?.trim() || "Sample Category",
    note: catNote ?? null,
    uiLayout: selectedLayout,
    ...(catLabels ?? {}),
  };
  const previewDeptCode =
    catScope === "department" || catScope === "all-departments" ? "cse" : null;

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <span className="block text-xs font-bold tracking-wider text-slate-800 uppercase dark:text-slate-200">
            Public Display Layout
          </span>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Choose how entries in this category appear on the public portal.
          </p>
        </div>

        <span className="rounded-full bg-[var(--color-primary)]/10 px-3 py-1 font-mono text-xs font-bold text-[var(--color-primary)] uppercase dark:bg-[var(--color-primary-dark)]/15 dark:text-[var(--color-primary-dark)]">
          {selectedLayout}
        </span>
      </div>

      {/* Button-based layout selector */}
      <div
        role="radiogroup"
        aria-label="Public Display Layout"
        className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5"
      >
        {LAYOUT_OPTIONS.map((opt) => {
          const Icon = opt.icon;
          const isSelected = selectedLayout === opt.key;

          return (
            <button
              key={opt.key}
              type="button"
              role="radio"
              aria-checked={isSelected}
              disabled={disabled}
              onClick={() => onSelect(opt.key)}
              className={`flex flex-col items-start rounded-xl border p-3 text-left transition ${
                isSelected
                  ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 ring-1 ring-[var(--color-primary)]/40 dark:border-[var(--color-primary-dark)] dark:bg-[var(--color-primary-dark)]/15 dark:ring-[var(--color-primary-dark)]/40"
                  : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-white dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-slate-700 dark:hover:bg-slate-900"
              } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
            >
              <div className="flex w-full items-center justify-between gap-2">
                <span
                  className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${
                    isSelected
                      ? "bg-[var(--color-primary)] text-white dark:bg-[var(--color-primary-dark)] dark:text-slate-950"
                      : "bg-slate-200/80 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>

                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)]" />
                )}
              </div>

              <span className="mt-2.5 text-xs font-bold text-slate-900 dark:text-white">
                {opt.label}
              </span>
              <span className="mt-0.5 line-clamp-2 text-[11px] leading-snug text-slate-500 dark:text-slate-400">
                {opt.hint}
              </span>
            </button>
          );
        })}
      </div>

      {/* Live Preview Box */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-950/70">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white/80 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <Eye className="h-3.5 w-3.5 text-[var(--color-secondary)] dark:text-[var(--color-secondary-dark)]" />
            <span>Live Layout Preview</span>
          </div>

          <span className="text-[11px] text-slate-500 dark:text-slate-400">
            Sample data • {catScope ? `Scope: ${catScope}` : "University scope"}
          </span>
        </div>

        <div className="p-4 sm:p-5">
          {selectedLayout === "list" && (
            <EntryListView
              entries={sampleEntries}
              category={sampleCategory}
              deptCode={previewDeptCode}
            />
          )}
          {selectedLayout === "table" && (
            <EntryTableView
              entries={sampleEntries}
              category={sampleCategory}
              deptCode={previewDeptCode}
            />
          )}
          {selectedLayout === "cards" && (
            <EntryCardsView
              entries={sampleEntries}
              category={sampleCategory}
              deptCode={previewDeptCode}
            />
          )}
          {selectedLayout === "accordion" && (
            <EntryAccordionView
              entries={sampleEntries}
              category={sampleCategory}
              deptCode={previewDeptCode}
            />
          )}
          {selectedLayout === "article" && (
            <EntryArticleView
              entries={sampleEntries}
              category={sampleCategory}
              deptCode={previewDeptCode}
            />
          )}
        </div>
      </div>
    </div>
  );
}
