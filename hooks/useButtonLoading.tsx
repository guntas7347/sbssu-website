import { Loader2 } from "lucide-react";
import { useState, useCallback } from "react";

export function useButtonLoading() {
  const [loading, setLoading] = useState(false);

  const run = useCallback(
    async (fn: () => Promise<any>) => {
      if (loading) return;
      setLoading(true);
      try {
        await fn();
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  const Spinner = () => {
    return <Loader2 className=" animate-spin" />;
  };

  return { loading, run, Spinner };
}
