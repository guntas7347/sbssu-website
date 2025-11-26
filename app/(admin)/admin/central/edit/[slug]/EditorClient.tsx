"use client";

import UniversalEditor from "@/components/admin/Editor";
import { schemaRegistry } from "@/lib/schema";
import { useEffect, useState } from "react";

export default function EditorClient({ slug }: { slug: string }) {
  const schemaSlug = schemaRegistry[slug];

  const [page, setPage] = useState(null);
  const [schema, setSchema] = useState(schemaSlug);

  useEffect(() => {
    fetch(`/api/admin/central/pages?slug=${slug}`)
      .then((r) => r.json())
      .then((data) => {
        setPage(data);
        setSchema(schema);
      });
  }, [slug]);

  if (!schema || !page) return <div>Loading...</div>;

  return (
    <UniversalEditor slug={slug} schema={schema} initialData={page.data} />
  );
}
