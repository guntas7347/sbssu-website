"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Building2,
  Calendar,
  Copy,
  Loader2,
  Mail,
  Phone,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { getCurrentUser } from "@/lib/actions/auth";
import {
  getUserProfileById,
  type ReadOnlyUserDetail,
} from "@/lib/actions/users";

function formatTimestamp(value: Date | string): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ReadOnlyUserPage() {
  const params = useParams<{ id: string }>();
  const id = typeof params?.id === "string" ? params.id : "";

  const [user, setUser] = useState<ReadOnlyUserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      if (!id) {
        if (active) {
          setError("Invalid user ID.");
          setLoading(false);
        }
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const actor = await getCurrentUser();
        if (!actor) {
          throw new Error("Unauthorized: Please log in.");
        }

        const profile = await getUserProfileById(id);
        if (!active) return;

        if (!profile) {
          setError("User record not found.");
        } else {
          setUser(profile);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Failed to load user details.",
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadUser();

    return () => {
      active = false;
    };
  }, [id]);

  const rightsList = Array.isArray(user?.rights) ? user.rights : [];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        badge="SBSSU Admin Portal · Read-Only"
        title={user?.fullName || user?.username || user?.id || "User Profile"}
        description="Read-only view of user identity, assigned rights, and department mapping."
        backHref="/admin/notices"
        backLabel="Back"
      />

      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xs dark:border-slate-800 dark:bg-slate-900">
        <Link
          href="/admin/notices"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-orange-400 dark:hover:text-orange-400"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back</span>
        </Link>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-600/10 px-3 py-1 font-mono text-[11px] font-semibold text-green-700 dark:bg-green-500/15 dark:text-green-400">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>Read-Only Record</span>
        </span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white p-10 text-xs font-medium text-slate-500 shadow-xs dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <Loader2 className="h-4 w-4 animate-spin text-orange-600 dark:text-orange-400" />
          <span>Loading user details...</span>
        </div>
      ) : error || !user ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-xs font-medium text-red-700 dark:border-red-900/60 dark:bg-red-950/40 dark:text-red-300">
          {error || "User record not found."}
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-orange-600 uppercase dark:text-orange-400">
              <UserIcon className="h-4 w-4" />
              <span>Account Information</span>
            </div>

            <dl className="divide-y divide-slate-200 text-xs sm:text-sm dark:divide-slate-800">
              <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <dt className="font-medium text-slate-500 dark:text-slate-400">
                  User ID
                </dt>
                <dd className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-slate-900 dark:text-white">
                  <Copy className="h-3.5 w-3.5 text-slate-400" />
                  <span>{user.id}</span>
                </dd>
              </div>

              <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <dt className="font-medium text-slate-500 dark:text-slate-400">
                  Full Name
                </dt>
                <dd className="font-semibold text-slate-900 dark:text-white">
                  {user.fullName || "—"}
                </dd>
              </div>

              <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <dt className="font-medium text-slate-500 dark:text-slate-400">
                  Username
                </dt>
                <dd className="font-mono text-xs font-medium text-slate-800 dark:text-slate-200">
                  {user.username || "—"}
                </dd>
              </div>

              <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <dt className="inline-flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400">
                  <Mail className="h-3.5 w-3.5 text-orange-600 dark:text-orange-400" />
                  <span>Email</span>
                </dt>
                <dd className="font-medium text-slate-800 dark:text-slate-200">
                  {user.email || "—"}
                </dd>
              </div>

              <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <dt className="inline-flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400">
                  <Phone className="h-3.5 w-3.5 text-green-600 dark:text-green-400" />
                  <span>Phone</span>
                </dt>
                <dd className="font-mono text-xs font-medium text-slate-800 dark:text-slate-200">
                  {user.phone || "—"}
                </dd>
              </div>
            </dl>
          </section>

          <section className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-xs dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 text-xs font-bold tracking-wider text-green-700 uppercase dark:text-green-400">
              <Building2 className="h-4 w-4" />
              <span>Rights & Department</span>
            </div>

            <div className="space-y-2 py-2">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Assigned Rights
              </div>
              {rightsList.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {rightsList.map((right) => (
                    <span
                      key={right}
                      className="rounded-full bg-orange-500/10 px-3 py-1 font-mono text-xs font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                    >
                      {right}
                    </span>
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-400">No rights assigned</div>
              )}
            </div>

            <dl className="divide-y divide-slate-200 border-t border-slate-200 text-xs sm:text-sm dark:divide-slate-800 dark:border-slate-800">
              <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <dt className="font-medium text-slate-500 dark:text-slate-400">
                  Department ID
                </dt>
                <dd className="font-mono text-xs text-slate-700 dark:text-slate-300">
                  {user.departmentId || "—"}
                </dd>
              </div>

              {user.department ? (
                <>
                  <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <dt className="font-medium text-slate-500 dark:text-slate-400">
                      Department
                    </dt>
                    <dd className="font-semibold text-slate-900 dark:text-white">
                      {user.department.name}{" "}
                      <span className="ml-1 rounded-md bg-green-600/10 px-2 py-0.5 font-mono text-xs text-green-700 dark:bg-green-500/15 dark:text-green-400">
                        {user.department.code}
                      </span>
                    </dd>
                  </div>

                  <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <dt className="font-medium text-slate-500 dark:text-slate-400">
                      HOD ID
                    </dt>
                    <dd className="font-mono text-xs text-slate-700 dark:text-slate-300">
                      <Link
                        href={`/admin/admin/users/${user.department.hodId}`}
                        className="font-mono underline-offset-2 text-orange-400 hover:text-orange-600 hover:underline dark:text-orange-200 dark:hover:text-orange-400"
                      >
                        {user.department.hodId}
                      </Link>
                    </dd>
                  </div>

                  <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <dt className="font-medium text-slate-500 dark:text-slate-400">
                      Department Created By
                    </dt>
                    <dd className="font-mono text-xs text-slate-700 dark:text-slate-300">
                      <Link
                        href={`/admin/admin/users/${user.department.createdBy}`}
                        className="font-mono underline-offset-2 text-orange-400 hover:text-orange-600 hover:underline dark:text-orange-200 dark:hover:text-orange-400"
                      >
                        {user.department.createdBy}
                      </Link>
                    </dd>
                  </div>
                </>
              ) : (
                <div className="py-3 text-xs text-slate-400">
                  No department linked
                </div>
              )}

              <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <dt className="inline-flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>Created At</span>
                </dt>
                <dd className="text-xs text-slate-700 dark:text-slate-300">
                  {formatTimestamp(user.createdAt)}
                </dd>
              </div>

              <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <dt className="inline-flex items-center gap-1.5 font-medium text-slate-500 dark:text-slate-400">
                  <Calendar className="h-3.5 w-3.5 text-slate-400" />
                  <span>Updated At</span>
                </dt>
                <dd className="text-xs text-slate-700 dark:text-slate-300">
                  {formatTimestamp(user.updatedAt)}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      )}
    </div>
  );
}
