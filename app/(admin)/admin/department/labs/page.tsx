'use client';

import { useState } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';

interface Lab {
  id: number;
  name: string;
  code: string;
  facilities: string;
  incharge: string;
}

export default function LabsPage() {
  const [showModal, setShowModal] = useState(false);
  const [editingLab, setEditingLab] = useState<Lab | null>(null);

  const [labs] = useState<Lab[]>([
    { id: 1, name: 'Computer Programming Lab', code: 'CSE-LAB-01', facilities: '40 Desktop PCs, C/C++/Java/Python IDEs', incharge: 'Prof. Amit Gupta' },
    { id: 2, name: 'Data Structures Lab', code: 'CSE-LAB-02', facilities: '35 Desktop PCs, Visualization Tools', incharge: 'Prof. Neha Singh' },
    { id: 3, name: 'Database Management Lab', code: 'CSE-LAB-03', facilities: '30 Systems, MySQL, PostgreSQL, MongoDB', incharge: 'Dr. Priya Sharma' },
    { id: 4, name: 'Networking Lab', code: 'CSE-LAB-04', facilities: 'Cisco Routers, Switches, Network Simulators', incharge: 'Dr. Rajesh Verma' },
    { id: 5, name: 'Web Development Lab', code: 'CSE-LAB-05', facilities: '35 PCs, Modern Web Dev Tools', incharge: 'Prof. Vikram Singh' },
    { id: 6, name: 'AI & ML Lab', code: 'CSE-LAB-06', facilities: 'High-end workstations, GPU systems, ML frameworks', incharge: 'Dr. Sonia Patel' },
  ]);

  return (
    <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Lab Details</h1>
                <p className="text-gray-600">Manage department laboratory information</p>
              </div>
              <button
                onClick={() => { setEditingLab(null); setShowModal(true); }}
                className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg"
              >
                <Plus className="w-5 h-5" />
                Add Lab
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Lab Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Lab Code</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">In-charge</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {labs.map((lab, index) => (
                    <tr key={lab.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-gray-800 font-medium">{lab.name}</td>
                      <td className="px-6 py-4 text-gray-600">{lab.code}</td>
                      <td className="px-6 py-4 text-gray-600">{lab.incharge}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button onClick={() => { setEditingLab(lab); setShowModal(true); }} className="p-2 text-orange-600 hover:bg-orange-50 rounded">
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
              <h2 className="text-2xl font-bold">{editingLab ? 'Edit Lab' : 'Add New Lab'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded"><X className="w-6 h-6" /></button>
            </div>
            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Lab Name</label>
                <input type="text" defaultValue={editingLab?.name} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Lab Code</label>
                <input type="text" defaultValue={editingLab?.code} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Equipment/Facilities</label>
                <textarea defaultValue={editingLab?.facilities} rows={4} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">In-charge Name</label>
                <input type="text" defaultValue={editingLab?.incharge} className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
              </div>
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowModal(false)} className="px-6 py-3 border rounded-lg font-semibold hover:bg-gray-50">Cancel</button>
                <button type="submit" onClick={(e) => { e.preventDefault(); setShowModal(false); }} className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700">{editingLab ? 'Update' : 'Add'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
