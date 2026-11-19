"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  Building2,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { getDepartments, deleteDepartment } from "@/lib/actions/departments";

interface DepartmentHod {
  fullName?: string | null;
  email?: string | null;
}

interface DepartmentItem {
  id: string;
  code: string;
  name: string;
  hod?: DepartmentHod | null;
  createdAt: string | Date;
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      try {
        const data = await getDepartments();
        if (active) {
          setDepartments(Array.isArray(data) ? (data as DepartmentItem[]) : []);
        }
      } catch (err) {
        if (active) {
          setFeedback({
            type: "error",
            text:
              err instanceof Error
                ? err.message
                : "Failed to load departments.",
          });
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void load();
    return () => {
      active = false;
    };
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this department?")) return;

    setDeletingId(id);
    setFeedback(null);

    try {
      await deleteDepartment(id);
      setDepartments((prev) =>
        prev.filter((department) => department.id !== id),
      );
      setFeedback({
        type: "success",
        text: "Department deleted successfully.",
      });
    } catch (err) {
      setFeedback({
        type: "error",
        text:
          err instanceof Error ? err.message : "Failed to delete department.",
      });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="space-y-6 text-slate-900 dark:text-slate-100">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center dark:border-slate-800 dark:bg-slate-900">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-400/15 dark:text-orange-300">
            <Building2 className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
            Administration
          </span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Departments Management
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage university departments, codes, and Head of Departments (HOD).
          </p>
        </div>

        <Link
          href="/admin/admin/manage-departments/new"
          className="inline-flex items-center justify-center gap-1.5 self-start rounded-xl bg-orange-600 px-4 py-2.5 text-sm font-semibold text-white shadow-xs transition hover:bg-orange-700 sm:self-auto dark:bg-orange-500 dark:text-slate-950 dark:hover:bg-orange-400"
        >
          <Plus className="h-4 w-4" />
          Add Department
        </Link>
      </div>

      {/* Feedback Banner */}
      {feedback && (
        <div
          role="status"
          className={`flex items-start gap-2.5 rounded-xl border p-4 text-sm ${
            feedback.type === "success"
              ? "border-green-500/30 bg-green-50 text-green-900 dark:border-green-400/30 dark:bg-green-500/10 dark:text-green-200"
              : "border-red-500/30 bg-red-50 text-red-900 dark:text-red-200"
          }`}
        >
          {feedback.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600 dark:text-green-400" />
          ) : (
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600 dark:text-red-400" />
          )}
          <span>{feedback.text}</span>
        </div>
      )}

      {/* Departments Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-400">
              <tr>
                <th className="px-6 py-3.5">Code</th>
                <th className="px-6 py-3.5">Department Name</th>
                <th className="px-6 py-3.5">HOD</th>
                <th className="px-6 py-3.5">Created At</th>
                <th className="px-6 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {loading ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-slate-500 dark:text-slate-400"
                  >
                    Loading departments...
                  </td>
                </tr>
              ) : departments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-10 text-center text-slate-500 dark:text-slate-400"
                  >
                    No departments found. Create your first one!
                  </td>
                </tr>
              ) : (
                departments.map((dept) => (
                  <tr
                    key={dept.id}
                    className="transition hover:bg-orange-50/40 dark:hover:bg-orange-500/5"
                  >
                    <td className="px-6 py-4 font-mono text-xs font-semibold text-orange-700 dark:text-orange-300">
                      {dept.code}
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                      {dept.name}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-500/10 dark:text-green-300">
                        {dept.hod?.fullName ||
                          dept.hod?.email ||
                          "Not Assigned"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 dark:text-slate-400">
                      {new Date(dept.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-2">
                        <Link
                          href={`/admin/admin/manage-departments/${dept.id}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:text-orange-400"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Link>
                        <button
                          type="button"
                          disabled={deletingId === dept.id}
                          onClick={() => void handleDelete(dept.id)}
                          className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-red-600/10 px-2.5 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-600 hover:text-white disabled:opacity-50 dark:text-red-300"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          {deletingId === dept.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
