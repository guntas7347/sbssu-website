'use client';

import { useState, useEffect } from 'react';
import { Briefcase, Calendar, AlertCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function CareerPage() {
  const [careerNotices, setCareerNotices] = useState<any[]>([]);

  useEffect(() => {
    fetch('/data/career-notices.json')
      .then(res => res.json())
      .then(data => setCareerNotices(data.filter((n: any) => n.is_active)))
      .catch(err => console.error('Error loading career notices:', err));
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Briefcase className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Career Opportunities</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Join SBSSU and be part of a dynamic team dedicated to excellence in education
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {careerNotices.map((notice) => (
              <div key={notice.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{notice.title}</h3>
                    <p className="text-sm font-semibold text-orange-600 mb-3">{notice.position}</p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{notice.description}</p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <AlertCircle className="w-4 h-4" />
                    <span>Last Date: {new Date(notice.last_date).toLocaleDateString('en-IN')}</span>
                  </div>
                  {notice.file_url && (
                    <a
                      href={notice.file_url}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold text-sm"
                    >
                      Download Details
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {careerNotices.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No current openings. Please check back later.
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
