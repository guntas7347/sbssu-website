import DownloadCard from "@/components/cards/DownloadCard";
import PageHeader from "@/components/PageHeader";
import getPage from "@/lib/getPage";
import { DollarSign } from "lucide-react";

export default async function FeeDetailPage() {
  const { payload } = await getPage(`public/pages/central/fees-structure`);

  return (
    <div>
      <PageHeader
        icon={DollarSign}
        title="Fee Structure"
        subTitle="Comprehensive fee details for all programs (Academic Year 2024-25)"
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
