"use client";

import React, { useRef, useState } from "react";
import { Upload, CheckCircle2, AlertCircle, FileImage } from "lucide-react";
import { uploadFile } from "@/lib/uploader";

interface UploaderProps {
  value?: string;
  onUploaded: (path: string, filename?: string) => void;
  onError?: (errorMessage: string) => void;
  accept?: string;
  label?: string;
  folder?: string;
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
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setStatus(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await uploadFile(formData, folder);
      if (res.success && res.path) {
        onUploaded(res.path, res.filename);
        setStatus({
          type: "success",
          text: `Uploaded: ${res.path}`,
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
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300">
          {label}
        </span>
        {value && (
          <span className="truncate font-mono text-[11px] text-green-700 dark:text-green-400">
            {value}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2.5">
        <input
          type="text"
          readOnly
          value={value}
          placeholder="Select a file to upload..."
          aria-label="Uploaded file path"
          className="w-full rounded-xl border border-slate-300 bg-slate-100 px-3.5 py-2.5 font-mono text-xs text-slate-800 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200"
        />

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-orange-700 disabled:opacity-50 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
        >
          {uploading ? (
            <FileImage className="h-4 w-4 animate-pulse" />
          ) : (
            <Upload className="h-4 w-4" />
          )}
          {uploading ? "Uploading..." : "Choose File"}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {status && (
        <p
          className={`flex items-center gap-1.5 text-xs ${
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
          <span>{status.text}</span>
        </p>
      )}
    </div>
  );
}
