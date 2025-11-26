"use client";

import { Upload } from "lucide-react";
import { useForm } from "@/hooks/useForm";
import { useState } from "react";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
}

interface NoticeFormProps {
  onCancel: () => void;
}

function FormField({ label, children }: FormFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      {children}
    </div>
  );
}

export const getDefaultShowTillDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 28);
  return date.toISOString().split("T")[0];
};

export default function NoticeForm({ onCancel }: NoticeFormProps) {
  const { values, handleChange, resetForm, setField } = useForm({
    title: "",
    description: "",
    refNumber: "",
    category: "Academic",
    date: new Date().toISOString().split("T")[0],
    showTill: getDefaultShowTillDate(),
    file: null as File | null,
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

    if (file.size > 1024 * 1024) {
      // 1MB limit
      setError("File size must not exceed 1 MB.");
      e.target.value = "";
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed.");
      e.target.value = "";
      return;
    }

    const cleanFile = new File([file], file.name, { type: file.type });
    // Using the setField(key, value) signature
    setField("file", cleanFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let fileLinkPath: string | null = null;

      // Step 1: Upload the file if one is selected.
      if (values.file) {
        const fileFormData = new FormData();
        fileFormData.append("file", values.file);
        fileFormData.append("folder", "notices");

        // This is the call to the external API or your internal upload handler
        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: fileFormData,
        });

        if (!uploadResponse.ok) {
          throw new Error("File upload failed.");
        }

        const uploadResult = await uploadResponse.json();

        // Extract the "link path" (assuming it's returned as 'path' or 'url')
        fileLinkPath = uploadResult.path || uploadResult.url;

        if (!fileLinkPath) {
          throw new Error(
            "File upload succeeded but did not return a valid link path."
          );
        }
      }

      // Step 2: Construct the data object matching the Notice model.
      const noticeData = {
        title: values.title.trim(),
        description: values.description.trim() || null, // Send null if empty
        refNumber: values.refNumber.trim(),
        date: values.date, // Send as ISO string (e.g., "2025-11-01")
        showTill: values.showTill, // Send as ISO string
        category: values.category,
        fileUrl: fileLinkPath, // Assign the returned link path here
        noticeLevel: "central", // Add default value from schema
      };

      // Step 3: Submit the complete notice data to your notice API.
      const noticeResponse = await fetch("/api/admin/central/notices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(noticeData),
      });

      if (!noticeResponse.ok) {
        const errorData = await noticeResponse.json();
        throw new Error(errorData.message || "Failed to publish notice.");
      }

      console.log("Notice published successfully!", { data: noticeData });
      resetForm();
    } catch (err: any) {
      console.error("Submission failed:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Title">
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          placeholder="Enter notice title"
          required
          disabled={loading}
        />
      </FormField>

      <FormField label="Description">
        <textarea
          name="description"
          rows={4}
          value={values.description}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
          placeholder="Enter notice description"
          disabled={loading}
        />
      </FormField>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Notice Date">
          <input
            type="date"
            name="date"
            value={values.date}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            disabled={loading}
          />
        </FormField>
        <FormField label="Notice Ref Number">
          <input
            type="text"
            name="refNumber"
            value={values.refNumber}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            placeholder="e.g., SBSSTU/2024/001"
            disabled={loading}
          />
        </FormField>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Category">
          <select
            name="category"
            value={values.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            disabled={loading}
          >
            <option>Academic</option>
            <option>Examinations</option>
            <option>Events</option>
            <option>Finance</option>
            <option>Holidays</option>
            <option>Research</option>
            <option>Sports</option>
          </select>
        </FormField>
        <FormField label="Show Till Date">
          <input
            type="date"
            name="showTill"
            value={values.showTill}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
            disabled={loading}
          />
        </FormField>
      </div>

      <FormField label="Attachment (Optional, PDF only, max 1MB)">
        {!values.file ? (
          <label
            className={`flex items-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg transition-colors w-full justify-center 
            ${
              loading
                ? "cursor-wait bg-gray-50"
                : "cursor-pointer hover:border-orange-500 hover:bg-orange-50"
            }`}
          >
            <Upload className="w-5 h-5 text-gray-600" />
            <span className="text-gray-600">Upload PDF File</span>
            <input
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={handleFileChange}
              disabled={loading}
            />
          </label>
        ) : (
          <div className="flex items-center justify-between px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
            <span className="text-gray-700 text-sm truncate max-w-[75%]">
              {values.file.name}
            </span>
            <button
              type="button"
              onClick={() => setField("file", null)} // Use setField(key, value)
              className="text-red-600 text-sm font-semibold hover:underline"
              disabled={loading}
            >
              Remove
            </button>
          </div>
        )}
        {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
      </FormField>

      <div className="flex gap-3 justify-end pt-2">
        <button
          type="button"
          onClick={onCancel}
          disabled={loading}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold hover:bg-orange-700 disabled:opacity-50 disabled:cursor-wait"
        >
          {loading ? "Publishing..." : "Publish Notice"}
        </button>
      </div>
    </form>
  );
}
