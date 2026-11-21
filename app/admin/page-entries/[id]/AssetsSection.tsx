"use client";

import { FolderOpen, Link2 } from "lucide-react";
import { Uploader } from "@/components/Uploader";

interface AssetsSectionProps {
  title: string;
  onTitleChange: (value: string) => void;
  desc: string;
  onDescChange: (value: string) => void;
  file1: string;
  onFile1Change: (value: string) => void;
  file2: string;
  onFile2Change: (value: string) => void;
  link1: string;
  onLink1Change: (value: string) => void;
  link2: string;
  onLink2Change: (value: string) => void;
  uploadFolder: string;
  onUploadError?: (message: string) => void;
}

export function AssetsSection({
  title,
  onTitleChange,
  desc,
  onDescChange,
  file1,
  onFile1Change,
  file2,
  onFile2Change,
  link1,
  onLink1Change,
  link2,
  onLink2Change,
  uploadFolder,
  onUploadError,
}: AssetsSectionProps) {
  return (
    <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/40">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-200">
          3. Entry Details, Files & Links
        </h2>
        <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
          <FolderOpen className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
          <span>Upload folder: {uploadFolder}</span>
        </span>
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="entry-title"
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
        >
          Title
        </label>
        <input
          id="entry-title"
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="e.g. B.Tech CSE 5th Semester Timetable or Academic Calendar 2026-27"
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400"
        />
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="entry-desc"
          className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
        >
          Description
        </label>
        <textarea
          id="entry-desc"
          rows={10}
          value={desc}
          onChange={(e) => onDescChange(e.target.value)}
          placeholder="Summary, semester details, notes, or metadata..."
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400"
        />
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
          <input
            type="text"
            value={file1}
            onChange={(e) => onFile1Change(e.target.value)}
            placeholder="Uploaded file path or URL"
            className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-700 focus:border-orange-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-orange-400"
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
          <input
            type="text"
            value={file2}
            onChange={(e) => onFile2Change(e.target.value)}
            placeholder="Uploaded file path or URL"
            className="mt-2 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-700 focus:border-orange-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-orange-400"
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
