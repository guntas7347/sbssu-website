'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Download, Search } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function SyllabusPage() {
  const [syllabusData, setSyllabusData] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);
  const [selectedDept, setSelectedDept] = useState('all');

  useEffect(() => {
    Promise.all([
      fetch('/data/syllabus.json').then(res => res.json()),
      fetch('/data/departments.json').then(res => res.json())
    ])
      .then(([syllabi, depts]) => {
        setSyllabusData(syllabi);
        setDepartments(depts);
      })
      .catch(err => console.error('Error loading data:', err));
  }, []);

  const filteredSyllabus = selectedDept === 'all'
    ? syllabusData
    : syllabusData.filter(s => s.department_id === parseInt(selectedDept));

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <BookOpen className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Syllabus</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Course syllabi for all programs and semesters
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-gray-400" />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSyllabus.map((syllabus) => {
              const dept = departments.find(d => d.id === syllabus.department_id);
              return (
                <div key={syllabus.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{syllabus.course_name}</h3>
                      <p className="text-sm text-gray-600">Semester {syllabus.semester}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{dept?.name || 'Department'}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">AY {syllabus.academic_year}</span>
                    <a
                      href={syllabus.file_url}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-semibold"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredSyllabus.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No syllabus found for the selected department.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
