"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getUserAllowedScopes, type ScopeConfig } from "@/lib/actions/configs";
import { PageEntriesTableClient } from "./PageEntriesTableClient";
import {
  getPageEntries,
  type AdminPageEntryItem,
} from "@/lib/actions/admin/page-entries/getPageEntries";

export default function AdminPageEntriesPage() {
  const [entries, setEntries] = useState<AdminPageEntryItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [allowedScopes, setAllowedScopes] = useState<ScopeConfig[]>([]);
  const [dbSearch, setDbSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void getUserAllowedScopes().then(setAllowedScopes);
  }, []);

  const fetchEntries = useCallback(
    async (
      searchValue: string,
      currentPage: number,
      currentPageSize: number,
    ) => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getPageEntries({
          search: searchValue,
          page: currentPage,
          pageSize: currentPageSize,
        });
        setEntries(data.items);
        setTotalCount(data.totalCount);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load page entries.",
        );
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchEntries(dbSearch, page, pageSize);
    }, 250);

    return () => clearTimeout(timer);
  }, [dbSearch, page, pageSize, fetchEntries]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="SBSSU Admin Portal"
        title="Page Entries"
        description="Manage structured entries, files, links, and custom HTML pages across university and department categories."
        backHref="/admin"
        backLabel="Back to Admin Dashboard"
        actionLabel="New Entry"
        actionHref="/admin/page-entries/new"
      />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {isLoading && entries.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-xs text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Loading page entries...
        </div>
      ) : (
        <PageEntriesTableClient
          initialEntries={entries}
          allowedScopes={allowedScopes}
          totalCount={totalCount}
          page={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(nextSize) => {
            setPageSize(nextSize);
            setPage(1);
          }}
          dbSearch={dbSearch}
          onDbSearchChange={(value) => {
            setDbSearch(value);
            setPage(1);
          }}
          onRefresh={() => void fetchEntries(dbSearch, page, pageSize)}
          isRefreshing={isLoading}
        />
      )}
    </div>
  );
}
