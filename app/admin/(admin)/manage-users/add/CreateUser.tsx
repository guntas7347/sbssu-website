"use client";

import { useForm } from "@/hooks/useForm";
import { useButtonLoading } from "@/hooks/useButtonLoading";

type Role = "SUPER_ADMIN" | "CENTRAL_EDITOR" | "HOD" | "DEPT_EDITOR";

const ALL_ROLES: Role[] = [
  "SUPER_ADMIN",
  "CENTRAL_EDITOR",
  "HOD",
  "DEPT_EDITOR",
];

export default function CreateUser({ departments }) {
  const { values, handleChange, setField } = useForm({
    username: "",
    email: "",
    department: departments[0]?.departmentCode || "",
    roles: [] as Role[],
    loginEnabled: true,
  });

  const { loading, run, Spinner } = useButtonLoading();

  function toggleRole(role: Role) {
    setField(
      "roles",
      values.roles.includes(role)
        ? values.roles.filter((r: Role) => r !== role)
        : [...values.roles, role],
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!confirm("Create user?")) return;

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const msg = await res.text();
        alert(msg || "Create failed");
        return;
      }

      alert("User created");
      window.location.reload();
    } catch (err) {
      alert("Error");
      console.error(err);
    }
  }

  return (
    <div className="w-full px-10 py-3">
      <div className="flex items-center justify-center p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">Add New User</h2>
      </div>

      <form
        className="p-6 space-y-6"
        onSubmit={(e) => run(async () => await handleSubmit(e))}
      >
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
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Roles
          </label>

          <div className="space-y-3">
            {ALL_ROLES.map((role) => (
              <label
                key={role}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={values.roles.includes(role)}
                  onChange={() => toggleRole(role)}
                  className="w-5 h-5"
                />
                <span className="text-gray-700">{role}</span>
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
            <span className="text-gray-700 font-medium">Enable Login</span>
          </label>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold"
          >
            {loading ? <Spinner /> : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
