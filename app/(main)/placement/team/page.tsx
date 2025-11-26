"use client";

import { useState, useEffect } from "react";
import { Users, Mail, Phone, Briefcase } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  photo: string;
  designation: string;
  role: string;
  email: string;
  phone: string;
  department?: string;
}

export default function PlacementTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/data/placement-team.json")
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data) => setTeam(data))
      .catch((err) => console.error("Error loading team data:", err));
  }, []);

  const coordinators = team.filter((member) => member.role === "coordinator");
  const faculty = team.filter((member) => member.role === "faculty");

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-orange-600 to-green-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-10 h-10" />
            <h1 className="text-3xl md:text-4xl font-bold">
              Training & Placement Team
            </h1>
          </div>
          <p className="text-lg">
            Meet our dedicated team working to connect students with industry
          </p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gradient-to-b from-orange-50 to-white">
        <div className="max-w-7xl mx-auto">
          {coordinators.length > 0 && (
            <div className="mb-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Placement Coordinators
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-green-600 mx-auto"></div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {coordinators.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-orange-600 to-green-600 h-32"></div>
                    <div className="relative px-6 pb-6">
                      <div className="flex justify-center -mt-16 mb-4">
                        <img
                          src={member.photo}
                          alt={member.name}
                          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                        />
                      </div>
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-orange-600 font-semibold text-sm mb-1">
                          {member.designation}
                        </p>
                        {member.department && (
                          <p className="text-gray-600 text-sm">
                            {member.department}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition"
                        >
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <span className="truncate">{member.email}</span>
                        </a>
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 transition"
                        >
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <span>{member.phone}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {faculty.length > 0 && (
            <div>
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Faculty Members
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-orange-600 mx-auto"></div>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {faculty.map((member) => (
                  <div
                    key={member.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6 text-center"
                  >
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border-4 border-green-100"
                    />
                    <h3 className="font-bold text-gray-800 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-green-600 text-sm font-semibold mb-2">
                      {member.designation}
                    </p>
                    {member.department && (
                      <p className="text-gray-600 text-xs mb-3">
                        {member.department}
                      </p>
                    )}
                    <div className="space-y-1">
                      <a
                        href={`mailto:${member.email}`}
                        className="block text-xs text-gray-600 hover:text-green-600 transition truncate"
                      >
                        {member.email}
                      </a>
                      <a
                        href={`tel:${member.phone}`}
                        className="block text-xs text-gray-600 hover:text-green-600 transition"
                      >
                        {member.phone}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {team.length === 0 && (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-600 text-lg">
                Loading team information...
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-orange-600 to-green-600 rounded-2xl p-8 md:p-12 text-white">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Briefcase className="w-16 h-16 flex-shrink-0" />
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold mb-2">
                  Contact Placement Cell
                </h3>
                <p className="text-lg">
                  For placement-related queries, reach out to our team
                </p>
              </div>
              <a
                href="mailto:placements@sbssu.ac.in"
                className="bg-white text-orange-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
