"use client";

import { Award, Download, CheckCircle, AlertCircle } from "lucide-react";

export default function GradationCertificatePage() {
  const documentsRequired = [
    "Copy of final semester mark sheet",
    "No dues certificate from Library",
    "No dues certificate from Hostel (if applicable)",
    "No dues certificate from Department",
    "ID card (to be surrendered)",
    "Fee receipt (original)",
    "Anti-ragging undertaking",
  ];

  const processSteps = [
    {
      step: 1,
      title: "Apply Online",
      description:
        "Fill the online application form on university portal with required details",
    },
    {
      step: 2,
      title: "Submit Documents",
      description:
        "Upload scanned copies of all required documents and pay the application fee",
    },
    {
      step: 3,
      title: "Verification",
      description:
        "University will verify your documents and academic records (7-10 working days)",
    },
    {
      step: 4,
      title: "Certificate Issuance",
      description:
        "Degree/Certificate will be issued after verification and sent by post or available for collection",
    },
  ];

  const fees = [
    {
      document: "Provisional Degree Certificate",
      fee: "₹500",
      processing: "7 days",
    },
    {
      document: "Original Degree Certificate",
      fee: "₹1,000",
      processing: "30 days",
    },
    { document: "Transcript (Per Copy)", fee: "₹500", processing: "7 days" },
    { document: "Duplicate Degree", fee: "₹2,000", processing: "30 days" },
    { document: "Migration Certificate", fee: "₹500", processing: "7 days" },
    { document: "Character Certificate", fee: "₹200", processing: "3 days" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Award className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Degree & Certificates
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Apply for degree, transcripts, and other academic certificates
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              About Graduation Certificates
            </h2>
            <p className="text-gray-600 leading-relaxed">
              After successful completion of your program, you can apply for
              various certificates including provisional degree, original
              degree, transcripts, migration certificate, etc. All applications
              must be submitted through the online portal after ensuring all
              dues are cleared.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Documents Required
              </h3>
              <ul className="space-y-3">
                {documentsRequired.map((doc, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Application Process
              </h3>
              <div className="space-y-4">
                {processSteps.map((step) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-orange-600 to-green-600 p-6">
              <h3 className="text-2xl font-bold text-white">
                Fee Structure & Processing Time
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-800">
                      Document
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-800">
                      Fee
                    </th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-800">
                      Processing Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {fees.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-gray-800">
                        {item.document}
                      </td>
                      <td className="px-6 py-4 text-center text-green-600 font-semibold">
                        {item.fee}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-700">
                        {item.processing}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
              <h3 className="font-bold text-gray-800 mb-3">
                For Current Students
              </h3>
              <p className="text-sm text-gray-700 mb-4">
                Apply for provisional certificate immediately after final
                semester results. Original degree will be issued during
                convocation.
              </p>
              <a
                href="https://exam.sbssu.ac.in/certificate-apply"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                Apply Online
              </a>
            </div>

            <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-600">
              <h3 className="font-bold text-gray-800 mb-3">For Alumni</h3>
              <p className="text-sm text-gray-700 mb-4">
                Request duplicate degree, additional transcripts, or other
                certificates by filling the alumni certificate form.
              </p>
              <a
                href="/downloads/alumni-certificate-form.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
              >
                <Download className="w-4 h-4" />
                Download Form
              </a>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-600 flex gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Important Notes</h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>
                  • All dues must be cleared before applying for certificates
                </li>
                <li>• Processing time starts after complete documentation</li>
                <li>• Original documents will be verified, keep them ready</li>
                <li>• Degree will be issued as per convocation schedule</li>
                <li>
                  • For urgent requirements, tatkal processing available (double
                  fee)
                </li>
                <li>
                  • Contact Examination Section for any queries: coe@sbssu.ac.in
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
