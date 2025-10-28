'use client';

import { Scale, FileText, BookOpen } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function GovernancePage() {
  const governanceAreas = [
    {
      title: 'University Statutes',
      description: 'Statutory framework governing the university operations',
      items: ['SBS Act 2021', 'University Statutes', 'Amendments']
    },
    {
      title: 'Administrative Structure',
      description: 'Organizational hierarchy and reporting structure',
      items: ['Vice Chancellor Office', 'Registrar Office', 'Dean Offices', 'Department Heads']
    },
    {
      title: 'Decision Making Bodies',
      description: 'Key bodies responsible for university governance',
      items: ['Board of Governors', 'Academic Council', 'Finance Committee', 'Building Committee']
    },
    {
      title: 'Policies & Procedures',
      description: 'University policies and operational procedures',
      items: ['Admission Policy', 'Examination Policy', 'Research Policy', 'HR Policy']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Scale className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Governance</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            University governance structure, policies, and procedures
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About University Governance</h2>
            <p className="text-gray-600 leading-relaxed">
              The governance structure of SBSSU ensures transparency, accountability, and effective administration. Our governance framework is designed to promote academic excellence, research innovation, and overall institutional development while maintaining the highest standards of integrity and ethical conduct.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {governanceAreas.map((area, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{area.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{area.description}</p>
                <ul className="space-y-2">
                  {area.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-green-50 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <BookOpen className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">SBS Act 2021</h3>
                <p className="text-gray-600 mb-4">
                  The Shaheed Bhagat Singh State University Act, 2021 establishes the legal framework for the university's operation, governance structure, and academic programs.
                </p>
                <a href="/downloads/sbs-act-2021.pdf" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold">
                  Download SBS Act 2021
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
