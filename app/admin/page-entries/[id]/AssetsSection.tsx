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
  categoryNote?: string | null;
  uploadFolder: string;
  onUploadError?: (message: string) => void;
}

export function AssetsSection({
  displayOrder,
  onDisplayOrderChange,
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
  categoryNote,
  uploadFolder,
  onUploadError,
}: AssetsSectionProps) {
  const fields: Array<{
    id: string;
    label: string;
    value: string;
    onChange: (val: string) => void;
    placeholder: string;
  }> = [
    {
      id: "entry-field-1",
      label: "Field 1 (Primary)",
      value: field1,
      onChange: onField1Change,
      placeholder: "Primary label, name, heading, or title",
    },
    {
      id: "entry-field-2",
      label: "Field 2",
      value: field2,
      onChange: onField2Change,
      placeholder: "Designation, subtitle, or secondary info",
    },
    {
      id: "entry-field-3",
      label: "Field 3",
      value: field3,
      onChange: onField3Change,
      placeholder: "Department, tenure, date, or extra detail",
    },
    {
      id: "entry-field-4",
      label: "Field 4",
      value: field4,
      onChange: onField4Change,
      placeholder: "Additional column / value",
    },
    {
      id: "entry-field-5",
      label: "Field 5",
      value: field5,
      onChange: onField5Change,
      placeholder: "Additional column / notes",
    },
  ];

  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/40">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-200">
          3. Structured Fields, Files & Links
        </h2>
        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
          <FolderOpen className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
          <span>Upload folder: {uploadFolder}</span>
        </span>
      </div>

      {categoryNote && (
        <div className="flex items-start gap-2 rounded-xl border border-orange-500/20 bg-orange-500/5 px-3.5 py-2.5 text-xs text-slate-700 dark:text-slate-300">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-orange-600 dark:text-orange-400" />
          <span>{categoryNote}</span>
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
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400"
            />
          </div>
        ))}
      </div>

      {/* File 1 & File 2 using Uploader with dynamic folder */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            File 1
          </div>
          <Uploader
            value={file1}
            onUploaded={(filePath) => onFile1Change(filePath)}
            onError={onUploadError}
            accept="*/*"
            label="Upload File 1"
            folder={uploadFolder}
          />
        </div>

        <div className="space-y-1.5 rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            File 2
          </div>
          <Uploader
            value={file2}
            onUploaded={(filePath) => onFile2Change(filePath)}
            onError={onUploadError}
            accept="*/*"
            label="Upload File 2"
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
            <Link2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
            <span>Link 1</span>
          </label>
          <input
            id="entry-link1"
            type="text"
            value={link1}
            onChange={(e) => onLink1Change(e.target.value)}
            placeholder="https://... or reference text"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400"
          />
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="entry-link2"
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
          >
            <Link2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
            <span>Link 2</span>
          </label>
          <input
            id="entry-link2"
            type="text"
            value={link2}
            onChange={(e) => onLink2Change(e.target.value)}
            placeholder="https://... or secondary reference"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400"
          />
        </div>
      </div>
    </div>
  );
}
