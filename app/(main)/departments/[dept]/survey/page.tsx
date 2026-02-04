import PageHeader from "@/components/PageHeader";
import { ClipboardList } from "lucide-react";

export default function SurveyPage() {
  return (
    <div>
      <PageHeader
        icon={ClipboardList}
        title="Student Survey Form"
        // deptName={pageData?.department?.name}
      />

      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Student Feedback Survey
            </h2>
            <p className="text-gray-600 mb-8">
              Your feedback is valuable to us. Please take a moment to complete
              this survey about your experience in the department.
            </p>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Roll Number
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Semester
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent">
                  <option>Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                    <option key={sem} value={sem}>
                      Semester {sem}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Rate Teaching Quality (1-5)
                </label>
                <input type="range" min="1" max="5" className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Rate Lab Facilities (1-5)
                </label>
                <input type="range" min="1" max="5" className="w-full" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Overall Feedback
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                ></textarea>
              </div>

              <button
                disabled
                className="w-full px-8 py-4 bg-linear-to-r from-orange-600 to-green-600 text-white rounded-lg font-semibold hover:opacity-90 transition"
              >
                Submit unavailable (Available Soon)
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
