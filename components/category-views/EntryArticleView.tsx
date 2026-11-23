import Link from "next/link";
import { Calendar, ExternalLink, FileText, Globe, Link2 } from "lucide-react";
import {
  normalizeEntries,
  type CategoryViewMeta,
  type RawCategoryEntry,
} from "./entry-view-helpers";

interface EntryArticleViewProps {
  entries: RawCategoryEntry[];
  category?: CategoryViewMeta | null;
  deptCode?: string | null;
  emptyMessage?: string;
}

export function EntryArticleView({
  entries,
  category,
  deptCode,
  emptyMessage = "No article content available yet.",
}: EntryArticleViewProps) {
  const items = normalizeEntries(entries, {
    categoryName: category?.name,
    deptCode,
    labels: category,
  });

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500 sm:text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4 dark:border-slate-800">
            <h2 className="text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">
              {item.primaryTitle}
            </h2>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-secondary)]/10 px-3 py-1 text-xs font-semibold text-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)]/15 dark:text-[var(--color-secondary-dark)]">
              <Calendar className="h-3.5 w-3.5" />
              <span>Published {item.formattedDate}</span>
            </span>
          </div>

          {item.previewImageUrl && (
            <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800">
              <img
                src={item.previewImageUrl}
                alt={item.primaryTitle}
                className="max-h-96 w-full object-cover"
              />
            </div>
          )}

          {item.hasAnyFieldValue ? (
            <div className="mt-5 space-y-4">
              {item.allFields.map((field) => (
                <section
                  key={`${item.id}-${field.slot}`}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/50"
                >
                  <h3 className="text-xs font-bold tracking-wider text-[var(--color-primary)] uppercase dark:text-[var(--color-primary-dark)]">
                    {field.defaultLabel}
                  </h3>
                  <p className="mt-1.5 whitespace-pre-line text-xs leading-relaxed text-slate-700 sm:text-sm dark:text-slate-300">
                    {field.isPopulated ? (
                      field.value
                    ) : (
                      <span className="italic text-slate-400 dark:text-slate-600">
                        Not provided
                      </span>
                    )}
                  </p>
                </section>
              ))}
            </div>
          ) : (
            <p className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-500 sm:text-sm dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
              No field content provided for this entry.
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-slate-200 pt-4 dark:border-slate-800">
            {item.customPageHref && (
              <Link
                href={item.customPageHref}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-secondary)] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-[var(--color-secondary-dark)] dark:text-slate-950"
              >
                <Globe className="h-3.5 w-3.5" />
                <span>Open Custom Page</span>
              </Link>
            )}

            {item.files.map((file) => (
              <a
                key={file.key}
                href={file.href}
                target={file.isExternal ? "_blank" : undefined}
                rel={file.isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] px-4 py-2 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-[var(--color-primary-dark)] dark:text-slate-950"
              >
                <FileText className="h-3.5 w-3.5" />
                <span>{file.label}</span>
              </a>
            ))}

            {item.links.map((link) => (
              <a
                key={link.key}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary-dark)]"
              >
                <Link2 className="h-3.5 w-3.5 text-[var(--color-secondary)] dark:text-[var(--color-secondary-dark)]" />
                <span>{link.label}</span>
                {link.isExternal && <ExternalLink className="h-3.5 w-3.5" />}
              </a>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
