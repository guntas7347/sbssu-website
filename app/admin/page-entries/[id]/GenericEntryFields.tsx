"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Upload,
  Link2,
  Code,
  Eye,
  EyeOff,
  AlertTriangle,
  Pencil,
  Sparkles,
} from "lucide-react";
import { Uploader } from "@/components/Uploader";
import { HtmlPromptCopyBox } from "@/app/admin/page-entries/[id]/HtmlPromptCopyBox";
import { sanitizeHtmlClient } from "@/lib/sanitize-html";
import type { PageCategoryItem } from "@/constants/page-categories";

export type GenericAttachmentMode = "file" | "link" | "html";

export interface GenericFieldsValues {
  category: string;
  desc: string;
  attachmentMode: GenericAttachmentMode;
  file: string;
  link: string;
  slug: string;
  rawHtml: string;
}

export interface ExistingScopeEntrySummary {
  id: string;
  title: string | null;
  category: string | null;
  departmentId: string | null;
}

interface GenericEntryFieldsProps {
  pageTitle: string;
  allowedCategories: PageCategoryItem[];
  selectedCategory?: PageCategoryItem;
  scopeLabel: string;
  isDeptScope: boolean;
  targetDepartmentId?: string | null;
  deptCode?: string | null;
  values: GenericFieldsValues;
  /** Pass existing entries (or entries already in scope) so single-mode categories can detect duplicates */
  existingEntries?: ExistingScopeEntrySummary[];
  /** When editing an existing entry, pass its ID so it doesn't flag itself as a duplicate */
  editingEntryId?: string | null;
  onSingleConflictChange?: (hasConflict: boolean) => void;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  onSelectCategory: (categoryNumber: string) => void;
  onSwitchAttachmentMode: (mode: GenericAttachmentMode) => void;
  onFileUploaded: (filePath: string) => void;
  onUploadError: (message: string) => void;
}

