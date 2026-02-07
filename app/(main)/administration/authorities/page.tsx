import { Shield, Mail, Phone } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function AuthoritiesPage() {
  const { page, updatedAt } = await getPage("admin", "authorities");

  const authorities = page?.authorities || [];

  return (
    <div>
      <PageHeader
        title="University Authorities"
        subTitle="Administrative leadership and organizational structure"
        icon={Shield}
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {authorities.length > 0 ? (
              authorities.map((auth, index) => {
                const photoUrl = auth?.photo?.url || "/placeholder.jpg";
                const name = auth?.name || "Name Not Available";
                const designation = auth?.designation || "Designation N/A";
                const phone = auth?.phone || "N/A";
                const email = auth?.email || "N/A";
                const about = auth?.about || "";

                return (
                  <div
                    key={auth?.id || index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition"
                  >
                    <div className="flex gap-4">
                      <img
                        src={photoUrl}
                        alt={name}
                        className="w-24 h-24 rounded-lg object-cover border-2 border-orange-600"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {name}
                        </h3>
                        <p className="text-orange-600 font-semibold mb-3">
                          {designation}
                        </p>

                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            <span>{phone}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <Mail className="w-3 h-3" />
                            <span>{email}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {about && (
                      <p className="mt-4 text-sm text-gray-600 line-clamp-3 border-t border-gray-200 pt-4">
                        {about}
                      </p>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No authorities found.
              </p>
            )}
          </div>
        </div>
      </section>
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
