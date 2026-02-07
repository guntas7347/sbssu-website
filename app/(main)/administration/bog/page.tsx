import { Building } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function BOGPage() {
  const { page, updatedAt } = await getPage("admin", "bog");

  const members = page?.boardMembers || [];
  const about =
    page?.about ||
    "The Board of Governors is the principal executive body of the university responsible for the general superintendence, direction, and control of the affairs of the university. It ensures that the university functions in accordance with its objectives and statutory provisions.";
  const meetingSchedule =
    page?.meetingSchedule ||
    "Regular meetings are held quarterly. Meeting minutes and agendas are published after each session.";

  return (
    <div>
      <PageHeader
        title="Board of Governors"
        subTitle="The governing body responsible for university administration and policy"
        icon={Building}
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              About the Board
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">{about}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Board Members
            </h2>
            <div className="space-y-4">
              {members.length > 0 ? (
                members.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border-l-4 border-orange-600 bg-orange-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold shrink-0">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {member?.name || "N/A"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {member?.designation || member?.role || "N/A"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No board members found.</p>
              )}
            </div>
          </div>

          <div className="mt-8 bg-green-50 rounded-xl p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Meeting Schedule
            </h3>
            <p className="text-gray-600">{meetingSchedule}</p>
          </div>
        </div>
      </section>
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
