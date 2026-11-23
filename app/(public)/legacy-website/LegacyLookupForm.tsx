"use client";

import { LEGACY_SELECT_OPTIONS } from "@/constants/legacy-select-options";
import { useState } from "react";

export type LegacyLookupMode = "record" | "category" | "auto";

const CUSTOM_OPTION_VALUE = "__custom__";

interface LegacyLookupFormProps {
  defaultId?: string;
  defaultMode?: string;
}

export function LegacyLookupForm({
  defaultId = "",
  defaultMode,
}: LegacyLookupFormProps) {
  const matchedIndex = LEGACY_SELECT_OPTIONS.findIndex(
    ([, presetId, presetMode]) =>
      String(presetId) === defaultId &&
      (!defaultMode || defaultMode === presetMode),
  );

  const [selectedValue, setSelectedValue] = useState<string>(
    matchedIndex >= 0 ? String(matchedIndex) : CUSTOM_OPTION_VALUE,
  );
  const [customId, setCustomId] = useState<string>(
    matchedIndex >= 0 ? "" : defaultId,
  );
  const [customMode, setCustomMode] = useState<string>(defaultMode ?? "");

  const isCustom = selectedValue === CUSTOM_OPTION_VALUE;
  const activePreset = !isCustom
    ? LEGACY_SELECT_OPTIONS[Number(selectedValue)]
    : undefined;

  const submittedId = activePreset ? String(activePreset[1]) : customId;
  const submittedMode = activePreset ? activePreset[2] : customMode;

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextVal = e.target.value;
    setSelectedValue(nextVal);

    if (nextVal !== CUSTOM_OPTION_VALUE) {
      const tuple = LEGACY_SELECT_OPTIONS[Number(nextVal)];
      if (tuple) {
        setCustomId(String(tuple[1]));
        setCustomMode(tuple[2]);
      }
    }
  };

  return (
    <form method="GET" className="mt-6 space-y-4">
      <div>
        <label
          htmlFor="legacyPreset"
          className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
        >
          Select Archived Page or Category
        </label>

        <select
          id="legacyPreset"
          value={selectedValue}
          onChange={handleSelectChange}
          className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-primary-dark dark:focus:ring-primary-dark/20"
        >
          {LEGACY_SELECT_OPTIONS.map(([label, presetId, presetMode], idx) => (
            <option
              key={`${presetId}-${presetMode}-${idx}`}
              value={String(idx)}
            >
              {label} (#{presetId} · {presetMode})
            </option>
          ))}
          <option value={CUSTOM_OPTION_VALUE}>
            Other (enter custom number)
          </option>
        </select>
      </div>

      {isCustom && (
        <div>
          <label
            htmlFor="Id"
            className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200"
          >
            Legacy Website ID
          </label>

          <input
            id="Id"
            name="Id"
            type="number"
            min="0"
            required
            value={customId}
            onChange={(e) => setCustomId(e.target.value)}
            placeholder="e.g. 1150"
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-primary-dark dark:focus:ring-primary-dark/20"
          />
        </div>
      )}

      {!isCustom && <input type="hidden" name="Id" value={submittedId} />}
      {submittedMode && (
        <input type="hidden" name="mode" value={submittedMode} />
      )}

      <button
        type="submit"
        className="w-full cursor-pointer rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-95 dark:bg-primary-dark"
      >
        View Legacy Content
      </button>
    </form>
  );
}
