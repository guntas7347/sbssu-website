"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getNotices, type AdminNoticeItem } from "@/lib/actions/notices";
import { NoticesTableClient } from "./NoticesTableClient";

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState<AdminNoticeItem[]>([]);
  const [dbSearch, setDbSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotices = useCallback(async (searchValue: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const trimmed = searchValue.trim();
      const rows = await getNotices(trimmed ? { search: trimmed } : undefined);
      setNotices(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load notices.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchNotices(dbSearch);
    }, 250);

    return () => clearTimeout(timer);
  }, [dbSearch, fetchNotices]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="SBSSU Admin Portal"
        title="Notices & Circulars"
        description="Publish and manage official university, public, and department notices."
        backHref="/admin"
        backLabel="Back to Admin Dashboard"
        actionLabel="New Notice"
        actionHref="/admin/notices/new"
      />

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error}
        </div>
      )}

      {isLoading && notices.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-xs text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          Loading notices...
        </div>
      ) : (
        <NoticesTableClient
          initialNotices={notices}
          dbSearch={dbSearch}
          onDbSearchChange={setDbSearch}
          onRefresh={() => void fetchNotices(dbSearch)}
          isRefreshing={isLoading}
        />
      )}
    </div>
  );
}
