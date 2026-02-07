import { UsersRound } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function SocietyPage({ params }) {
  const { dept } = await params;
  const { page, updatedAt } = await getPage(dept, "student-society");

  const deptName =
    page?.department?.name || dept?.toUpperCase() || "Department";
  const societies = page?.societies || [];

  return (
    <div>
      <PageHeader
        icon={UsersRound}
        title="Student Society"
        subTitle={`Department of ${deptName}`}
      />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {societies.length > 0 ? (
              societies.map((society, index) => (
                <div
                  key={society?.id || index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl transition"
                >
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {society?.name || "Society Name"}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {society?.description || "No description available."}
                  </p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Faculty Coordinator
                    </h4>
                    <p className="text-gray-700">
                      {society?.coordinator || "N/A"}
                    </p>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Student Coordinators
                    </h4>
                    <p className="text-gray-700">
                      {society?.student_coordinators || "N/A"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Activities
                    </h4>
                    <p className="text-sm text-gray-600">
                      {society?.activities || "No recent activities listed."}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-12 bg-gray-50 rounded-xl">
                Student society information will be updated soon.
              </div>
            )}
          </div>
        </div>
      </section>
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
