"use client";

import { useCallback, useEffect, useState } from "react";
import { getCurrentUser } from "@/lib/actions/auth";

type CurrentUser = Awaited<ReturnType<typeof getCurrentUser>>;

interface UseCurrentUserResult {
  currentUser: CurrentUser;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<CurrentUser>;
}

export function useCurrentUser(): UseCurrentUserResult {
  const [user, setUser] = useState<CurrentUser>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getCurrentUser();
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
    loadUser();
  }, [loadUser]);

  return {
    currentUser: user,
    loading,
    error,
    refresh: loadUser,
  };
}
