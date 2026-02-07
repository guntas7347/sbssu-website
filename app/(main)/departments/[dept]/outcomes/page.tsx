import { Target, CheckCircle } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function CourseOutcomesPage({ params }) {
  const { dept } = await params;
  const { page, updatedAt } = await getPage(dept, "course-outcomes");

  const deptName =
    page?.department?.name || dept?.toUpperCase() || "Department";
  const peos = page?.peos || [];
  const pos = page?.pos || [];
  const psos = page?.psos || [];

  return (
    <div>
      <PageHeader
        icon={Target}
        title="Course Outcomes"
        subTitle={`Department of ${deptName}`}
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* PEO Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Program Educational Objectives (PEOs)
            </h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Our program aims to prepare graduates who will be successful in
              their professional careers and contribute to society. The program
              educational objectives are:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {peos.length > 0 ? (
                peos.map((peo, i) => (
                  <div
                    key={i}
                    className={`p-6 rounded-lg border-l-4 ${
                      peo?.color === "orange" || i % 2 === 0
                        ? "bg-orange-50 border-orange-600"
                        : "bg-green-50 border-green-600"
                    }`}
                  >
                    <h3 className="font-bold text-gray-800 mb-2">
                      {peo?.title || `PEO-${i + 1}`}
                    </h3>
                    <p className="text-sm text-gray-700">
                      {peo?.description || "Description not available."}
                    </p>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-gray-500 italic">
                  No PEOs listed.
                </p>
              )}
            </div>
          </div>

          {/* PO Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Program Outcomes (POs)
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pos.length > 0 ? (
                pos.map((po, index) => (
                  <div
                    key={po?.code || index}
                    className="p-6 border-2 border-gray-200 rounded-lg hover:border-orange-600 transition"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                        <span className="font-bold text-orange-600">
                          {po?.code || index + 1}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-800">
                        {po?.title || "Outcome Title"}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-600">
                      {po?.description || "Description not available."}
                    </p>
                  </div>
                ))
              ) : (
                <p className="col-span-full text-gray-500 italic">
                  No POs listed.
                </p>
              )}
            </div>
          </div>

          {/* PSO Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Program Specific Outcomes (PSOs)
            </h2>
            <div className="space-y-4">
              {psos.length > 0 ? (
                psos.map((pso, index) => (
                  <div
                    key={pso?.code || index}
                    className="flex items-start gap-4 p-6 bg-green-50 rounded-lg border-l-4 border-green-600"
                  >
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-800 mb-2">
                        {pso?.code || `PSO-${index + 1}`}
                      </h3>
                      <p className="text-gray-700">
                        {pso?.description || "Description not available."}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No PSOs listed.</p>
              )}
            </div>
          </div>
        </div>
      </section>
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
