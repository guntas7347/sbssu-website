import { Bell } from "lucide-react";

import { getNotices } from "@/lib/db";
import NoticeClient from "./NoticeClient";

export default async function NoticesPage() {
  const notices = await getNotices(); // server-only call
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-linear-to-r from-orange-600 to-green-600 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <Bell className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Notices & Announcements
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Stay updated with the latest news and announcements from SBSSU
          </p>
        </div>
      </div>

      <NoticeClient notices={notices} />
    </div>
  );
}
