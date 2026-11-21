"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, FolderOpen, Globe, Loader2, Send } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Uploader } from "@/components/Uploader";
import {
  createNotice,
  getNoticeCreateContext,
  type NoticeCreateFormContext,
} from "@/lib/actions/notices";

export default function NewNoticePage() {
  const router = useRouter();

  const [ctx, setCtx] = useState<NoticeCreateFormContext | null>(null);
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [refNumber, setRefNumber] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const loaded = await getNoticeCreateContext();
        if (!active) return;

        setCtx(loaded);
        setLevel(loaded.allowedLevels[0] ?? "");
        setCategory(loaded.categories[0] ?? "");
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load notice permissions.",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, []);

  const uploadFolder =
    level === "department" && ctx?.userDepartmentCode
      ? `notices/${ctx.userDepartmentCode.trim().toLowerCase()}`
      : `notices/${(level || "general").trim().toLowerCase()}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      setError(null);

      await createNotice({
        title,
        description,
        refNumber,
        level,
        category,
        file,
      });

      router.push("/admin/notices");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to publish notice.",
      );
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="SBSSU Admin Portal"
        title="Publish New Notice"
        description="Create a new circular or announcement. Notices cannot be edited once published—delete and re-upload if a correction is needed."
        backHref="/admin/notices"
        backLabel="Back to Notices"
      />

      {isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-xs text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Loading notice form...
        </div>
      ) : !ctx ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error || "Unable to load notice form."}
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
        >
          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
              {error}
            </div>
          )}

          {/* 1. Level Selection */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/40">
            <div>
              <h2 className="text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-200">
                1. Notice Audience / Level
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                Available levels based on your account rights.
              </p>
            </div>

            <div className="flex flex-wrap gap-2.5">
              {ctx.allowedLevels.map((lvl) => {
                const isSelected = level === lvl;
                const isDept = lvl === "department";

                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setLevel(lvl)}
                    className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold capitalize transition ${
                      isSelected
                        ? isDept
                          ? "border-orange-600 bg-orange-600 text-white dark:border-orange-500 dark:bg-orange-500 dark:text-slate-950"
                          : "border-green-600 bg-green-600 text-white dark:border-green-500 dark:bg-green-500 dark:text-slate-950"
                        : "border-slate-300 bg-white text-slate-700 hover:border-orange-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                    }`}
                  >
                    {isDept ? (
                      <Building2 className="h-4 w-4" />
                    ) : (
                      <Globe className="h-4 w-4" />
                    )}
                    <span>
                      {isDept && ctx.userDepartmentCode
                        ? `Department (${ctx.userDepartmentCode.toUpperCase()})`
                        : lvl}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Notice Details */}
          <div className="space-y-5 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/40">
            <h2 className="text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-200">
              2. Notice Details
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label
                  htmlFor="notice-category"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="notice-category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-orange-500 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400"
                >
                  <option value="">— Select Category —</option>
                  {ctx.categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="notice-ref"
                  className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  Reference Number
                </label>
                <input
                  id="notice-ref"
                  type="text"
                  value={refNumber}
                  onChange={(e) => setRefNumber(e.target.value)}
                  placeholder="e.g. SBSSU/REG/2026/142"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="notice-title"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="notice-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Date Sheet for End Semester Examinations Nov/Dec 2026"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="notice-desc"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Description
              </label>
              <textarea
                id="notice-desc"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional summary or instructions for students/staff..."
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400"
              />
            </div>
          </div>

          {/* 3. Attachment Upload */}
          <div className="space-y-3 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-950/40">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-200">
                3. Notice Document / Attachment
              </h2>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                <FolderOpen className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                <span>Folder: {uploadFolder}</span>
              </span>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-3.5 dark:border-slate-800 dark:bg-slate-900">
              <Uploader
                value={file}
                onUploaded={(uploadedPath) => setFile(uploadedPath)}
                onError={(msg) => setError(msg)}
                accept="*/*"
                label="Upload Notice PDF / Image"
                folder={uploadFolder}
              />
              <input
                type="text"
                value={file}
                onChange={(e) => setFile(e.target.value)}
                placeholder="Uploaded file path or external document URL"
                className="mt-2.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-xs text-slate-700 focus:border-orange-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:focus:border-orange-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-end border-t border-slate-200 pt-5 dark:border-slate-800">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
            >
              {isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span>Publish Notice</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
