import { Calendar, ExternalLink } from "lucide-react";
import LastUpdatedTag from "@/components/LastUpdatedTag";
import PageHeader from "@/components/PageHeader";
import { getPage } from "@/lib/actions/getPage";

export default async function CouncilMeetingsPage() {
  const { page, updatedAt } = await getPage("admin", "council-meetings");

  const meetings = page?.meetings || [];

  return (
    <div>
      <PageHeader
        title="Council Meetings"
        subTitle="Meeting minutes, agendas, and schedules"
        icon={Calendar}
      />
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">
            Meetings Overview
          </h2>

          <div className="space-y-6">
            {meetings.length > 0 ? (
              meetings.map((meeting, index) => {
                // Defensive coding for documents handling
                const documents = Array.isArray(meeting?.documents)
                  ? meeting.documents
                  : [];

                return (
                  <div
                    key={meeting?.id || index}
                    className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center shrink-0">
                          <Calendar className="w-8 h-8 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {meeting?.name || "Meeting Name N/A"}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {meeting?.date || "Date N/A"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            <span className="font-semibold">Category:</span>{" "}
                            {meeting?.category || "General"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        Agenda
                      </h4>
                      <p className="text-sm text-gray-700">
                        {meeting?.agenda || "No agenda details available."}
                      </p>
                    </div>

                    {documents.length > 0 ? (
                      <div className="flex flex-wrap gap-3">
                        {documents.map((docItem, i) => {
                          // Handle structure: sometimes simple object, sometimes nested in 'doc'
                          const url = docItem?.url || docItem?.doc?.url || "#";
                          const title =
                            docItem?.title ||
                            docItem?.doc?.title ||
                            "Download Document";

                          return (
                            <a
                              key={i}
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold"
                            >
                              <ExternalLink className="w-4 h-4" />
                              {title}
                            </a>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic">
                        No documents uploaded.
                      </p>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 italic text-center py-8">
                No meetings found.
              </p>
            )}
          </div>
        </div>
      </section>{" "}
      <LastUpdatedTag date={updatedAt} />
    </div>
  );
}
