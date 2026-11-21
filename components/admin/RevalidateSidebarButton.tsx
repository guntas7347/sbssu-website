"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Check, RefreshCw } from "lucide-react";
import { revalidateCurrentScopeCache } from "@/lib/actions/users";

interface RevalidateSidebarButtonProps {
  collapsed?: boolean;
}

export function RevalidateSidebarButton({
  collapsed = false,
}: RevalidateSidebarButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [done, setDone] = useState(false);

  function handleClick() {
    if (isPending) return;

    startTransition(async () => {
      try {
        await revalidateCurrentScopeCache();
        router.refresh();
        setDone(true);
        setTimeout(() => setDone(false), 1500);
      } catch {
        // Silent fail
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      title="Refresh Public Cache"
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-orange-500/10 hover:text-orange-600 disabled:opacity-60 dark:text-slate-400 dark:hover:bg-orange-500/15 dark:hover:text-orange-400"
    >
      {done ? (
        <Check className="h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
      ) : (
        <RefreshCw
          className={`h-4 w-4 shrink-0 ${isPending ? "animate-spin text-orange-600 dark:text-orange-400" : ""}`}
        />
      )}
      {!collapsed && (
        <span className="truncate">
          {done ? "Cache Refreshed" : "Refresh Public Cache"}
        </span>
      )}
    </button>
  );
}
