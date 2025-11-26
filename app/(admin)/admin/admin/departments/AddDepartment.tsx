"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "@/hooks/useForm";
import { Department } from "./page";

const AddDepartment = ({
  setShowModal,
  editingDept,
}: {
  setShowModal: (v: boolean) => void;
  editingDept?: Department | null;
}) => {
  const [loading, setLoading] = useState(false);

  const { values, handleChange, resetForm } = useForm({
    name: editingDept?.name || "",
    departmentCode: editingDept?.departmentCode || "",
    establishmentYear: editingDept?.establishmentYear || "",
    location: editingDept?.location || "",
    description: editingDept?.description || "",
    hidden: editingDept?.hidden || false,
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const isEditing = !!editingDept;
    const method = isEditing ? "PUT" : "POST";

    const res = await fetch("/api/admin/departments", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(isEditing && { id: editingDept.id }),
        name: values.name.trim(),
        departmentCode: values.departmentCode.trim(),
        establishmentYear: Number(values.establishmentYear),
        location: values.location.trim(),
        description: values.description.trim(),
        hidden: values.hidden,
      }),
    });

    setLoading(false);

    if (res.ok) {
      resetForm();
      setShowModal(false);
    } else {
      console.error(await res.text());
      alert("Failed to save department");
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingDept ? "Edit Department" : "Add New Department"}
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department Name
            </label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department Code
              </label>
              <input
                type="text"
                name="departmentCode"
                value={values.departmentCode}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={values.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

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

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : editingDept ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
