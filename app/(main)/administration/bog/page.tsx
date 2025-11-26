import { Building } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";

import { getPage } from "@/lib/getPage";

export default async function BOGPage() {
  const { page, updatedAt } = await getPage("bog");

  const members = page?.boardMembers || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Building className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Board of Governors
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            The governing body responsible for university administration and
            policy
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              About the Board
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              {page?.about ||
                "The Board of Governors is the principal executive body of the university responsible for the general superintendence, direction, and control of the affairs of the university. It ensures that the university functions in accordance with its objectives and statutory provisions."}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Board Members
            </h2>
            <div className="space-y-4">
              {members.length > 0 ? (
                members.map((member: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border-l-4 border-orange-600 bg-orange-50 rounded-lg"
                  >
                    <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">
                        {member.name || "N/A"}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {member.designation || member.role || "N/A"}
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
            <p className="text-gray-600">
              {page?.meetingSchedule ||
                "Regular meetings are held quarterly. Meeting minutes and agendas are published after each session."}
            </p>
          </div>
          <LastUpdatedTag date={updatedAt} />
        </div>
      </section>
    </div>
  );
}
