import DownloadCard from "@/components/cards/DownloadCard";
import PageHeader from "@/components/PageHeader";
import prisma from "@/lib/prisma";
import { BookOpen } from "lucide-react";

export default async function SyllabusPage() {
  const page = await prisma.page.findMany({
    where: { slug: "syllabus" },
    include: { department: { select: { name: true } } },
  });
  return (
    <div>
      <PageHeader
        icon={BookOpen}
        title="Syllabus"
        subTitle="Course syllabi for all programs and semesters"
      />
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="flex items-center gap-4">
              <Search className="w-5 h-5 text-gray-400" />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div> */}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {page.flatMap((ac) =>
              (ac.data?.items ?? []).map((item) => (
                <DownloadCard
                  key={item.id}
                  data={item}
                  title={ac.department?.name}
                />
              )),
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
