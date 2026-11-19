"use client";

import React, { useEffect, useMemo, useState, useTransition } from "react";
import {
  Search,
  ShieldCheck,
  Building2,
  Pencil,
  X,
  CheckCircle2,
  AlertCircle,
  Users,
  Filter,
} from "lucide-react";
import {
  getAllUsersAndDepartments,
  editUserAccess,
  type UserRecord,
  type DepartmentOption,
  type UserRight,
} from "@/lib/actions/users";

const ALL_RIGHTS: ReadonlyArray<{
  key: UserRight;
  label: string;
  description: string;
}> = [
  {
    key: "admin",
    label: "admin",
    description: "Full administrative access across portal",
  },
  {
    key: "allow_login",
    label: "allow_login",
    description: "Permitted to sign in to the application",
  },
  {
    key: "hod",
    label: "hod",
    description: "Head of Department privileges",
  },
  {
    key: "academics",
    label: "academics",
    description: "Academic records and curriculum access",
  },
  {
    key: "placements",
    label: "placements",
    description: "Training & placement cell management",
  },
];

function isValidRight(r: string): r is UserRight {
  return ALL_RIGHTS.some((item) => item.key === r);
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [departments, setDepartments] = useState<DepartmentOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [searchName, setSearchName] = useState("");
  const [rightFilter, setRightFilter] = useState<"all" | UserRight>("all");

  // Modal state
  const [editingUser, setEditingUser] = useState<UserRecord | null>(null);
  const [modalDepartmentId, setModalDepartmentId] = useState<string>("");
  const [modalRights, setModalRights] = useState<UserRight[]>([]);
  const [isSaving, startTransition] = useTransition();

  const [banner, setBanner] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const loadData = async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const res = await getAllUsersAndDepartments();
      setUsers(res.users);
      setDepartments(res.departments);
    } catch (err) {
      setLoadError(
        err instanceof Error ? err.message : "Failed to load users.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const departmentMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const d of departments) {
      map.set(d.id, d.name);
    }
    return map;
  }, [departments]);

  const filteredUsers = useMemo(() => {
    const q = searchName.trim().toLowerCase();
    return users.filter((u) => {
      const matchesName =
        !q ||
        (u.fullName && u.fullName.toLowerCase().includes(q)) ||
        (u.username && u.username.toLowerCase().includes(q));

      const userRights = u.rights ?? [];
      const matchesRight =
        rightFilter === "all" || userRights.includes(rightFilter);

      return matchesName && matchesRight;
    });
  }, [users, searchName, rightFilter]);

  const openEditModal = (user: UserRecord) => {
    setBanner(null);
    setEditingUser(user);
    setModalDepartmentId(user.departmentId ?? "");
    const currentRights = (user.rights ?? []).filter(isValidRight);
    setModalRights(currentRights);
  };

  const closeEditModal = () => {
    if (isSaving) return;
    setEditingUser(null);
  };

  const toggleRightCheckbox = (right: UserRight) => {
    setModalRights((prev) =>
      prev.includes(right) ? prev.filter((r) => r !== right) : [...prev, right],
    );
  };

  const handleSaveModal = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editingUser) return;

    startTransition(async () => {
      const res = await editUserAccess({
        id: editingUser.id,
        departmentId: modalDepartmentId === "" ? null : modalDepartmentId,
        rights: modalRights,
      });

      if (res.ok && res.user) {
        setUsers((prev) =>
          prev.map((u) => (u.id === res.user!.id ? res.user! : u)),
        );
        setBanner({ type: "success", text: res.message });
        setEditingUser(null);
      } else {
        setBanner({ type: "error", text: res.message });
      }
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-400/15 dark:text-orange-300">
              <Users className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
              Access & Role Management
            </span>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
              Users Directory
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                View all users, filter by rights, and assign departments or
                permissions.
              </p>
              <p className="text-sm font-medium text-red-600 dark:text-red-400">
                Warning: To change a department's HOD, use Manage Departments
                only. Changing HOD assignments here will not work.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-right dark:border-slate-800 dark:bg-slate-950">
              <span className="block text-[11px] font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400">
                Showing
              </span>
              <span className="text-lg font-bold text-orange-600 dark:text-orange-400">
                {filteredUsers.length}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {" "}
                / {users.length}
              </span>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        {banner && (
          <div
            role="status"
            className={`flex items-start justify-between gap-3 rounded-xl border p-4 text-sm ${
              banner.type === "success"
                ? "border-green-500/30 bg-green-50 text-green-900 dark:border-green-400/30 dark:bg-green-500/10 dark:text-green-200"
                : "border-red-500/30 bg-red-50 text-red-900 dark:text-red-200"
            }`}
          >
            <div className="flex items-start gap-2.5">
              {banner.type === "success" ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
              )}
              <span>{banner.text}</span>
            </div>
            <button
              type="button"
              onClick={() => setBanner(null)}
              className="cursor-pointer text-xs opacity-70 hover:opacity-100"
              aria-label="Dismiss message"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Search by Name & Filter by Rights */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs sm:p-5 dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:items-center">
            <div className="relative md:col-span-6">
              <Search className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                placeholder="Search user by name..."
                aria-label="Search user by name"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pr-3.5 pl-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:placeholder-slate-500"
              />
            </div>

            <div className="flex items-center gap-2 md:col-span-6">
              <Filter className="h-4 w-4 shrink-0 text-green-700 dark:text-green-400" />
              <select
                value={rightFilter}
                onChange={(e) =>
                  setRightFilter(e.target.value as "all" | UserRight)
                }
                aria-label="Filter users by right"
                className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="all">All Rights</option>
                {ALL_RIGHTS.map((r) => (
                  <option key={r.key} value={r.key}>
                    Right: {r.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
          {loading ? (
            <div className="p-10 text-center text-sm text-slate-500 dark:text-slate-400">
              Loading all users...
            </div>
          ) : loadError ? (
            <div className="p-10 text-center text-sm text-red-600 dark:text-red-400">
              {loadError}
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-10 text-center text-sm text-slate-500 dark:text-slate-400">
              No users match your current search or rights filter.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
                <thead className="bg-slate-100/80 text-xs font-semibold tracking-wider text-slate-600 uppercase dark:bg-slate-950/80 dark:text-slate-400">
                  <tr>
                    <th className="px-4 py-3.5">User</th>
                    <th className="px-4 py-3.5">Contact</th>
                    <th className="px-4 py-3.5">Department</th>
                    <th className="px-4 py-3.5">Rights</th>
                    <th className="px-4 py-3.5 text-right">Edit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredUsers.map((user) => {
                    const deptName = user.departmentId
                      ? (departmentMap.get(user.departmentId) ??
                        user.departmentId)
                      : "Unassigned";
                    const userRights = (user.rights ?? []).sort((a, b) =>
                      a.localeCompare(b, undefined, { sensitivity: "base" }),
                    );
                    return (
                      <tr
                        key={user.id}
                        className="transition hover:bg-orange-50/40 dark:hover:bg-orange-500/5"
                      >
                        <td className="px-4 py-3.5">
                          <div className="font-semibold text-slate-900 dark:text-white">
                            {user.fullName || "Unnamed User"}
                          </div>
                          <div className="font-mono text-xs text-slate-500 dark:text-slate-400">
                            @{user.username || user.id}
                          </div>
                        </td>
                        <td className="px-4 py-3.5 text-xs text-slate-600 dark:text-slate-300">
                          <div>{user.email || "—"}</div>
                          <div className="text-slate-500 dark:text-slate-400">
                            {user.phone || "—"}
                          </div>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-800 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                            <Building2 className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                            {deptName}
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          {userRights.length === 0 ? (
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                              No rights
                            </span>
                          ) : (
                            <div className="flex flex-wrap gap-1.5">
                              {userRights.map((right) => (
                                <span
                                  key={right}
                                  className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-500/15 dark:text-green-300"
                                >
                                  {right}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => openEditModal(user)}
                            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-orange-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-700 dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                            Edit
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-user-modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs"
          onClick={closeEditModal}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-xl dark:border-slate-800 dark:bg-slate-900"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-orange-600 dark:text-orange-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Edit User Access
                </span>
                <h2
                  id="edit-user-modal-title"
                  className="mt-0.5 text-lg font-bold text-slate-900 dark:text-white"
                >
                  {editingUser.fullName ||
                    editingUser.username ||
                    editingUser.id}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {editingUser.email || editingUser.id}
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                className="cursor-pointer rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="mt-5 space-y-5">
              {/* Department Select */}
              <div>
                <label
                  htmlFor="modal-department"
                  className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
                >
                  Department
                </label>
                <select
                  id="modal-department"
                  value={modalDepartmentId}
                  onChange={(e) => setModalDepartmentId(e.target.value)}
                  className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                >
                  <option value="">No Department (Unassigned)</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Rights Checkboxes */}
              <div>
                <span className="mb-2 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300">
                  Rights
                </span>
                <div className="space-y-2 rounded-xl border border-slate-200 bg-slate-50/70 p-3.5 dark:border-slate-800 dark:bg-slate-950/60">
                  {ALL_RIGHTS.map((rightItem) => {
                    const checked = modalRights.includes(rightItem.key);
                    return (
                      <label
                        key={rightItem.key}
                        className="flex cursor-pointer items-start gap-3 rounded-lg p-1.5 transition hover:bg-white dark:hover:bg-slate-900"
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleRightCheckbox(rightItem.key)}
                          className="mt-0.5 h-4 w-4 cursor-pointer rounded border-slate-300 text-green-600 focus:ring-green-500 dark:border-slate-700 dark:bg-slate-900"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="block font-mono text-xs font-bold text-slate-900 dark:text-white">
                            {rightItem.label}
                          </span>
                          <span className="block text-xs text-slate-500 dark:text-slate-400">
                            {rightItem.description}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={closeEditModal}
                  className="cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-green-700 px-5 py-2.5 text-xs font-semibold text-white shadow-xs transition hover:bg-green-800 disabled:opacity-50 dark:bg-green-500 dark:text-slate-950 dark:hover:bg-green-400"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
