"use client";

import React, { useState } from "react";
import { Upload, Link2, Code, Eye, EyeOff } from "lucide-react";
import { Uploader } from "@/components/Uploader";
import { HtmlPromptCopyBox } from "@/app/admin/page-entries/[id]/HtmlPromptCopyBox";
import { sanitizeHtmlClient } from "@/lib/sanitize-html";
import type { PageCategoryItem } from "@/constants/page-categories";

export type GenericAttachmentMode = "file" | "link" | "html";

export interface GenericFieldsValues {
  category: string;
  srNo: string;
  desc: string;
  attachmentMode: GenericAttachmentMode;
  file: string;
  link: string;
  slug: string;
  rawHtml: string;
}

interface GenericEntryFieldsProps {
  pageTitle: string;
  allowedCategories: PageCategoryItem[];
  selectedCategory?: PageCategoryItem;
  scopeLabel: string;
  isDeptScope: boolean;
  deptCode?: string | null;
  values: GenericFieldsValues;
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
  deptCode,
  values,
  onChange,
  onSelectCategory,
  onSwitchAttachmentMode,
  onFileUploaded,
  onUploadError,
}: GenericEntryFieldsProps) {
  const [previewOpen, setPreviewOpen] = useState(false);

  const isCustomPageCategory = Boolean(selectedCategory?.isCustomPage);
  const showHtmlEditor =
    isCustomPageCategory || values.attachmentMode === "html";

  const previewRoute =
    isDeptScope && deptCode
      ? `/departments/${deptCode.toLowerCase()}/pages/${values.slug || "auto-slug"}`
      : `/pages/${values.slug || "auto-slug"}`;

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
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="entry-sr-no"
            className="mb-1 block text-[11px] font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Serial Order (`srNo`)
          </label>
          <input
            id="entry-sr-no"
            name="srNo"
            type="number"
            min={1}
            step={1}
            value={values.srNo}
            onChange={onChange}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 font-mono text-xs text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
          />
        </div>
      </div>

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
          rows={2}
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
              Upload File
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
