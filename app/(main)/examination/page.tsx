"use client";

import Link from "next/link";
import { ClipboardCheck, Users, Calendar, FileText } from "lucide-react";

export default function ExaminationPage() {
  const sections = [
    {
      title: "Office Bearers",
      description: "Controller of Examination and examination staff",
      icon: Users,
      href: "/examination/office-bearers",
      color: "orange",
    },
    {
      title: "Date Sheet",
      description: "Examination schedule and date sheets",
      icon: Calendar,
      href: "/examination/date-sheet",
      color: "green",
    },
    {
      title: "Question Paper Templates",
      description: "Download templates for question paper preparation",
      icon: FileText,
      href: "/examination/question-templates",
      color: "orange",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <ClipboardCheck className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Examination</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Examination schedules, guidelines, and important information
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Examination Cell
            </h2>
            <p className="text-gray-600 leading-relaxed">
              The Examination Cell is responsible for conducting all
              examinations in the university in a fair, transparent, and
              efficient manner. We ensure timely declaration of results and
              maintain the highest standards of academic integrity.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <Link
                  key={section.title}
                  href={section.href}
                  className="bg-white border-2 border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-orange-600 transition group"
                >
                  <div
                    className={`w-16 h-16 bg-${section.color}-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-${section.color}-600 transition`}
                  >
                    <Icon
                      className={`w-8 h-8 text-${section.color}-600 group-hover:text-white transition`}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {section.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{section.description}</p>
                  <div className="text-orange-600 font-semibold group-hover:translate-x-2 transition inline-block">
                    View Details →
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-orange-50 rounded-xl p-8 border-l-4 border-orange-600">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Important Guidelines
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <span>
                    Students must carry valid ID card and admit card to
                    examination hall
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <span>
                    Reach examination center 30 minutes before scheduled time
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <span>
                    Mobile phones and electronic devices are strictly prohibited
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2"></div>
                  <span>
                    Any form of malpractice will result in cancellation of
                    examination
                  </span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-8 border-l-4 border-green-600">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3 text-gray-700">
                <div>
                  <p className="font-semibold">Controller of Examinations</p>
                  <p className="text-sm">Dr. Rajesh Kumar</p>
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-sm">coe@sbssu.ac.in</p>
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-sm">+91-1234-567890</p>
                </div>
                <div>
                  <p className="font-semibold">Office Hours</p>
                  <p className="text-sm">Monday - Friday: 9:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
