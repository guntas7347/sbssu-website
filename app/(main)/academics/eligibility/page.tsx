"use client";

import { CheckCircle, AlertCircle } from "lucide-react";

export default function EligibilityPage() {
  const eligibilityCriteria = [
    {
      program: "B.Tech (All Branches)",
      academic: "10+2 with Physics, Chemistry, Mathematics",
      percentage: "Minimum 60% marks (55% for SC/ST)",
      entrance: "JEE Main or State Entrance Exam",
      age: "Maximum 25 years (relaxation for reserved categories)",
    },
    {
      program: "M.Tech (All Branches)",
      academic: "B.Tech/B.E. in relevant branch",
      percentage: "Minimum 60% marks (55% for SC/ST)",
      entrance: "GATE score or University Entrance Test",
      age: "No age limit",
    },
    {
      program: "MBA",
      academic: "Bachelor degree in any discipline",
      percentage: "Minimum 50% marks (45% for SC/ST)",
      entrance: "CAT/MAT/CMAT or University Entrance Test",
      age: "No age limit",
    },
    {
      program: "Ph.D.",
      academic: "Master degree in relevant field",
      percentage: "Minimum 55% marks (50% for SC/ST)",
      entrance: "NET/GATE qualified or University Research Entrance Test",
      age: "No age limit",
    },
  ];

  const reservationPolicy = [
    { category: "General", percentage: "50%" },
    { category: "SC", percentage: "15%" },
    { category: "ST", percentage: "7.5%" },
    { category: "OBC (Non-Creamy Layer)", percentage: "27%" },
    { category: "EWS", percentage: "10%" },
    { category: "PWD", percentage: "3% (Horizontal)" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <CheckCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Eligibility Criteria
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Admission requirements for all programs
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Admission Process
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Admissions to all programs at SBSSU are based on merit. Candidates
              must meet the minimum eligibility criteria and qualify in the
              entrance examination (where applicable). Reservation policy as per
              Punjab Government norms is followed.
            </p>
          </div>

          <div className="space-y-6 mb-12">
            {eligibilityCriteria.map((criteria, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-orange-600 transition"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-6 pb-4 border-b-2 border-orange-600">
                  {criteria.program}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Academic Qualification
                    </h4>
                    <p className="text-gray-700 mb-4">{criteria.academic}</p>

                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Minimum Percentage
                    </h4>
                    <p className="text-gray-700">{criteria.percentage}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Entrance Exam
                    </h4>
                    <p className="text-gray-700 mb-4">{criteria.entrance}</p>

                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      Age Limit
                    </h4>
                    <p className="text-gray-700">{criteria.age}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Reservation Policy
              </h3>
              <div className="space-y-3">
                {reservationPolicy.map((policy, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-orange-50 rounded-lg"
                  >
                    <span className="font-semibold text-gray-800">
                      {policy.category}
                    </span>
                    <span className="text-orange-600 font-bold">
                      {policy.percentage}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Additional Requirements
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Valid identity proof (Aadhaar Card)</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Domicile certificate (for state quota)</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Category certificate (if applicable)</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Transfer certificate from previous institution</span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>
                    Migration certificate (for other university students)
                  </span>
                </li>
                <li className="flex items-start gap-2 text-gray-700">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>Medical fitness certificate</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-600 flex gap-4">
            <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">
                Important Information
              </h3>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>
                  • Eligibility criteria subject to change as per
                  university/government norms
                </li>
                <li>
                  • Candidates must verify their eligibility before applying
                </li>
                <li>
                  • Admission is provisional until verification of original
                  documents
                </li>
                <li>
                  • Reserved category candidates must produce valid certificates
                </li>
                <li>
                  • For detailed information, refer to the admission brochure
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
