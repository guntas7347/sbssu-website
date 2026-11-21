"use client";

import { useParams } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PageEntryEditorForm } from "./PageEntryEditorForm";

export default function AdminPageEntryEditorPage() {
  const params = useParams<{ id: string }>();
  const id = params?.id ?? "new";
  const isNew = id === "new";

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="SBSSU Admin Portal"
        title={isNew ? "New Page Entry" : "Edit Page Entry"}
        description={
          isNew
            ? "Create a structured entry, upload files/links, or publish a custom HTML page."
            : "Update entry details, attachments, links, or custom HTML content."
        }
        backHref="/admin/page-entries"
        backLabel="Back to Page Entries"
      />

      <PageEntryEditorForm entryId={id} />
    </div>
  );
}
