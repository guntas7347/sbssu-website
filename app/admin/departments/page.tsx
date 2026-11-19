// app/admin/departments/page.tsx
import { getDepartments, deleteDepartment } from "@/lib/actions/departments";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function DepartmentsPage() {
  const departments = await getDepartments();

  async function handleDelete(formData: FormData) {
    "use server";
    const id = formData.get("id") as string;
    if (id) {
      await deleteDepartment(id);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Departments Management
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Manage organization departments, codes, and Head of Departments
            (HOD).
          </p>
        </div>
        <Link
          href="/admin/departments/new"
          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
        >
          + Add Department
        </Link>
      </div>

      <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-medium">
              <tr>
                <th className="px-6 py-3">Code</th>
                <th className="px-6 py-3">Department Name</th>
                <th className="px-6 py-3">HOD</th>
                <th className="px-6 py-3">Created At</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              {departments.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    No departments found. Create your first one!
                  </td>
                </tr>
              ) : (
                departments.map((dept) => (
                  <tr
                    key={dept.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                  >
                    <td className="px-6 py-4 font-mono font-semibold text-xs">
                      {dept.code}
                    </td>
                    <td className="px-6 py-4 font-medium">{dept.name}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                      {dept.hod?.fullName || dept.hod?.email || "Not Assigned"}
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">
                      {new Date(dept.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Link
                        href={`/admin/departments/${dept.id}`}
                        className="text-primary hover:underline text-xs font-semibold"
                      >
                        Edit
                      </Link>
                      <form action={handleDelete} className="inline">
                        <input type="hidden" name="id" value={dept.id} />
                        <button
                          type="submit"
                          className="text-red-500 hover:underline text-xs font-semibold ml-2"
                        >
                          Delete
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
