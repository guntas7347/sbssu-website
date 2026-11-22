"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Trash2 } from "lucide-react";
import { createPageEntry } from "@/lib/actions/admin/page-entries/createPageEntry";
import { deletePageEntry } from "@/lib/actions/admin/page-entries/deletePageEntry";
import {
  getPageEntryForEditor,
  type CategoryChoice,
  type PageEntryEditorData,
} from "@/lib/actions/admin/page-entries/getPageEntryForEditor";
import { updatePageEntry } from "@/lib/actions/admin/page-entries/updatePageEntry";
import { AssetsSection } from "./AssetsSection";
import { CategoryScopeSelector } from "./CategoryScopeSelector";
import { CustomHtmlSection } from "./CustomHtmlSection";

interface PageEntryEditorFormProps {
  entryId: string;
}

export function PageEntryEditorForm({ entryId }: PageEntryEditorFormProps) {
  const router = useRouter();
  const isNew = entryId === "new";

  const [data, setData] = useState<PageEntryEditorData | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [displayOrder, setDisplayOrder] = useState(0);
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");
  const [field4, setField4] = useState("");
  const [field5, setField5] = useState("");
  const [file1, setFile1] = useState("");
  const [file2, setFile2] = useState("");
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [isCustomPage, setIsCustomPage] = useState(false);
  const [slug, setSlug] = useState("");
  const [htmlContent, setHtmlContent] = useState("");
  const [isSingleEntryBlocked, setIsSingleEntryBlocked] = useState(false);

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
        const loaded = await getPageEntryForEditor(entryId);
        if (!active) return;

        setData(loaded);
        setDisplayOrder(loaded.displayOrder ?? 0);
        setField1(loaded.field1 ?? "");
        setField2(loaded.field2 ?? "");
        setField3(loaded.field3 ?? "");
        setField4(loaded.field4 ?? "");
        setField5(loaded.field5 ?? "");
        setFile1(loaded.file1 ?? "");
        setFile2(loaded.file2 ?? "");
        setLink1(loaded.link1 ?? "");
        setLink2(loaded.link2 ?? "");
        setSlug(loaded.slug ?? "");
        setHtmlContent(loaded.htmlContent ?? "");
        setIsCustomPage(Boolean(loaded.slug || loaded.htmlContent));
        setSelectedCategoryId(loaded.pageCategoryId);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Failed to load page entry.",
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
  }, [entryId]);

  function handleSelectCategory(cat: CategoryChoice) {
    if (!isNew) return;
    setSelectedCategoryId(cat.id);
  }

  const activeCategory =
    data?.categories.find((c) => c.id === selectedCategoryId) ?? null;

  const effectiveDeptCode =
    activeCategory?.departmentCode ?? data?.departmentCode ?? null;

  const effectiveScope = activeCategory?.scope || "university";

  const uploadFolder = effectiveDeptCode
    ? `pages/${effectiveDeptCode.trim().toLowerCase()}`
    : `pages/${effectiveScope.trim().toLowerCase()}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSaving || isDeleting) return;
    if (isNew && isSingleEntryBlocked) return;

    try {
      setIsSaving(true);
      setError(null);
      setSuccess(null);

      if (isNew) {
        await createPageEntry({
          pageCategoryId: selectedCategoryId,
          displayOrder,
          field1,
          field2,
          field3,
          field4,
          field5,
          file1,
          file2,
          link1,
          link2,
          isCustomPage,
          slug,
          htmlContent,
        });
        router.push("/admin/page-entries");
        return;
      }

      await updatePageEntry({
        id: entryId,
        field1,
        field2,
        field3,
        field4,
        field5,
        file1,
        file2,
        link1,
        link2,
        isCustomPage,
        slug,
        htmlContent,
      });

      setSuccess("Page entry saved.");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to save page entry.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (isNew || isDeleting || isSaving) return;

    const label = field1 || entryId;
    const confirmed = window.confirm(
      `Delete entry "${label}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      setError(null);
      await deletePageEntry(entryId);
      router.push("/admin/page-entries");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete page entry.",
      );
      setIsDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-xs text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        Loading page entry editor...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
        {error || "Unable to load editor."}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
    >
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

      <CategoryScopeSelector
        selectedCategoryId={selectedCategoryId}
        onSelectCategory={handleSelectCategory}
        categories={data.categories}
        isNewEntry={isNew}
        onSingleEntryBlockedChange={setIsSingleEntryBlocked}
      />

      <CustomHtmlSection
        isCustomPage={isCustomPage}
        onToggleCustomPage={setIsCustomPage}
        slug={slug}
        onSlugChange={setSlug}
        htmlContent={htmlContent}
        onHtmlContentChange={setHtmlContent}
        deptCode={effectiveDeptCode}
      />

      <AssetsSection
        displayOrder={displayOrder}
        onDisplayOrderChange={setDisplayOrder}
        field1={field1}
        onField1Change={setField1}
        field2={field2}
        onField2Change={setField2}
        field3={field3}
        onField3Change={setField3}
        field4={field4}
        onField4Change={setField4}
        field5={field5}
        onField5Change={setField5}
        file1={file1}
        onFile1Change={setFile1}
        file2={file2}
        onFile2Change={setFile2}
        link1={link1}
        onLink1Change={setLink1}
        link2={link2}
        onLink2Change={setLink2}
        categoryNote={activeCategory?.note}
        uploadFolder={uploadFolder}
        onUploadError={(msg) => setError(msg)}
      />

      <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <div>
          {!isNew && (
            <button
              type="button"
              disabled={isDeleting || isSaving}
              onClick={handleDelete}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-300 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-45 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300 dark:hover:bg-red-950/70"
            >
              {isDeleting ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Trash2 className="h-3.5 w-3.5" />
              )}
              <span>Delete Entry</span>
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={isSaving || isDeleting || (isNew && isSingleEntryBlocked)}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
        >
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          <span>{isNew ? "Create Entry" : "Save Changes"}</span>
        </button>
      </div>
    </form>
  );
}
