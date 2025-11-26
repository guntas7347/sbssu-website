"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { UsersRound } from "lucide-react";

export default function SocietyPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [department, setDepartment] = useState<any>(null);
  const [societies, setSocieties] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/data/departments.json").then((res) => res.json()),
      fetch("/data/societies.json").then((res) => res.json()),
    ])
      .then(([depts, socs]) => {
        const dept = depts.find((d: any) => d.slug === slug);
        setDepartment(dept);
        if (dept) {
          const deptSocs = socs.filter((s: any) => s.department_id === dept.id);
          setSocieties(deptSocs);
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

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <UsersRound className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {department.name}
          </h1>
          <p className="text-lg md:text-xl">Student Society</p>
        </div>
      </div>

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
    </div>
  );
}
