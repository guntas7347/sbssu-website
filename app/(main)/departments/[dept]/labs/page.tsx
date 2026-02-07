import { FlaskConical, MapPin } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function LabsPage({ params }) {
  const { dept } = await params;

  const { page, updatedAt } = await getPage(dept, "labs");

  const deptName =
    page?.department?.name || dept?.toUpperCase() || "Department";
  const intro =
    page?.intro ||
    "Our department is equipped with state-of-the-art laboratories to provide practical exposure and hands-on learning opportunities to students.";
  const labs = page?.labs || [];

  return (
    <div>
      <PageHeader
        icon={FlaskConical}
        title="Laboratories"
        subTitle={`Department of ${deptName}`}
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Laboratories
            </h2>
            <p className="text-gray-600 leading-relaxed">{intro}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {labs.length > 0 ? (
              labs.map((lab, index) => (
                <div
                  key={lab?.id || index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center text-white shrink-0">
                      <FlaskConical className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {lab?.name || "Laboratory Name"}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {lab?.location || "Location N/A"}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {lab?.description || "No description available."}
                  </p>

                  {lab?.equipment && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Key Equipment:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {lab.equipment
                          .split(",")
                          .slice(0, 4)
                          .map((equip, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs"
                            >
                              {equip.trim()}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <span className="text-sm text-gray-600">
                      Capacity: {lab?.capacity || "N/A"} students
                    </span>
                    <span className="text-sm font-semibold text-green-600">
                      {lab?.lab_incharge || "In-charge N/A"}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12 bg-gray-50 rounded-xl">
                Laboratory information will be updated soon.
              </div>
            )}
          </div>
        </div>
      </section>
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
