import DownloadCard from "@/components/cards/DownloadCard";
import PageHeader from "@/components/PageHeader";
import prisma from "@/lib/prisma";
import { Calendar } from "lucide-react";

export default async function AcademicCalendarPage() {
  const page = await prisma.page.findMany({
    where: { slug: "academic-calendar" },
    include: { department: { select: { name: true } } },
  });

  return (
    <div>
      <PageHeader
        icon={Calendar}
        title="Academic Calendar"
        subTitle="Important dates and events for Academic Year 2024-25"
      />
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          {page.flatMap((ac) =>
            (ac.data?.items ?? []).map((item) => (
              <DownloadCard
                key={item.id}
                data={item}
                title={ac.department?.name}
              />
            )),
          )}

          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Odd Semester
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Duration:</strong> August - December
              </p>
              <p className="text-sm text-gray-700">
                For 1st, 3rd, 5th, 7th semesters
              </p>
            </div>
            <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-600">
              <h3 className="text-lg font-bold text-gray-800 mb-3">
                Even Semester
              </h3>
              <p className="text-sm text-gray-700 mb-2">
                <strong>Duration:</strong> February - June
              </p>
              <p className="text-sm text-gray-700">
                For 2nd, 4th, 6th, 8th semesters
              </p>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Important Notes
            </h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <span>
                  All dates are tentative and subject to change. Official
                  notifications will be issued for any changes.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <span>
                  Students must regularly check the university website and
                  notice board for updates.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <span>
                  Holidays as per government notifications will be observed.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                <span>
                  Semester break and examination dates may vary for different
                  programs.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
