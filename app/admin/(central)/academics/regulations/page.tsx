'use client';

import { useState } from 'react';
import { ArrowLeft, Save, Upload, Trash2, FileText } from 'lucide-react';
import Link from 'next/link';

export default function RegulationsPage() {
  const [content, setContent] = useState(`ACADEMIC REGULATIONS - Shaheed Bhagat Singh State University

1. ADMISSION PROCEDURES
All admissions are conducted as per university norms and state government guidelines. Merit-based selection with reservation policies as applicable.

2. EXAMINATION SYSTEM
Semester-based examination system with continuous internal assessment (30%) and end-semester examination (70%).

3. GRADING SYSTEM
- O (Outstanding): 9.0-10.0
- A+ (Excellent): 8.0-8.99
- A (Very Good): 7.0-7.99
- B+ (Good): 6.0-6.99
- B (Above Average): 5.0-5.99
- C (Average): 4.0-4.99

4. ATTENDANCE REQUIREMENTS
Minimum 75% attendance mandatory in theory and practical classes.

5. ACADEMIC INTEGRITY
Strict adherence to academic honesty. Plagiarism and malpractices will attract disciplinary action.`);

  const [attachments] = useState([
    { id: 1, name: 'Academic_Regulations_2024.pdf', uploadDate: '2024-08-01', size: '2.8 MB' },
    { id: 2, name: 'Examination_Guidelines.pdf', uploadDate: '2024-08-01', size: '1.6 MB' },
  ]);

  return (
    <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <Link href="/admin/central/academics" className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium mb-4">
                <ArrowLeft className="w-4 h-4" />
                Back to Academics
              </Link>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Academic Regulations</h1>
              <p className="text-gray-600">Edit academic regulations and upload related documents</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Regulations Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={16}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              ></textarea>
              <div className="flex justify-end mt-4">
                <button className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-800">Attachments</h2>
                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                  <Upload className="w-4 h-4" />
                  Upload File
                </button>
              </div>
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">File Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Upload Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">File Size</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {attachments.map((file, index) => (
                    <tr key={file.id} className={index % 2 === 0 ? 'bg-white border-b' : 'bg-gray-50 border-b'}>
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
    </main>
  );
}
