import Link from "next/link";
import { Calendar, ExternalLink, FileText, Globe, Link2 } from "lucide-react";
import {
  normalizeEntries,
  parseTableColumnHeaders,
  type CategoryViewMeta,
  type RawCategoryEntry,
} from "./entry-view-helpers";

interface EntryTableViewProps {
  entries: RawCategoryEntry[];
  category?: CategoryViewMeta | null;
  deptCode?: string | null;
  emptyMessage?: string;
}

export function EntryTableView({
  entries,
  category,
  deptCode,
  emptyMessage = "No table records available yet.",
}: EntryTableViewProps) {
  const items = normalizeEntries(entries, {
    categoryName: category?.name,
    deptCode,
    labels: category,
  });
  const headers = parseTableColumnHeaders(category?.note, category);

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-xs text-slate-500 sm:text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-2xs dark:border-slate-800 dark:bg-slate-900">
      <table className="min-w-full divide-y divide-slate-200 text-left text-xs dark:divide-slate-800">
        <thead className="bg-slate-50 text-[11px] font-bold tracking-wider text-slate-600 uppercase dark:bg-slate-950/70 dark:text-slate-300">
          <tr>
            <th className="px-4 py-3 text-[var(--color-primary)] dark:text-[var(--color-primary-dark)]">
              {headers.field1}
            </th>
            <th className="px-4 py-3">{headers.field2}</th>
            <th className="px-4 py-3">{headers.field3}</th>
            <th className="px-4 py-3">{headers.field4}</th>
            <th className="px-4 py-3">{headers.field5}</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3 text-right">Files & Links</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {items.map((item) => {
            const bySlot = new Map(item.allFields.map((f) => [f.slot, f]));

            return (
              <tr
                key={item.id}
                className="align-top transition hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
              >
                {(
                  ["field1", "field2", "field3", "field4", "field5"] as const
                ).map((slot, idx) => {
                  const field = bySlot.get(slot);
                  const text = field?.isPopulated ? field.value : null;

                  return (
                    <td
                      key={`${item.id}-${slot}`}
                      className={`px-4 py-3.5 whitespace-pre-line ${
                        idx === 0
                          ? "font-bold text-slate-900 dark:text-white"
                          : "text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {text ? (
                        text
                      ) : idx === 0 ? (
                        item.primaryTitle
                      ) : (
                        <span className="text-slate-400 dark:text-slate-600">
                          —
                        </span>
                      )}
                    </td>
                  );
                })}

                <td className="px-4 py-3.5 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--color-secondary)]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-secondary)] dark:bg-[var(--color-secondary-dark)]/15 dark:text-[var(--color-secondary-dark)]">
                    <Calendar className="h-3 w-3" />
                    <span>{item.formattedDate}</span>
                  </span>
                </td>

                <td className="px-4 py-3.5 text-right">
                  <div className="inline-flex flex-wrap justify-end gap-1.5">
                    {item.customPageHref && (
                      <Link
                        href={item.customPageHref}
                        className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-secondary)] px-2.5 py-1.5 text-[11px] font-semibold text-white transition hover:opacity-90 dark:bg-[var(--color-secondary-dark)] dark:text-slate-950"
                      >
                        <Globe className="h-3 w-3" />
                        <span>Page</span>
                      </Link>
                    )}

                    {item.files.map((file) => (
                      <a
                        key={file.key}
                        href={file.href}
                        target={file.isExternal ? "_blank" : undefined}
                        rel={
                          file.isExternal ? "noopener noreferrer" : undefined
                        }
                        className="inline-flex items-center gap-1 rounded-lg bg-[var(--color-primary)] px-2.5 py-1.5 text-[11px] font-semibold text-white transition hover:opacity-90 dark:bg-[var(--color-primary-dark)] dark:text-slate-950"
                      >
                        <FileText className="h-3 w-3" />
                        <span>{file.label}</span>
                      </a>
                    ))}

                    {item.links.map((link) => (
                      <a
                        key={link.key}
                        href={link.href}
                        target={link.isExternal ? "_blank" : undefined}
                        rel={
                          link.isExternal ? "noopener noreferrer" : undefined
                        }
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 transition hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-[var(--color-primary-dark)] dark:hover:text-[var(--color-primary-dark)]"
                      >
                        <Link2 className="h-3 w-3 text-[var(--color-secondary)] dark:text-[var(--color-secondary-dark)]" />
                        <span>{link.label}</span>
                        {link.isExternal && (
                          <ExternalLink className="h-3 w-3" />
                        )}
                      </a>
                    ))}

                    {!item.customPageHref &&
                      item.files.length === 0 &&
                      item.links.length === 0 && (
                        <span className="text-slate-400 dark:text-slate-600">
                          —
                        </span>
                      )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
