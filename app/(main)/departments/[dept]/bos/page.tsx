import { FileText } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function BOSPage({ params }) {
  const { dept } = await params;
  const { page, updatedAt } = await getPage(dept, "bos");

  const deptName =
    page?.department?.name || dept?.toUpperCase() || "Department";
  const about =
    page?.about ||
    "Information about the Board of Studies is currently unavailable.";
  const bosMembers = page?.bosMembers || [];
  const responsibilities = page?.responsibilities || [];
  const meetingInfo =
    page?.meetingInfo || "Meeting schedule details not available.";

  return (
    <div>
      <PageHeader
        icon={FileText}
        title="Board of Studies"
        subTitle={`Department of ${deptName}`}
      />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About BOS</h2>
            <p className="text-gray-600 leading-relaxed">{about}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                BOS Members
              </h3>
              <div className="space-y-3">
                {bosMembers.length > 0 ? (
                  bosMembers.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-600"
                    >
                      <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {member?.name || "Member Name"}
                        </p>
                        <p className="text-sm text-gray-600">
                          {member?.role || "Role N/A"}
                        </p>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                          {member?.type || "Member"}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No members listed.</p>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Key Responsibilities
              </h3>
              <ul className="space-y-4">
                {responsibilities.length > 0 ? (
                  responsibilities.map((resp, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      </div>
                      <p className="text-gray-700">{resp || "N/A"}</p>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500 italic">
                    No responsibilities listed.
                  </p>
                )}
              </ul>

              <div className="mt-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Meeting Schedule
                </h4>
                <p className="text-sm text-gray-700">{meetingInfo}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
