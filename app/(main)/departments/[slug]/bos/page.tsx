"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { FileText, GraduationCap } from "lucide-react";

export default function BOSPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [department, setDepartment] = useState<any>(null);

  useEffect(() => {
    fetch("/data/departments.json")
      .then((res) => res.json())
      .then((data) => {
        const dept = data.find((d: any) => d.slug === slug);
        setDepartment(dept);
      })
      .catch((err) => console.error("Error loading department:", err));
  }, [slug]);

  const bosMembers = [
    { name: "Dr. Rajesh Kumar", role: "Chairperson (HOD)", type: "Internal" },
    { name: "Dr. Sukhwinder Kaur", role: "Professor", type: "Internal" },
    {
      name: "Dr. Amandeep Singh",
      role: "Associate Professor",
      type: "Internal",
    },
    { name: "Dr. Priya Sharma", role: "Assistant Professor", type: "Internal" },
    { name: "Prof. Amarjit Singh", role: "IIT Delhi", type: "External Expert" },
    {
      name: "Prof. Manpreet Kaur",
      role: "PU Chandigarh",
      type: "External Expert",
    },
    {
      name: "Mr. Gurpreet Singh",
      role: "Industry Representative - TCS",
      type: "Industry",
    },
    {
      name: "Ms. Harpreet Kaur",
      role: "Alumni Representative",
      type: "Alumni",
    },
  ];

  const responsibilities = [
    "Design and update curriculum and syllabi",
    "Recommend new courses and programs",
    "Ensure industry relevance of courses",
    "Monitor academic standards and quality",
    "Coordinate with other departments",
    "Review student feedback and outcomes",
  ];

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
          <FileText className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {department.name}
          </h1>
          <p className="text-lg md:text-xl">Board of Studies</p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About BOS</h2>
            <p className="text-gray-600 leading-relaxed">
              The Board of Studies (BOS) is responsible for the development and
              continuous improvement of academic programs in the department. It
              comprises internal faculty, external experts from academia and
              industry, and alumni representatives who work together to ensure
              that our curriculum meets the highest standards and industry
              requirements.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                BOS Members
              </h3>
              <div className="space-y-3">
                {bosMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-600"
                  >
                    <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">
                        {member.name}
                      </p>
                      <p className="text-sm text-gray-600">{member.role}</p>
                      <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                        {member.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Key Responsibilities
              </h3>
              <ul className="space-y-4">
                {responsibilities.map((resp, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <p className="text-gray-700">{resp}</p>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-6 bg-green-50 rounded-lg border-l-4 border-green-600">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Meeting Schedule
                </h4>
                <p className="text-sm text-gray-700">
                  The BOS meets at least twice a year to review and update
                  curriculum, assess course outcomes, and discuss academic
                  improvements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
