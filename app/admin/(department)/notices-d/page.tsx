"use client";

import { useEffect, useState } from "react";
import { Eye, Plus, Trash2 } from "lucide-react";
import CreateNoticeModal from "@/components/Modals/CreateNoticeModal";

import { getNoticesAction, deleteNoticeAction } from "@/lib/actions/notices";

interface Notice {
  id: string;
  title: string;
  refNumber: string;
  date: string | Date;
  showTill: string | Date;
  category: string;
  file?: any;
  fileUrl?: string;
}

export default function DepartmentNoticesPage() {
  const [showModal, setShowModal] = useState(false);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  const loadNotices = async () => {
    try {
      const res = await getNoticesAction();
      if (res.success && Array.isArray(res.data)) {
        setNotices(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch notices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, [showModal]);

  if (loading) return <p className="p-8">Loading notices...</p>;

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this notice?")) return;

    try {
      const res = await deleteNoticeAction(id);
      if (!res.success) {
        throw new Error(res.error || "Failed to delete notice");
      }
      setNotices((prev) => prev.filter((n) => n.id !== id));
    } catch (err: any) {
      console.error("Delete failed:", err);
      alert(err.message || "Failed to delete notice");
    }
  }

  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Department Notice Management
            </h1>
            <p className="text-gray-600">
              Create and manage department-wide notices
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Notice
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Title
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Ref Number
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {notices.length > 0 ? (
                notices.map((notice, index) => (
                  <tr
                    key={notice.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 text-gray-800 font-medium">
                      {notice.title}
                    </td>

                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {notice.refNumber || "N/A"}
                    </td>

                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(notice.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>

                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                        {notice.category || "N/A"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {new Date(notice.showTill) >= new Date() ? (
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          Active
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                          Expired
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-left flex gap-2">
                      {(() => {
                        const fileLink =
                          typeof notice.file === "object" && notice.file !== null
                            ? notice.file.url
                            : notice.file || notice.fileUrl;
                        return fileLink ? (
                          <a
                            href={fileLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        ) : null;
                      })()}

                      <button
                        onClick={() => handleDelete(notice.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-gray-500 text-sm italic"
                  >
                    No notices found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <CreateNoticeModal setShowModal={setShowModal} noticeLevel="central" />
      )}
    </main>
  );
}
