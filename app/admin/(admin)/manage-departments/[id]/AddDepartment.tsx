"use client";

import { useForm } from "@/hooks/useForm";
import { useButtonLoading } from "@/hooks/useButtonLoading";
import { useRouter } from "next/navigation";
import {
  createDepartmentAction,
  updateDepartmentAction,
} from "@/lib/actions/departments";

interface DeptData {
  id?: string;
  name?: string;
  departmentCode?: string;
  establishmentYear?: number | null;
  location?: string | null;
  description?: string | null;
}

export default function DepartmentPage({
  editingDept,
}: {
  editingDept?: DeptData | null;
}) {
  const router = useRouter();
  const { loading, run, Spinner } = useButtonLoading();
  const isEditing = Boolean(editingDept?.id);

  const { values, handleChange, resetForm } = useForm({
    name: editingDept?.name || "",
    departmentCode: editingDept?.departmentCode || "",
    establishmentYear: editingDept?.establishmentYear ? String(editingDept.establishmentYear) : "",
    location: editingDept?.location || "",
    description: editingDept?.description || "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const ask = confirm(
      isEditing ? "Update Department?" : "Create Department?",
    );
    if (!ask) return;

    try {
      const payload = {
        name: values.name.trim(),
        departmentCode: values.departmentCode.trim().toUpperCase(),
        establishmentYear: values.establishmentYear ? Number(values.establishmentYear) : null,
        location: values.location ? values.location.trim() : null,
        description: values.description ? values.description.trim() : null,
      };

      const result = isEditing
        ? await updateDepartmentAction(editingDept!.id!, payload)
        : await createDepartmentAction(payload);

      if (!result.success) {
        alert(result.error || "Failed to save department");
        return;
      }

      alert(isEditing ? "Department updated" : "Department created");
      router.push("/admin/manage-departments");
      router.refresh();
    } catch (err: any) {
      alert("Error occurred while saving: " + err.message);
      console.error(err);
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto w-full">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        {isEditing ? "Edit Department" : "Add New Department"}
      </h1>

      <form
        onSubmit={(e) => run(async () => await handleSubmit(e))}
        className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-200"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="e.g. Computer Science & Engineering"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="departmentCode"
              value={values.departmentCode}
              onChange={handleChange}
              placeholder="e.g. CSE"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none uppercase"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Establishment Year
            </label>
            <input
              type="number"
              name="establishmentYear"
              value={values.establishmentYear}
              onChange={handleChange}
              placeholder="e.g. 2010"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Campus Location / Building
          </label>
          <input
            type="text"
            name="location"
            value={values.location}
            onChange={handleChange}
            placeholder="e.g. Block A, 2nd Floor"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description / Overview
          </label>
          <textarea
            name="description"
            rows={4}
            value={values.description}
            onChange={handleChange}
            placeholder="Brief description of the department..."
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2.5 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50"
          >
            {loading ? <Spinner /> : isEditing ? "Update Department" : "Create Department"}
          </button>
        </div>
      </form>
    </div>
  );
}
