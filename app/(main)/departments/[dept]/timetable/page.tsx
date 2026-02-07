import { Calendar, Download } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function TimetablePage({ params }) {
  const { dept } = await params;
  const { page, updatedAt } = await getPage(dept, "timetable");

  const deptName =
    page?.department?.name || dept?.toUpperCase() || "Department";
  const timetables = page?.timetables || [];

  // Group timetables by semester
  const groupedTimetables = timetables.reduce((acc, tt) => {
    const semester = tt?.semester || "Other";
    if (!acc[semester]) acc[semester] = [];
    acc[semester].push(tt);
    return acc;
  }, {});

  const sortedSemesters = Object.keys(groupedTimetables).sort();

  return (
    <div>
      <PageHeader
        icon={Calendar}
        title="Time Tables"
        subTitle={`Department of ${deptName}`}
      />

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {timetables.length > 0 ? (
            sortedSemesters.map((semester) => (
              <div key={semester} className="mb-12">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-200">
                  Semester: {semester}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedTimetables[semester].map((tt, index) => (
                    <div
                      key={tt?.id || index}
                      className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {tt?.class_name || "Class Name N/A"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Semester {tt?.semester || "N/A"}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Academic Year: {tt?.academic_year || "N/A"}
                      </p>
                      {tt?.file?.url ? (
                        <a
                          href={tt.file.url}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold w-full justify-center"
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-400 rounded-lg font-semibold w-full justify-center cursor-not-allowed">
                          <Download className="w-4 h-4" />
                          Download Unavailable
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-xl">
              Timetable information will be updated soon.
            </div>
          )}
        </div>
      </section>
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
