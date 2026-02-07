import { Users, Mail } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function FacultyPage({ params }) {
  const { dept } = await params;
  const { page, updatedAt } = await getPage(dept, "faculty");

  const facultyList = page?.faculty || [];
  const deptName =
    page?.department?.name || dept?.toUpperCase() || "Department";

  return (
    <div>
      <PageHeader
        icon={Users}
        title="Faculty Profiles"
        subTitle={`Department of ${deptName}`}
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facultyList.length > 0 ? (
              facultyList.map((member, index) => {
                const photoUrl = member?.photo?.url || "/placeholder.jpg";
                const name = member?.name || "Faculty Name";
                const designation = member?.designation || "Designation N/A";
                const email = member?.email || "";
                const qualifications = member?.qualifications || "";
                const specialization = member?.specialization || "";

                return (
                  <div
                    key={member?.id || index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition"
                  >
                    <img
                      src={photoUrl}
                      alt={name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-orange-600 bg-gray-200"
                    />
                    <div className="text-center mb-4">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {name}
                      </h3>
                      <p className="text-orange-600 font-semibold mb-2">
                        {designation}
                      </p>
                      {email ? (
                        <a
                          href={`mailto:${email}`}
                          className="text-sm text-gray-600 hover:text-orange-600 flex items-center gap-1 justify-center transition-colors"
                        >
                          <Mail className="w-3 h-3" />
                          {email}
                        </a>
                      ) : (
                        <span className="text-sm text-gray-500 flex items-center gap-1 justify-center">
                          <Mail className="w-3 h-3" />
                          Email N/A
                        </span>
                      )}
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      {qualifications && (
                        <div className="mb-3">
                          <h4 className="text-sm font-semibold text-gray-800 mb-1">
                            Qualifications:
                          </h4>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {qualifications}
                          </p>
                        </div>
                      )}

                      {specialization && (
                        <div>
                          <h4 className="text-sm font-semibold text-gray-800 mb-2">
                            Research Interests:
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {specialization
                              .split(",")
                              .slice(0, 3)
                              .map((spec, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                                >
                                  {spec.trim()}
                                </span>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12 bg-gray-50 rounded-xl">
                Faculty information will be updated soon.
              </div>
            )}
          </div>
        </div>
      </section>
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
