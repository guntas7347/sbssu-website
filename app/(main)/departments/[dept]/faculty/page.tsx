import { Users, Mail } from "lucide-react";
import getPage from "@/lib/getPage";
import PageHeader from "@/components/PageHeader";

export default async function FacultyPage({ params }) {
  const { dept } = await params;

  const { payload } = await getPage(`public/pages/department/${dept}/faculty`);

  const { faculty } = payload?.data;
  return (
    <div>
      <PageHeader
        icon={Users}
        title="Faculty Profiles"
        deptName={payload?.department?.name}
      />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {payload?.data?.faculty?.map((member) => (
              <div
                key={member.id}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition"
              >
                <img
                  src={member.photo.url}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-orange-600"
                />
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-orange-600 font-semibold mb-2">
                    {member.designation}
                  </p>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-sm text-gray-600 hover:text-orange-600 flex items-center gap-1 justify-center"
                  >
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </a>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  {member.qualifications && (
                    <>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        Qualifications:
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {member.qualifications}
                      </p>
                    </>
                  )}

                  {member.specialization && (
                    <>
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        Research Interests:
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {member.specialization
                          .split(",")
                          .slice(0, 3)
                          .map((spec: string, idx: number) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs"
                            >
                              {spec.trim()}
                            </span>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {faculty.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              Faculty information will be updated soon.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
