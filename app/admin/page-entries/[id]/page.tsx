"use client";

import React, { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { getCurrentUser } from "@/lib/actions/auth";
import {
  createPageEntry,
  getPageEntryById,
  updatePageEntry,
} from "@/lib/actions/page-entries";
import {
  findCategoryByNumber,
  getAllowedPageCategories,
  type CurrentUserLike,
} from "@/constants/page-categories";
import {
  GenericEntryFields,
  type GenericAttachmentMode,
  type GenericFieldsValues,
} from "./GenericEntryFields";

interface EditorFormState extends GenericFieldsValues {
  title: string;
}

const INITIAL_FORM: EditorFormState = {
  title: "",
  category: "",
  srNo: "1",
  desc: "",
  attachmentMode: "file",
  file: "",
  link: "",
  slug: "",
  rawHtml: "",
};

export default function PageEntryEditorPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const rawId = params?.id ?? "new";
  const isEditing = rawId !== "new";

  const [currentUser, setCurrentUser] = useState<CurrentUserLike | null>(null);
  const [loadingPage, setLoadingPage] = useState<boolean>(true);
  const [notFoundRecord, setNotFoundRecord] = useState<boolean>(false);
  const [banner, setBanner] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [isPending, startTransition] = useTransition();

  const { form, handleChange, setFields } =
    useForm<EditorFormState>(INITIAL_FORM);

  useEffect(() => {
    let active = true;
    setLoadingPage(true);
    setNotFoundRecord(false);

    void Promise.all([
      getCurrentUser().catch(() => null),
      isEditing ? getPageEntryById(rawId) : Promise.resolve(null),
    ])
      .then(([user, entry]) => {
        if (!active) return;

        setCurrentUser(user as CurrentUserLike | null);

        if (isEditing) {
          if (!entry) {
            setNotFoundRecord(true);
            setLoadingPage(false);
            return;
          }

          const initialMode: GenericAttachmentMode =
            entry.type === "custom"
              ? "html"
              : entry.file
                ? "file"
                : entry.link
                  ? "link"
                  : "file";

          setFields({
            title: entry.title ?? "",
            category:
              entry.category ??
              (entry.type === "custom"
                ? entry.scope === "department"
                  ? "901"
                  : "900"
                : ""),
            srNo: String(entry.srNo ?? 1),
            desc: entry.desc ?? "",
            attachmentMode: initialMode,
            file: entry.file ?? "",
            link: entry.link ?? "",
            slug: entry.slug ?? "",
            rawHtml: "",
          });
        }

        setLoadingPage(false);
      })
      .catch((err) => {
        if (!active) return;
        setBanner({
          type: "error",
          text:
            err instanceof Error ? err.message : "Failed to initialize page.",
        });
        setLoadingPage(false);
      });

    return () => {
      active = false;
    };
  }, [rawId, isEditing, setFields]);

  if (!currentUser) return null;

  const rights = currentUser.rights ?? [];
  const hasAdmin = rights.includes("admin");
  const hasHod = rights.includes("hod");

  const hasBothRights = hasAdmin && hasHod;

  const allowedCategories = getAllowedPageCategories(currentUser);
  const selectedCategory = findCategoryByNumber(form.category);

  const isDeptScope = selectedCategory
    ? hasBothRights
      ? selectedCategory.level === "dept"
      : hasHod
        ? true
        : false
    : hasHod && !hasAdmin;

  const isScopeLocked = !hasBothRights && (hasAdmin || hasHod);

  const resolvedDeptId =
    currentUser?.departmentId ?? currentUser?.department?.id ?? null;
  const resolvedDeptName =
    currentUser?.departmentName ?? currentUser?.department?.name ?? null;
  const resolvedDeptCode =
    currentUser?.departmentCode ?? currentUser?.department?.code ?? null;

  const deptLabel = resolvedDeptName || "Department";

  const scopeLabel = hasBothRights
    ? `University Wide & ${deptLabel}`
    : isDeptScope
      ? deptLabel
      : "University Wide";

  // Optional: if your getAllowedPageCategories already filters by rights, keep it;
  // otherwise filter when locked to a single role:
  const filteredCategories = hasBothRights
    ? allowedCategories
    : isDeptScope
      ? allowedCategories.filter((c) => c.level === "dept")
      : allowedCategories.filter((c) => c.level !== "dept");

  function handleSelectCategory(categoryNumber: string) {
    const picked = findCategoryByNumber(categoryNumber);
    if (picked?.isCustomPage) {
      setFields({
        category: categoryNumber,
        attachmentMode: "html",
        file: "",
        link: "",
      });
      return;
    }
    setFields({ category: categoryNumber });
  }

  function handleSwitchAttachmentMode(mode: GenericAttachmentMode) {
    if (mode === "file") {
      setFields({ attachmentMode: "file", link: "", rawHtml: "" });
    } else if (mode === "link") {
      setFields({ attachmentMode: "link", file: "", rawHtml: "" });
    } else {
      setFields({ attachmentMode: "html", file: "", link: "" });
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBanner(null);

    if (!form.category.trim()) {
      setBanner({ type: "error", text: "Please select a category." });
      return;
    }

    const isCustomPage = Boolean(selectedCategory?.isCustomPage);
    const usesHtml = isCustomPage || form.attachmentMode === "html";

    if (isCustomPage && !form.slug.trim()) {
      setBanner({ type: "error", text: "Slug is required for a Custom Page." });
      return;
    }

    if (usesHtml && !form.rawHtml.trim() && !isEditing) {
      setBanner({
        type: "error",
        text: "Please paste HTML content to generate the page.",
      });
      return;
    }

    startTransition(async () => {
      const payload = {
        type: (usesHtml ? "custom" : "generic") as "custom" | "generic",
        title: form.title,
        category: form.category,
        srNo: Number(form.srNo || 1),
        desc: form.desc,
        file: !usesHtml && form.attachmentMode === "file" ? form.file : null,
        link: !usesHtml && form.attachmentMode === "link" ? form.link : null,
        slug: usesHtml ? form.slug : null,
        rawHtml: usesHtml ? form.rawHtml : null,
        scope: (isDeptScope ? "department" : "university") as
          | "department"
          | "university",
        departmentId: isDeptScope ? resolvedDeptId : null,
      };

      const res = isEditing
        ? await updatePageEntry({ id: rawId, ...payload })
        : await createPageEntry(payload);

      if (!res.ok) {
        setBanner({ type: "error", text: res.message });
        return;
      }

      setBanner({ type: "success", text: res.message });
      router.push("/admin/page-entries");
      router.refresh();
    });
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
          <div>
            <Link
              href="/admin/page-entries"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 transition hover:text-orange-600 dark:text-slate-400 dark:hover:text-orange-400"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back to Page Entries
            </Link>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {isEditing ? "Edit Page Entry" : "Create Page Entry"}
            </h1>
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600/10 px-3 py-1 text-xs font-bold text-green-700 dark:bg-green-500/15 dark:text-green-400">
            <ShieldCheck className="h-3.5 w-3.5" />
            {scopeLabel}
          </span>
        </div>

        {banner && (
          <div
            role="status"
            className={`flex items-center gap-2 rounded-xl border p-4 text-xs font-medium ${
              banner.type === "success"
                ? "border-green-500/30 bg-green-50 text-green-900 dark:border-green-400/30 dark:bg-green-500/10 dark:text-green-200"
                : "border-red-500/30 bg-red-50 text-red-900 dark:text-red-200"
            }`}
          >
            {banner.type === "success" ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle className="h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
            )}
            <span>{banner.text}</span>
          </div>
        )}

        {loadingPage ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Loading...
          </div>
        ) : notFoundRecord ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
            Entry not found.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 text-xs shadow-xs dark:border-slate-800 dark:bg-slate-900"
          >
            <div>
              <label
                htmlFor="entry-title"
                className="mb-1 block text-[11px] font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
              >
                Title *
              </label>
              <input
                id="entry-title"
                name="title"
                type="text"
                required
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. B.Tech Odd Sem Timetable"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-sm text-slate-900 outline-none focus:border-orange-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <GenericEntryFields
              pageTitle={form.title}
              allowedCategories={filteredCategories}
              selectedCategory={selectedCategory}
              scopeLabel={scopeLabel}
              isDeptScope={isDeptScope}
              deptCode={resolvedDeptCode}
              values={{
                category: form.category,
                srNo: form.srNo,
                desc: form.desc,
                attachmentMode: form.attachmentMode,
                file: form.file,
                link: form.link,
                slug: form.slug,
                rawHtml: form.rawHtml,
              }}
              onChange={handleChange}
              onSelectCategory={handleSelectCategory}
              onSwitchAttachmentMode={handleSwitchAttachmentMode}
              onFileUploaded={(filePath) => setFields({ file: filePath })}
              onUploadError={(msg) => setBanner({ type: "error", text: msg })}
            />

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
              <Link
                href="/admin/page-entries"
                className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={isPending}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-orange-600 px-5 py-2 text-xs font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
              >
                <Save className="h-3.5 w-3.5" />
                {isPending
                  ? "Saving..."
                  : isEditing
                    ? "Save Changes"
                    : "Create Entry"}
              </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
