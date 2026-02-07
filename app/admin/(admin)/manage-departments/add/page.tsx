"use client";

import { useForm } from "@/hooks/useForm";
import { useButtonLoading } from "@/hooks/useButtonLoading";

export default function DepartmentPage() {
  const { loading, run } = useButtonLoading();

  const { values, handleChange, resetForm } = useForm({
    name: "",
    departmentCode: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const ask = confirm("Create Department?");
    if (!ask) return;

    try {
      const res = await fetch("/api/admin/manage-departments/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          departmentCode: values.departmentCode.trim(),
        }),
      });

      if (!res.ok) {
        console.error(await res.text());
        alert("Failed to save department");
        return;
      }

      resetForm();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error occurred");
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-8">Add New Department</h1>

      <form
        onSubmit={(e) => run(async () => handleSubmit(e))}
        className="space-y-6"
      >
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Department Name
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="input w-full"
          required
        />

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Department Code
        </label>
        <input
          type="text"
          name="departmentCode"
          value={values.departmentCode}
          onChange={handleChange}
          className="input w-full"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Saving..." : "Create"}
        </button>
      </form>
    </div>
  );
}
