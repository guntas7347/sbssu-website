"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, Check, RotateCcw, Save } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import {
  getPageEntries,
  type AdminPageEntryItem,
} from "@/lib/actions/admin/page-entries/getPageEntries";
import { updatePageEntriesOrder } from "@/lib/actions/admin/page-entries/updatePageEntriesOrder";

interface CategoryOption {
  key: string;
  label: string;
}

function formatSummary(item: AdminPageEntryItem): string {
  const rest = [item.field2, item.field3, item.field4, item.field5]
    .map((v) => v?.trim())
    .filter((v): v is string => Boolean(v))
    .join(" | ");
  return rest ? `${item.field1 || ""} — ${rest}` : item.field1 || "Untitled";
}

export default function ReorderPageEntriesPage() {
  const [entries, setEntries] = useState<AdminPageEntryItem[]>([]);
  const [selectedGroupKey, setSelectedGroupKey] = useState<string>("");
  const [orderMap, setOrderMap] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setMessage(null);
      const data = await getPageEntries({ page: 1, pageSize: 200 });
      setEntries(data.items);

      const initialOrders: Record<string, number> = {};
      for (const row of data.items) {
        initialOrders[row.id] = row.displayOrder ?? 0;
      }
      setOrderMap(initialOrders);
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to load entries.",
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const categoryOptions = useMemo<CategoryOption[]>(() => {
    const map = new Map<string, CategoryOption>();
    for (const item of entries) {
      const key = `${item.pageCategoryId}::${item.departmentId ?? "global"}`;
      if (!map.has(key)) {
        const deptTag = item.departmentCode
          ? ` (${item.departmentCode.toUpperCase()})`
          : "";
        map.set(key, {
          key,
          label: `${item.categoryCode} — ${item.categoryName}${deptTag}`,
        });
      }
    }
    return Array.from(map.values());
  }, [entries]);

  useEffect(() => {
    if (!selectedGroupKey && categoryOptions.length > 0) {
      setSelectedGroupKey(categoryOptions[0].key);
    }
  }, [categoryOptions, selectedGroupKey]);

  const groupEntries = useMemo(() => {
    const filtered = entries.filter(
      (item) =>
        `${item.pageCategoryId}::${item.departmentId ?? "global"}` ===
        selectedGroupKey,
    );

    return [...filtered].sort((a, b) => {
      const orderA = orderMap[a.id] ?? a.displayOrder ?? 0;
      const orderB = orderMap[b.id] ?? b.displayOrder ?? 0;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
  }, [entries, selectedGroupKey, orderMap]);

  const hasChanges = useMemo(() => {
    return groupEntries.some(
      (item) => (orderMap[item.id] ?? 0) !== (item.displayOrder ?? 0),
    );
  }, [groupEntries, orderMap]);

  function setEntryOrder(id: string, value: number) {
    setOrderMap((prev) => ({ ...prev, [id]: value }));
  }

  function moveRow(index: number, direction: -1 | 1) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= groupEntries.length) return;

    const reordered = [...groupEntries];
    const [moved] = reordered.splice(index, 1);
    reordered.splice(targetIndex, 0, moved);

    // Assign clean step increments (10, 20, 30...) while respecting the new order
    setOrderMap((prev) => {
      const next = { ...prev };
      reordered.forEach((row, idx) => {
        next[row.id] = (idx + 1) * 10;
      });
      return next;
    });
  }

  function resetGroupOrder() {
    setOrderMap((prev) => {
      const next = { ...prev };
      for (const row of groupEntries) {
        next[row.id] = row.displayOrder ?? 0;
      }
      return next;
    });
    setMessage(null);
  }

  async function handleSave() {
    const changed = groupEntries
      .filter((row) => (orderMap[row.id] ?? 0) !== (row.displayOrder ?? 0))
      .map((row) => ({
        id: row.id,
        displayOrder: orderMap[row.id] ?? 0,
      }));

    if (changed.length === 0) return;

    try {
      setIsSaving(true);
      setMessage(null);
      await updatePageEntriesOrder(changed);
      await loadData();
      setMessage({
        type: "success",
        text: `Updated order for ${changed.length} ${changed.length === 1 ? "entry" : "entries"}.`,
      });
    } catch (err) {
      setMessage({
        type: "error",
        text: err instanceof Error ? err.message : "Failed to save order.",
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="SBSSU Admin Portal"
        title="Reorder Page Entries"
        description="Set display order numbers or move entries up and down within a category."
        backHref="/admin/page-entries"
        backLabel="Back to Page Entries"
      />

      {message && (
        <div
          className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-medium ${
            message.type === "success"
              ? "border-green-300 bg-green-50 text-green-800 dark:border-green-900/60 dark:bg-green-950/40 dark:text-green-300"
              : "border-red-200 bg-red-50 text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300"
          }`}
        >
          {message.type === "success" && <Check className="h-4 w-4 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-1 flex-col gap-1 sm:max-w-md">
          <label
            htmlFor="category-select"
            className="text-[11px] font-bold tracking-wider text-slate-500 uppercase dark:text-slate-400"
          >
            Category
          </label>
          <select
            id="category-select"
            value={selectedGroupKey}
            onChange={(e) => {
              setSelectedGroupKey(e.target.value);
              setMessage(null);
            }}
            disabled={isLoading || categoryOptions.length === 0}
            className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-900 focus:border-orange-500 focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
          >
            {categoryOptions.map((opt) => (
              <option key={opt.key} value={opt.key}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetGroupOrder}
            disabled={!hasChanges || isSaving}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-40 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>Reset</span>
          </button>

          <button
            type="button"
            onClick={() => void handleSave()}
            disabled={!hasChanges || isSaving}
            className="inline-flex items-center gap-1.5 rounded-xl bg-orange-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-700 disabled:opacity-40 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
          >
            <Save className="h-3.5 w-3.5" />
            <span>{isSaving ? "Saving..." : "Save Order"}</span>
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        {isLoading ? (
          <div className="p-10 text-center text-xs text-slate-500 dark:text-slate-400">
            Loading entries...
          </div>
        ) : groupEntries.length === 0 ? (
          <div className="p-10 text-center text-xs text-slate-500 dark:text-slate-400">
            No entries found for this category.
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {groupEntries.map((row, idx) => {
              const currentOrder = orderMap[row.id] ?? row.displayOrder ?? 0;

              return (
                <div
                  key={row.id}
                  className="flex flex-col justify-between gap-3 px-5 py-3.5 sm:flex-row sm:items-center"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="w-6 shrink-0 font-mono text-xs font-semibold text-slate-400">
                      {idx + 1}
                    </span>
                    <p className="truncate text-xs font-semibold text-slate-900 sm:text-sm dark:text-white">
                      {formatSummary(row)}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => moveRow(idx, -1)}
                        disabled={idx === 0 || isSaving}
                        aria-label="Move up"
                        className="rounded-lg border border-slate-300 bg-white p-1.5 text-slate-700 transition hover:border-orange-500 hover:text-orange-600 disabled:opacity-30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      >
                        <ArrowUp className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveRow(idx, 1)}
                        disabled={idx === groupEntries.length - 1 || isSaving}
                        aria-label="Move down"
                        className="rounded-lg border border-slate-300 bg-white p-1.5 text-slate-700 transition hover:border-orange-500 hover:text-orange-600 disabled:opacity-30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      >
                        <ArrowDown className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <input
                      type="number"
                      value={currentOrder}
                      onChange={(e) =>
                        setEntryOrder(row.id, Number(e.target.value) || 0)
                      }
                      aria-label="Display order"
                      className="w-20 rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-1.5 text-right font-mono text-xs font-semibold text-slate-900 focus:border-orange-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
