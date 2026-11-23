import Link from "next/link";
import { Calendar, ExternalLink, FileText, Globe, Link2 } from "lucide-react";
import {
  normalizeEntries,
  type CategoryViewMeta,
  type RawCategoryEntry,
} from "./entry-view-helpers";

interface EntryListViewProps {
  entries: RawCategoryEntry[];
  category?: CategoryViewMeta | null;
  deptCode?: string | null;
  emptyMessage?: string;
}

export function EntryListView({
  entries,
  category,
  deptCode,
  emptyMessage = "No entries available yet.",
}: EntryListViewProps) {
  const items = normalizeEntries(entries, category, deptCode);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500 sm:text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-3.5">
      {items.map((item) => (
        <article
          key={item.id}
          className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs transition hover:border-[var(--color-primary)]/50 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-[var(--color-primary-dark)]/50"
        >
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
            <div className="min-w-0 flex-1 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {item.primaryTitle}
                </h3>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-secondary)]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)]/15 dark:text-[var(--color-secondary-dark)]">
                  <Calendar className="h-3 w-3" />
                  <span>{item.formattedDate}</span>
                </span>
              </div>

              {item.hasAnyFieldValue ? (
                <dl className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {item.allFields.map((field) => (
                    <div
                      key={`${item.id}-${field.slot}`}
                      className="rounded-xl border border-slate-200/80 bg-slate-50/80 px-3 py-2 dark:border-slate-800 dark:bg-slate-950/60"
                    >
                      <dt className="text-[10px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                        {field.label}
                      </dt>
                      <dd className="mt-0.5 whitespace-pre-line text-xs text-slate-800 dark:text-slate-200">
                        {field.isPopulated ? (
                          field.value
                        ) : (
                          <span className="italic text-slate-400 dark:text-slate-500">
                            Not provided
                          </span>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-950/50 dark:text-slate-400">
                  No structured field details provided for this entry.
                </p>
              )}
            </div>

            <div className="flex shrink-0 flex-wrap items-center gap-2 lg:max-w-xs lg:justify-end">
              {item.customPageHref && (
                <Link
                  href={item.customPageHref}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-secondary)] px-3.5 py-2 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-[var(--color-secondary-dark)] dark:text-slate-950"
                >
                  <Globe className="h-3.5 w-3.5" />
                  <span>Custom Page</span>
                </Link>
              )}

              {item.files.map((file) => (
                <a
                  key={file.key}
                  href={file.href}
                  target={file.isExternal ? "_blank" : undefined}
                  rel={file.isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] px-3.5 py-2 text-xs font-semibold text-white transition hover:opacity-90 dark:bg-[var(--color-primary-dark)] dark:text-slate-950"
                >
                  <FileText className="h-3.5 w-3.5" />
                  <span>{file.label}</span>
                  {file.isExternal && <ExternalLink className="h-3 w-3" />}
                </a>
              ))}

              {item.links.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary-dark)]"
                >
                  <Link2 className="h-3.5 w-3.5 text-[var(--color-secondary)] dark:text-[var(--color-secondary-dark)]" />
                  <span>{link.label}</span>
                  {link.isExternal && <ExternalLink className="h-3 w-3" />}
                </a>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
