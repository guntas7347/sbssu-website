"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Eye,
  Trash,
} from "lucide-react";
import type { LegacyWebsite } from "@/db/schema";
import {
  getParsedLegacyOptions,
  resolveLegacyOptionByIdAndMode,
} from "@/constants/legacy-select-options";
import { LegacyTopSelector } from "./LegacyTopSelector";
import { LegacyRecordEditorForm } from "./LegacyRecordEditorForm";
import { LegacyRecordsTable } from "./LegacyRecordsTable";
import { LegacyDeletedRecords } from "./LegacyDeletedRecords";
import type { LegacyManagerTabMode } from "@/lib/actions/legacy-website";

interface LegacyWebsiteManagerProps {
  initialId?: number | null;
  initialMode?: string | null;
  initialTab?: LegacyManagerTabMode;
  recordById?: LegacyWebsite | null;
  records: LegacyWebsite[];
  deletedRecords?: LegacyWebsite[];
}

export function LegacyWebsiteManager({
  initialId,
  initialMode,
  initialTab = "view",
  recordById,
  records,
  deletedRecords = [],
}: LegacyWebsiteManagerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const options = getParsedLegacyOptions();

  const resolvedInitial = resolveLegacyOptionByIdAndMode(
    initialId,
    initialMode,
  );
  const startIndex = Math.max(
    0,
    options.findIndex(
      (o) => o.id === resolvedInitial?.id && o.mode === resolvedInitial?.mode,
    ),
  );

  const [selectedIndex, setSelectedIndex] = useState<number>(startIndex);
  const [tab, setTab] = useState<LegacyManagerTabMode>(
    initialTab === "add" ? "add" : "view",
  );
  const [banner, setBanner] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const activeOption = options[selectedIndex] ?? {
    label: "Default",
    id: 0,
    mode: "category" as const,
  };

  const resolvedRecord =
    recordById ??
    (activeOption.mode === "record" ? (records[0] ?? null) : null);

  const handleSelectChange = (nextIdx: number) => {
    setSelectedIndex(nextIdx);
    setBanner(null);
    const chosen = options[nextIdx];
    if (chosen) {
      const sp = new URLSearchParams();
      sp.set("Id", String(chosen.id));
      sp.set("mode", chosen.mode);
      if (chosen.mode === "category" && tab === "add") {
        sp.set("tab", "add");
      }
      router.replace(`${pathname}?${sp.toString()}`, { scroll: false });
      router.refresh();
    }
  };

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-slate-50 px-4 py-10 text-slate-900 sm:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-5xl space-y-6">
        <LegacyTopSelector
          options={options}
          selectedIndex={selectedIndex}
          onSelectChange={handleSelectChange}
        />

        {activeOption.mode === "category" && (
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-xs dark:border-slate-800 dark:bg-slate-900">
              <button
                type="button"
                onClick={() => setTab("view")}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition ${
                  tab === "view"
                    ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-slate-950"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                <Eye className="h-3.5 w-3.5" />
                Records ({records.length})
              </button>

              <button
                type="button"
                onClick={() => setTab("add")}
                className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition ${
                  tab === "add"
                    ? "bg-green-700 text-white dark:bg-green-500 dark:text-slate-950"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                <PlusCircle className="h-3.5 w-3.5" />
                Add Record
              </button>

              <button
                type="button"
                onClick={() => {
                  window.scrollTo({
                    top: document.documentElement.scrollHeight,
                    behavior: "smooth",
                  });
                }}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-semibold transition text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              >
                <Trash className="h-3.5 w-3.5" />
                Deleted
              </button>
            </div>
          </div>
        )}

        {banner && (
          <div
            role="status"
            className={`flex items-start gap-2.5 rounded-xl border p-4 text-sm ${
              banner.type === "success"
                ? "border-green-500/30 bg-green-50 text-green-900 dark:border-green-400/30 dark:bg-green-500/10 dark:text-green-200"
                : "border-red-500/30 bg-red-50 text-red-900 dark:text-red-200"
            }`}
          >
            {banner.type === "success" ? (
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
            ) : (
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
            )}
            <span>{banner.text}</span>
          </div>
        )}

        {activeOption.mode === "record" ? (
          resolvedRecord ? (
            <LegacyRecordEditorForm
              selectedOption={activeOption}
              existingRecord={resolvedRecord}
              onSuccess={(msg) => {
                setBanner({ type: "success", text: msg });
                router.refresh();
              }}
              onError={(msg) => setBanner({ type: "error", text: msg })}
            />
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
              No active record found for ID #{activeOption.id}.
            </div>
          )
        ) : tab === "add" ? (
          <LegacyRecordEditorForm
            selectedOption={activeOption}
            existingRecord={null}
            onSuccess={(msg) => {
              setBanner({ type: "success", text: msg });
              router.refresh();
            }}
            onError={(msg) => setBanner({ type: "error", text: msg })}
          />
        ) : (
          <LegacyRecordsTable
            records={records}
            onSuccess={(msg) => {
              setBanner({ type: "success", text: msg });
              router.refresh();
            }}
            onError={(msg) => setBanner({ type: "error", text: msg })}
          />
        )}

        <LegacyDeletedRecords
          records={deletedRecords}
          onSuccess={(msg) => {
            setBanner({ type: "success", text: msg });
            router.refresh();
          }}
          onError={(msg) => setBanner({ type: "error", text: msg })}
        />
      </div>
    </main>
  );
}
