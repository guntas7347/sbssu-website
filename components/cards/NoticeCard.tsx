import { Bell, Calendar, ExternalLink } from "lucide-react";
import React from "react";

const NoticeCard = ({ notice }) => {
  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-xl hover:border-orange-600 transition">
      <div className="flex items-start gap-3 mb-4">
        <Bell className="w-5 h-5 text-orange-600 shrink-0 mt-1" />
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">{notice.title}</h3>{" "}
          <h2 className="font-light text-sm text-gray-700 mb-2">
            {notice.refNumber}
          </h2>
          <p className="text-sm text-gray-600 mb-3">{notice.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(notice.date).toLocaleDateString("en-IN")}
          </span>
          <span className="px-2 py-1 uppercase bg-orange-100 text-orange-700 rounded-full">
            {notice.noticeLevel}
          </span>
          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full">
            {notice.category}
          </span>
        </div>
        {notice.fileUrl && (
          <a
            href={notice.fileUrl}
            target="_blank"
            className="text-sm text-orange-600 hover:text-orange-700 font-semibold"
          >
            <ExternalLink />
          </a>
        )}
      </div>
    </div>
  );
};

export default NoticeCard;
