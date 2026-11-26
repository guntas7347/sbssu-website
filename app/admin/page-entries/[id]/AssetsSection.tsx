"use client";

import { FolderOpen, Info, Link2 } from "lucide-react";
import { Uploader } from "@/components/Uploader";

interface AssetsSectionProps {
  displayOrder: number;
  onDisplayOrderChange: (value: number) => void;
  field1: string;
  onField1Change: (value: string) => void;
  field2: string;
  onField2Change: (value: string) => void;
  field3: string;
  onField3Change: (value: string) => void;
  field4: string;
  onField4Change: (value: string) => void;
  field5: string;
  onField5Change: (value: string) => void;
  file1: string;
  onFile1Change: (value: string) => void;
  file2: string;
  onFile2Change: (value: string) => void;
  link1: string;
  onLink1Change: (value: string) => void;
  link2: string;
  onLink2Change: (value: string) => void;
  field1Label?: string | null;
  field2Label?: string | null;
  field3Label?: string | null;
  field4Label?: string | null;
  field5Label?: string | null;
  file1Label?: string | null;
  file2Label?: string | null;
  link1Label?: string | null;
  link2Label?: string | null;
  categoryNote?: string | null;
  uploadFolder: string;
  onUploadError?: (message: string) => void;
}

function getTrimmedLabel(label: string | null | undefined): string | null {
  const trimmed = label?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : null;
}

function formatSlotLabel(trimmedLabel: string, defaultLabel: string): string {
  return `${trimmedLabel} (${defaultLabel})`;
}

export function AssetsSection({
  field1,
  onField1Change,
  field2,
  onField2Change,
  field3,
  onField3Change,
  field4,
  onField4Change,
  field5,
  onField5Change,
  file1,
  onFile1Change,
  file2,
  onFile2Change,
  link1,
  onLink1Change,
  link2,
  onLink2Change,
  field1Label,
  field2Label,
  field3Label,
  field4Label,
  field5Label,
  file1Label,
  file2Label,
  link1Label,
  link2Label,
  categoryNote,
  uploadFolder,
  onUploadError,
}: AssetsSectionProps) {
  const fields = [
    {
      id: "entry-field-1",
      rawLabel: getTrimmedLabel(field1Label),
      defaultLabel: "Field 1",
      value: field1,
      onChange: onField1Change,
      placeholder: "Primary label, name, heading, or title",
    },
    {
      id: "entry-field-2",
      rawLabel: getTrimmedLabel(field2Label),
      defaultLabel: "Field 2",
      value: field2,
      onChange: onField2Change,
      placeholder: "Designation, subtitle, or secondary info",
    },
    {
      id: "entry-field-3",
      rawLabel: getTrimmedLabel(field3Label),
      defaultLabel: "Field 3",
      value: field3,
      onChange: onField3Change,
      placeholder: "Department, tenure, date, or extra detail",
    },
    {
      id: "entry-field-4",
      rawLabel: getTrimmedLabel(field4Label),
      defaultLabel: "Field 4",
      value: field4,
      onChange: onField4Change,
      placeholder: "Additional column / value",
    },
    {
      id: "entry-field-5",
      rawLabel: getTrimmedLabel(field5Label),
      defaultLabel: "Field 5",
      value: field5,
      onChange: onField5Change,
      placeholder: "Additional column / notes",
    },
  ].filter(
    (
      f,
    ): f is {
      id: string;
      rawLabel: string;
      defaultLabel: string;
      value: string;
      onChange: (val: string) => void;
      placeholder: string;
    } => f.rawLabel !== null,
  );

  const file1Trimmed = getTrimmedLabel(file1Label);
  const file2Trimmed = getTrimmedLabel(file2Label);
  const hasAnyFile = file1Trimmed !== null || file2Trimmed !== null;

  const link1Trimmed = getTrimmedLabel(link1Label);
  const link2Trimmed = getTrimmedLabel(link2Label);
  const hasAnyLink = link1Trimmed !== null || link2Trimmed !== null;

  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/40">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-200">
          2. Structured Fields, Files & Links
        </h2>
        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
          <FolderOpen className="h-3.5 w-3.5 text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]" />
          <span>Upload folder: {uploadFolder}</span>
        </span>
      </div>

      {categoryNote && (
        <div className="flex items-center justify-start gap-3 rounded-xl border border-[var(--color-primary)]/25 bg-[var(--color-primary)]/5 px-3.5 py-3 text-sm dark:border-[var(--color-primary-dark)]/25 dark:bg-[var(--color-primary-dark)]/5">
          <Info className="h-4 w-4 shrink-0 text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]" />
          <p className="leading-relaxed whitespace-pre-wrap text-slate-700 dark:text-slate-300">
            {categoryNote}
          </p>
        </div>
      )}

      {fields.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {fields.map((f) => (
            <div key={f.id} className="space-y-1.5">
              <label
                htmlFor={f.id}
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                {formatSlotLabel(f.rawLabel, f.defaultLabel)}
              </label>
              <textarea
                id={f.id}
                rows={5}
                value={f.value}
                onChange={(e) => f.onChange(e.target.value)}
                placeholder={f.rawLabel}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-[var(--color-primary-dark)]"
              />
            </div>
          ))}
        </div>
      )}

      {/* File 1 & File 2 using Uploader with dynamic folder */}
      {hasAnyFile && (
        <div className="grid gap-4 md:grid-cols-2">
          {file1Trimmed !== null && (
            <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {formatSlotLabel(file1Trimmed, "File 1")}
              </div>
              <Uploader
                value={file1}
                onUploaded={(filePath) => onFile1Change(filePath)}
                onError={onUploadError}
                accept="*/*"
                label={file1Trimmed}
                folder={uploadFolder}
              />
            </div>
          )}

          {file2Trimmed !== null && (
            <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
              <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {formatSlotLabel(file2Trimmed, "File 2")}
              </div>
              <Uploader
                value={file2}
                onUploaded={(filePath) => onFile2Change(filePath)}
                onError={onUploadError}
                accept="*/*"
                label={file2Trimmed}
                folder={uploadFolder}
              />
            </div>
          )}
        </div>
      )}

      {/* Link 1 & Link 2 as plain text inputs */}
      {hasAnyLink && (
        <div className="grid gap-4 md:grid-cols-2">
          {link1Trimmed !== null && (
            <div className="space-y-1.5">
              <label
                htmlFor="entry-link1"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <Link2 className="h-3.5 w-3.5 text-[var(--color-secondary)] dark:text-[var(--color-secondary-dark)]" />
                <span>{formatSlotLabel(link1Trimmed, "Link 1")}</span>
              </label>
              <input
                id="entry-link1"
                type="text"
                value={link1}
                onChange={(e) => onLink1Change(e.target.value)}
                placeholder={link1Trimmed}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-[var(--color-primary-dark)]"
              />
            </div>
          )}

          {link2Trimmed !== null && (
            <div className="space-y-1.5">
              <label
                htmlFor="entry-link2"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <Link2 className="h-3.5 w-3.5 text-[var(--color-secondary)] dark:text-[var(--color-secondary-dark)]" />
                <span>{formatSlotLabel(link2Trimmed, "Link 2")}</span>
              </label>
              <input
                id="entry-link2"
                type="text"
                value={link2}
                onChange={(e) => onLink2Change(e.target.value)}
                placeholder={link2Trimmed}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-[var(--color-primary-dark)]"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
