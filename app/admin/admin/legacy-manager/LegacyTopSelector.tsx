"use client";

import React from "react";
import { Layers } from "lucide-react";
import type { ParsedLegacyOption } from "@/constants/legacy-select-options";

interface LegacyTopSelectorProps {
  options: ParsedLegacyOption[];
  selectedIndex: number;
  onSelectChange: (nextIndex: number) => void;
  disabled?: boolean;
}

export function LegacyTopSelector({
  options,
  selectedIndex,
  onSelectChange,
  disabled = false,
}: LegacyTopSelectorProps) {
  const activeOption = options[selectedIndex] ?? options[0];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label
          htmlFor="legacy-target-select"
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-orange-500/15 text-orange-600 dark:bg-orange-400/15 dark:text-orange-400">
            <Layers className="h-4 w-4" />
          </span>
          Select Legacy Target
        </label>

        <div className="w-full sm:max-w-md">
          <select
            id="legacy-target-select"
            value={String(selectedIndex)}
            disabled={disabled || options.length === 0}
            onChange={(e) => onSelectChange(Number(e.target.value))}
            className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-orange-400 dark:focus:ring-orange-400/20"
          >
            {options.map((opt, idx) => (
              <option key={`${opt.mode}-${opt.id}-${idx}`} value={String(idx)}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {activeOption && (
        <p className="mt-2.5 text-xs text-slate-500 dark:text-slate-400">
          Active mapping:{" "}
          <span className="font-semibold text-green-700 dark:text-green-400">
            {activeOption.mode}
          </span>{" "}
          • ID{" "}
          <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
            {activeOption.id}
          </span>
        </p>
      )}
    </div>
  );
}
