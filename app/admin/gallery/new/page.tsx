"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  FolderKanban,
  Globe,
  Loader2,
  Lock,
  PlusCircle,
  Tag,
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Uploader } from "@/components/Uploader";
import {
  createGalleryItem,
  getGalleryCreateContext,
  type GalleryCreateContext,
} from "@/lib/actions/gallery";

export default function NewGalleryItemPage() {
  const router = useRouter();

  const [ctx, setCtx] = useState<GalleryCreateContext | null>(null);
  const [loadingCtx, setLoadingCtx] = useState(true);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [album, setAlbum] = useState("");
  const [category, setCategory] = useState("");
  const [path, setPath] = useState("");
  const [scope, setScope] = useState<"university" | "department">("university");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function init() {
      try {
        setLoadingCtx(true);
        setError(null);
        const context = await getGalleryCreateContext();
        if (!active) return;

        setCtx(context);

        if (context.allowedCategories.length > 0) {
          setCategory(context.allowedCategories[0]);
        }

        if (context.isHod && !context.isAdmin) {
          setScope("department");
        } else {
          setScope("university");
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to initialize gallery form.",
          );
        }
      } finally {
        if (active) {
          setLoadingCtx(false);
        }
      }
    }

    void init();
    return () => {
      active = false;
    };
  }, []);

  const allowedCategories = ctx?.allowedCategories ?? [];
  const isCategoryLocked = allowedCategories.length === 1;
  const canChooseScope = Boolean(
    ctx?.isAdmin && ctx?.isHod && ctx?.departmentId,
  );

  const uploadFolder =
    scope === "department" && ctx?.departmentId
      ? `gallery/departments/${ctx.departmentId}/${album.trim() || "general"}`
      : `gallery/university/${album.trim() || "general"}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const cleanAlbum = album.trim();
    const cleanPath = path.trim();
    const cleanCategory = category.trim();

    if (!cleanCategory) {
      setError("Category is required.");
      return;
    }
    if (!cleanAlbum) {
      setError("Album name is required.");
      return;
    }
    if (!cleanPath) {
      setError("Please upload a file or enter a media URL.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      await createGalleryItem({
        title: title.trim() || null,
        desc: desc.trim() || null,
        album: cleanAlbum,
        category: cleanCategory,
        path: cleanPath,
        scope,
      });

      router.push("/admin/gallery");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create gallery item.",
      );
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="SBSSU Admin Portal · Create Only"
        title="Add Gallery Item"
        description="Publish a new photo or media entry into a gallery album."
        backHref="/admin/gallery"
        backLabel="Back to Gallery"
      />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {loadingCtx ? (
        <div className="flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white p-10 text-xs text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <Loader2 className="h-4 w-4 animate-spin text-orange-600 dark:text-orange-400" />
          <span>Loading permissions...</span>
        </div>
      ) : allowedCategories.length === 0 ? (
        <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-xs font-medium text-amber-800 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300">
          No gallery categories are permitted for your account.
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
        >
          {/* Scope Selector when user has both admin + hod with a department */}
          {canChooseScope && (
            <div className="space-y-2">
              <span className="text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                Publishing Scope
              </span>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setScope("university")}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-xs font-semibold transition ${
                    scope === "university"
                      ? "border-green-600 bg-green-600/10 text-green-800 dark:border-green-500 dark:bg-green-500/15 dark:text-green-300"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
                  }`}
                >
                  <Globe className="h-4 w-4" />
                  <span>University-Wide</span>
                </button>

                <button
                  type="button"
                  onClick={() => setScope("department")}
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-xs font-semibold transition ${
                    scope === "department"
                      ? "border-orange-600 bg-orange-600/10 text-orange-800 dark:border-orange-500 dark:bg-orange-500/15 dark:text-orange-300"
                      : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
                  }`}
                >
                  <Building2 className="h-4 w-4" />
                  <span>Own Department</span>
                </button>
              </div>
            </div>
          )}

          {/* Category (Locked if single, selectable if multiple) & Album */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="gallery-category"
                  className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
                >
                  <Tag className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                  <span>Category</span>
                </label>
                {isCategoryLocked && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    <Lock className="h-3 w-3" />
                    <span>Locked</span>
                  </span>
                )}
              </div>

              {isCategoryLocked ? (
                <input
                  id="gallery-category"
                  type="text"
                  readOnly
                  value={allowedCategories[0]}
                  className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 font-mono text-xs font-semibold text-slate-700 outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                />
              ) : (
                <select
                  id="gallery-category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-orange-500 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-orange-400"
                >
                  {allowedCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="gallery-album"
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
              >
                <FolderKanban className="h-3.5 w-3.5 text-green-700 dark:text-green-400" />
                <span>Album Name *</span>
              </label>
              <input
                id="gallery-album"
                type="text"
                required
                value={album}
                onChange={(e) => setAlbum(e.target.value)}
                placeholder="e.g., convocation-2026 or ai-lab"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-xs text-slate-900 placeholder:font-sans placeholder:text-slate-400 focus:border-orange-500 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-orange-400"
              />
            </div>
          </div>

          {/* Title & Description */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label
                htmlFor="gallery-title"
                className="text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
              >
                Title
              </label>
              <input
                id="gallery-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Optional display title"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-orange-400"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="gallery-desc"
                className="text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
              >
                Description
              </label>
              <input
                id="gallery-desc"
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Optional caption or notes"
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:focus:border-orange-400"
              />
            </div>
          </div>

          {/* Uploader */}
          <Uploader
            label="Gallery Image / Media *"
            accept="image/*"
            folder={uploadFolder}
            value={path}
            onUploaded={(uploadedPath) => setPath(uploadedPath)}
            onError={(msg) => setError(msg)}
          />

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-5 dark:border-slate-800">
            <button
              type="button"
              disabled={submitting}
              onClick={() => router.push("/admin/gallery")}
              className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <PlusCircle className="h-4 w-4" />
              )}
              <span>{submitting ? "Creating..." : "Create Gallery Item"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
