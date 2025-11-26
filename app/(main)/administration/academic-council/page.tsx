import { BookOpen } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";

import { getPage } from "@/lib/getPage";

export default async function AcademicCouncilPage() {
  const { page, updatedAt } = await getPage("academic-council");

  const councilMembers = page?.councilMembers || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <BookOpen className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Academic Council
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            The principal academic body responsible for academic policies and
            programs
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              About the Council
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {page?.about || "N/A"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Council Members
              </h3>
              <div className="space-y-3">
                {councilMembers.length > 0 ? (
                  councilMembers.map((member: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {member.name || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {member.designation || "N/A"}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No council members found.</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Key Responsibilities
              </h3>
              <ul className="space-y-3">
                {(page?.responsibilities || []).length > 0 ? (
                  page.responsibilities.map((value: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <p className="text-gray-700">{value || "N/A"}</p>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No responsibilities listed.</p>
                )}
              </ul>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Meeting Schedule
            </h3>
            <p className="text-gray-600 mb-4">
              {page?.meetingSchedule || "N/A"}
            </p>
            <a
              href="/administration/academic-council-meeting"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              View Meeting Minutes
            </a>
          </div>
          <LastUpdatedTag date={updatedAt} />
        </div>
      </section>
    </div>
  );
}
