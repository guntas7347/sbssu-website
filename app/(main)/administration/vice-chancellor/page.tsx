import { UserCheck, Mail, Phone } from "lucide-react";

import { getPage } from "@/lib/getPage";
import LastUpdatedTag from "@/components/LastUpdatedTag";

export default async function ViceChancellorPage() {
  const { page, updatedAt } = await getPage("vc-message");

  const contactParts = (page?.contact || "").split(",");
  const email = contactParts[0] || "N/A";
  const phone = contactParts[1] || "N/A";

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <UserCheck className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vice Chancellor
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Leadership and vision for academic excellence
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-orange-600 to-green-600 p-8 text-white">
                <img
                  src={page?.photo?.url || "/placeholder.jpg"}
                  alt={page?.name || "Vice Chancellor"}
                  className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-white object-cover"
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{page?.name || "N/A"}</h2>
                  <p className="text-orange-100 mb-6">{page?.position || "N/A"}</p>

                  <div className="space-y-3 text-sm">
                    <a
                      href={`mailto:${email}`}
                      className="flex items-center gap-2 justify-center hover:text-orange-200"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{email}</span>
                    </a>
                    <a
                      href={`tel:${phone}`}
                      className="flex items-center gap-2 justify-center hover:text-orange-200"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{phone}</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-orange-600 pb-3">
                  Message from the Vice Chancellor
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {page?.message || "No message available."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-orange-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              About the Vice Chancellor
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Office Hours
                </h4>
                <p className="text-gray-600">{page?.officeHours || "N/A"}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Office Location
                </h4>
                <p className="text-gray-600">{page?.officeLocation || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
        <LastUpdatedTag date={updatedAt} />
      </section>
    </div>
  );
}
