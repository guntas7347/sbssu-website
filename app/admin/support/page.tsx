"use client";

import { useMemo, useState } from "react";
import { HelpCircle, Search, X } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ADMIN_HELP_ITEMS, AdminHelpCategory } from "@/constants/admin-support";

export default function AdminSupportPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase();

    return ADMIN_HELP_ITEMS.filter((item) => {
      if (selectedCategory !== "All" && item.category !== selectedCategory) {
        return false;
      }

      if (!q) return true;

      return (
        item.question.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.tags.some((tag) => tag.toLowerCase().includes(q)) ||
        (item.steps?.some((step) => step.toLowerCase().includes(q)) ?? false)
      );
    });
  }, [search, selectedCategory]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="SBSSU Admin Portal"
        title="Help & Support"
        description="Quick guides and FAQs for structured fields, custom HTML pages, display ordering, and portal scopes."
        backHref="/admin"
        backLabel="Back to Admin Dashboard"
        actionLabel="Video Guide"
        actionHref="https://www.youtube.com"
      />

      {/* Search & Category Filter */}
      <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs, field1–5, displayOrder, custom HTML, scopes..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pr-9 pl-10 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-orange-500 focus:bg-white focus:outline-none sm:text-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-orange-400 dark:focus:bg-slate-900"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-md p-1 text-slate-400 hover:bg-slate-200/70 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-slate-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {AdminHelpCategory.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1 text-xs font-semibold transition ${
                  selectedCategory === cat
                    ? "bg-orange-600 text-white dark:bg-orange-500 dark:text-slate-950"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "guide" : "guides"}
          </span>
        </div>
      </div>

      {/* Results */}
      {filteredItems.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-xs text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          No matching FAQs or guides found. Try another keyword or reset the
          filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600/10 px-2.5 py-0.5 text-[11px] font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
                  <HelpCircle className="h-3 w-3" />
                  <span>{item.category}</span>
                </span>
              </div>

              <h2 className="mt-2.5 text-sm font-bold text-slate-900 sm:text-base dark:text-white">
                {item.question}
              </h2>

              <p className="mt-1.5 text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-400">
                {item.summary}
              </p>

              {item.steps && item.steps.length > 0 && (
                <ol className="mt-3 list-decimal space-y-1 pl-5 text-xs text-slate-700 dark:text-slate-300">
                  {item.steps.map((step, idx) => (
                    <li key={`${item.id}-step-${idx}`}>{step}</li>
                  ))}
                </ol>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
