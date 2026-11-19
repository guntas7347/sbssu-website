"use client";

import React, { useTransition } from "react";
import { Trash2 } from "lucide-react";
import type { LegacyWebsite } from "@/db/schema";
import { removeLegacyWebsiteRecord } from "@/lib/actions/legacy-website";

interface LegacyRecordsTableProps {
  records: LegacyWebsite[];
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

export function LegacyRecordsTable({
  records,
  onSuccess,
  onError,
}: LegacyRecordsTableProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: unknown) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this record?",
    );

    if (!confirmed) return;
    const strId = String(id ?? "");
    startTransition(async () => {
      const res = await removeLegacyWebsiteRecord(strId);
      if (res.ok) {
        onSuccess(res.message);
      } else {
        onError(res.message);
      }
    });
  };

  if (records.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        No records found for this selection.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-left text-xs dark:divide-slate-800">
          <thead className="bg-slate-50 font-bold tracking-wider text-slate-500 uppercase dark:bg-slate-800/60 dark:text-slate-400">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Attachment</th>
              <th className="px-4 py-3">Approve</th>
              <th className="px-4 py-3 text-right">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {records.map((row, idx) => {
              const raw = row as Record<string, unknown>;
              const rowId = raw.id ?? idx;
              return (
                <tr
                  key={String(rowId)}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <td className="px-4 py-3 font-mono text-slate-800 dark:text-slate-200">
                    {String(rowId)}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-300">
                    {row.category ?? "—"}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 font-semibold text-slate-900 dark:text-white">
                    {row.name || "—"}
                  </td>
                  <td className="max-w-xs truncate px-4 py-3 font-mono text-slate-500 dark:text-slate-400">
                    {row.image || row.company || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                        Boolean(raw.approve)
                          ? "bg-green-50 text-green-700 dark:bg-green-500/15 dark:text-green-400"
                          : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                      }`}
                    >
                      {Boolean(raw.approve) ? "true" : "false"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      type="button"
                      disabled={isPending}
                      onClick={() => handleDelete(rowId)}
                      className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-red-600/10 px-2.5 py-1.5 font-semibold text-red-700 transition hover:bg-red-600 hover:text-white disabled:opacity-50 dark:text-red-300"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
