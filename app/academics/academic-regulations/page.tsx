'use client';

import { FileText, Download, BookOpen, CheckCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AcademicRegulationsPage() {
  const regulations = [
    {
      category: 'Admission',
      items: [
        'Admission based on merit/entrance exam as per program',
        'Minimum eligibility criteria must be met',
        'Document verification mandatory before admission',
        'Anti-ragging affidavit required from all students'
      ]
    },
    {
      category: 'Attendance',
      items: [
        'Minimum 75% attendance mandatory in each subject',
        'Medical leave requires valid certificate',
        'Shortage of attendance may result in detention',
        'Biometric attendance system in place'
      ]
    },
    {
      category: 'Examination',
      items: [
        'Mid-semester and end-semester examinations',
        'Continuous internal assessment throughout semester',
        'Minimum 40% required to pass each subject',
        'Supplementary exams for failed subjects'
      ]
    },
    {
      category: 'Promotion',
      items: [
        'Student must clear all subjects of previous semesters',
        'Carry forward of maximum 2 subjects allowed',
        'Promotion subject to academic performance',
        'Minimum CGPA requirements must be maintained'
      ]
    },
    {
      category: 'Conduct',
      items: [
        'Maintain discipline and decorum on campus',
        'Ragging strictly prohibited - punishable by law',
        'Use of mobile phones restricted in classrooms',
        'Proper dress code to be followed'
      ]
    },
    {
      category: 'Grading System',
      items: [
        'Grade points: O(10), A+(9), A(8), B+(7), B(6), C(5), P(4)',
        'SGPA calculated each semester',
        'CGPA is cumulative grade point average',
        'Degree awarded based on final CGPA'
      ]
    }
  ];

  const documents = [
    {
      title: 'Academic Regulations 2024-25',
      description: 'Complete academic regulations for all programs',
      url: '/downloads/academic-regulations-2024.pdf',
      size: '2.1 MB'
    },
    {
      title: 'Examination Rules',
      description: 'Guidelines for examinations and evaluation',
      url: '/downloads/examination-rules.pdf',
      size: '1.5 MB'
    },
    {
      title: 'Anti-Ragging Policy',
      description: 'University policy against ragging',
      url: '/downloads/anti-ragging-policy.pdf',
      size: '800 KB'
    },
    {
      title: 'Student Conduct Rules',
      description: 'Code of conduct for students',
      url: '/downloads/student-conduct-rules.pdf',
      size: '650 KB'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <FileText className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Regulations</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Rules and regulations governing academic programs
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">
              The academic regulations define the framework for all academic programs at SBSSU. These regulations cover admission procedures, attendance requirements, examination systems, grading criteria, and student conduct. All students are expected to familiarize themselves with these regulations and comply with them throughout their academic journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {regulations.map((reg, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800">{reg.category}</h3>
                </div>
                <ul className="space-y-2">
                  {reg.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-green-50 to-orange-50 rounded-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Download Documents</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {documents.map((doc, index) => (
                <div key={index} className="bg-white rounded-lg p-6 border-2 border-gray-200 hover:border-orange-600 transition">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="w-8 h-8 text-orange-600" />
                    <div>
                      <h3 className="font-bold text-gray-800">{doc.title}</h3>
                      <p className="text-xs text-gray-500">{doc.size}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
                  <a
                    href={doc.url}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-8 border-l-4 border-orange-600">
            <h3 className="text-xl font-bold text-gray-800 mb-3">Important Note</h3>
            <p className="text-gray-700">
              All students must read and understand the academic regulations. Ignorance of rules will not be accepted as an excuse for non-compliance. For any clarification, contact the Dean Academic Affairs office.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
