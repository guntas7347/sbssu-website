"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Plus,
  Trash2,
  X,
  FileText,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { Uploader } from "@/components/Uploader";
import {
  getAllowedNoticeLevels,
  notice_categories,
} from "@/constants/categories";
import { getNotices, createNotice, deleteNotice } from "@/lib/actions/notices";
import type { Notice } from "@/db/schema";
import { useCurrentUser } from "@/hooks/useCurrentUser";

interface NoticeFormValues {
  title: string;
  refNumber: string;
  category: string;
  level: string;
  description: string;
  file: string;
}

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [banner, setBanner] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const { currentUser, loading: loadingUser, refresh } = useCurrentUser();

  const allowedNoticeLevels = getAllowedNoticeLevels(currentUser?.rights);

  const { form, handleChange, resetFormFields, setFields } =
    useForm<NoticeFormValues>({
      title: "",
      refNumber: "",
      category: notice_categories[0] ?? "",
      level: allowedNoticeLevels[0] ?? "",
      description: "",
      file: "",
    });

  async function loadNotices() {
    setLoading(true);
    try {
      const rows = await getNotices();
      setNotices(rows);
    } catch (err) {
      setBanner({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to load notices.",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadNotices();
  }, []);

  function openModal() {
    setBanner(null);
    resetFormFields();
    setFields({
      category: notice_categories[0] ?? "",
      level: allowedNoticeLevels[0] ?? "",
    });
    setModalOpen(true);
  }

  function closeModal() {
    if (isPending) return;
    setModalOpen(false);
  }

  function handleCreate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBanner(null);

    startTransition(async () => {
      const res = await createNotice({
        title: form.title,
        refNumber: form.refNumber,
        category: form.category,
        level: form.level,
        description: form.description,
        file: form.file,
      });

      if (res.ok) {
        setBanner({ type: "success", text: res.message });
        setModalOpen(false);
        resetFormFields();
        await loadNotices();
      } else {
        setBanner({ type: "error", text: res.message });
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this notice?")) return;
    setDeletingId(id);
    setBanner(null);

    startTransition(async () => {
      const res = await deleteNotice(id);
      if (res.ok) {
        setBanner({ type: "success", text: res.message });
        setNotices((prev) => prev.filter((n) => n.id !== id));
      } else {
        setBanner({ type: "error", text: res.message });
      }
      setDeletingId(null);
    });
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-900 sm:px-6 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-6xl space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-5 py-4 dark:border-slate-800 dark:bg-slate-900">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Notices
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {notices.length} active{" "}
              {notices.length === 1 ? "notice" : "notices"}
            </p>
          </div>

          <button
            type="button"
            onClick={openModal}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
          >
            <Plus className="h-4 w-4" />
            New Notice
          </button>
        </div>

        {/* Banner */}
        {banner && (
          <div
            role="status"
            className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-xs font-medium ${
              banner.type === "success"
                ? "border-green-500/30 bg-green-50 text-green-900 dark:border-green-400/30 dark:bg-green-500/10 dark:text-green-200"
                : "border-red-500/30 bg-red-50 text-red-900 dark:text-red-200"
            }`}
          >
            <span className="flex items-center gap-2">
              {banner.type === "success" ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
              )}
              {banner.text}
            </span>
            <button
              type="button"
              onClick={() => setBanner(null)}
              className="cursor-pointer opacity-70 hover:opacity-100"
              aria-label="Dismiss"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 font-semibold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3">Ref #</th>
                  <th className="px-4 py-3">Notice</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Level</th>
                  <th className="px-4 py-3">File</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Delete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-slate-500 dark:text-slate-400"
                    >
                      Loading notices...
                    </td>
                  </tr>
                ) : notices.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-slate-500 dark:text-slate-400"
                    >
                      No notices found.
                    </td>
                  </tr>
                ) : (
                  notices.map((notice) => (
                    <tr
                      key={notice.id}
                      className="transition hover:bg-orange-50/40 dark:hover:bg-orange-500/5"
                    >
                      <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-400">
                        {notice.refNumber || "—"}
                      </td>
                      <td className="max-w-md px-4 py-3">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {notice.title}
                        </div>
                        {notice.description && (
                          <div className="mt-0.5 line-clamp-1 text-slate-500 dark:text-slate-400">
                            {notice.description}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {notice.category ? (
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                            {notice.category}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {notice.level ? (
                          <span className="rounded-full bg-green-50 px-2.5 py-0.5 font-semibold text-green-800 dark:bg-green-500/15 dark:text-green-300">
                            {notice.level}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {notice.file ? (
                          <a
                            href={notice.file}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-orange-600 hover:underline dark:text-orange-400"
                          >
                            <FileText className="h-3.5 w-3.5" />
                            Open
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500 dark:text-slate-400">
                        {new Date(notice.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          disabled={isPending && deletingId === notice.id}
                          onClick={() => handleDelete(notice.id)}
                          className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-red-600/10 px-2.5 py-1 font-semibold text-red-700 transition hover:bg-red-600 hover:text-white disabled:opacity-50 dark:text-red-300"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {deletingId === notice.id ? "..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Notice Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-notice-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          onClick={closeModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-5 shadow-xl dark:border-slate-800 dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h2
                id="create-notice-title"
                className="text-base font-bold text-slate-900 dark:text-white"
              >
                Create Notice
              </h2>
              <button
                type="button"
                onClick={closeModal}
                className="cursor-pointer rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Close modal"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-3.5 text-xs">
              <div>
                <label
                  htmlFor="notice-title"
                  className="mb-1 block font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
                >
                  Title *
                </label>
                <input
                  id="notice-title"
                  name="title"
                  type="text"
                  required
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Notice heading"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div>
                  <label
                    htmlFor="notice-ref"
                    className="mb-1 block font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
                  >
                    Ref Number
                  </label>
                  <input
                    id="notice-ref"
                    name="refNumber"
                    type="text"
                    value={form.refNumber}
                    onChange={handleChange}
                    placeholder="e.g. SBSSU/2026/01"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="notice-category"
                    className="mb-1 block font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
                  >
                    Category
                  </label>
                  <select
                    id="notice-category"
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    {notice_categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="notice-level"
                    className="mb-1 block font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
                  >
                    Level
                  </label>
                  <select
                    id="notice-level"
                    name="level"
                    value={form.level}
                    onChange={handleChange}
                    className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    {allowedNoticeLevels.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Uploader
                folder="notices"
                accept="image/*,application/pdf"
                label="Attachment (PDF / Image)"
                value={form.file}
                onUploaded={(uploadedPath) => setFields({ file: uploadedPath })}
                onError={(msg) => setBanner({ type: "error", text: msg })}
              />

              <div>
                <label
                  htmlFor="notice-desc"
                  className="mb-1 block font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
                >
                  Description
                </label>
                <textarea
                  id="notice-desc"
                  name="description"
                  rows={3}
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Optional details..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={closeModal}
                  className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="cursor-pointer rounded-xl bg-green-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-green-800 disabled:opacity-50 dark:bg-green-500 dark:text-slate-950 dark:hover:bg-green-400"
                >
                  {isPending ? "Saving..." : "Save Notice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
