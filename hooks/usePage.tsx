"use client";

import { useEffect, useState } from "react";
import { getPageAction } from "@/lib/actions/pages";

const usePage = (slug = "", dept = "ADMIN") => {
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    if (!slug) return;
    getPageAction(dept, slug)
      .then((res) => {
        if (res.success && res.data) {
          setPage(res.data.data ?? res.data);
        }
      })
      .catch((err) => console.error("Error loading page data:", err));
  }, [slug, dept]);

  return { page };
};

export default usePage;
