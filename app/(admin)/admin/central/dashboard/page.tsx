'use client';

import { Shield, BookOpen, Bell, FileText } from 'lucide-react';
import Link from 'next/link';

export default function CentralDashboard() {
  const stats = [
    {
      label: 'Administration Pages',
      value: '10',
      icon: Shield,
      color: 'bg-orange-100 text-orange-600',
      href: '/admin/central/administration',
    },
    {
      label: 'Academic Programs',
      value: '24',
      icon: BookOpen,
      color: 'bg-green-100 text-green-600',
      href: '/admin/central/academics',
    },
    {
      label: 'Active Notices',
      value: '12',
      icon: Bell,
      color: 'bg-blue-100 text-blue-600',
      href: '/admin/central/notices',
    },
    {
      label: 'Documents',
      value: '48',
      icon: FileText,
      color: 'bg-purple-100 text-purple-600',
      href: '#',
    },
  ];

  return (
    <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Central Portal Dashboard</h1>
              <p className="text-gray-600">Manage university-wide content and information</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Link
                    key={stat.label}
                    href={stat.href}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </Link>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link
                    href="/admin/central/administration"
                    className="block p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors"
                  >
                    <p className="font-semibold text-orange-700">Edit Administration Content</p>
                    <p className="text-sm text-orange-600">Update VC message, governance, etc.</p>
                  </Link>
                  <Link
                    href="/admin/central/academics"
                    className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                  >
                    <p className="font-semibold text-green-700">Manage Academic Content</p>
                    <p className="text-sm text-green-600">Update courses and regulations</p>
                  </Link>
                  <Link
                    href="/admin/central/notices"
                    className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <p className="font-semibold text-blue-700">Post New Notice</p>
                    <p className="text-sm text-blue-600">Create university-wide announcements</p>
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Updates</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Academic Council Meeting Minutes', date: '2 days ago', type: 'Administration' },
                    { title: 'B.Tech CSE Curriculum Updated', date: '5 days ago', type: 'Academics' },
                    { title: 'Semester Exam Schedule Released', date: '1 week ago', type: 'Notice' },
                    { title: 'University By-Laws Amendment', date: '2 weeks ago', type: 'Administration' },
                  ].map((update, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{update.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">{update.type}</span>
                          <span className="text-xs text-gray-400">{update.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
    </main>
  );
}
