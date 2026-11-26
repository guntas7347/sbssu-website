"use client";

import { useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";

import { PageCategoriesTableClient } from "./PageCategoriesTableClient";
import {
  AdminPageCategoryItem,
  getAllPageCategories,
} from "@/lib/actions/admin/page-categories/getAllPageCategories";

export default function AdminPageCategoriesPage() {
  const [categories, setCategories] = useState<AdminPageCategoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadCategories() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAllPageCategories();
        if (active) {
          setCategories(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Failed to load categories.",
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    }

    void loadCategories();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="SBSSU Admin Portal"
        title="Page Categories"
        description="Manage category codes, page titles, and dynamic /page/[code] routes."
        backHref="/admin"
        backLabel="Back to Admin Dashboard"
        actionLabel="New Page"
        actionHref="/admin/page-categories/new"
      />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-xs text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Loading page categories...
        </div>
      ) : (
        <PageCategoriesTableClient initialCategories={categories} />
      )}
    </div>
  );
}
