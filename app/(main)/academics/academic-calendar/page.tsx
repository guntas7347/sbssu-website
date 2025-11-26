"use client";

import { Calendar, Download } from "lucide-react";

export default function AcademicCalendarPage() {
  const events = [
    {
      date: "2024-08-01",
      event: "Start of Academic Session 2024-25",
      type: "session",
    },
    {
      date: "2024-08-01 to 2024-08-15",
      event: "Admission Process - All Programs",
      type: "admission",
    },
    {
      date: "2024-08-16",
      event: "Commencement of Classes - Odd Semester",
      type: "classes",
    },
    { date: "2024-09-05", event: "Teachers Day Celebration", type: "event" },
    { date: "2024-10-02", event: "Gandhi Jayanti Holiday", type: "holiday" },
    { date: "2024-10-12", event: "Dussehra Break Begins", type: "holiday" },
    { date: "2024-10-21", event: "Classes Resume", type: "classes" },
    { date: "2024-11-01", event: "Diwali Break Begins", type: "holiday" },
    { date: "2024-11-11", event: "Classes Resume", type: "classes" },
    {
      date: "2024-11-10 to 2024-11-20",
      event: "Mid-Semester Examinations",
      type: "exam",
    },
    {
      date: "2024-12-10",
      event: "Last Date for Internal Submission",
      type: "deadline",
    },
    { date: "2024-12-15", event: "End of Regular Classes", type: "classes" },
    {
      date: "2024-12-20 to 2025-01-10",
      event: "Winter Break",
      type: "holiday",
    },
    { date: "2025-01-11", event: "Practical Examinations Begin", type: "exam" },
    {
      date: "2025-01-20 to 2025-02-10",
      event: "End Semester Theory Examinations",
      type: "exam",
    },
    { date: "2025-02-15", event: "Declaration of Results", type: "result" },
    { date: "2025-02-20", event: "Start of Even Semester", type: "session" },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "session":
        return "bg-green-100 text-green-800";
      case "admission":
        return "bg-blue-100 text-blue-800";
      case "classes":
        return "bg-orange-100 text-orange-800";
      case "exam":
        return "bg-red-100 text-red-800";
      case "holiday":
        return "bg-purple-100 text-purple-800";
      case "event":
        return "bg-pink-100 text-pink-800";
      case "deadline":
        return "bg-yellow-100 text-yellow-800";
      case "result":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Calendar className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Academic Calendar
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Important dates and events for Academic Year 2024-25
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Academic Year 2024-25
                </h2>
                <p className="text-gray-600">August 2024 - July 2025</p>
              </div>
              <a
                href="/downloads/academic-calendar-2024-25.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition font-semibold"
              >
                <Download className="w-5 h-5" />
                Download Calendar
              </a>
            </div>
          </div>

          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-8 h-8 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1">
                        {event.event}
                      </h3>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                  </div>
                  <span
                    className={`px-4 py-2 rounded-full text-xs font-semibold ${getTypeColor(
                      event.type
                    )}`}
                  >
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
              </div>
            ))}
          </div>

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
