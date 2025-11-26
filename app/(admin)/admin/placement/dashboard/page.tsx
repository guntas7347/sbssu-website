'use client';

import { Briefcase, Building2, TrendingUp, Award } from 'lucide-react';
import Link from 'next/link';

export default function PlacementDashboard() {
  const stats = [
    { label: 'Total Placements', value: '85', icon: Briefcase, color: 'bg-orange-100 text-orange-600' },
    { label: 'Companies', value: '45', icon: Building2, color: 'bg-green-100 text-green-600' },
    { label: 'Avg Package', value: '12.5 LPA', icon: TrendingUp, color: 'bg-blue-100 text-blue-600' },
    { label: 'Placement Rate', value: '95%', icon: Award, color: 'bg-purple-100 text-purple-600' },
  ];

  const topRecruiters = [
    'TCS', 'Infosys', 'Wipro', 'Tech Mahindra', 'HCL Technologies',
    'Cognizant', 'Accenture', 'IBM', 'Capgemini', 'L&T Infotech'
  ];

  return (
    <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Placement Dashboard</h1>
              <p className="text-gray-600">Track and manage student placements</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Link href="/admin/placement/records" className="block p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
                    <p className="font-semibold text-orange-700">Add Placement Record</p>
                    <p className="text-sm text-orange-600">Record new student placement</p>
                  </Link>
                  <Link href="/admin/placement/records" className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
                    <p className="font-semibold text-green-700">View All Records</p>
                    <p className="text-sm text-green-600">Browse placement history</p>
                  </Link>
                  <button className="w-full text-left p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    <p className="font-semibold text-blue-700">Generate Report</p>
                    <p className="text-sm text-blue-600">Export placement statistics</p>
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Top Recruiters</h2>
                <div className="grid grid-cols-2 gap-3">
                  {topRecruiters.map((company, index) => (
                    <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium text-sm">{company}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Placements</h2>
              <div className="space-y-4">
                {[
                  { student: 'Rajat Sharma', company: 'TCS', package: '7.5 LPA', department: 'CSE', date: '2024-10-15' },
                  { student: 'Priya Singh', company: 'Infosys', package: '8.0 LPA', department: 'IT', date: '2024-10-12' },
                  { student: 'Amit Kumar', company: 'Wipro', package: '6.5 LPA', department: 'CSE', date: '2024-10-10' },
                  { student: 'Neha Gupta', company: 'Tech Mahindra', package: '7.0 LPA', department: 'ECE', date: '2024-10-08' },
                ].map((record, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{record.student}</p>
                      <p className="text-sm text-gray-600">{record.department}</p>
                    </div>
                    <div className="text-center px-4">
                      <p className="font-semibold text-gray-800">{record.company}</p>
                      <p className="text-sm text-gray-600">{record.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-600">{record.package}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
    </main>
  );
}
