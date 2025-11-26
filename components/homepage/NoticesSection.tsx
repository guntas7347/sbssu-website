import { getNotices } from "@/lib/db";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import NoticeCard from "../cards/NoticeCard";

const NoticesSection = async () => {
  const notices = await getNotices(6);

  return (
    <section className="py-16 px-4 bg-linear-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Latest Notices
            </h2>
            <div className="w-24 h-1 bg-linear-to-r from-green-600 to-orange-600"></div>
          </div>
          <Link
            href="/notices"
            className="text-orange-600 hover:text-orange-700 font-semibold flex items-center gap-2"
          >
            View All
            <ChevronDown className="w-4 h-4 -rotate-90" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <NoticeCard key={notice.id} notice={notice} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              Loading notices...
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
