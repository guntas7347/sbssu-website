'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, X, Upload } from 'lucide-react';

interface Faculty {
  id: number;
  name: string;
  designation: string;
  qualification: string;
  email: string;
  phone: string;
}

export default function FacultyPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingFaculty, setEditingFaculty] = useState<Faculty | null>(null);

  const [faculty] = useState<Faculty[]>([
    { id: 1, name: 'Dr. Anil Kumar', designation: 'Professor & HOD', qualification: 'Ph.D. (CS)', email: 'anil.kumar@sbssferozepur.ac.in', phone: '+91-98765-43210' },
    { id: 2, name: 'Dr. Priya Sharma', designation: 'Associate Professor', qualification: 'Ph.D. (AI)', email: 'priya.sharma@sbssferozepur.ac.in', phone: '+91-98765-43211' },
    { id: 3, name: 'Dr. Rajesh Verma', designation: 'Associate Professor', qualification: 'Ph.D. (Networks)', email: 'rajesh.verma@sbssferozepur.ac.in', phone: '+91-98765-43212' },
    { id: 4, name: 'Prof. Neha Singh', designation: 'Assistant Professor', qualification: 'M.Tech (CS)', email: 'neha.singh@sbssferozepur.ac.in', phone: '+91-98765-43213' },
    { id: 5, name: 'Prof. Amit Gupta', designation: 'Assistant Professor', qualification: 'M.Tech (CS)', email: 'amit.gupta@sbssferozepur.ac.in', phone: '+91-98765-43214' },
    { id: 6, name: 'Dr. Sonia Patel', designation: 'Assistant Professor', qualification: 'Ph.D. (Data Science)', email: 'sonia.patel@sbssferozepur.ac.in', phone: '+91-98765-43215' },
    { id: 7, name: 'Prof. Vikram Singh', designation: 'Assistant Professor', qualification: 'M.Tech (CS)', email: 'vikram.singh@sbssferozepur.ac.in', phone: '+91-98765-43216' },
    { id: 8, name: 'Prof. Anjali Mehta', designation: 'Assistant Professor', qualification: 'M.Tech (CS)', email: 'anjali.mehta@sbssferozepur.ac.in', phone: '+91-98765-43217' },
  ]);

  return (
    <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Faculty Management</h1>
                <p className="text-gray-600">Manage department faculty members</p>
              </div>
              <button
                onClick={() => { setEditingFaculty(null); setShowModal(true); }}
                className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Faculty
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Designation</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Qualification</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {faculty.map((member, index) => (
                    <tr key={member.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-gray-800 font-medium">{member.name}</td>
                      <td className="px-6 py-4 text-gray-600">{member.designation}</td>
                      <td className="px-6 py-4 text-gray-600">{member.qualification}</td>
                      <td className="px-6 py-4 text-gray-600">{member.email}</td>
                      <td className="px-6 py-4 text-gray-600">{member.phone}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingFaculty(member); setShowModal(true); }} className="p-2 text-orange-600 hover:bg-orange-50 rounded">
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
              <h2 className="text-2xl font-bold">{editingFaculty ? 'Edit Faculty' : 'Add New Faculty'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input type="text" defaultValue={editingFaculty?.name} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Dr. John Doe" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Designation</label>
                  <select defaultValue={editingFaculty?.designation} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>Professor</option>
                    <option>Associate Professor</option>
                    <option>Assistant Professor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Qualification</label>
                  <input type="text" defaultValue={editingFaculty?.qualification} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="Ph.D. (CS)" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input type="email" defaultValue={editingFaculty?.email} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="email@sbssferozepur.ac.in" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input type="tel" defaultValue={editingFaculty?.phone} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" placeholder="+91-98765-43210" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Photo</label>
                <button type="button" className="flex items-center gap-2 px-4 py-3 border-2 border-dashed rounded-lg hover:border-orange-500 hover:bg-orange-50 w-full justify-center">
                  <Upload className="w-5 h-5" />
                  <span>Upload Photo</span>
                </button>
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 border rounded-lg font-semibold hover:bg-gray-50">Cancel</button>
                <button type="submit" onClick={(e) => { e.preventDefault(); setShowModal(false); }} className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700">{editingFaculty ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
