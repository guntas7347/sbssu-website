import { Mail, Phone, GraduationCap } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function DepartmentHeadPage({ params }) {
  const { dept } = await params;
  const { page, updatedAt } = await getPage(dept, "hod");

  const name = page?.name || "Head of Department";
  const designation = page?.designation || "Designation N/A";
  const photoUrl = page?.hodPic?.url || "/placeholder.jpg";
  const email = page?.email || "";
  const phone = page?.phone || "";
  const message = page?.message || "No message available.";
  const qualifications = page?.qualifications || [];
  const researchInterests = page?.research_interests || "";
  const deptName = page?.department_name || dept.toUpperCase();

  return (
    <div>
      <PageHeader
        icon={GraduationCap}
        title={`Department of ${deptName}`}
        subTitle="Leadership and Academic Vision"
      />

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-orange-600 to-green-600 p-8 text-white">
                <img
                  src={photoUrl}
                  alt={name}
                  className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-white object-cover bg-gray-200"
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{name}</h2>
                  <p className="text-orange-100 mb-2">{designation}</p>
                  <p className="text-sm mb-6">Head of Department</p>

                  <div className="space-y-3 text-sm">
                    {email ? (
                      <a
                        href={`mailto:${email}`}
                        className="flex items-center gap-2 justify-center hover:text-orange-200 transition-colors"
                      >
                        <Mail className="w-4 h-4" />
                        <span>{email}</span>
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 justify-center opacity-70">
                        <Mail className="w-4 h-4" />
                        <span>Email N/A</span>
                      </span>
                    )}

                    {phone ? (
                      <a
                        href={`tel:${phone}`}
                        className="flex items-center gap-2 justify-center hover:text-orange-200 transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{phone}</span>
                      </a>
                    ) : (
                      <span className="flex items-center gap-2 justify-center opacity-70">
                        <Phone className="w-4 h-4" />
                        <span>Phone N/A</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-orange-600 pb-3">
                  Message from HOD
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {message}
                  </p>
                </div>

                {qualifications.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">
                      Qualifications
                    </h4>
                    <ul className="space-y-2">
                      {qualifications.map((qual, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                          <span>{qual}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {researchInterests && (
                  <div className="mt-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">
                      Research Interests
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {researchInterests.split(",").map((interest, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                        >
                          {interest.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              About the Department
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {page?.description ||
                "Department description currently unavailable."}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600 mb-2">
                  {page?.stats?.faculty || "50+"}
                </p>
                <p className="text-gray-700">Faculty Members</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600 mb-2">
                  {page?.stats?.students || "500+"}
                </p>
                <p className="text-gray-700">Students</p>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600 mb-2">
                  {page?.stats?.projects || "20+"}
                </p>
                <p className="text-gray-700">Research Projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
