import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import getPage from "@/lib/getPage";
import { UsersRound } from "lucide-react";

export default async function SocietyPage({ params }) {
  const { dept } = await params;

  const { payload: pageData } = await getPage(
    `public/pages/department/${dept}/student-society`,
  );

  const { societies } = pageData.data;

  return (
    <div>
      <PageHeader
        icon={UsersRound}
        title="Student Society"
        deptName={pageData?.department?.name}
      />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {societies.map((society) => (
              <div
                key={society.id}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl transition"
              >
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {society.name}
                </h3>
                <p className="text-gray-600 mb-6">{society.description}</p>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Faculty Coordinator
                  </h4>
                  <p className="text-gray-700">{society.coordinator}</p>
                </div>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Student Coordinators
                  </h4>
                  <p className="text-gray-700">
                    {society.student_coordinators}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Activities
                  </h4>
                  <p className="text-sm text-gray-600">{society.activities}</p>
                </div>
              </div>
            ))}
          </div>
          {societies.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              Student society information will be updated soon.
            </div>
          )}
        </div>
      </section>
      <LastUpdatedTag date={pageData?.updatedAt} />
    </div>
  );
}
