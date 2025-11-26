import { Scale, FileText, BookOpen } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";

import { getPage } from "@/lib/getPage";

export default async function GovernancePage() {
  const { page, updatedAt } = await getPage("governance-structure");
  const governanceAreas = page?.cards || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Scale className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Governance</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            University governance structure, policies, and procedures
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              About University Governance
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {page?.about || "N/A"}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {governanceAreas.length > 0 ? (
              governanceAreas.map((area: any, index: number) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {area.heading || "N/A"}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {area.subHeading || "N/A"}
                  </p>
                  <ul className="space-y-2">
                    {(area.list || "")
                      .split(",")
                      .map((item: string, idx: number) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-gray-700"
                        >
                          <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                          {item.trim()}
                        </li>
                      ))}
                  </ul>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No governance areas found.
              </p>
            )}
          </div>

          <div className="mt-12 bg-green-50 rounded-xl p-8">
            <div className="flex items-start gap-4">
              <BookOpen className="w-8 h-8 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  SBS Act 2021
                </h3>
                <p className="text-gray-600 mb-4">
                  The Shaheed Bhagat Singh State University Act, 2021
                  establishes the legal framework for the university's
                  operation, governance structure, and academic programs.
                </p>
                {page?.sbsAct?.url ? (
                  <a
                    href={page.sbsAct.url}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
                  >
                    Download SBS Act 2021
                  </a>
                ) : (
                  <p className="text-gray-500 italic">
                    Document not available.
                  </p>
                )}
              </div>
            </div>
          </div>
          <LastUpdatedTag date={updatedAt} />
        </div>
      </section>
    </div>
  );
}
