'use client';

import { useState } from 'react';
import { Upload, Trash2, FileText } from 'lucide-react';

export default function TimetablePage() {
  const [attachments] = useState([
    { id: 1, name: 'BTech_CSE_Sem5_Timetable.pdf', uploadDate: '2024-10-01', size: '1.2 MB' },
    { id: 2, name: 'BTech_CSE_Sem3_Timetable.pdf', uploadDate: '2024-09-28', size: '980 KB' },
    { id: 3, name: 'MTech_CSE_Sem1_Timetable.pdf', uploadDate: '2024-09-25', size: '850 KB' },
    { id: 4, name: 'BTech_CSE_Sem7_Timetable.pdf', uploadDate: '2024-09-20', size: '1.1 MB' },
  ]);

  return (
    <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Timetable Management</h1>
              <p className="text-gray-600">Upload and manage department timetables</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Timetable Files</h2>
                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  Upload Timetable
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">File Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Upload Date</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">File Size</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {attachments.map((file, index) => (
                      <tr key={file.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-4 py-3 flex items-center gap-2 text-gray-800">
                          <FileText className="w-5 h-5 text-red-500" />
                          {file.name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{file.uploadDate}</td>
                        <td className="px-4 py-3 text-gray-600">{file.size}</td>
                        <td className="px-4 py-3">
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    </main>
  );
}
