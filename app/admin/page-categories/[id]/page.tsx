"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ChevronDown, Loader2, Lock, Save, Tags, Trash2 } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getUserAllowedScopes, type ScopeConfig } from "@/lib/actions/configs";
import {
  getPageCategoryById,
  createPageCategory,
  deletePageCategory,
  updatePageCategory,
} from "@/lib/actions/admin/page-categories/page-categories";
import { CategoryUiLayoutSelector } from "./CategoryUiLayoutSelector";

export default function AdminPageCategoryEditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id ?? "new";
  const isNew = id === "new";

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [note, setNote] = useState("");
  const [scope, setScope] = useState("university");
  const [uiLayout, setUiLayout] = useState("list");
  const [singleEntry, setSingleEntry] = useState(false);
  const [permanent, setPermanent] = useState(false);
  const [entryCount, setEntryCount] = useState(0);
  const [scopes, setScopes] = useState<ScopeConfig[]>([]);

  const [field1Label, setField1Label] = useState("");
  const [field2Label, setField2Label] = useState("");
  const [field3Label, setField3Label] = useState("");
  const [field4Label, setField4Label] = useState("");
  const [field5Label, setField5Label] = useState("");
  const [file1Label, setFile1Label] = useState("");
  const [file2Label, setFile2Label] = useState("");
  const [link1Label, setLink1Label] = useState("");
  const [link2Label, setLink2Label] = useState("");
  const [labelsOpen, setLabelsOpen] = useState(false);

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
        setUiLayout(data.uiLayout || "list");
        setSingleEntry(Boolean(data.singleEntry));
        setPermanent(data.permanent);
        setEntryCount(data.entryCount);

        setField1Label(data.field1Label);
        setField2Label(data.field2Label);
        setField3Label(data.field3Label);
        setField4Label(data.field4Label);
        setField5Label(data.field5Label);
        setFile1Label(data.file1Label);
        setFile2Label(data.file2Label);
        setLink1Label(data.link1Label);
        setLink2Label(data.link2Label);

        const hasAnyCustomLabel = Boolean(
          data.field1Label ||
          data.field2Label ||
          data.field3Label ||
          data.field4Label ||
          data.field5Label ||
          data.file1Label ||
          data.file2Label ||
          data.link1Label ||
          data.link2Label,
        );
        setLabelsOpen(hasAnyCustomLabel);
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

  const canDelete = !isNew && !permanent && entryCount === 0;

  const configuredLabelCount = [
    field1Label,
    field2Label,
    field3Label,
    field4Label,
    field5Label,
    file1Label,
    file2Label,
    link1Label,
    link2Label,
  ].filter((v) => v.trim().length > 0).length;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSaving || isDeleting) return;

    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      const labelPayload = {
        field1Label,
        field2Label,
        field3Label,
        field4Label,
        field5Label,
        file1Label,
        file2Label,
        link1Label,
        link2Label,
      };

      if (isNew) {
        await createPageCategory({
          name,
          code,
          note,
          scope,
          singleEntry,
          uiLayout,
          ...labelPayload,
        });
        router.push("/admin/page-categories");
        return;
      }

      await updatePageCategory({
        id,
        name,
        code,
        note,
        singleEntry,
        uiLayout,
        ...labelPayload,
      });
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

  const fieldLabelInputs: Array<{
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
  }> = [
    {
      id: "cat-field1-label",
      label: "Field 1 Label",
      placeholder: "e.g. Title / Name / Course",
      value: field1Label,
      onChange: setField1Label,
    },
    {
      id: "cat-field2-label",
      label: "Field 2 Label",
      placeholder: "e.g. Designation / Duration",
      value: field2Label,
      onChange: setField2Label,
    },
    {
      id: "cat-field3-label",
      label: "Field 3 Label",
      placeholder: "e.g. Qualification / Date",
      value: field3Label,
      onChange: setField3Label,
    },
    {
      id: "cat-field4-label",
      label: "Field 4 Label",
      placeholder: "e.g. Email / Session",
      value: field4Label,
      onChange: setField4Label,
    },
    {
      id: "cat-field5-label",
      label: "Field 5 Label",
      placeholder: "e.g. Remarks / Office",
      value: field5Label,
      onChange: setField5Label,
    },
  ];

  const assetLabelInputs: Array<{
    id: string;
    label: string;
    placeholder: string;
    value: string;
    onChange: (val: string) => void;
  }> = [
    {
      id: "cat-file1-label",
      label: "File 1 Button Label",
      placeholder: "e.g. Download Syllabus",
      value: file1Label,
      onChange: setFile1Label,
    },
    {
      id: "cat-file2-label",
      label: "File 2 Button Label",
      placeholder: "e.g. Annexure / Notice PDF",
      value: file2Label,
      onChange: setFile2Label,
    },
    {
      id: "cat-link1-label",
      label: "Link 1 Button Label",
      placeholder: "e.g. Apply Online / Profile",
      value: link1Label,
      onChange: setLink1Label,
    },
    {
      id: "cat-link2-label",
      label: "Link 2 Button Label",
      placeholder: "e.g. Reference Portal",
      value: link2Label,
      onChange: setLink2Label,
    },
  ];

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
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-[var(--color-primary)] focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-[var(--color-primary-dark)]"
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
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 font-mono text-xs font-medium text-slate-900 focus:border-[var(--color-primary)] focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-[var(--color-primary-dark)]"
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
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-[var(--color-primary)] focus:bg-white focus:outline-none disabled:opacity-60 sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-[var(--color-primary-dark)]"
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
              className="h-4 w-4 accent-[var(--color-primary)]"
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
              placeholder="Optional guidance or instructions for editors..."
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-[var(--color-primary)] focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-[var(--color-primary-dark)]"
            />
          </div>

          {/* Collapsible Optional Field & Button Labels */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 dark:border-slate-800 dark:bg-slate-950/40">
            <button
              type="button"
              onClick={() => setLabelsOpen((prev) => !prev)}
              aria-expanded={labelsOpen}
              className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-slate-100/70 dark:hover:bg-slate-900/70"
            >
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)]/15 dark:text-[var(--color-secondary-dark)]">
                  <Tags className="h-3.5 w-3.5" />
                </span>
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    Field Labels
                  </span>
                  <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                    Rename Field 1–5, File 1–2, and Link 1–2 in the editor and
                    public tables/cards. Leave blank for defaults.
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {configuredLabelCount > 0 && (
                  <span className="rounded-full bg-[var(--color-secondary)]/10 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)]/15 dark:text-[var(--color-secondary-dark)]">
                    {configuredLabelCount} set
                  </span>
                )}
                <ChevronDown
                  className={`h-4 w-4 text-slate-500 transition-transform ${
                    labelsOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </button>

            {labelsOpen && (
              <div className="space-y-4 border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
                <div>
                  <p className="mb-2.5 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                    Text Fields (Field 1 – Field 5)
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {fieldLabelInputs.map((item) => (
                      <div key={item.id} className="space-y-1">
                        <label
                          htmlFor={item.id}
                          className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300"
                        >
                          {item.label}
                        </label>
                        <input
                          id={item.id}
                          type="text"
                          value={item.value}
                          onChange={(e) => item.onChange(e.target.value)}
                          placeholder={item.placeholder}
                          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-900 focus:border-[var(--color-primary)] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-[var(--color-primary-dark)]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2.5 text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                    Files & Links (File 1–2, Link 1–2)
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {assetLabelInputs.map((item) => (
                      <div key={item.id} className="space-y-1">
                        <label
                          htmlFor={item.id}
                          className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300"
                        >
                          {item.label}
                        </label>
                        <input
                          id={item.id}
                          type="text"
                          value={item.value}
                          onChange={(e) => item.onChange(e.target.value)}
                          placeholder={item.placeholder}
                          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-900 focus:border-[var(--color-primary)] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-[var(--color-primary-dark)]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <CategoryUiLayoutSelector
            value={uiLayout}
            onSelect={(s) => setUiLayout(s)}
            catName={name}
            catScope={scope}
            catNote={note}
            catLabels={{
              field1Label,
              field2Label,
              field3Label,
              field4Label,
              field5Label,
              file1Label,
              file2Label,
              link1Label,
              link2Label,
            }}
          />

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
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-5 py-2.5 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-50 dark:bg-[var(--color-primary-dark)] dark:text-slate-950"
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
