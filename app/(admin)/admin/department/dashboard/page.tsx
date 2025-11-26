'use client';

import { GraduationCap, FlaskConical, Bell, Users } from 'lucide-react';
import Link from 'next/link';

export default function DepartmentalDashboard() {
  const stats = [
    { label: 'Faculty Members', value: '15', icon: GraduationCap, color: 'bg-orange-100 text-orange-600', href: '/departmental/faculty' },
    { label: 'Labs', value: '8', icon: FlaskConical, color: 'bg-green-100 text-green-600', href: '/departmental/labs' },
    { label: 'Active Notices', value: '5', icon: Bell, color: 'bg-blue-100 text-blue-600', href: '/departmental/notices' },
    { label: 'Students', value: '120', icon: Users, color: 'bg-purple-100 text-purple-600', href: '#' },
  ];

  return (
    <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Departmental Dashboard</h1>
              <p className="text-gray-600">Computer Science & Engineering Department</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Link key={stat.label} href={stat.href} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow">
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
                  <Link href="/admin/departmental/hod-message" className="block p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                    <p className="font-semibold text-orange-700">Update HOD Message</p>
                    <p className="text-sm text-orange-600">Edit department head's message</p>
                  </Link>
                  <Link href="/admin/departmental/faculty" className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                    <p className="font-semibold text-green-700">Manage Faculty</p>
                    <p className="text-sm text-green-600">Add or update faculty information</p>
                  </Link>
                  <Link href="/admin/departmental/notices" className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <p className="font-semibold text-blue-700">Post Department Notice</p>
                    <p className="text-sm text-blue-600">Create announcements for students</p>
                  </Link>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activities</h2>
                <div className="space-y-4">
                  {[
                    { title: 'New faculty member added', detail: 'Dr. Priya Sharma joined', time: '1 day ago' },
                    { title: 'Lab equipment updated', detail: 'Computer Lab - Block A', time: '3 days ago' },
                    { title: 'Department notice posted', detail: 'Workshop announcement', time: '5 days ago' },
                    { title: 'Timetable updated', detail: 'B.Tech CSE - Semester 5', time: '1 week ago' },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{activity.title}</p>
                        <p className="text-sm text-gray-600">{activity.detail}</p>
                        <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
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
