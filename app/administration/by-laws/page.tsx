'use client';

import { Gavel, Download, FileText } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ByLawsPage() {
  const bylawDocuments = [
    {
      title: 'SBS University Act 2021',
      description: 'The complete act establishing the university',
      size: '2.5 MB',
      url: '/downloads/sbs-act-2021.pdf'
    },
    {
      title: 'University Statutes',
      description: 'Statutes governing university operations',
      size: '1.8 MB',
      url: '/downloads/university-statutes.pdf'
    },
    {
      title: 'Academic Regulations',
      description: 'Rules for admission, examination, and degrees',
      size: '1.2 MB',
      url: '/downloads/academic-regulations.pdf'
    },
    {
      title: 'Service Rules',
      description: 'Rules for faculty and staff appointments',
      size: '950 KB',
      url: '/downloads/service-rules.pdf'
    },
    {
      title: 'Financial Regulations',
      description: 'Rules for financial management and audit',
      size: '800 KB',
      url: '/downloads/financial-regulations.pdf'
    },
    {
      title: 'Student Code of Conduct',
      description: 'Behavioral guidelines for students',
      size: '600 KB',
      url: '/downloads/student-code-of-conduct.pdf'
    }
  ];

  const keyProvisions = [
    {
      title: 'Establishment',
      content: 'The university was established under SBS Act 2021 as a state university for technical education'
    },
    {
      title: 'Jurisdiction',
      content: 'The university has jurisdiction over affiliated colleges and institutions in Punjab'
    },
    {
      title: 'Powers',
      content: 'Power to grant degrees, diplomas, and certificates; conduct examinations; prescribe courses'
    },
    {
      title: 'Governance',
      content: 'Governed by Board of Governors, Academic Council, and other statutory bodies'
    },
    {
      title: 'Finance',
      content: 'Funded by state government grants, fees, donations, and other approved sources'
    },
    {
      title: 'Autonomy',
      content: 'Academic and administrative autonomy within the framework of applicable laws'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Gavel className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">By-Laws & Regulations</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Legal framework and rules governing the university
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About University By-Laws</h2>
            <p className="text-gray-600 leading-relaxed">
              The university operates under the framework provided by the Shaheed Bhagat Singh State University Act, 2021, and various statutes, ordinances, and regulations framed thereunder. These documents define the governance structure, academic policies, financial management, and operational procedures of the university.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {bylawDocuments.map((doc, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800">{doc.title}</h3>
                    <p className="text-xs text-gray-500">{doc.size}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">{doc.description}</p>
                <a
                  href={doc.url}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-semibold w-full justify-center"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </a>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-green-50 to-orange-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Provisions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {keyProvisions.map((provision, index) => (
                <div key={index} className="bg-white rounded-lg p-5 border-l-4 border-orange-600">
                  <h3 className="font-bold text-gray-800 mb-2">{provision.title}</h3>
                  <p className="text-sm text-gray-600">{provision.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Amendment Procedure</h3>
            <p className="text-gray-600 mb-4">
              The university statutes and regulations can be amended by the Board of Governors based on recommendations from the Academic Council or as required under the provisions of the SBS Act.
            </p>
            <p className="text-sm text-gray-500">
              All amendments are published in the university gazette and notified to concerned stakeholders.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
