"use client";

import { useState, useEffect } from "react";
import { GraduationCap, Clock, BookOpen } from "lucide-react";

export default function CoursesPage() {
  const [departments, setDepartments] = useState<any[]>([]);

  useEffect(() => {
    fetch("/data/departments.json")
      .then((res) => res.json())
      .then((data) => setDepartments(data))
      .catch((err) => console.error("Error loading departments:", err));
  }, []);

  const programs = [
    {
      level: "Undergraduate",
      degree: "B.Tech",
      duration: "4 Years",
      branches: [
        "Computer Science & Engineering",
        "Electronics & Communication",
        "Mechanical Engineering",
        "Civil Engineering",
        "Electrical Engineering",
        "Information Technology",
      ],
    },
    {
      level: "Postgraduate",
      degree: "M.Tech",
      duration: "2 Years",
      branches: [
        "Computer Science & Engineering",
        "Electronics & Communication",
        "VLSI Design",
        "Power Systems",
      ],
    },
    {
      level: "Postgraduate",
      degree: "MBA",
      duration: "2 Years",
      branches: [
        "Marketing",
        "Finance",
        "Human Resource",
        "Operations Management",
      ],
    },
    {
      level: "Doctoral",
      degree: "Ph.D.",
      duration: "3-5 Years",
      branches: ["Engineering", "Management", "Applied Sciences"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <GraduationCap className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Programs Offered
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Quality education in Engineering, Technology, and Management
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {programs.map((program, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-orange-600 transition"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-green-600 rounded-lg flex items-center justify-center text-white">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800">
                      {program.degree}
                    </h3>
                    <p className="text-sm text-gray-600">{program.level}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-gray-600 mb-4 pb-4 border-b border-gray-200">
                  <Clock className="w-5 h-5" />
                  <span className="font-semibold">
                    Duration: {program.duration}
                  </span>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-orange-600" />
                    Specializations
                  </h4>
                  <ul className="space-y-2">
                    {program.branches.map((branch, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                        <span>{branch}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-green-50 rounded-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Why Choose SBSSU?
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-800 mb-2">
                  Industry-Relevant Curriculum
                </h3>
                <p className="text-sm text-gray-600">
                  Courses designed with industry inputs to meet current market
                  needs
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-800 mb-2">
                  Experienced Faculty
                </h3>
                <p className="text-sm text-gray-600">
                  Learn from qualified professors with extensive teaching and
                  research experience
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h3 className="font-bold text-gray-800 mb-2">
                  Modern Infrastructure
                </h3>
                <p className="text-sm text-gray-600">
                  State-of-the-art labs, libraries, and facilities for
                  comprehensive learning
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
