import { Eye, Plus } from "lucide-react";
import DeleteButton from "./DeleteButton";
import getData from "@/lib/getData";
import Link from "next/link";

export default async function NoticesPage() {
  const { payload: notices } = await getData("public/notices");

  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Notice Management
            </h1>
            <p className="text-gray-600">
              Create and manage university-wide notices
            </p>
          </div>
          <Link
            href="/admin/notices/create"
            className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Notice
          </Link>
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
                      <DeleteButton id={notice.id} />
                      {notice.fileUrl && (
                        <a
                          href={`${notice.fileUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </a>
                      )}
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
    </main>
  );
}
