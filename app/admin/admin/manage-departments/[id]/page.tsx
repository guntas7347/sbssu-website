"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Building2,
  Save,
  PlusCircle,
  AlertCircle,
} from "lucide-react";
import {
  getDepartmentById,
  createDepartment,
  updateDepartment,
  getUsersList,
} from "@/lib/actions/departments";

interface UserOption {
  id: string;
  fullName?: string | null;
  username?: string | null;
  email?: string | null;
}

interface DepartmentDetail {
  id: string;
  name: string;
  code: string;
  hodId?: string | null;
}

export default function DepartmentFormPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const id = params?.id ?? "new";
  const isNew = id === "new";

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [hodId, setHodId] = useState("");
  const [users, setUsers] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let active = true;

    async function loadFormData() {
      setLoading(true);
      setErrorMsg(null);
      try {
        const usersList = await getUsersList();
        if (!active) return;
        setUsers(Array.isArray(usersList) ? (usersList as UserOption[]) : []);

        if (!isNew) {
          const dept = (await getDepartmentById(id)) as DepartmentDetail | null;
          if (!active) return;
          if (!dept) {
            router.replace("/admin/admin/manage-departments");
            return;
          }
          setName(dept.name ?? "");
          setCode(dept.code ?? "");
          setHodId(dept.hodId ?? "");
        } else {
          setName("");
          setCode("");
          setHodId("");
        }
      } catch (err) {
        if (active) {
          setErrorMsg(
            err instanceof Error
              ? err.message
              : "Failed to load department details.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadFormData();
    return () => {
      active = false;
    };
  }, [id, isNew, router]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedName = name.trim();
    const trimmedCode = code.trim().toUpperCase();

    if (!trimmedName || !trimmedCode) {
      setErrorMsg("Department name and code are required.");
      return;
    }

    startTransition(async () => {
      try {
        const payload = {
          name: trimmedName,
          code: trimmedCode,
          hodId: hodId || null,
        };

        const res = isNew
          ? await createDepartment(payload)
          : await updateDepartment(id, payload);

        console.log(res);

        if (res?.success !== true) {
          setErrorMsg(res?.error || "Failed to save department.");
          return;
        }

        router.push("/admin/admin/manage-departments");
        router.refresh();
      } catch (err) {
        setErrorMsg(
          err instanceof Error ? err.message : "Failed to save department.",
        );
      }
    });
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 text-slate-900 dark:text-slate-100">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-400/15 dark:text-orange-300">
            <Building2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
            {isNew ? "New Department" : "Edit Department"}
          </span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            {isNew ? "Create Department" : "Edit Department"}
          </h1>
          <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
            {isNew
              ? "Add a new department to the system."
              : `Editing details for ${name || id}`}
          </p>
        </div>

        <Link
          href="/admin/admin/manage-departments"
          className="inline-flex items-center gap-1.5 self-start rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 sm:self-auto dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:text-orange-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to List
        </Link>
      </div>

      {/* Error Alert */}
      {errorMsg && (
        <div
          role="alert"
          className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-50 p-4 text-sm text-red-900 dark:text-red-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:p-8 dark:border-slate-800 dark:bg-slate-900"
      >
        {loading ? (
          <div className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">
            Loading department form...
          </div>
        ) : (
          <>
            <div>
              <label
                htmlFor="dept-name"
                className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Department Name <span className="text-orange-600">*</span>
              </label>
              <input
                id="dept-name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="e.g. Computer Science and Engineering"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="dept-code"
                className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Department Code <span className="text-orange-600">*</span>
              </label>
              <input
                id="dept-code"
                type="text"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                required
                placeholder="e.g. CSE"
                className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 font-mono text-sm text-slate-900 uppercase outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="dept-hod"
                className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200"
              >
                Head of Department (HOD)
              </label>
              <select
                id="dept-hod"
                name="hodId"
                value={hodId}
                onChange={(e) => setHodId(e.target.value)}
                className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <option value="">-- Select HOD (Optional) --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullName || user.username || user.email}
                    {user.email ? ` (${user.email})` : ""}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 pt-5 dark:border-slate-800">
              <Link
                href="/admin/admin/manage-departments"
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-green-800 disabled:opacity-50 dark:bg-green-500 dark:text-slate-950 dark:hover:bg-green-400"
              >
                {isNew ? (
                  <PlusCircle className="h-4 w-4" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                {isPending
                  ? isNew
                    ? "Creating..."
                    : "Saving..."
                  : isNew
                    ? "Create Department"
                    : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
