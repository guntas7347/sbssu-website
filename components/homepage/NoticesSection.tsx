import React from "react";
import {
  Bell,
  FileText,
  Calendar,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

const notices = [
  {
    id: 1,
    category: "Examination",
    date: "Nov 18, 2026",
    title:
      "End-Semester Examination Schedule for B.Tech & MCA Regular/Reappear Students",
    badgeColor:
      "bg-primary/10 text-primary dark:text-primary-dark border-primary/20",
    isNew: true,
  },
  {
    id: 2,
    category: "Admissions",
    date: "Nov 15, 2026",
    title:
      "Spot Round Counseling Guidelines for Lateral Entry B.Tech Programs 2026-27",
    badgeColor:
      "bg-secondary-light/10 text-secondary-light dark:text-secondary-dark border-secondary-light/20",
    isNew: true,
  },
  {
    id: 3,
    category: "Placement Cell",
    date: "Nov 12, 2026",
    title:
      "Campus Drive: Top Multinational Tech & Core Engineering Giants Recruitment 2026 Batch",
    badgeColor:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    isNew: false,
  },
  {
    id: 4,
    category: "General",
    date: "Nov 08, 2026",
    title:
      "Notification Regarding Annual Inter-College Cultural Fest and Technical Symposium",
    badgeColor:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
    isNew: false,
  },
];

export function NoticesSection() {
  return (
    <section
      id="notices"
      className="py-20 bg-white dark:bg-slate-900 transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 text-primary dark:text-primary-dark font-bold text-xs uppercase tracking-wider mb-2">
              <Bell className="w-4 h-4" /> Announcements & Updates
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Latest Circulars & Notices
            </h2>
          </div>
          <a
            href="https://sbssu.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 font-semibold text-sm text-primary dark:text-primary-dark hover:underline"
          >
            View All Circular Archives <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Notices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notices.map((notice) => (
            <div
              key={notice.id}
              className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold border ${notice.badgeColor}`}
                  >
                    {notice.category}
                  </span>
                  {notice.isNew && (
                    <span className="px-2.5 py-0.5 rounded-full bg-red-500 text-white text-[10px] font-extrabold tracking-wider uppercase animate-pulse">
                      New
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-primary-dark transition-colors mb-3">
                  {notice.title}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {notice.date}
                </span>
                <button className="flex items-center gap-1 font-semibold text-primary dark:text-primary-dark hover:underline">
                  Download PDF <FileText className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
