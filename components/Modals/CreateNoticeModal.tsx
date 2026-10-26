import { useForm } from "@/hooks/useForm";
import { Upload, X } from "lucide-react";
import React, { useState } from "react";
import { uploadFileAction } from "@/lib/actions/upload";
import { createNoticeAction } from "@/lib/actions/notices";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
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

const getDefaultShowTillDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 28);
  return date.toISOString().split("T")[0];
};

const CreateNoticeModal = ({
  setShowModal,
  noticeLevel = "central",
}: {
  setShowModal: (v: boolean) => void;
  noticeLevel: string;
}) => {
  const { values, handleChange, resetForm, setField } = useForm({
    title: "",
    description: "",
    refNumber: "",
    category: "academic",
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

    // Optional: keep size limit
    if (file.size > 1024 * 1024) {
      setError("File size must not exceed 1 MB.");
      e.target.value = "";
      return;
    }

    // Store directly, no re-creation or type restriction
    setField("file", file);
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

        const uploadRes = await uploadFileAction(fileFormData);
        if (!uploadRes.success || (!uploadRes.url && !uploadRes.path)) {
          throw new Error(uploadRes.error || "File upload failed.");
        }

        fileLinkPath = uploadRes.path || uploadRes.url || null;
      }

      // Step 2: Create notice via Server Action
      const noticeRes = await createNoticeAction({
        title: values.title.trim(),
        description: values.description.trim() || null,
        refNumber: values.refNumber.trim(),
        date: values.date,
        showTill: values.showTill,
        category: values.category,
        file: fileLinkPath
          ? { title: values.file?.name || "Notice File", url: fileLinkPath }
          : null,
        scope: noticeLevel === "central" ? "CENTRAL" : "DEPARTMENT",
      });

      if (!noticeRes.success) {
        throw new Error(noticeRes.error || "Failed to publish notice.");
      }

      setShowModal(false);
      resetForm();
    } catch (err: any) {
      console.error("Submission failed:", err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content p-2">
        <div className="border-b p-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Create Notice</h2>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="p-6">
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
                maxLength={100}
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
                maxLength={500}
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
                  required
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
                  {[
                    "Academic",
                    "Examinations",
                    "Events",
                    "Finance",
                    "Holidays",
                    "Research",
                    "Sports",
                    "Other",
                  ].map((label) => (
                    <option key={label} value={label.toLowerCase()}>
                      {label}
                    </option>
                  ))}
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

            <FormField label="Attachment (Optional, max 1MB)">
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
                  <span className="text-gray-600">Upload File</span>
                  <input
                    type="file"
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
                onClick={() => setShowModal(false)}
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
        </div>
      </div>
    </div>
  );
};

export default CreateNoticeModal;
