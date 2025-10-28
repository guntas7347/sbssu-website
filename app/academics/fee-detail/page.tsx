'use client';

import { DollarSign, Download, AlertCircle } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function FeeDetailPage() {
  const feeStructure = [
    {
      program: 'B.Tech (All Branches)',
      tuitionFee: '₹60,000',
      development: '₹10,000',
      hostel: '₹25,000',
      mess: '₹30,000',
      total: '₹1,25,000',
      perYear: true
    },
    {
      program: 'M.Tech (All Branches)',
      tuitionFee: '₹75,000',
      development: '₹12,000',
      hostel: '₹25,000',
      mess: '₹30,000',
      total: '₹1,42,000',
      perYear: true
    },
    {
      program: 'MBA',
      tuitionFee: '₹80,000',
      development: '₹15,000',
      hostel: '₹25,000',
      mess: '₹30,000',
      total: '₹1,50,000',
      perYear: true
    },
    {
      program: 'Ph.D.',
      tuitionFee: '₹40,000',
      development: '₹8,000',
      hostel: '₹25,000',
      mess: '₹30,000',
      total: '₹1,03,000',
      perYear: true
    }
  ];

  const scholarships = [
    { name: 'Merit Scholarship', eligibility: 'CGPA > 8.5', amount: 'Up to 50% tuition fee waiver' },
    { name: 'SC/ST Scholarship', eligibility: 'SC/ST category students', amount: 'As per government norms' },
    { name: 'EWS Scholarship', eligibility: 'Economically Weaker Section', amount: 'As per government norms' },
    { name: 'Sports Quota', eligibility: 'State/National level players', amount: 'Up to 100% tuition fee waiver' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <DollarSign className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fee Structure</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Comprehensive fee details for all programs (Academic Year 2024-25)
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-600 to-green-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Program</th>
                    <th className="px-6 py-4 text-right font-semibold">Tuition Fee</th>
                    <th className="px-6 py-4 text-right font-semibold">Development</th>
                    <th className="px-6 py-4 text-right font-semibold">Hostel</th>
                    <th className="px-6 py-4 text-right font-semibold">Mess</th>
                    <th className="px-6 py-4 text-right font-semibold">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {feeStructure.map((fee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-800">{fee.program}</td>
                      <td className="px-6 py-4 text-right text-gray-700">{fee.tuitionFee}</td>
                      <td className="px-6 py-4 text-right text-gray-700">{fee.development}</td>
                      <td className="px-6 py-4 text-right text-gray-700">{fee.hostel}</td>
                      <td className="px-6 py-4 text-right text-gray-700">{fee.mess}</td>
                      <td className="px-6 py-4 text-right font-bold text-green-600">{fee.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-600">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Schedule</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <span>Annual fees can be paid in two installments</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <span>First installment: At the time of admission</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <span>Second installment: Before start of even semester</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <span>Late fee of ₹100 per day after due date</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Modes</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <span>Online payment through university portal</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <span>Demand Draft in favor of Registrar, SBSSU</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <span>NEFT/RTGS to university account</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <span>Cash payment at Finance Office (up to ₹50,000)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Scholarships & Financial Aid</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {scholarships.map((scholarship, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-lg p-6 hover:border-orange-600 transition">
                  <h4 className="font-bold text-gray-800 mb-2">{scholarship.name}</h4>
                  <p className="text-sm text-gray-600 mb-2"><strong>Eligibility:</strong> {scholarship.eligibility}</p>
                  <p className="text-sm text-green-600 font-semibold">{scholarship.amount}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-600 flex gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Important Notes</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• Hostel and mess fees are optional (for hostel residents only)</li>
                <li>• Fee structure subject to revision by university authorities</li>
                <li>• Caution money of ₹5,000 refundable at the end of program</li>
                <li>• Library security deposit of ₹2,000 (refundable)</li>
                <li>• For detailed fee breakup, download the official fee structure document</li>
              </ul>
              <a href="/downloads/fee-structure-2024-25.pdf" className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold">
                <Download className="w-4 h-4" />
                Download Fee Structure
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
