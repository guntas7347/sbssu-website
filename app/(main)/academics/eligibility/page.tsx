import DownloadCard from "@/components/cards/DownloadCard";
import PageHeader from "@/components/PageHeader";
import getPage from "@/lib/getPage";
import { CheckCircle, AlertCircle } from "lucide-react";

export default async function EligibilityPage() {
  const { payload } = await getPage(
    `public/pages/central/academic-eligibility`,
  );

  return (
    <div>
      <PageHeader
        icon={CheckCircle}
        title="Eligibility Criteria"
        subTitle="Admission requirements for all programs"
      />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {payload.data.items.map((e) => {
              return <DownloadCard key={e.id} data={e} title={e?.title} />;
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
