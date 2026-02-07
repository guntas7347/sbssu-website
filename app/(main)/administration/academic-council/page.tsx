import { BookOpen } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function AcademicCouncilPage() {
  const { page, updatedAt } = await getPage("admin", "academic-council");

  const about = page?.about || "N/A";
  const councilMembers = page?.councilMembers || [];
  const responsibilities = page?.responsibilities || [];
  const meetingSchedule = page?.meetingSchedule || "N/A";

  return (
    <div>
      <PageHeader
        title="Academic Council"
        subTitle="The principal academic body responsible for academic policies and programs"
        icon={BookOpen}
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              About the Council
            </h2>
            <p className="text-gray-600 leading-relaxed">{about}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Council Members
              </h3>
              <div className="space-y-3">
                {councilMembers.length > 0 ? (
                  councilMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg"
                    >
                      <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">
                          {member?.name || "N/A"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {member?.designation || "N/A"}
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
                {responsibilities.length > 0 ? (
                  responsibilities.map((value, index) => (
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
            <p className="text-gray-600 mb-4">{meetingSchedule}</p>
            <a
              href="/administration/academic-council-meeting"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
            >
              View Meeting Minutes
            </a>
          </div>
        </div>
      </section>
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
