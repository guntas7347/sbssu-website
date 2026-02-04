"use client";

import { useForm } from "@/hooks/useForm";
import { useButtonLoading } from "@/hooks/useButtonLoading";

export default function DepartmentPage({ editingDept = {} }) {
  const { loading, run, Spinner } = useButtonLoading();

  const { values, handleChange, resetForm } = useForm({
    name: editingDept?.name || "",
    departmentCode: editingDept?.departmentCode || "",

    hidden: editingDept?.hidden || false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const isEditing = Boolean(editingDept?.id);

    const ask = confirm(
      isEditing ? "Update Department?" : "Create Department?",
    );
    if (!ask) return;

    const url = isEditing
      ? `/api/admin/manage-departments/${editingDept.id}`
      : `/api/admin/manage-departments/add`;

    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          departmentCode: values.departmentCode.trim(),
          establishmentYear: Number(values.establishmentYear),
          location: values.location.trim(),
          description: values.description.trim(),
          hidden: values.hidden,
        }),
      });

      if (!res.ok) {
        const msg = await res.text();
        console.error(msg);
        alert("Failed to save department");
        return;
      }

      resetForm();
    } catch (err) {
      alert("Error occurred");
      console.error(err);
    } finally {
      window.location.reload();
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-8">
        {editingDept ? "Edit Department" : "Add New Department"}
      </h1>

      <form
        onSubmit={(e) => run(async () => await handleSubmit(e))}
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

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="hidden"
            checked={values.hidden}
            onChange={handleChange}
            className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
          />
          <label className="text-sm font-medium text-gray-700">
            Hidden Department
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : editingDept ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
