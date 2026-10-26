"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteNoticeAction } from "@/lib/actions/notices";

const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    setLoading(true);
    try {
      const result = await deleteNoticeAction(id);
      if (!result.success) throw new Error(result.error || "Failed to delete notice");
      router.refresh();
    } catch (err: any) {
      alert(err.message || "Failed to delete notice");
      console.error("Delete failed:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Delete notice"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
};

export default DeleteButton;
