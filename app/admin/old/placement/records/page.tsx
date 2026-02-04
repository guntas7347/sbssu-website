'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

interface PlacementRecord {
  id: number;
  studentName: string;
  company: string;
  package: string;
  position: string;
  department: string;
  year: number;
}

export default function PlacementRecordsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingRecord, setEditingRecord] = useState<PlacementRecord | null>(null);

  const [records] = useState<PlacementRecord[]>([
    { id: 1, studentName: 'Rajat Sharma', company: 'TCS', package: '7.5 LPA', position: 'Software Engineer', department: 'CSE', year: 2024 },
    { id: 2, studentName: 'Priya Singh', company: 'Infosys', package: '8.0 LPA', position: 'System Engineer', department: 'IT', year: 2024 },
    { id: 3, studentName: 'Amit Kumar', company: 'Wipro', package: '6.5 LPA', position: 'Developer', department: 'CSE', year: 2024 },
    { id: 4, studentName: 'Neha Gupta', company: 'Tech Mahindra', package: '7.0 LPA', position: 'Software Developer', department: 'ECE', year: 2024 },
    { id: 5, studentName: 'Vikram Mehta', company: 'HCL Technologies', package: '6.0 LPA', position: 'Technical Associate', department: 'IT', year: 2024 },
    { id: 6, studentName: 'Anjali Verma', company: 'Cognizant', package: '7.5 LPA', position: 'Programmer Analyst', department: 'CSE', year: 2024 },
    { id: 7, studentName: 'Rohit Patel', company: 'Accenture', package: '8.5 LPA', position: 'Application Developer', department: 'IT', year: 2024 },
    { id: 8, studentName: 'Sneha Reddy', company: 'IBM', package: '9.0 LPA', position: 'Software Engineer', department: 'CSE', year: 2024 },
    { id: 9, studentName: 'Karan Singh', company: 'Capgemini', package: '7.2 LPA', position: 'Analyst', department: 'IT', year: 2024 },
    { id: 10, studentName: 'Divya Sharma', company: 'L&T Infotech', package: '6.8 LPA', position: 'Software Engineer', department: 'ECE', year: 2024 },
  ]);

  return (
    <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Placement Records</h1>
                <p className="text-gray-600">Manage student placement information</p>
              </div>
              <button
                onClick={() => { setEditingRecord(null); setShowModal(true); }}
                className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Placement
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Student Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Company</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Package</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Position</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Year</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {records.map((record, index) => (
                    <tr key={record.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-gray-800 font-medium">{record.studentName}</td>
                      <td className="px-6 py-4 text-gray-600">{record.company}</td>
                      <td className="px-6 py-4 text-green-600 font-semibold">{record.package}</td>
                      <td className="px-6 py-4 text-gray-600">{record.position}</td>
                      <td className="px-6 py-4 text-gray-600">{record.department}</td>
                      <td className="px-6 py-4 text-gray-600">{record.year}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingRecord(record); setShowModal(true); }} className="p-2 text-orange-600 hover:bg-orange-50 rounded">
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
              <h2 className="text-2xl font-bold">{editingRecord ? 'Edit Placement' : 'Add Placement Record'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Student Name</label>
                <input type="text" defaultValue={editingRecord?.studentName} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Enter student name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <input type="text" defaultValue={editingRecord?.company} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g., TCS" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Package</label>
                  <input type="text" defaultValue={editingRecord?.package} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g., 7.5 LPA" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Position/Role</label>
                <input type="text" defaultValue={editingRecord?.position} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="e.g., Software Engineer" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <select defaultValue={editingRecord?.department} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>CSE</option>
                    <option>IT</option>
                    <option>ECE</option>
                    <option>ME</option>
                    <option>EE</option>
                    <option>CE</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Placement Year</label>
                  <input type="number" defaultValue={editingRecord?.year || 2024} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="2024" />
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 border rounded-lg font-semibold hover:bg-gray-50">Cancel</button>
                <button type="submit" onClick={(e) => { e.preventDefault(); setShowModal(false); }} className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700">{editingRecord ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
