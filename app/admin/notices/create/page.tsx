"use client";

import { useForm } from "@/hooks/useForm";
import { useButtonLoading } from "@/hooks/useButtonLoading";
import DocumentUploader from "@/components/forms/DocumentUploader";

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

const getDefaultShowTillDate = () => {
  const d = new Date();
  d.setDate(d.getDate() + 28);
  return d.toISOString().split("T")[0];
};

export default function CreateNoticePage() {
  const noticeLevel = "central";

  const { loading, run, Spinner } = useButtonLoading();

  const { values, handleChange, resetForm, setField } = useForm({
    title: "",
    description: "",
    refNumber: "",
    category: "academic",
    date: new Date().toISOString().split("T")[0],
    showTill: getDefaultShowTillDate(),
    file: null as null | { title: string; url: string },
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const ask = confirm("Create Notice?");
    if (!ask) return;

    try {
      const payload = {
        title: values.title.trim(),
        description: values.description.trim() || null,
        refNumber: values.refNumber.trim(),
        date: values.date,
        showTill: values.showTill,
        category: values.category,
        file: values.file || null,
        noticeLevel,
      };

      const res = await fetch("/api/admin/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.message || "Failed to publish notice");
      }

      alert("Notice Created");
    } catch (err) {
      alert("Error occurred");
      console.error(err);
    } finally {
      window.location.reload();
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Create Notice</h1>

      <form
        onSubmit={(e) => run(async () => await handleSubmit(e))}
        className="space-y-6"
      >
        <FormField label="Title">
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            required
            maxLength={100}
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </FormField>

        <FormField label="Description">
          <textarea
            name="description"
            rows={4}
            value={values.description}
            onChange={handleChange}
            maxLength={500}
            disabled={loading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Notice Date">
            <input
              type="date"
              name="date"
              value={values.date}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </FormField>

          <FormField label="Reference Number">
            <input
              type="text"
              name="refNumber"
              value={values.refNumber}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Category">
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            >
              {[
                "Academic",
                "Examinations",
                "Events",
                "Finance",
                "Holidays",
                "Research",
                "Sports",
                "Other",
              ].map((c) => (
                <option key={c} value={c.toLowerCase()}>
                  {c}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="Show Till">
            <input
              type="date"
              name="showTill"
              value={values.showTill}
              onChange={handleChange}
              disabled={loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </FormField>
        </div>

        <FormField label="Attachment (Optional)">
          <DocumentUploader
            onUploadComplete={(fileInfo) => {
              setField("file", fileInfo);
            }}
          />
        </FormField>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            disabled={loading}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50"
          >
            Reset
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? <Spinner /> : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
