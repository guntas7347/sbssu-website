'use client';

import { FileText, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function AcademicsPage() {
  return (
    <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Academics</h1>
              <p className="text-gray-600">Manage academic content, regulations, and programs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/admin/central/academics/regulations"
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="bg-orange-100 text-orange-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Academic Regulations</h2>
                <p className="text-gray-600">Manage academic regulations, policies, and related documents</p>
              </Link>

              <Link
                href="/admin/central/academics/courses"
                className="bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="bg-green-100 text-green-600 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-3">Courses & Programs</h2>
                <p className="text-gray-600">View and manage all courses and programs offered by the university</p>
              </Link>
            </div>
          </div>
    </main>
  );
}
