'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ClipboardList } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function SurveyPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [department, setDepartment] = useState<any>(null);

  useEffect(() => {
    fetch('/data/departments.json')
      .then(res => res.json())
      .then(data => {
        const dept = data.find((d: any) => d.slug === slug);
        setDepartment(dept);
      })
      .catch(err => console.error('Error loading department:', err));
  }, [slug]);

  if (!department) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center text-gray-500">Loading...</div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <ClipboardList className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{department.name}</h1>
          <p className="text-lg md:text-xl">Student Survey Form</p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Student Feedback Survey</h2>
            <p className="text-gray-600 mb-8">
              Your feedback is valuable to us. Please take a moment to complete this survey about your experience in the department.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Name</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Roll Number</label>
                <input type="text" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Semester</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent">
                  <option>Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Rate Teaching Quality (1-5)</label>
                <input type="range" min="1" max="5" className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Rate Lab Facilities (1-5)</label>
                <input type="range" min="1" max="5" className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">Overall Feedback</label>
                <textarea rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"></textarea>
              </div>

              <button className="w-full px-8 py-4 bg-gradient-to-r from-orange-600 to-green-600 text-white rounded-lg font-semibold hover:opacity-90 transition">
                Submit Survey
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
