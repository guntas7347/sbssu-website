import { getAuth } from "@/lib/getAuth";
import prisma from "@/lib/prisma";
import Link from "next/link";
import {
  Building2,
  Users,
  Bell,
  Shield,
  PlusCircle,
  FileText,
  Clock,
  ArrowRight,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const auth = await getAuth();
  const now = new Date();

  const isSuperAdmin = auth?.roles?.includes("SUPER_ADMIN");

  const [
    departmentsCount,
    usersCount,
    totalNoticesCount,
    activeNoticesCount,
    pagesCount,
    recentNotices,
  ] = await Promise.all([
    prisma.department.count(),
    prisma.user.count(),
    prisma.notice.count(),
    prisma.notice.count({ where: { showTill: { gte: now } } }),
    prisma.page.count(),
    prisma.notice.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        category: true,
        date: true,
        showTill: true,
      },
    }),
  ]);

  return (
    <main className="flex-1 p-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-semibold px-2.5 py-1 bg-orange-100 text-orange-700 rounded-full uppercase">
                {auth?.roles?.join(", ") || "Editor"}
              </span>
              {auth?.department && (
                <span className="text-xs font-semibold px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
                  {auth.department.name}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Welcome back, {auth?.username || "Admin"}!
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage SBSSU website content, departments, users, and announcements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/content"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-orange-600 text-white rounded-xl font-semibold hover:bg-orange-700 transition-colors shadow-sm"
            >
              <Shield className="w-4 h-4" />
              <span>Edit Content (CMS)</span>
            </Link>
            <Link
              href="/admin/notices/create"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>New Notice</span>
            </Link>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-500">
                Departments
              </span>
              <div className="p-2.5 bg-orange-50 text-orange-600 rounded-xl">
                <Building2 className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-gray-900">
              {departmentsCount}
            </div>
            <p className="text-xs text-gray-500 mt-2">Active academic units</p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-500">
                Active Notices
              </span>
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                <Bell className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-gray-900">
              {activeNoticesCount}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {totalNoticesCount} total published notices
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-500">
                CMS Pages
              </span>
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-gray-900">
              {pagesCount}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Structured JSON page documents
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-500">
                Portal Users
              </span>
              <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-gray-900">
              {usersCount}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Authorized editors & admins
            </p>
          </div>
        </div>

        {/* Quick Access & Recent Notices */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Shortcuts */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 border-b pb-3">
              Admin Shortcuts
            </h2>

            <div className="space-y-3">
              <Link
                href="/admin/content"
                className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 hover:border-orange-500 hover:bg-orange-50/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-semibold text-sm text-gray-800">
                      Manage Content
                    </div>
                    <div className="text-xs text-gray-500">
                      Edit central & departmental pages
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
              </Link>

              <Link
                href="/admin/notices"
                className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 hover:border-orange-500 hover:bg-orange-50/50 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-semibold text-sm text-gray-800">
                      Manage Notices
                    </div>
                    <div className="text-xs text-gray-500">
                      Publish and archive circulars
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
              </Link>

              {isSuperAdmin && (
                <>
                  <Link
                    href="/admin/manage-departments"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 hover:border-orange-500 hover:bg-orange-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-emerald-600" />
                      <div>
                        <div className="font-semibold text-sm text-gray-800">
                          Manage Departments
                        </div>
                        <div className="text-xs text-gray-500">
                          Configure academic branches & codes
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
                  </Link>

                  <Link
                    href="/admin/manage-users"
                    className="flex items-center justify-between p-3.5 rounded-xl border border-gray-200 hover:border-orange-500 hover:bg-orange-50/50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-purple-600" />
                      <div>
                        <div className="font-semibold text-sm text-gray-800">
                          Manage Users
                        </div>
                        <div className="text-xs text-gray-500">
                          Assign roles and portal credentials
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Recent Notices */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b pb-3 mb-4">
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Announcements & Notices
                </h2>
                <Link
                  href="/admin/notices"
                  className="text-xs text-orange-600 hover:text-orange-700 font-semibold"
                >
                  View All →
                </Link>
              </div>

              <div className="divide-y divide-gray-100">
                {recentNotices.length > 0 ? (
                  recentNotices.map((n) => {
                    const isStillActive = new Date(n.showTill) >= now;
                    return (
                      <div
                        key={n.id}
                        className="py-3 flex items-center justify-between gap-4"
                      >
                        <div className="min-w-0">
                          <div className="font-medium text-sm text-gray-800 truncate">
                            {n.title}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                              {new Date(n.date).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                            <span className="uppercase px-1.5 py-0.5 bg-gray-100 rounded text-gray-600">
                              {n.category}
                            </span>
                          </div>
                        </div>

                        <div>
                          {isStillActive ? (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                              Active
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                              Expired
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-sm text-gray-400 py-6 text-center italic">
                    No recent notices found.
                  </p>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 mt-4">
              <Link
                href="/admin/notices/create"
                className="text-xs text-orange-600 font-semibold hover:underline inline-flex items-center gap-1"
              >
                + Create new announcement
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
