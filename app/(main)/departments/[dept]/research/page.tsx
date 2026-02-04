import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import getPage from "@/lib/getPage";
import { TrendingUp, DollarSign, Users } from "lucide-react";

export default async function ResearchPage({ params }) {
  const { dept } = await params;

  const { payload: pageData } = await getPage(
    `public/pages/department/${dept}/funded-research`,
  );
  const { research } = pageData?.data;

  return (
    <div>
      <PageHeader
        icon={TrendingUp}
        title="Funded Research Projects"
        deptName={pageData?.department?.name}
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-6">
            {research.map((project) => (
              <div
                key={project.id}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl transition"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      PI: {project.pi_name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {project.funding_agency}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {project.start_year} - {project.end_year}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-green-600">
                      {project.funding_amount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <LastUpdatedTag date={pageData?.updatedAt} />
    </div>
  );
}
