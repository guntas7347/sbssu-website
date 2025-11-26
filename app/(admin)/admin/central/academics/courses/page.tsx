'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface Course {
  id: number;
  name: string;
  department: string;
  degreeType: string;
  duration: string;
  eligibility: string;
}

export default function CoursesPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  const [courses] = useState<Course[]>([
    { id: 1, name: 'B.Tech Computer Science', department: 'CSE', degreeType: 'Undergraduate', duration: '4 Years', eligibility: '10+2 with Physics, Chemistry, Maths' },
    { id: 2, name: 'M.Tech Computer Science', department: 'CSE', degreeType: 'Postgraduate', duration: '2 Years', eligibility: 'B.Tech in relevant field' },
    { id: 3, name: 'B.Tech Mechanical Engineering', department: 'ME', degreeType: 'Undergraduate', duration: '4 Years', eligibility: '10+2 with PCM' },
    { id: 4, name: 'B.Tech Electrical Engineering', department: 'EE', degreeType: 'Undergraduate', duration: '4 Years', eligibility: '10+2 with PCM' },
    { id: 5, name: 'B.Tech Civil Engineering', department: 'CE', degreeType: 'Undergraduate', duration: '4 Years', eligibility: '10+2 with PCM' },
    { id: 6, name: 'B.Tech Information Technology', department: 'IT', degreeType: 'Undergraduate', duration: '4 Years', eligibility: '10+2 with PCM' },
    { id: 7, name: 'MBA', department: 'Management', degreeType: 'Postgraduate', duration: '2 Years', eligibility: 'Graduation in any discipline' },
    { id: 8, name: 'MCA', department: 'Computer Applications', degreeType: 'Postgraduate', duration: '2 Years', eligibility: 'BCA/B.Sc CS/IT' },
  ]);

  return (
    <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <Link href="/admin/central/academics" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Academics
              </Link>
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">Courses & Programs</h1>
                  <p className="text-gray-600">Manage all courses offered by the university</p>
                </div>
                <button
                  onClick={() => { setEditingCourse(null); setShowModal(true); }}
                  className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  Add Course
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Program Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Degree Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Duration</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {courses.map((course, index) => (
                    <tr key={course.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-gray-800 font-medium">{course.name}</td>
                      <td className="px-6 py-4 text-gray-600">{course.department}</td>
                      <td className="px-6 py-4 text-gray-600">{course.degreeType}</td>
                      <td className="px-6 py-4 text-gray-600">{course.duration}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingCourse(course); setShowModal(true); }} className="p-2 text-orange-600 hover:bg-orange-50 rounded">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold">{editingCourse ? 'Edit Course' : 'Add New Course'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Program Name</label>
                <input type="text" defaultValue={editingCourse?.name} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <select defaultValue={editingCourse?.department} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>CSE</option>
                    <option>ME</option>
                    <option>EE</option>
                    <option>CE</option>
                    <option>IT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Degree Type</label>
                  <select defaultValue={editingCourse?.degreeType} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Undergraduate</option>
                    <option>Postgraduate</option>
                    <option>Diploma</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Duration</label>
                <input type="text" defaultValue={editingCourse?.duration} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g., 4 Years" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Eligibility</label>
                <textarea defaultValue={editingCourse?.eligibility} rows={3} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 border rounded-lg font-semibold hover:bg-gray-50">Cancel</button>
                <button type="submit" onClick={(e) => { e.preventDefault(); setShowModal(false); }} className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700">{editingCourse ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
