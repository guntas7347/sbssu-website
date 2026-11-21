"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Loader2, Lock, Save, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getUserAllowedScopes, type ScopeConfig } from "@/lib/actions/configs";
import {
  getPageCategoryById,
  createPageCategory,
  deletePageCategory,
  updatePageCategory,
} from "@/lib/actions/admin/page-categories/page-categories";

export default function AdminPageCategoryEditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id ?? "new";
  const isNew = id === "new";

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [note, setNote] = useState("");
  const [scope, setScope] = useState("university");
  const [singleEntry, setSingleEntry] = useState(false);
  const [permanent, setPermanent] = useState(false);
  const [departmentCode, setDepartmentCode] = useState<string | null>(null);
  const [entryCount, setEntryCount] = useState(0);
  const [scopes, setScopes] = useState<ScopeConfig[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        setIsLoading(true);
        setError(null);
        const [data, scopeList] = await Promise.all([
          getPageCategoryById(id),
          getUserAllowedScopes(),
        ]);
        if (!active) return;

        setScopes(scopeList);
        setName(data.name);
        setCode(data.code);
        setNote(data.note);
        setScope(data.scope || "university");
        setSingleEntry(Boolean(data.singleEntry));
        setPermanent(data.permanent);
        setDepartmentCode(data.departmentCode);
        setEntryCount(data.entryCount);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Failed to load category.",
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
  }, [id]);

  const slug = code
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-_]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const canDelete = !isNew && !permanent && entryCount === 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSaving || isDeleting) return;

    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      if (isNew) {
        await createPageCategory({ name, code, note, scope, singleEntry });
        router.push("/admin/page-categories");
        return;
      }

      await updatePageCategory({ id, name, code, note, singleEntry });
      setSuccess("Category updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save category.");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!canDelete || isDeleting || isSaving) return;
    if (!window.confirm(`Delete category "${name || code}"?`)) return;

    try {
      setIsDeleting(true);
      setError(null);
      await deletePageCategory(id);
      router.push("/admin/page-categories");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete category.",
      );
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="SBSSU Admin Portal"
        title={isNew ? "New Page Category" : "Edit Page Category"}
        description={
          isNew
            ? "Create a new page category and URL route code."
            : "Update category details."
        }
        backHref="/admin/page-categories"
        backLabel="Back to Page Categories"
      />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-xs font-medium text-green-700 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-300">
          {success}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-xs text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Loading category...
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
        >
          {!isNew && (
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>
                {entryCount} linked {entryCount === 1 ? "entry" : "entries"}
              </span>
              {permanent && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                  <Lock className="h-3 w-3" />
                  Permanent
                </span>
              )}
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-1.5">
              <label
                htmlFor="cat-name"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="cat-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Syllabus"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-orange-500 focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="cat-code"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Code / Slug <span className="text-red-500">*</span>
              </label>
              <input
                id="cat-code"
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.trim())}
                placeholder="e.g. syllabus"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 font-mono text-xs font-medium text-slate-900 focus:border-orange-500 focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="cat-scope"
                className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Scope
              </label>
              <select
                id="cat-scope"
                disabled={!isNew}
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-orange-500 focus:bg-white focus:outline-none disabled:opacity-60 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
              >
                {scopes.map((item) => (
                  <option key={item.key} value={item.key}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/50">
            <div>
              <label
                htmlFor="cat-single-entry"
                className="block text-xs font-semibold text-slate-800 dark:text-slate-200"
              >
                Single Entry Only
              </label>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Warn editors in the UI if an entry already exists.
              </p>
            </div>
            <input
              id="cat-single-entry"
              type="checkbox"
              checked={singleEntry}
              onChange={(e) => setSingleEntry(e.target.checked)}
              className="h-4 w-4 accent-orange-600"
            />
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="cat-note"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Editor Note
            </label>
            <textarea
              id="cat-note"
              rows={3}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Optional guidance for editors..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-orange-500 focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
            <div>
              {!isNew && (
                <button
                  type="button"
                  disabled={!canDelete || isDeleting || isSaving}
                  onClick={handleDelete}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-45 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
                >
                  {isDeleting ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Trash2 className="h-3.5 w-3.5" />
                  )}
                  <span>Delete</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={isSaving || isDeleting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-700 disabled:opacity-50 dark:bg-orange-500 dark:text-slate-950"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{isNew ? "Create Category" : "Save Changes"}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
