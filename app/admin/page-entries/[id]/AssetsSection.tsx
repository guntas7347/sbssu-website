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

function formatSlotLabel(
  customLabel: string | null | undefined,
  defaultLabel: string,
  emptyCustomFallback?: string,
): string {
  const trimmed = customLabel?.trim() ?? "";
  if (trimmed.length > 0) {
    return `${trimmed} (${defaultLabel})`;
  }
  return emptyCustomFallback ?? defaultLabel;
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
  const resolvedField1Label = formatSlotLabel(
    field1Label,
    "Field 1",
    "Field 1 (Primary)",
  );
  const resolvedField2Label = formatSlotLabel(field2Label, "Field 2");
  const resolvedField3Label = formatSlotLabel(field3Label, "Field 3");
  const resolvedField4Label = formatSlotLabel(field4Label, "Field 4");
  const resolvedField5Label = formatSlotLabel(field5Label, "Field 5");

  const resolvedFile1Label = formatSlotLabel(file1Label, "File 1");
  const resolvedFile2Label = formatSlotLabel(file2Label, "File 2");
  const resolvedLink1Label = formatSlotLabel(link1Label, "Link 1");
  const resolvedLink2Label = formatSlotLabel(link2Label, "Link 2");

  const fields: Array<{
    id: string;
    label: string;
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
  }> = [
    {
      id: "entry-field-1",
      label: resolvedField1Label,
      value: field1,
      onChange: onField1Change,
      placeholder:
        field1Label?.trim() || "Primary label, name, heading, or title",
    },
    {
      id: "entry-field-2",
      label: resolvedField2Label,
      value: field2,
      onChange: onField2Change,
      placeholder:
        field2Label?.trim() || "Designation, subtitle, or secondary info",
    },
    {
      id: "entry-field-3",
      label: resolvedField3Label,
      value: field3,
      onChange: onField3Change,
      placeholder:
        field3Label?.trim() || "Department, tenure, date, or extra detail",
    },
    {
      id: "entry-field-4",
      label: resolvedField4Label,
      value: field4,
      onChange: onField4Change,
      placeholder: field4Label?.trim() || "Additional column / value",
    },
    {
      id: "entry-field-5",
      label: resolvedField5Label,
      value: field5,
      onChange: onField5Change,
      placeholder: field5Label?.trim() || "Additional column / notes",
    },
  ];

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
          <p className="whitespace-pre-wrap leading-relaxed text-slate-700 dark:text-slate-300">
            {categoryNote}
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <div key={f.id} className="space-y-1.5">
            <label
              htmlFor={f.id}
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              {f.label}
            </label>
            <textarea
              id={f.id}
              rows={5}
              value={f.value}
              onChange={(e) => f.onChange(e.target.value)}
              placeholder={f.placeholder}
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-[var(--color-primary-dark)]"
            />
          </div>
        ))}
      </div>

      {/* File 1 & File 2 using Uploader with dynamic folder */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {resolvedFile1Label}
          </div>
          <Uploader
            value={file1}
            onUploaded={(filePath) => onFile1Change(filePath)}
            onError={onUploadError}
            accept="*/*"
            label={file1Label?.trim() || "Upload File 1"}
            folder={uploadFolder}
          />
        </div>

        <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            {resolvedFile2Label}
          </div>
          <Uploader
            value={file2}
            onUploaded={(filePath) => onFile2Change(filePath)}
            onError={onUploadError}
            accept="*/*"
            label={file2Label?.trim() || "Upload File 2"}
            folder={uploadFolder}
          />
        </div>
      </div>

      {/* Link 1 & Link 2 as plain text inputs */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5">
          <label
            htmlFor="entry-link1"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            <Link2 className="h-3.5 w-3.5 text-[var(--color-secondary)] dark:text-[var(--color-secondary-dark)]" />
            <span>{resolvedLink1Label}</span>
          </label>
          <input
            id="entry-link1"
            type="text"
            value={link1}
            onChange={(e) => onLink1Change(e.target.value)}
            placeholder={link1Label?.trim() || "https://... or reference text"}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-[var(--color-primary-dark)]"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="entry-link2"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            <Link2 className="h-3.5 w-3.5 text-[var(--color-secondary)] dark:text-[var(--color-secondary-dark)]" />
            <span>{resolvedLink2Label}</span>
          </label>
          <input
            id="entry-link2"
            type="text"
            value={link2}
            onChange={(e) => onLink2Change(e.target.value)}
            placeholder={
              link2Label?.trim() || "https://... or secondary reference"
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-[var(--color-primary)] focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-[var(--color-primary-dark)]"
          />
        </div>
      </div>
    </div>
  );
}
