"use client";

import React, { useEffect, useState } from "react";

const usePage = (slug = "") => {
  const [page, setPage] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/admin/central/pages/${slug}`)
      .then((res) => res.json())
      .then(({ data }) => setPage(data))
      .catch((err) => console.error("Error loading page data:", err));
  }, []);

  return { page };
};

export default usePage;
