import { Users, ChevronRight } from "lucide-react";

import { getPage } from "@/lib/getPage";
import LastUpdatedTag from "@/components/LastUpdatedTag";

export default async function CommitteesPage() {
  const { page, updatedAt } = await getPage("university-committees");

  const committees = page?.committees || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Users className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            University Committees
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Various committees working for smooth functioning of the university
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              About Committees
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {page?.about ||
                "Various committees have been constituted to ensure effective governance, transparent decision-making, and smooth functioning of different aspects of university operations."}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {committees.length > 0 ? (
              committees.map((committee: any, index: number) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition"
                >
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 mb-2">
                        {committee.name || "N/A"}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {committee.purpose || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">
                      Committee Members:
                    </h4>
                    <ul className="space-y-1">
                      {(committee.members || []).length > 0 ? (
                        committee.members.map(
                          (member: string, idx: number) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2 text-sm text-gray-700"
                            >
                              <ChevronRight className="w-4 h-4 text-orange-600 flex-shrink-0 mt-0.5" />
                              <span>{member || "N/A"}</span>
                            </li>
                          )
                        )
                      ) : (
                        <li className="text-sm text-gray-500">
                          No members listed.
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No committees found.
              </p>
            )}
          </div>
        </div>
      </section>

      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
