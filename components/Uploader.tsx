"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Trash2,
  Link2,
  FileUp,
  X,
} from "lucide-react";
import { uploadFile } from "@/lib/uploader";

interface UploaderProps {
  value?: string;
  onUploaded: (path: string, filename?: string) => void;
  onError?: (errorMessage: string) => void;
  accept?: string;
  label?: string;
  folder?: string;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
}

export function Uploader({
  value = "",
  onUploaded,
  onError,
  accept = "image/*",
  label = "Upload Media File",
  folder,
}: UploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [stagedFile, setStagedFile] = useState<File | null>(null);
  const [urlMode, setUrlMode] = useState(false);
  const [urlDraft, setUrlDraft] = useState(value);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!urlMode) {
      setUrlDraft(value);
    }
  }, [value, urlMode]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    setUrlMode(false);
    setStagedFile(file);
    setStatus(null);
  }

  function clearStagedFile() {
    setStagedFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function handleUploadClick() {
    if (!stagedFile || uploading) return;

    setUploading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", stagedFile);

      const res = await uploadFile(formData, folder);
      if (res.success && res.path) {
        onUploaded(res.path, res.filename);
        setUrlDraft(res.path);
        setStagedFile(null);
        if (inputRef.current) {
          inputRef.current.value = "";
        }
        setStatus({
          type: "success",
          text: `Uploaded to ${res.path}`,
        });
      } else {
        const msg = res.error || "Upload failed.";
        setStatus({ type: "error", text: msg });
        onError?.(msg);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed.";
      setStatus({ type: "error", text: msg });
      onError?.(msg);
    } finally {
      setUploading(false);
    }
  }

  function handleDeleteValue() {
    clearStagedFile();
    setUrlDraft("");
    setStatus(null);
    onUploaded("");
  }

  function handleToggleUrlMode() {
    setStatus(null);
    if (!urlMode) {
      clearStagedFile();
      setUrlDraft(value);
      setUrlMode(true);
    } else {
      setUrlMode(false);
    }
  }

  function handleApplyUrl(e?: React.FormEvent) {
    e?.preventDefault();
    const cleaned = urlDraft.trim();
    if (!cleaned) {
      handleDeleteValue();
      setUrlMode(false);
      return;
    }

    onUploaded(cleaned);
    setUrlMode(false);
    setStatus({
      type: "success",
      text: `Linked external URL: ${cleaned}`,
    });
  }

  return (
    <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-3.5 dark:border-slate-800 dark:bg-slate-950/60">
      {/* Top Bar: Label + Mode Switch + Delete */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300">
            {label}
          </span>
          {folder && (
            <span className="hidden rounded-md bg-slate-200/80 px-2 py-0.5 font-mono text-[10px] text-slate-600 sm:inline dark:bg-slate-800 dark:text-slate-400">
              {folder}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={uploading}
            onClick={handleToggleUrlMode}
            className={`inline-flex cursor-pointer items-center gap-1 rounded-lg border px-2.5 py-1 text-[11px] font-semibold transition disabled:opacity-50 ${
              urlMode
                ? "border-orange-500 bg-orange-500/10 text-orange-700 dark:border-orange-400 dark:bg-orange-500/15 dark:text-orange-300"
                : "border-slate-200 bg-white text-slate-600 hover:border-orange-400 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-orange-500 dark:hover:text-orange-400"
            }`}
          >
            <Link2 className="h-3 w-3" />
            <span>{urlMode ? "File Mode" : "Use URL"}</span>
          </button>

          {(value || stagedFile) && !uploading && (
            <button
              type="button"
              onClick={handleDeleteValue}
              title="Remove file or URL"
              className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-900/60 dark:bg-red-950/50 dark:text-red-300 dark:hover:bg-red-950"
            >
              <Trash2 className="h-3 w-3" />
              <span>Delete</span>
            </button>
          )}
        </div>
      </div>

      {/* URL Input Mode vs File Selection Mode */}
      {urlMode ? (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <input
            type="url"
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleApplyUrl();
              }
            }}
            placeholder="https://example.com/document.pdf or /data/..."
            aria-label="External file URL"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:focus:border-orange-400"
          />
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => handleApplyUrl()}
              className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-green-700 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-green-800 dark:bg-green-500 dark:text-slate-950 dark:hover:bg-green-400"
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>Set URL</span>
            </button>
            <button
              type="button"
              onClick={() => setUrlMode(false)}
              className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-300 bg-white p-2 text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              aria-label="Cancel URL input"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <input
              type="text"
              readOnly
              value={stagedFile ? stagedFile.name : value}
              placeholder="Choose a file to stage, or switch to Use URL..."
              aria-label="Selected file or stored path"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-xs text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            />

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                disabled={uploading}
                onClick={() => inputRef.current?.click()}
                className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
              >
                <FileUp className="h-4 w-4" />
                <span>Choose File</span>
              </button>

              {stagedFile && (
                <button
                  type="button"
                  disabled={uploading}
                  onClick={handleUploadClick}
                  className="inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
                >
                  {uploading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Upload className="h-4 w-4" />
                  )}
                  <span>{uploading ? "Uploading..." : "Upload"}</span>
                </button>
              )}
            </div>

            <input
              ref={inputRef}
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Staged File Preview Pill */}
          {stagedFile && !uploading && (
            <div className="flex items-center justify-between gap-2 rounded-xl border border-orange-500/25 bg-orange-500/5 px-3 py-2 text-xs dark:border-orange-400/25 dark:bg-orange-500/10">
              <div className="min-w-0 truncate font-medium text-slate-800 dark:text-slate-200">
                <span className="font-semibold text-orange-700 dark:text-orange-300">
                  Ready to upload:
                </span>{" "}
                {stagedFile.name}{" "}
                <span className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
                  ({formatBytes(stagedFile.size)})
                </span>
              </div>
              <button
                type="button"
                onClick={clearStagedFile}
                aria-label="Clear selected file"
                className="shrink-0 cursor-pointer rounded-md p-1 text-slate-500 transition hover:bg-orange-500/15 hover:text-orange-700 dark:text-slate-400 dark:hover:text-orange-300"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )}

          {/* Animated Upload Progress Bar */}
          {uploading && (
            <div className="space-y-1.5 rounded-xl border border-orange-500/30 bg-orange-500/5 p-3 dark:border-orange-400/30 dark:bg-orange-500/10">
              <div className="flex items-center justify-between text-xs font-semibold text-orange-700 dark:text-orange-300">
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Uploading {stagedFile?.name || "file"}...
                </span>
                <span className="font-mono text-[11px] text-green-700 dark:text-green-400">
                  Processing
                </span>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-orange-200/70 dark:bg-slate-800">
                <div className="h-full w-2/3 animate-pulse rounded-full bg-gradient-to-r from-orange-600 via-orange-400 to-green-600" />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Status Feedback */}
      {status && (
        <p
          className={`flex items-center gap-1.5 text-xs font-medium ${
            status.type === "success"
              ? "text-green-700 dark:text-green-400"
              : "text-red-600 dark:text-red-400"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          ) : (
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          )}
          <span className="truncate">{status.text}</span>
        </p>
      )}
    </div>
  );
}
