"use client";

import { Users, Mail, Phone, MapPin } from "lucide-react";

export default function OfficeBearersPage() {
  const coe = {
    name: "Dr. Rajesh Kumar",
    designation: "Controller of Examinations",
    photo:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=300",
    email: "coe@sbssu.ac.in",
    phone: "+91-1234-567890",
    office: "Administrative Block, Room 201",
  };

  const staff = [
    {
      name: "Mr. Amarjit Singh",
      designation: "Deputy Controller of Examinations",
      photo:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "dcoe@sbssu.ac.in",
      phone: "+91-1234-567891",
      responsibilities:
        "Supervision of examination conduct, Date sheet preparation",
    },
    {
      name: "Ms. Priya Sharma",
      designation: "Assistant Controller of Examinations",
      photo:
        "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "acoe1@sbssu.ac.in",
      phone: "+91-1234-567892",
      responsibilities: "Result processing, Answer book management",
    },
    {
      name: "Mr. Gurpreet Singh",
      designation: "Examination Superintendent",
      photo:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "superintendent@sbssu.ac.in",
      phone: "+91-1234-567893",
      responsibilities: "Examination center coordination, Student queries",
    },
    {
      name: "Ms. Harpreet Kaur",
      designation: "Senior Clerk",
      photo:
        "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300",
      email: "clerk.exam@sbssu.ac.in",
      phone: "+91-1234-567894",
      responsibilities: "Documentation, Record maintenance",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Users className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Examination Office Bearers
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Meet the team responsible for conducting examinations
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
            <div className="md:flex">
              <div className="md:w-1/3 bg-gradient-to-br from-orange-600 to-green-600 p-8 text-white">
                <img
                  src={coe.photo}
                  alt={coe.name}
                  className="w-48 h-48 rounded-full mx-auto mb-6 border-4 border-white object-cover"
                />
                <div className="text-center">
                  <h2 className="text-2xl font-bold mb-2">{coe.name}</h2>
                  <p className="text-orange-100 mb-2">{coe.designation}</p>
                </div>
              </div>

              <div className="md:w-2/3 p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-orange-600 pb-3">
                  About Controller of Examinations
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  The Controller of Examinations is responsible for the overall
                  management and conduct of all university examinations. This
                  includes planning examination schedules, ensuring fair
                  evaluation, maintaining examination records, and timely
                  declaration of results. The COE works closely with departments
                  and faculty to uphold academic standards and examination
                  integrity.
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                    <Mail className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Email
                      </p>
                      <p className="text-gray-700">{coe.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <Phone className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Phone
                      </p>
                      <p className="text-gray-700">{coe.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Office
                      </p>
                      <p className="text-gray-700">{coe.office}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Examination Staff
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {staff.map((member, index) => (
              <div
                key={index}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-orange-600"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {member.name}
                    </h3>
                    <p className="text-orange-600 font-semibold">
                      {member.designation}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-orange-600" />
                    <span>{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-green-600" />
                    <span>{member.phone}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <p className="text-sm font-semibold text-gray-800 mb-2">
                    Key Responsibilities
                  </p>
                  <p className="text-sm text-gray-600">
                    {member.responsibilities}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-br from-orange-50 to-green-50 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Office Hours
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-gray-800 mb-3">Regular Hours</h4>
                <p className="text-gray-700 mb-2">Monday - Friday</p>
                <p className="text-sm text-gray-600">9:00 AM - 5:00 PM</p>
                <p className="text-xs text-gray-500 mt-2">
                  Lunch Break: 1:00 PM - 2:00 PM
                </p>
              </div>
              <div className="bg-white rounded-lg p-6">
                <h4 className="font-bold text-gray-800 mb-3">
                  Examination Period
                </h4>
                <p className="text-gray-700 mb-2">Monday - Saturday</p>
                <p className="text-sm text-gray-600">8:00 AM - 7:00 PM</p>
                <p className="text-xs text-gray-500 mt-2">
                  Extended hours during examinations
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
