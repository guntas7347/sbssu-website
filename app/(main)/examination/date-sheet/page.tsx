"use client";

import { useState } from "react";
import { Calendar, Download, AlertCircle } from "lucide-react";

export default function DateSheetPage() {
  const [selectedProgram, setSelectedProgram] = useState("btech");
  const [selectedSemester, setSelectedSemester] = useState("odd");

  const dateSheets = {
    btech: {
      odd: [
        {
          date: "2024-12-20",
          day: "Monday",
          time: "9:00 AM - 12:00 PM",
          subject: "Engineering Mathematics-III",
          code: "BT-301",
        },
        {
          date: "2024-12-22",
          day: "Wednesday",
          time: "9:00 AM - 12:00 PM",
          subject: "Data Structures",
          code: "BT-302",
        },
        {
          date: "2024-12-24",
          day: "Friday",
          time: "9:00 AM - 12:00 PM",
          subject: "Digital Electronics",
          code: "BT-303",
        },
        {
          date: "2024-12-26",
          day: "Sunday",
          time: "9:00 AM - 12:00 PM",
          subject: "Computer Organization",
          code: "BT-304",
        },
        {
          date: "2024-12-28",
          day: "Tuesday",
          time: "9:00 AM - 12:00 PM",
          subject: "Operating Systems",
          code: "BT-305",
        },
        {
          date: "2024-12-30",
          day: "Thursday",
          time: "9:00 AM - 12:00 PM",
          subject: "Database Management Systems",
          code: "BT-306",
        },
      ],
      even: [
        {
          date: "2025-05-15",
          day: "Monday",
          time: "9:00 AM - 12:00 PM",
          subject: "Engineering Mathematics-IV",
          code: "BT-401",
        },
        {
          date: "2025-05-17",
          day: "Wednesday",
          time: "9:00 AM - 12:00 PM",
          subject: "Computer Networks",
          code: "BT-402",
        },
        {
          date: "2025-05-19",
          day: "Friday",
          time: "9:00 AM - 12:00 PM",
          subject: "Software Engineering",
          code: "BT-403",
        },
        {
          date: "2025-05-21",
          day: "Sunday",
          time: "9:00 AM - 12:00 PM",
          subject: "Theory of Computation",
          code: "BT-404",
        },
        {
          date: "2025-05-23",
          day: "Tuesday",
          time: "9:00 AM - 12:00 PM",
          subject: "Web Technologies",
          code: "BT-405",
        },
        {
          date: "2025-05-25",
          day: "Thursday",
          time: "9:00 AM - 12:00 PM",
          subject: "Microprocessors",
          code: "BT-406",
        },
      ],
    },
    mtech: {
      odd: [
        {
          date: "2024-12-20",
          day: "Monday",
          time: "2:00 PM - 5:00 PM",
          subject: "Advanced Algorithms",
          code: "MT-101",
        },
        {
          date: "2024-12-22",
          day: "Wednesday",
          time: "2:00 PM - 5:00 PM",
          subject: "Machine Learning",
          code: "MT-102",
        },
        {
          date: "2024-12-24",
          day: "Friday",
          time: "2:00 PM - 5:00 PM",
          subject: "Cloud Computing",
          code: "MT-103",
        },
        {
          date: "2024-12-26",
          day: "Sunday",
          time: "2:00 PM - 5:00 PM",
          subject: "Research Methodology",
          code: "MT-104",
        },
      ],
      even: [
        {
          date: "2025-05-15",
          day: "Monday",
          time: "2:00 PM - 5:00 PM",
          subject: "Big Data Analytics",
          code: "MT-201",
        },
        {
          date: "2025-05-17",
          day: "Wednesday",
          time: "2:00 PM - 5:00 PM",
          subject: "Deep Learning",
          code: "MT-202",
        },
        {
          date: "2025-05-19",
          day: "Friday",
          time: "2:00 PM - 5:00 PM",
          subject: "Natural Language Processing",
          code: "MT-203",
        },
        {
          date: "2025-05-21",
          day: "Sunday",
          time: "2:00 PM - 5:00 PM",
          subject: "Distributed Systems",
          code: "MT-204",
        },
      ],
    },
  };

  const currentDateSheet =
    dateSheets[selectedProgram as keyof typeof dateSheets][
      selectedSemester as keyof typeof dateSheets.btech
    ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Calendar className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Examination Date Sheet
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            View and download examination schedules
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Program
                </label>
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                >
                  <option value="btech">B.Tech</option>
                  <option value="mtech">M.Tech</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Semester
                </label>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-600 focus:border-transparent"
                >
                  <option value="odd">Odd Semester</option>
                  <option value="even">Even Semester</option>
                </select>
              </div>
              <div className="flex items-end">
                <button className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-orange-600 to-green-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Date</th>
                    <th className="px-6 py-4 text-left font-semibold">Day</th>
                    <th className="px-6 py-4 text-left font-semibold">Time</th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">Code</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {currentDateSheet.map((exam, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {exam.date}
                      </td>
                      <td className="px-6 py-4 text-gray-700">{exam.day}</td>
                      <td className="px-6 py-4 text-gray-700">{exam.time}</td>
                      <td className="px-6 py-4 text-gray-800">
                        {exam.subject}
                      </td>
                      <td className="px-6 py-4 font-mono text-orange-600">
                        {exam.code}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-orange-50 rounded-xl p-6 border-l-4 border-orange-600">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Important Instructions
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <span>
                    Students must report to examination center 30 minutes before
                    start time
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <span>Admit card and valid ID proof are mandatory</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <span>
                    Late entry not permitted after 30 minutes of exam start
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <span>
                    Use of unfair means will result in cancellation of
                    examination
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                What to Bring
              </h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <span>Admit card with photograph</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <span>University ID card or Government ID proof</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <span>Blue/Black ball point pens</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <span>
                    Non-programmable calculator (if permitted for subject)
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-xl p-6 border-l-4 border-yellow-600 flex gap-4">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-800 mb-2">Note</h3>
              <p className="text-sm text-gray-700">
                Date sheets are subject to change. Students are advised to
                regularly check the university website and notice board for any
                updates or modifications. In case of any discrepancy, contact
                the Controller of Examinations office immediately.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
