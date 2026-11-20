"use client";

import { useCallback, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/actions/auth";
import type { CurrentUserLike } from "@/constants/page-categories";

interface UseCurrentUserResult {
  currentUser: CurrentUserLike | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<CurrentUserLike | null>;
}

export function useCurrentUser(): UseCurrentUserResult {
  const [user, setUser] = useState<CurrentUserLike | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = (await getCurrentUser()) as CurrentUserLike | null;
      setUser(data);
      return data;
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to load current user.";
      setError(message);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;

    getCurrentUser()
      .then((data) => {
        if (!active) return;
        setUser((data as CurrentUserLike | null) ?? null);
        setError(null);
      })
      .catch((err) => {
        if (!active) return;
        setUser(null);
        setError(
          err instanceof Error ? err.message : "Failed to load current user.",
        );
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    currentUser: user,
    loading,
    error,
    refresh: loadUser,
  };
}
