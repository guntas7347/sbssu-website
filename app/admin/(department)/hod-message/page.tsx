'use client';

import { useState } from 'react';
import { Save } from 'lucide-react';

export default function HODMessagePage() {
  const [content, setContent] = useState(`Dear Students and Faculty,

Welcome to the Computer Science & Engineering Department at Shaheed Bhagat Singh State University. It is my privilege to lead a department that stands at the forefront of technological innovation and academic excellence.

Our department is committed to providing quality education that equips students with the knowledge and skills needed to excel in the rapidly evolving field of computer science. We emphasize both theoretical understanding and practical application through our state-of-the-art laboratories and industry collaborations.

I encourage all students to make full use of the resources available, engage actively in research projects, and participate in various technical events and competitions. Our faculty members are always available to guide and mentor you in your academic journey.

Together, let us work towards making our department a center of excellence in computer science education and research.

Best wishes for your success.

Dr. Anil Kumar
Head of Department
Computer Science & Engineering`);

  return (
    <main className="flex-1 p-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">HOD Message</h1>
              <p className="text-gray-600">Edit the message from the Head of Department</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Message Content</label>
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
          </div>
    </main>
  );
}
