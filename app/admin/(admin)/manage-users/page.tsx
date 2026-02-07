import { Plus, Edit, Trash2, CheckCircle, XCircle } from "lucide-react";

import getData from "@/lib/getData";
import Link from "next/link";
import { getUsers } from "@/lib/actions/getUsers";

interface User {
  id: string;
  username: string;
  email: string;
  department: string;
  rights: string[];
  loginEnabled: boolean;
}

export default async function UsersPage() {
  const users = await getUsers();

  return (
    <>
      <main className="flex-1 p-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                User Management
              </h1>
              <p className="text-gray-600">
                Manage user accounts and portal access rights
              </p>
            </div>
            <Link
              href={"/admin/manage-users/add"}
              className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add User
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Username
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="px-6 py-4 text-gray-800 font-medium">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{user.email}</td>
                      <td className="px-6 py-4 text-gray-600">
                        {user.department?.name}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          title={user.roles.join(", ")}
                          className="px-2 py-1 text-xs font-semibold bg-orange-100 text-orange-700 rounded max-w-[140px] truncate inline-block cursor-pointer"
                        >
                          {user.roles.join(", ")}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {user.loginEnabled ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                            <CheckCircle className="w-4 h-4" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                            <XCircle className="w-4 h-4" />
                            Disabled
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Link
                            href={`/admin/manage-users/${user.id}`}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </Link>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
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

      {/* {showModal && (
        <AddUser
          setShowModal={setShowModal}
          editingUser={editingUser as any}
          departments={departments}
        />
      )} */}
    </>
  );
}
