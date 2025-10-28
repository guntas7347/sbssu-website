'use client';

import { Calendar, Download } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function AcademicCouncilMeetingPage() {
  const meetings = [
    {
      date: '2024-10-15',
      title: '45th Academic Council Meeting',
      agenda: 'Review of new course proposals, Examination reforms, Research policy updates',
      minutes: '/downloads/ac-meeting-45-minutes.pdf',
      agenda_doc: '/downloads/ac-meeting-45-agenda.pdf'
    },
    {
      date: '2024-07-20',
      title: '44th Academic Council Meeting',
      agenda: 'Syllabus revisions, Faculty appointments, Academic calendar 2024-25',
      minutes: '/downloads/ac-meeting-44-minutes.pdf',
      agenda_doc: '/downloads/ac-meeting-44-agenda.pdf'
    },
    {
      date: '2024-04-10',
      title: '43rd Academic Council Meeting',
      agenda: 'New program approvals, Quality assurance measures, Student feedback analysis',
      minutes: '/downloads/ac-meeting-43-minutes.pdf',
      agenda_doc: '/downloads/ac-meeting-43-agenda.pdf'
    },
    {
      date: '2024-01-15',
      title: '42nd Academic Council Meeting',
      agenda: 'Budget allocation, Infrastructure planning, Academic partnerships',
      minutes: '/downloads/ac-meeting-42-minutes.pdf',
      agenda_doc: '/downloads/ac-meeting-42-agenda.pdf'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="bg-gradient-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Calendar className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Academic Council Meetings</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Meeting minutes, agendas, and schedules
          </p>
        </div>
      </div>

      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Meeting Schedule</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              The Academic Council convenes regularly to discuss and decide on academic matters. All meeting agendas are circulated in advance, and minutes are published after approval in the subsequent meeting.
            </p>
            <div className="bg-orange-50 p-4 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Next Meeting:</strong> Scheduled for January 2025
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {meetings.map((meeting, index) => (
              <div key={index} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl transition">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-orange-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{meeting.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(meeting.date).toLocaleDateString('en-IN', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-gray-800 mb-2">Agenda</h4>
                  <p className="text-sm text-gray-700">{meeting.agenda}</p>
                </div>

                <div className="flex gap-4">
                  <a
                    href={meeting.agenda_doc}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition text-sm font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    Agenda
                  </a>
                  <a
                    href={meeting.minutes}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    Minutes
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
