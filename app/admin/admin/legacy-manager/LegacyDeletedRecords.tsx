"use client";

import React, { useMemo, useState, useTransition } from "react";
import { RotateCcw, Search, Trash2 } from "lucide-react";
import type { LegacyWebsite } from "@/db/schema";
import { restoreLegacyWebsiteRecord } from "@/lib/actions/legacy-website";

interface LegacyDeletedRecordsProps {
  records: LegacyWebsite[];
  onSuccess?: (message: string) => void;
  onError?: (message: string) => void;
}

export function LegacyDeletedRecords({
  records,
  onSuccess,
  onError,
}: LegacyDeletedRecordsProps) {
  const [isPending, startTransition] = useTransition();
  const [restoringId, setRestoringId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredRecords = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return records;
    return records.filter((row) => {
      const raw = row as Record<string, unknown>;
      return (
        String(raw.id ?? "")
          .toLowerCase()
          .includes(q) ||
        String(row.category ?? "")
          .toLowerCase()
          .includes(q) ||
        String(row.name ?? "")
          .toLowerCase()
          .includes(q) ||
        String(row.image ?? "")
          .toLowerCase()
          .includes(q) ||
        String(row.company ?? "")
          .toLowerCase()
          .includes(q)
      );
    });
  }, [records, search]);

  const handleRestore = (rawId: unknown) => {
    const strId = String(rawId ?? "").trim();
    if (!strId) return;

    setRestoringId(strId);
    startTransition(async () => {
      try {
        const res = await restoreLegacyWebsiteRecord(strId);
        if (res.ok) {
          onSuccess?.(res.message);
        } else {
          onError?.(res.message);
        }
      } finally {
        setRestoringId(null);
      }
    });
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center dark:border-slate-800">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1 text-xs font-bold tracking-wider text-red-700 uppercase dark:bg-red-500/15 dark:text-red-300">
            <Trash2 className="h-3.5 w-3.5" />
            Deleted Archive ({records.length})
          </span>
          <h2 className="mt-2 text-lg font-extrabold text-slate-900 dark:text-white">
            Soft-Deleted Legacy Records
          </h2>
          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Restore records back to active status (
            <code className="font-mono">deleted = false</code>).
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ID, category, or name..."
            aria-label="Search deleted records"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2 pr-3 pl-9 text-xs text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
          />
        </div>
      </div>

      {filteredRecords.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-10 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-400">
          {records.length === 0
            ? "No soft-deleted records found."
            : `No deleted records matched "${search}".`}
        </div>
      ) : (
        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-xs dark:divide-slate-800">
            <thead className="bg-slate-50 font-bold tracking-wider text-slate-500 uppercase dark:bg-slate-800/60 dark:text-slate-400">
              <tr>
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Attachment</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRecords.map((row, idx) => {
                const raw = row as Record<string, unknown>;
                const rowId = raw.id ?? idx;
                const strId = String(rowId);
                const isRowRestoring = isPending && restoringId === strId;

                return (
                  <tr
                    key={strId}
                    className="transition hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <td className="px-4 py-3 font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {strId}
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
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <button
                        type="button"
                        disabled={isPending}
                        onClick={() => handleRestore(rowId)}
                        className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-green-700 px-3 py-1.5 font-semibold text-white shadow-xs transition hover:bg-green-800 disabled:opacity-50 dark:bg-green-500 dark:text-slate-950 dark:hover:bg-green-400"
                      >
                        <RotateCcw
                          className={`h-3.5 w-3.5 ${isRowRestoring ? "animate-spin" : ""}`}
                        />
                        {isRowRestoring ? "Restoring..." : "Restore"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
