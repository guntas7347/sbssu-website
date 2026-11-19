// app/admin/departments/[id]/page.tsx
import {
  getDepartmentById,
  createDepartment,
  updateDepartment,
  getUsersList,
} from "@/lib/actions/departments";
import { redirect } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DepartmentFormPage({ params }: PageProps) {
  const { id } = await params;
  const isNew = id === "new";

  let department = null;
  if (!isNew) {
    department = await getDepartmentById(id);
    if (!department) {
      redirect("/admin/departments");
    }
  }

  const users = await getUsersList();

  async function handleSubmit(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const code = formData.get("code") as string;
    const hodId = formData.get("hodId") as string;

    const payload = {
      name,
      code,
      hodId: hodId || null,
    };

    if (isNew) {
      await createDepartment(payload);
    } else {
      await updateDepartment(id, payload);
    }

    redirect("/admin/departments");
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {isNew ? "Create Department" : "Edit Department"}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {isNew
              ? "Add a new department to the system."
              : `Editing details for ${department?.name}`}
          </p>
        </div>
        <Link
          href="/admin/departments"
          className="text-sm text-slate-600 dark:text-slate-400 hover:underline"
        >
          ← Back to List
        </Link>
      </div>

      <form
        action={handleSubmit}
        className="space-y-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-xl shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium mb-1">
            Department Name *
          </label>
          <input
            type="text"
            name="name"
            defaultValue={department?.name || ""}
            required
            placeholder="e.g. Computer Science and Engineering"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Department Code *
          </label>
          <input
            type="text"
            name="code"
            defaultValue={department?.code || ""}
            required
            placeholder="e.g. CSE"
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm uppercase font-mono focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Head of Department (HOD)
          </label>
          <select
            name="hodId"
            defaultValue={department?.hodId || ""}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">-- Select HOD (Optional) --</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.fullName || user.username || user.email} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <Link
            href="/admin/departments"
            className="px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-700 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {isNew ? "Create Department" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
