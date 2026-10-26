import { Eye, Plus, FileText } from "lucide-react";
import DeleteButton from "./DeleteButton";
import prisma from "@/lib/prisma";
import Link from "next/link";

export default async function NoticesPage() {
  const notices = await prisma.notice.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      department: {
        select: { name: true, departmentCode: true },
      },
    },
  });

  return (
    <main className="flex-1 p-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Notice Management
            </h1>
            <p className="text-gray-600">
              Create and manage university-wide and departmental notices
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
                  Scope / Dept
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
                notices.map((notice, index) => {
                  const fileObj = notice.file as
                    | { title?: string; url?: string }
                    | string
                    | null;
                  const fileUrl =
                    typeof fileObj === "object" && fileObj !== null && "url" in fileObj
                      ? (fileObj as { url: string }).url
                      : typeof fileObj === "string"
                      ? fileObj
                      : null;

                  const isActive = new Date(notice.showTill) >= new Date();

                  return (
                    <tr
                      key={notice.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 text-gray-800 font-medium max-w-xs">
                        <div className="truncate font-semibold" title={notice.title}>
                          {notice.title}
                        </div>
                        {notice.description && (
                          <div className="text-xs text-gray-500 truncate mt-0.5">
                            {notice.description}
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {notice.refNumber || "N/A"}
                      </td>

                      <td className="px-6 py-4 text-sm">
                        <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-100 text-gray-700">
                          {notice.scope === "CENTRAL"
                            ? "Central"
                            : notice.department?.departmentCode || "Dept"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-gray-600 text-sm">
                        {new Date(notice.date).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold uppercase">
                          {notice.category || "General"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        {isActive ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                            Active
                          </span>
                        ) : (
                          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-semibold">
                            Expired
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-left">
                        <div className="flex items-center gap-2">
                          <DeleteButton id={notice.id} />
                          {fileUrl && (
                            <a
                              href={fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Document"
                            >
                              <FileText className="w-4 h-4" />
                            </a>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
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
