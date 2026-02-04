"use client";

import { Trash2 } from "lucide-react";

const DeleteButton = ({ id }) => {
  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    try {
      const res = await fetch(`/api/admin/notices/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete notice");
      window.location.reload();
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }
  return (
    <button
      onClick={() => handleDelete(id)}
      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
    >
      <Trash2 className="w-4 h-4" />
    </button>
  );
};

export default DeleteButton;
