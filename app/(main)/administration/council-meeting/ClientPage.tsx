"use client";

import { useState } from "react";
import { Calendar, ExternalLink, Filter } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";

const categories = [
  "All",
  "Academic Council",
  "Finance Committee",
  "Planning Board",
  "Examination Board",
  "Research Committee",
  "Other",
];

export function MeetingPageClient({
  meetings,
  updatedAt,
}: {
  meetings: any;
  updatedAt: string;
}) {
  const [category, setCategory] = useState<string>("All");

  const allMeetings = meetings?.meetings || [];

  const filteredMeetings =
    category === "All"
      ? allMeetings
      : allMeetings.filter((m: any) => m.category === category);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Calendar className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Council Meetings
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Meeting minutes, agendas, and schedules
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <section className="max-w-5xl mx-auto px-4 py-10">
        <div className="flex flex-wrap items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Meetings Overview
          </h2>

          <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              className="bg-transparent text-sm text-gray-700 focus:outline-none"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Meeting List */}
        <div className="space-y-6">
          {filteredMeetings.length === 0 && (
            <p className="text-gray-600 italic">
              No meetings found for this category.
            </p>
          )}

          {filteredMeetings.map((meeting: any) => {
            const documents =
              typeof meeting.documents === "string"
                ? JSON.parse(meeting.documents)
                : meeting.documents || [];

            return (
              <div
                key={meeting.id || Math.random()}
                className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {meeting.name || "N/A"}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {meeting.date || "N/A"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Category: {meeting.category || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Agenda</h4>
                  <p className="text-sm text-gray-700">
                    {meeting.agenda || "Not Available"}
                  </p>
                </div>

                {documents.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {documents.map(({ doc }: any, i: number) => (
                      <a
                        key={i}
                        href={doc?.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold"
                      >
                        <ExternalLink className="w-4 h-4" />
                        {doc?.title || "Document"}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No documents uploaded
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <LastUpdatedTag date={updatedAt} />
      </section>
    </div>
  );
}
