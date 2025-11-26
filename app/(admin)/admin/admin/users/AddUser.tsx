"use client";

import { X } from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { Department } from "../departments/page";

interface UserForm {
  username: string;
  email: string;
  department: string;
  portals: string[];
  rights: string[];
  loginEnabled: boolean;
  departmentCode?: string; // optional for edit use
}

const PORTAL_RIGHTS: Record<string, string[]> = {
  admin: ["manage-users", "manage-departments", "stats"],
  central: ["manage-notices"],
  department: ["hod"],
  placement: [
    "view-placements",
    "edit-placement-details",
    "approve-candidates",
  ],
};

export default function AddUser({
  setShowModal,
  editingUser,
  departments,
}: {
  setShowModal: (v: boolean) => void;
  editingUser?: UserForm | null;
  departments: Department[];
}) {
  const { values, handleChange, setField, resetForm } = useForm<UserForm>({
    username: editingUser?.username || "",
    email: editingUser?.email || "",
    department:
      editingUser?.departmentCode || departments[0]?.departmentCode || "", // use code
    portals: editingUser?.portals || [],
    rights: editingUser?.rights || [],
    loginEnabled: editingUser?.loginEnabled ?? true,
  });

  function toggleItem(field: "portals" | "rights", value: string) {
    if (field === "portals") {
      const selected = values.portals.includes(value);

      if (selected) {
        // portal is being deselected
        const remainingPortals = values.portals.filter((p) => p !== value);
        const activeRights = new Set(
          remainingPortals.flatMap((p) => PORTAL_RIGHTS[p] || [])
        );
        const filteredRights = values.rights.filter((r) => activeRights.has(r));

        setField("portals", remainingPortals);
        setField("rights", filteredRights);
      } else {
        // portal is being selected
        setField("portals", [...values.portals, value]);
      }
    } else {
      // toggling a right manually
      setField(
        "rights",
        values.rights.includes(value)
          ? values.rights.filter((r) => r !== value)
          : [...values.rights, value]
      );
    }
  }

  // Compute merged rights from selected portals
  const mergedRights = Array.from(
    new Set(values.portals.flatMap((p) => PORTAL_RIGHTS[p] || []))
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const isEditing = !!editingUser;
      const method = isEditing ? "PATCH" : "POST";

      const payload = isEditing
        ? { ...values, id: (editingUser as any).id }
        : values;

      const res = await fetch("/api/admin/users", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());
      console.log(isEditing ? "User updated" : "User created");
    } catch (err) {
      console.error("Failed to submit user:", err);
    } finally {
      resetForm();
      setShowModal(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {editingUser ? "Edit User" : "Add New User"}
          </h2>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          {/* Basic fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                name="username"
                value={values.username}
                onChange={handleChange}
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                name="email"
                value={values.email}
                onChange={handleChange}
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Department
            </label>
            <select
              name="department"
              value={values.department}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              {departments.map((d) => (
                <option key={d.departmentCode} value={d.departmentCode}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Portal selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Portal Access
            </label>
            <div className="space-y-3">
              {Object.keys(PORTAL_RIGHTS).map((portal) => (
                <label
                  key={portal}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={values.portals.includes(portal)}
                    onChange={() => toggleItem("portals", portal)}
                    className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-gray-700 font-medium capitalize">
                    {portal} Portal
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Conditional rights */}
          {values.portals.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Rights (merged from selected portals)
              </label>
              <div className="space-y-3">
                {mergedRights.map((right) => (
                  <label
                    key={right}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={values.rights.includes(right)}
                      onChange={() => toggleItem("rights", right)}
                      className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <span className="text-gray-700 font-medium">{right}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Login toggle */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                name="loginEnabled"
                type="checkbox"
                checked={values.loginEnabled}
                onChange={handleChange}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span className="text-gray-700 font-medium">
                Enable Login Permission
              </span>
            </label>
          </div>

          {/* Buttons */}
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
              className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              {editingUser ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
