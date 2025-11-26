"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { TrendingUp, DollarSign, Users } from "lucide-react";

export default function ResearchPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [department, setDepartment] = useState<any>(null);
  const [research, setResearch] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([
      fetch("/data/departments.json").then((res) => res.json()),
      fetch("/data/research.json").then((res) => res.json()),
    ])
      .then(([depts, researchData]) => {
        const dept = depts.find((d: any) => d.slug === slug);
        setDepartment(dept);
        if (dept) {
          const deptResearch = researchData.filter(
            (r: any) => r.department_id === dept.id
          );
          setResearch(deptResearch);
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
          <TrendingUp className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {department.name}
          </h1>
          <p className="text-lg md:text-xl">Funded Research Projects</p>
        </div>
      </div>

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
    </div>
  );
}
