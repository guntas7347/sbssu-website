import { TrendingUp } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function ResearchPage({ params }) {
  const { dept } = await params;
  const { page, updatedAt } = await getPage(dept, "funded-research");

  const deptName =
    page?.department?.name || dept?.toUpperCase() || "Department";
  const research = page?.research || [];

  return (
    <div>
      <PageHeader
        icon={TrendingUp}
        title="Funded Research Projects"
        subTitle={`Department of ${deptName}`}
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {research.length > 0 ? (
              research.map((project, index) => (
                <div
                  key={project?.id || index}
                  className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl transition"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {project?.title || "Project Title N/A"}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {project?.description || "No description available."}
                  </p>
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        PI: {project?.pi_name || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {project?.funding_agency || "Agency N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        {project?.start_year || "N/A"} -{" "}
                        {project?.end_year || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green-600">
                        {project?.funding_amount || "Amount N/A"}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-xl">
                No funded research projects found.
              </div>
            )}
          </div>
        </div>
      </section>
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
