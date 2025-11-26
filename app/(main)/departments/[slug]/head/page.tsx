"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { UserCheck, Mail, Phone, GraduationCap } from "lucide-react";

export default function DepartmentHeadPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [department, setDepartment] = useState<any>(null);
  const [hodData, setHodData] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch("/data/departments.json").then((res) => res.json()),
      fetch("/data/hod.json").then((res) => res.json()),
    ])
      .then(([depts, hods]) => {
        const dept = depts.find((d: any) => d.slug === slug);
        setDepartment(dept);
        if (dept) {
          const hod = hods.find((h: any) => h.department_id === dept.id);
          setHodData(hod);
        }
      })
      .catch((err) => console.error("Error loading data:", err));
  }, [slug]);

  if (!department || !hodData) {
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
          <GraduationCap className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {department.name}
          </h1>
          <p className="text-lg md:text-xl">Department & Head</p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-orange-600 to-green-600 p-8 text-white">
                <img
                  src={hodData.photo_url}
                  alt={hodData.name}
                  className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-white object-cover"
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{hodData.name}</h2>
                  <p className="text-orange-100 mb-2">{hodData.designation}</p>
                  <p className="text-sm mb-6">Head of Department</p>

                  <div className="space-y-3 text-sm">
                    <a
                      href={`mailto:${hodData.email}`}
                      className="flex items-center gap-2 justify-center hover:text-orange-200"
                    >
                      <Mail className="w-4 h-4" />
                      <span>{hodData.email}</span>
                    </a>
                    <a
                      href={`tel:${hodData.phone}`}
                      className="flex items-center gap-2 justify-center hover:text-orange-200"
                    >
                      <Phone className="w-4 h-4" />
                      <span>{hodData.phone}</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-orange-600 pb-3">
                  Message from HOD
                </h3>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {hodData.message}
                  </p>
                </div>

                {hodData.qualifications && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">
                      Qualifications
                    </h4>
                    <ul className="space-y-2">
                      {hodData.qualifications
                        .split(",")
                        .map((qual: string, idx: number) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-gray-700"
                          >
                            <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                            <span>{qual.trim()}</span>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {hodData.research_interests && (
                  <div className="mt-6">
                    <h4 className="text-xl font-bold text-gray-800 mb-4">
                      Research Interests
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {hodData.research_interests
                        .split(",")
                        .map((interest: string, idx: number) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                          >
                            {interest.trim()}
                          </span>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              About the Department
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {department.description}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600 mb-2">50+</p>
                <p className="text-gray-700">Faculty Members</p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <p className="text-3xl font-bold text-green-600 mb-2">500+</p>
                <p className="text-gray-700">Students</p>
              </div>
              <div className="text-center p-6 bg-orange-50 rounded-lg">
                <p className="text-3xl font-bold text-orange-600 mb-2">20+</p>
                <p className="text-gray-700">Research Projects</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