export function GenericEntryFields({
  pageTitle,
  allowedCategories,
  selectedCategory,
  scopeLabel,
  isDeptScope,
  targetDepartmentId = null,
  deptCode,
  values,
  existingEntries = [],
  editingEntryId = null,
  onSingleConflictChange,
  onChange,
  onSelectCategory,
  onSwitchAttachmentMode,
  onFileUploaded,
  onUploadError,
}: GenericEntryFieldsProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const isSingleCategory = selectedCategory?.mode === "single";

  const existingSingleEntry = useMemo(() => {
    if (!isSingleCategory || !values.category) return null;

    return (
      existingEntries.find((entry) => {
        if (editingEntryId && entry.id === editingEntryId) return false;
        if ((entry.category ?? "").trim() !== values.category.trim()) {
          return false;
        }

        const entryDept = entry.departmentId ?? null;
        const activeDept = isDeptScope ? (targetDepartmentId ?? null) : null;
        return entryDept === activeDept;
      }) ?? null
    );
  }, [
    isSingleCategory,
    values.category,
    existingEntries,
    editingEntryId,
    isDeptScope,
    targetDepartmentId,
  ]);

  const hasSingleConflict = Boolean(existingSingleEntry);

  useEffect(() => {
    onSingleConflictChange?.(hasSingleConflict);
  }, [hasSingleConflict, onSingleConflictChange]);

  const isCustomPageCategory = Boolean(selectedCategory?.isCustomPage);
  const showHtmlEditor =
    isCustomPageCategory || values.attachmentMode === "html";

  const previewRoute =
    isDeptScope && deptCode
      ? `/departments/${deptCode.toLowerCase()}/custom-pages/${values.slug || "auto-slug"}`
      : `/custom-pages/${values.slug || "auto-slug"}`;

  return (
    <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="entry-category"
            className="mb-1 block text-[11px] font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Category *
          </label>
          <select
            id="entry-category"
            name="category"
            required
            value={values.category}
            onChange={(e) => onSelectCategory(e.target.value)}
            className="w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-medium text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          >
            <option value="">Select category...</option>
            {allowedCategories.map((cat) => (
              <option key={cat.categoryNumber} value={cat.categoryNumber}>
                {cat.label} (#{cat.categoryNumber})
                {cat.mode === "single" ? " · Single Entry" : ""}
              </option>
            ))}
          </select>

          {isSingleCategory && (
            <div className="mt-1.5 flex items-center gap-1.5 text-[11px] font-medium text-green-700 dark:text-green-400">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span>
                Single-entry category: only one entry is allowed for{" "}
                <strong>{scopeLabel}</strong>.
              </span>
            </div>
          )}
        </div>

        {selectedCategory?.note && (
          <div className="rounded-xl border border-green-600/25 bg-green-600/5 p-3 text-xs dark:border-green-400/25 dark:bg-green-500/10">
            <span className="block text-[10px] font-bold tracking-wider text-green-700 uppercase dark:text-green-400">
              Category Note
            </span>
            <p className="mt-1 leading-relaxed text-slate-700 dark:text-slate-200">
              {selectedCategory.note}
            </p>
          </div>
        )}
      </div>
      {/* Single-Entry Conflict Guard Banner */}
      {existingSingleEntry && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-orange-500/40 bg-orange-500/10 p-3.5 text-xs text-orange-950 dark:border-orange-400/30 dark:bg-orange-500/15 dark:text-orange-100"
        >
          <div className="flex items-start gap-2.5">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-orange-600 dark:text-orange-400" />
            <div>
              <p className="font-bold">
                An entry already exists for {selectedCategory?.label} in{" "}
                {scopeLabel}
              </p>
              <p className="mt-0.5 text-[11px] text-orange-800 dark:text-orange-200/90">
                Existing entry:{" "}
                <span className="font-semibold">
                  {existingSingleEntry.title}
                </span>
                . Edit that entry instead of creating a duplicate.
              </p>
            </div>
          </div>

          <Link
            href={`/admin/page-entries/${existingSingleEntry.id}`}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit Existing
          </Link>
        </div>
      )}

      <div>
        <label
          htmlFor="entry-desc"
          className="mb-1 block text-[11px] font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
        >
          Description
        </label>
        <textarea
          id="entry-desc"
          name="desc"
          rows={10}
          value={values.desc}
          onChange={onChange}
          placeholder="Optional summary shown in category listings..."
          className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        />
      </div>

      {/* 3-Way Content Target: Upload File | Link | Paste HTML */}
      {!isCustomPageCategory && (
        <div className="space-y-3">
          <span className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300">
            Content Target
          </span>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onSwitchAttachmentMode("file")}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                values.attachmentMode === "file"
                  ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-slate-950"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              <Upload className="h-3.5 w-3.5" />
              File
            </button>

            <button
              type="button"
              onClick={() => onSwitchAttachmentMode("link")}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                values.attachmentMode === "link"
                  ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-slate-950"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              <Link2 className="h-3.5 w-3.5" />
              Link / URL
            </button>

            <button
              type="button"
              onClick={() => onSwitchAttachmentMode("html")}
              className={`inline-flex cursor-pointer items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
                values.attachmentMode === "html"
                  ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-slate-950"
                  : "border border-slate-300 bg-white text-slate-700 hover:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
              }`}
            >
              <Code className="h-3.5 w-3.5" />
              Paste HTML (Auto Custom Page)
            </button>
          </div>

          {values.attachmentMode === "file" && (
            <div className="space-y-1.5">
              <Uploader
                folder="page-entries"
                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg,.webp"
                label="Attachment File"
                value={values.file}
                onUploaded={onFileUploaded}
                onError={onUploadError}
              />
              {values.file && (
                <p className="font-mono text-[11px] text-green-700 dark:text-green-400">
                  File: {values.file}
                </p>
              )}
            </div>
          )}

          {values.attachmentMode === "link" && (
            <div>
              <input
                id="entry-link"
                name="link"
                type="text"
                value={values.link}
                onChange={onChange}
                placeholder="/pages/fee-structure-2026 or https://..."
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 font-mono text-xs text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
              />
            </div>
          )}
        </div>
      )}

      {/* Slug + HTML Editor */}
      {showHtmlEditor && (
        <div className="space-y-3">
          <div>
            <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="entry-html-slug"
                className="block text-[11px] font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
              >
                Slug{" "}
                {isCustomPageCategory
                  ? "*"
                  : "(Optional — auto-generated from title if empty)"}
              </label>
              <span className="font-mono text-[11px] text-green-700 dark:text-green-400">
                {previewRoute}
              </span>
            </div>
            <input
              id="entry-html-slug"
              name="slug"
              type="text"
              required={isCustomPageCategory}
              value={values.slug}
              onChange={onChange}
              placeholder="e.g. odd-sem-timetable-2026"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 font-mono text-xs text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
            />
          </div>

          <HtmlPromptCopyBox
            pageTitle={pageTitle}
            scopeType={isDeptScope ? "department" : "university"}
            departmentLabel={isDeptScope ? scopeLabel : undefined}
          />

          <div className="flex items-center justify-between">
            <label
              htmlFor="generic-raw-html"
              className="text-[11px] font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
            >
              HTML Content
            </label>
            <button
              type="button"
              onClick={() => setPreviewOpen((prev) => !prev)}
              className="inline-flex cursor-pointer items-center gap-1 text-[11px] font-semibold text-green-700 hover:underline dark:text-green-400"
            >
              {previewOpen ? (
                <>
                  <EyeOff className="h-3.5 w-3.5" />
                  Hide Preview
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5" />
                  Sanitized Preview
                </>
              )}
            </button>
          </div>

          <textarea
            id="generic-raw-html"
            name="rawHtml"
            rows={7}
            value={values.rawHtml}
            onChange={onChange}
            placeholder="<section><h2>...</h2><p>...</p></section>"
            className="w-full rounded-xl border border-slate-300 bg-white p-3.5 font-mono text-xs text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />

          {previewOpen && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtmlClient(values.rawHtml),
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
