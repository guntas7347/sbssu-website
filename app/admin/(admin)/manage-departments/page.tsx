import prisma from "@/lib/prisma";
import { Plus, Edit } from "lucide-react";
import Link from "next/link";
import DeleteDepartmentButton from "./DeleteDepartmentButton";

export default async function DepartmentsPage() {
  const departments = await prisma.department.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <>
      <main className="flex-1 p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Department Management
              </h1>
              <p className="text-gray-600">
                Manage university departments and their details
              </p>
            </div>
            <Link
              href={"/admin/manage-departments/add"}
              className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Department
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Department Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Department Code
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Establishment Year
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Location
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {departments.map((dept, index) => (
                    <tr
                      key={dept.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 text-gray-800 font-medium">
                        {dept.name}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {dept.departmentCode}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {dept.establishmentYear || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {dept.location || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/manage-departments/${dept.id}`}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                            title="Edit Department"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <DeleteDepartmentButton id={dept.id} name={dept.name} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
