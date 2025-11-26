'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function DepartmentAboutPage() {
  const [content, setContent] = useState(`The Department of Computer Science & Engineering was established in 2010 with the vision of becoming a center of excellence in computer science education and research.

DEPARTMENT HIGHLIGHTS:
- Established: 2010
- Faculty: 15 highly qualified members (8 Ph.D. holders)
- Students: 120+ undergraduate and postgraduate students
- Research Areas: AI/ML, IoT, Cybersecurity, Data Science, Cloud Computing

INFRASTRUCTURE:
- 8 well-equipped laboratories
- Advanced computing facilities
- 24/7 internet connectivity
- Smart classrooms with modern teaching aids

ACHIEVEMENTS:
- 95% placement record
- Multiple research publications in reputed journals
- MoUs with leading IT companies
- Active coding clubs and technical societies

PROGRAMS OFFERED:
- B.Tech in Computer Science & Engineering (4 years)
- M.Tech in Computer Science & Engineering (2 years)

The department maintains strong industry linkages and regularly organizes workshops, seminars, and guest lectures by industry experts.`);

  return (
    <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Department About</h1>
              <p className="text-gray-600">Edit the department information and overview</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Department Information</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={20}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              ></textarea>
              <div className="flex justify-end mt-4">
                <button className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors">
                  <Save className="w-5 h-5" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
    </main>
  );
}
