"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpRight, Archive, Loader2 } from "lucide-react";

interface LegacyInfoBannerProps {
  href: string;
  label?: string;
  actionText?: string;
  className?: string;
}

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url.trim());
}

export function LegacyInfoBanner({
  href,
  label = "For more info related to this, go here",
  actionText = "Legacy Archive",
  className = "",
}: LegacyInfoBannerProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const cleanHref = href.trim();
  if (!cleanHref) return null;

  const external = isExternalUrl(cleanHref);

  function startTenSecondLoading() {
    setIsLoading(true);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setIsLoading(false);
    }, 10_000);
  }

  function handleInternalClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    startTenSecondLoading();
    router.push(cleanHref);
  }

  function handleExternalClick() {
    startTenSecondLoading();
  }

  const linkClasses =
    "inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:opacity-75 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400";

  return (
    <div
      className={`my-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs shadow-2xs dark:border-slate-800 dark:bg-slate-900 ${className}`}
    >
      <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
        <Archive className="h-3.5 w-3.5 shrink-0 text-green-700 dark:text-green-400" />
        <span className="font-medium">{label}</span>
      </div>

      {external ? (
        <a
          href={cleanHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleExternalClick}
          aria-busy={isLoading}
          className={linkClasses}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>{actionText}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </>
          )}
        </a>
      ) : (
        <Link
          href={cleanHref}
          onClick={handleInternalClick}
          aria-busy={isLoading}
          className={linkClasses}
        >
          {isLoading ? (
            <>
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>{actionText}</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </>
          )}
        </Link>
      )}
    </div>
  );
}
