"use client";

import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import AddDepartment from "./AddDepartment";

export interface Department {
  id: string;
  name: string;
  departmentCode: string;
  establishmentYear: number;
  location: string;
  description: string;
  hidden: boolean;
}

export default function DepartmentsPage() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    async function loadDepartments() {
      try {
        const res = await fetch("/api/public/departments");
        if (!res.ok) throw new Error("Failed to fetch");
        const data: Department[] = await res.json();
        setDepartments(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading departments:", err);
      }
    }

    loadDepartments();
  }, [loading, showModal]);

  const handleEdit = (dept: Department) => {
    setEditingDept(dept);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this department?")) return;

    const res = await fetch(`/api/admin/departments?id=${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      alert("Department deleted successfully");
      setLoading(true);
    } else {
      const msg = await res.text();
      alert(`Failed: ${msg}`);
    }
  };

  const handleAddNew = () => {
    setEditingDept(null);
    setShowModal(true);
  };

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
            <button
              onClick={handleAddNew}
              className="flex items-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700 transition-colors shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Department
            </button>
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
                        {dept.establishmentYear}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {dept.location}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(dept)}
                            className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(dept.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
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

      {showModal && (
        <AddDepartment setShowModal={setShowModal} editingDept={editingDept} />
      )}
    </>
  );
}
