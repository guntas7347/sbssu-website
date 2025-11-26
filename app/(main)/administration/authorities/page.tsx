import { Shield, Mail, Phone } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";

import { getPage } from "@/lib/getPage";

export default async function AuthoritiesPage() {
  const { page, updatedAt } = await getPage("authorities");

  const authorities = page?.authorities || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            University Authorities
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Administrative leadership and organizational structure
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {authorities.length > 0 ? (
              authorities.map((auth: any) => (
                <div
                  key={auth.id || Math.random()}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition"
                >
                  <div className="flex gap-4">
                    <img
                      src={auth.photo?.url || "/placeholder.jpg"}
                      alt={auth.name || "Authority"}
                      className="w-24 h-24 rounded-lg object-cover border-2 border-orange-600"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-800 mb-1">
                        {auth.name || "N/A"}
                      </h3>
                      <p className="text-orange-600 font-semibold mb-3">
                        {auth.designation || "N/A"}
                      </p>

                      <div className="space-y-1 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3" />
                          <span>{auth.phone || "N/A"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          <span>{auth.email || "N/A"}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {auth.about && (
                    <p className="mt-4 text-sm text-gray-600 line-clamp-3 border-t border-gray-200 pt-4">
                      {auth.about}
                    </p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No authorities found.
              </p>
            )}
          </div>
          <LastUpdatedTag date={updatedAt} />
        </div>
      </section>
    </div>
  );
}
