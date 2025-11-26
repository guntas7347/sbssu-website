import { Users } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";

import { getPage } from "@/lib/getPage";
import { notFound } from "next/navigation";

export default async function SocietyPage() {
  const { page: data, updatedAt } = await getPage("society");

  const members = data?.members || [];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Users className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            University Society
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Meet the distinguished members of our University Society
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.length > 0 ? (
              members.map((member: any) => (
                <div
                  key={member.id || Math.random()}
                  className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition"
                >
                  <img
                    src={member.photo_url || "/placeholder.jpg"}
                    alt={member.name || "Member"}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-orange-600"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {member.name || "N/A"}
                    </h3>
                    <p className="text-orange-600 font-semibold mb-4">
                      {member.position || "N/A"}
                    </p>
                    {member.contact && (
                      <p className="text-sm text-gray-600">{member.contact}</p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No members found.
              </p>
            )}
          </div>
          <LastUpdatedTag date={updatedAt} />
        </div>
      </section>
    </div>
  );
}
