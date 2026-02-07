import { Users } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function SocietyPage() {
  const { page: data, updatedAt } = await getPage("admin", "society");

  const members = data?.members || [];

  return (
    <div>
      <PageHeader
        title="University Society"
        subTitle="Meet the distinguished members of our University Society"
        icon={Users}
      />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.length > 0 ? (
              members.map((member, index) => {
                const photoUrl = member?.photo.url || "/placeholder.jpg";
                const name = member?.name || "Member Name N/A";
                const position = member?.position || "Position N/A";
                const contact = member?.contact || "";

                return (
                  <div
                    key={member?.id || index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition"
                  >
                    <img
                      src={photoUrl}
                      alt={name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-orange-600"
                    />
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {name}
                      </h3>
                      <p className="text-orange-600 font-semibold mb-4">
                        {position}
                      </p>
                      {contact && (
                        <p className="text-sm text-gray-600">{contact}</p>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No members found.
              </p>
            )}
          </div>
        </div>
      </section>
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
