"use client";

import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteUserAction } from "@/lib/actions/users";

export default function DeleteUserButton({
  id,
  username,
}: {
  id: string;
  username: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Are you sure you want to delete user "${username}"?`)) return;

    setLoading(true);
    try {
      const result = await deleteUserAction(id);

      if (!result.success) {
        throw new Error(result.error || "Failed to delete user");
      }

      router.refresh();
    } catch (err: any) {
      alert(err.message || "Delete failed");
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
      title={`Delete user ${username}`}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
}
