"use client";

import { useEffect, useState } from "react";
import { Building2, Users, Bell } from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    {
      label: "Total Departments",
      value: "-",
      icon: Building2,
      color: "bg-orange-100 text-orange-600",
      href: "/admin/admin/departments",
    },
    {
      label: "Total Users",
      value: "-",
      icon: Users,
      color: "bg-green-100 text-green-600",
      href: "/admin/admin/users",
    },
    {
      label: "Active Notices",
      value: "-",
      icon: Bell,
      color: "bg-blue-100 text-blue-600",
      href: "#",
    },
  ]);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/admin/stats");
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();

        setStats((prev) =>
          prev.map((s, i) => ({
            ...s,
            value: String(data[i] ?? "-"),
          }))
        );
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    }

    loadStats();
  }, []);

  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Welcome back! Here&rsquo;s an overview of the system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-1">
                      {stat.label}
                    </p>
                    <p className="text-4xl font-bold text-gray-800">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-4 rounded-xl`}>
                    <Icon className="w-8 h-8" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Recent Activities
            </h2>
            <div className="space-y-4">
              {[
                {
                  action: "New department added",
                  detail: "Computer Science Department",
                  time: "2 hours ago",
                },
                {
                  action: "User created",
                  detail: "Dr. Priya Sharma - Central Portal",
                  time: "5 hours ago",
                },
                {
                  action: "Department updated",
                  detail: "Mechanical Engineering",
                  time: "1 day ago",
                },
                {
                  action: "User permissions modified",
                  detail: "Prof. Amit Kumar",
                  time: "2 days ago",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
                >
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {activity.action}
                    </p>
                    <p className="text-sm text-gray-600">{activity.detail}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                href="/admin/admin/departments"
                className="block p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
              >
                <p className="font-semibold text-orange-700">
                  Add New Department
                </p>
                <p className="text-sm text-orange-600">
                  Create a new department profile
                </p>
              </Link>
              <Link
                href="/admin/admin/users"
                className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <p className="font-semibold text-green-700">Add New User</p>
                <p className="text-sm text-green-600">
                  Create user account and assign rights
                </p>
              </Link>
              <button className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                <p className="font-semibold text-blue-700">System Settings</p>
                <p className="text-sm text-blue-600">
                  Configure system preferences
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
