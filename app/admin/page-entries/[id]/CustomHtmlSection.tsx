"use client";

import { useMemo, useState } from "react";
import { Code2, Eye, FileCode2 } from "lucide-react";
import { sanitizeHtmlClient } from "@/lib/sanitize-html";
import { HtmlPromptCopyBox } from "./HtmlPromptCopyBox";

interface CustomHtmlSectionProps {
  isCustomPage: boolean;
  onToggleCustomPage: (checked: boolean) => void;
  slug: string;
  onSlugChange: (value: string) => void;
  htmlContent: string;
  onHtmlContentChange: (value: string) => void;
  htmlPath: string;
  deptCode: string | null;
}

export function CustomHtmlSection({
  isCustomPage,
  onToggleCustomPage,
  slug,
  onSlugChange,
  htmlContent,
  onHtmlContentChange,
  htmlPath,
  deptCode,
}: CustomHtmlSectionProps) {
  const [showPreview, setShowPreview] = useState(true);

  const sanitizedPreview = useMemo(
    () => sanitizeHtmlClient(htmlContent),
    [htmlContent],
  );

  const normalizedSlug = slug
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const routeHint = normalizedSlug
    ? deptCode
      ? `/departments/${deptCode.toLowerCase()}/custom-pages/${normalizedSlug}`
      : `/custom-pages/${normalizedSlug}`
    : null;

  return (
    <div
      className={`space-y-4 rounded-2xl border p-4 transition sm:p-5 ${
        isCustomPage
          ? "border-green-600/40 bg-green-50/40 dark:border-green-500/35 dark:bg-green-950/20"
          : "border-slate-200 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-950/40"
      }`}
    >
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-200">
            <Code2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span>2. Custom HTML Page Option</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Leave unchecked for a normal list/table entry. Check it to publish a
            standalone custom HTML page with a slug.
          </p>
        </div>

        <label className="inline-flex cursor-pointer items-center gap-2.5 self-start rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 shadow-2xs transition hover:border-green-600 sm:self-auto dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-green-500">
          <input
            type="checkbox"
            checked={isCustomPage}
            onChange={(e) => onToggleCustomPage(e.target.checked)}
            className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
          />
          <span>Make this a Custom HTML Page</span>
        </label>
      </div>

      {isCustomPage && (
        <div className="space-y-4 border-t border-slate-200/80 pt-4 dark:border-slate-800">
          <div className="space-y-1.5">
            <label
              htmlFor="entry-slug"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300"
            >
              Custom Page Slug <span className="text-red-500">*</span>
            </label>
            <input
              id="entry-slug"
              type="text"
              required={isCustomPage}
              value={slug}
              onChange={(e) => onSlugChange(e.target.value)}
              placeholder="e.g. nba-sar-2026 or annual-tech-fest"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-green-600 focus:outline-none sm:max-w-md sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-green-500"
            />
            {routeHint && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Custom URL:{" "}
                <code className="font-mono font-semibold text-green-700 dark:text-green-400">
                  {routeHint}
                </code>
              </p>
            )}
          </div>

          <HtmlPromptCopyBox />

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <label
                htmlFor="entry-html-content"
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                <FileCode2 className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                <span>
                  Paste HTML Content{" "}
                  {!htmlPath && <span className="text-red-500">*</span>}
                </span>
              </label>

              <button
                type="button"
                onClick={() => setShowPreview((prev) => !prev)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
              >
                <Eye className="h-3 w-3" />
                <span>
                  {showPreview ? "Hide Preview" : "Show Sanitized Preview"}
                </span>
              </button>
            </div>

            <textarea
              id="entry-html-content"
              rows={8}
              value={htmlContent}
              onChange={(e) => onHtmlContentChange(e.target.value)}
              placeholder={
                htmlPath
                  ? `Saved file: ${htmlPath} — paste new HTML here only if you want to overwrite the saved file.`
                  : "Paste your HTML snippet or markup here..."
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400"
            />

            {htmlPath && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Current saved file:{" "}
                <code className="font-mono text-slate-700 dark:text-slate-300">
                  {htmlPath}
                </code>
              </p>
            )}
          </div>

          {showPreview && (
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Sanitized Live Preview
              </div>
              <div className="min-h-24 rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-800 sm:text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200">
                {sanitizedPreview ? (
                  <div
                    className="max-w-none space-y-2 [&_a]:text-orange-600 [&_a]:underline [&_h1]:text-xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:font-bold [&_h3]:text-base [&_h3]:font-semibold [&_li]:ml-5 [&_li]:list-disc [&_p]:leading-relaxed [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-slate-300 [&_td]:p-2 [&_th]:border [&_th]:border-slate-300 [&_th]:bg-slate-100 [&_th]:p-2 dark:[&_td]:border-slate-700 dark:[&_th]:border-slate-700 dark:[&_th]:bg-slate-800"
                    dangerouslySetInnerHTML={{ __html: sanitizedPreview }}
                  />
                ) : (
                  <p className="text-xs text-slate-400">
                    Paste HTML above to preview sanitized output.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
