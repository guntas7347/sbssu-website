import { UserCheck, Mail, Phone } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function ViceChancellorPage() {
  const { page, updatedAt } = await getPage("admin", "vc-message");

  const photoUrl = page?.photo?.url || "/placeholder.jpg";
  const name = page?.name || "Vice Chancellor Name Not Available";
  const position = page?.position || "Position Not Available";
  const email = page?.email || "";
  const phone = page?.phone || "";
  const message = page?.message || "No message available at this time.";
  const officeHours = page?.officeHours || "By Appointment";
  const officeLocation = page?.officeLocation || "Admin Block";

  return (
    <div>
      <PageHeader
        title="Vice Chancellor"
        subTitle="Leadership and vision for academic excellence"
        icon={UserCheck}
      />
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              {/* Left Column: Profile Card */}
              <div className="md:w-1/3 bg-gradient-to-br from-orange-600 to-green-600 p-8 text-white">
                <img
                  src={photoUrl}
                  alt={name}
                  className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-white object-cover bg-gray-200"
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{name}</h2>
                  <p className="text-orange-100 mb-6">{position}</p>

                  <div className="space-y-3 text-sm">
                    {/* Only render links if data exists to avoid empty hrefs */}
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

              {/* Right Column: Message */}
              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-orange-600 pb-3">
                  Message from the Vice Chancellor
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {message}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="mt-8 bg-orange-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              About the Vice Chancellor
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Office Hours
                </h4>
                <p className="text-gray-600">{officeHours}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Office Location
                </h4>
                <p className="text-gray-600">{officeLocation}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
