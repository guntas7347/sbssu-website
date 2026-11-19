"use client";

import React, { useEffect, useState, useTransition } from "react";
import {
  Images,
  Plus,
  Trash2,
  X,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { Uploader } from "@/components/Uploader";
import {
  getGalleryByCategory,
  createGalleryItem,
  deleteGalleryItem,
} from "@/lib/actions/gallery";
import type { GalleryItem } from "@/db/schema";
import { gallery_categories } from "@/constants/categories";

interface GalleryFormValues {
  srNo: string;
  category: string;
  title: string;
  desc: string;
  path: string;
  createdBy: string;
}

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    gallery_categories[0],
  );
  const [categoryInput, setCategoryInput] = useState<string>(
    gallery_categories[0],
  );
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [isSubmitting, startTransition] = useTransition();

  const [banner, setBanner] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const { form, handleChange, resetFormFields, setFields } =
    useForm<GalleryFormValues>({
      srNo: "",
      category: gallery_categories[0],
      title: "",
      desc: "",
      path: "",
      createdBy: "",
    });

  async function loadCategoryItems(cat: string) {
    setLoading(true);
    try {
      const data = await getGalleryByCategory(cat);
      setItems(data);
    } catch (err) {
      setBanner({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to load gallery.",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadCategoryItems(selectedCategory);
  }, [selectedCategory]);

  function openCreateModal() {
    setBanner(null);
    resetFormFields();
    setFields({ category: selectedCategory });
    setIsModalOpen(true);
  }

  function closeCreateModal() {
    if (isSubmitting) return;
    setIsModalOpen(false);
  }

  function handleCategorySwitch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = categoryInput.trim();
    if (!trimmed) return;
    setSelectedCategory(trimmed);
  }

  function handleCreateSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBanner(null);

    if (!form.path.trim()) {
      setBanner({
        type: "error",
        text: "Please upload a file before saving the gallery item.",
      });
      return;
    }

    startTransition(async () => {
      const targetCat = form.category.trim() || selectedCategory;
      const res = await createGalleryItem({
        srNo: form.srNo,
        category: targetCat,
        title: form.title,
        desc: form.desc,
        path: form.path,
        createdBy: form.createdBy,
      });

      if (res.ok) {
        setBanner({ type: "success", text: res.message });
        setIsModalOpen(false);
        resetFormFields();
        if (targetCat !== selectedCategory) {
          setCategoryInput(targetCat);
          setSelectedCategory(targetCat);
        } else {
          await loadCategoryItems(selectedCategory);
        }
      } else {
        setBanner({ type: "error", text: res.message });
      }
    });
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this gallery item?")) return;

    setDeletingId(id);
    setBanner(null);

    startTransition(async () => {
      const res = await deleteGalleryItem(id);
      if (res.ok) {
        setBanner({ type: "success", text: res.message });
        setItems((prev) => prev.filter((row) => row.id !== id));
      } else {
        setBanner({ type: "error", text: res.message });
      }
      setDeletingId(null);
    });
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-400/15 dark:text-orange-300">
              <Images className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
              Ordered Media Gallery
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Gallery Manager
            </h1>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Loaded sequentially by <code className="font-mono">Sr. No</code>.
              Reusing an existing Sr. No in a category replaces it.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex cursor-pointer items-center justify-center gap-2 self-start rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-orange-700 sm:self-auto dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
          >
            <Plus className="h-4 w-4" />
            Add Gallery Item
          </button>
        </div>

        {/* Banner */}
        {banner && (
          <div
            role="status"
            className={`flex items-start justify-between gap-3 rounded-xl border p-4 text-sm ${
              banner.type === "success"
                ? "border-green-500/30 bg-green-50 text-green-900 dark:border-green-400/30 dark:bg-green-500/10 dark:text-green-200"
                : "border-red-500/30 bg-red-50 text-red-900 dark:text-red-200"
            }`}
          >
            <div className="flex items-start gap-2.5">
              {banner.type === "success" ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
              )}
              <span>{banner.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setBanner(null)}
              className="cursor-pointer opacity-70 hover:opacity-100"
              aria-label="Dismiss alert"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Category Filter Bar */}
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
          <label
            htmlFor="gallery-category-filter"
            className="text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Category:
          </label>
          <select
            id="gallery-category-filter"
            value={selectedCategory}
            onChange={(e) => {
              const nextCat = e.target.value;
              setCategoryInput(nextCat);
              setSelectedCategory(nextCat);
            }}
            className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 sm:max-w-xs dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          >
            {gallery_categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <span className="text-xs text-slate-500 sm:ml-auto dark:text-slate-400">
            Active: <strong className="font-mono">{selectedCategory}</strong> (
            {items.length} items)
          </span>
        </div>

        {/* Gallery Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
                <tr>
                  <th className="px-4 py-3.5">Sr. No</th>
                  <th className="px-4 py-3.5">Preview</th>
                  <th className="px-4 py-3.5">Title & Description</th>
                  <th className="px-4 py-3.5">Category</th>
                  <th className="px-4 py-3.5">Created By</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {loading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-slate-500 dark:text-slate-400"
                    >
                      Loading gallery items...
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-10 text-center text-slate-500 dark:text-slate-400"
                    >
                      No items in category “{selectedCategory}”.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr
                      key={item.id}
                      className="transition hover:bg-orange-50/40 dark:hover:bg-orange-500/5"
                    >
                      <td className="px-4 py-3.5 font-mono text-sm font-bold text-orange-600 dark:text-orange-400">
                        #{item.srNo}
                      </td>
                      <td className="px-4 py-3.5">
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative block h-14 w-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"
                        >
                          <img
                            src={item.path}
                            alt={item.title || `Gallery item ${item.srNo}`}
                            className="h-full w-full object-cover"
                          />
                        </a>
                      </td>
                      <td className="max-w-sm px-4 py-3.5">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {item.title || (
                            <span className="italic text-slate-400">
                              Untitled
                            </span>
                          )}
                        </div>
                        {item.desc && (
                          <p className="mt-0.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                            {item.desc}
                          </p>
                        )}
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-flex items-center gap-1 font-mono text-[11px] text-green-700 hover:underline dark:text-green-400"
                        >
                          {item.path}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                      <td className="px-4 py-3.5">
                        <span className="rounded-md bg-slate-100 px-2.5 py-1 font-mono text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-4 py-3.5 text-xs text-slate-600 dark:text-slate-400">
                        {item.createdBy || "—"}
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">
                        <button
                          type="button"
                          disabled={isSubmitting && deletingId === item.id}
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-red-600/10 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-600 hover:text-white disabled:opacity-50 dark:text-red-300"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {deletingId === item.id ? "Deleting..." : "Delete"}
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

      {/* Create Gallery Item Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-gallery-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          onClick={closeCreateModal}
        >
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <h2
                  id="create-gallery-modal-title"
                  className="text-lg font-bold text-slate-900 dark:text-white"
                >
                  Add Gallery Item
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Entering an existing Sr. No in the same category replaces that
                  entry.
                </p>
              </div>
              <button
                type="button"
                onClick={closeCreateModal}
                className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="mt-5 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="form-srNo"
                    className="mb-1 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
                  >
                    Sr. No (Optional)
                  </label>
                  <input
                    id="form-srNo"
                    name="srNo"
                    type="number"
                    min="1"
                    value={form.srNo}
                    onChange={handleChange}
                    placeholder="Auto next if empty"
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="form-category"
                    className="mb-1 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
                  >
                    Category *
                  </label>
                  <select
                    id="form-category"
                    name="category"
                    required
                    value={form.category || gallery_categories[0] || ""}
                    onChange={handleChange}
                    className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                  >
                    {gallery_categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <Uploader
                value={form.path}
                onUploaded={(uploadedPath) => setFields({ path: uploadedPath })}
                onError={(msg) => setBanner({ type: "error", text: msg })}
                folder="gallery"
              />

              <div>
                <label
                  htmlFor="form-title"
                  className="mb-1 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
                >
                  Title (Optional)
                </label>
                <input
                  id="form-title"
                  name="title"
                  type="text"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Optional title"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div>
                <label
                  htmlFor="form-desc"
                  className="mb-1 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
                >
                  Description (Optional)
                </label>
                <textarea
                  id="form-desc"
                  name="desc"
                  rows={3}
                  value={form.desc}
                  onChange={handleChange}
                  placeholder="Optional description"
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={closeCreateModal}
                  className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-green-700 px-5 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-green-800 disabled:opacity-50 dark:bg-green-500 dark:text-slate-950 dark:hover:bg-green-400"
                >
                  {isSubmitting ? "Saving..." : "Save Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
