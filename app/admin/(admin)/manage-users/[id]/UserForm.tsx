"use client";

import { useForm } from "@/hooks/useForm";
import { useButtonLoading } from "@/hooks/useButtonLoading";

const RIGHTS_GROUPS: Record<string, string[]> = {
  admin: ["manage_users", "manage_departments"],
  central: ["manage_notices", "manage_central_content", "edit_central"],
  department: ["hod", "manage_notices"],
  placement: ["manage_placements"],
};

const ALL_RIGHTS = Array.from(new Set(Object.values(RIGHTS_GROUPS).flat()));

export default function EditUser({
  editingUser,
  departments,
}: {
  editingUser: any | null;
  departments: Department[];
}) {
  const { values, handleChange, setField, resetForm } = useForm({
    username: editingUser?.username || "",
    email: editingUser?.email || "",
    department:
      editingUser?.departmentCode || departments[0]?.departmentCode || "",
    rights: editingUser?.rights || [],
    role: editingUser?.role || "staff",
    loginEnabled: editingUser?.loginEnabled ?? true,
  });

  const { loading, run, Spinner } = useButtonLoading();

  function toggleGroup(group: string) {
    const groupRights = RIGHTS_GROUPS[group];
    const hasAll = groupRights.every((r) => values.rights.includes(r));

    setField(
      "rights",
      hasAll
        ? values.rights.filter((r) => !groupRights.includes(r))
        : Array.from(new Set([...values.rights, ...groupRights])),
    );
  }

  function toggleRight(right: string) {
    setField(
      "rights",
      values.rights.includes(right)
        ? values.rights.filter((r) => r !== right)
        : [...values.rights, right],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const isEditing = !!editingUser;
    const ask = confirm(isEditing ? "Update user?" : "Create user?");
    if (!ask) return;

    try {
      const method = isEditing ? "PATCH" : "POST";
      const payload = isEditing ? { ...values, id: editingUser.id } : values;

      const res = await fetch("/api/admin/users", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        alert(msg || "Operation failed");
        throw new Error(msg);
      }

      alert(isEditing ? "User updated" : "User created");
    } catch (err) {
      alert("Error occurred");
      console.error(err);
    } finally {
      window.location.reload();
    }
  }

  return (
    <div className="w-full px-10 py-3">
      <div className="flex items-center justify-center p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          {editingUser ? "Edit User" : "Add New User"}
        </h2>
      </div>

      <form
        className="p-6 space-y-6"
        onSubmit={(e) => run(async () => await handleSubmit(e))}
      >
        <div className="grid grid-cols-2 gap-4">
          {" "}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              name="username"
              value={values.username}
              onChange={handleChange}
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department
          </label>
          <select
            name="department"
            value={values.department}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          >
            {departments.map((d) => (
              <option key={d.departmentCode} value={d.departmentCode}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <select
            name="role"
            value={values.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="hod">HOD</option>
            <option value="placement">Placement</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Rights Groups
          </label>
          <div className="space-y-3">
            {Object.entries(RIGHTS_GROUPS).map(([group, groupRights]) => {
              const allSelected = groupRights.every((r) =>
                values.rights.includes(r),
              );
              return (
                <label
                  key={group}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={() => toggleGroup(group)}
                    className="w-5 h-5"
                  />
                  <span className="text-gray-700 font-medium capitalize">
                    {group}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Individual Rights
          </label>
          <div className="space-y-3">
            {ALL_RIGHTS.map((right) => (
              <label
                key={right}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={values.rights.includes(right)}
                  onChange={() => toggleRight(right)}
                  className="w-5 h-5"
                />
                <span className="text-gray-700">{right}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              name="loginEnabled"
              type="checkbox"
              checked={values.loginEnabled}
              onChange={handleChange}
              className="w-5 h-5"
            />
            <span className="text-gray-700 font-medium">
              Enable Login Permission
            </span>
          </label>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold"
          >
            {loading ? <Spinner /> : editingUser ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
