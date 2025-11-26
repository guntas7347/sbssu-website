"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Calendar, Download } from "lucide-react";

export default function TimetablePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [department, setDepartment] = useState<any>(null);
  const [timetables, setTimetables] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/data/departments.json").then((res) => res.json()),
      fetch("/data/timetables.json").then((res) => res.json()),
    ])
      .then(([depts, tts]) => {
        const dept = depts.find((d: any) => d.slug === slug);
        setDepartment(dept);
        if (dept) {
          const deptTT = tts.filter((t: any) => t.department_id === dept.id);
          setTimetables(deptTT);
        }
      })
      .catch((err) => console.error("Error loading data:", err));
  }, [slug]);

  if (!department) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  const groupedTimetables = timetables.reduce((acc: any, tt: any) => {
    if (!acc[tt.semester]) acc[tt.semester] = [];
    acc[tt.semester].push(tt);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Calendar className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {department.name}
          </h1>
          <p className="text-lg md:text-xl">Time Tables</p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {Object.keys(groupedTimetables)
            .sort()
            .map((semester) => (
              <div key={semester} className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  Semester {semester}
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedTimetables[semester].map((tt: any) => (
                    <div
                      key={tt.id}
                      className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition"
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                          <Calendar className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">
                            {tt.class_name}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Semester {tt.semester}
                          </p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">
                        Academic Year: {tt.academic_year}
                      </p>
                      <a
                        href={tt.file_url}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold w-full justify-center"
                      >
                        <Download className="w-4 h-4" />
                        Download PDF
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          {timetables.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              Timetable information will be updated soon.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
