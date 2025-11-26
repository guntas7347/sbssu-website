"use client";

import { Upload, X, Loader2, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";

interface FileInfo {
  title: string;
  url: string;
}

interface DocumentUploaderProps {
  onUploadComplete: (fileInfo: FileInfo) => void;
  initialFile?: FileInfo; // Added initialFile prop
  folder?: string;
  maxSizeMB?: number;
}

export default function DocumentUploader({
  onUploadComplete,
  initialFile, // Destructure the new prop
  folder = "uploads",
  maxSizeMB = 5, // Default is 5 MB
}: DocumentUploaderProps) {
  // Initialize state based on initialFile prop
  const [title, setTitle] = useState(initialFile?.title || "");
  const [file, setFile] = useState<File | null>(null);

  // If initialFile exists, we use its title as the display name, otherwise null
  const initialFileName = initialFile ? initialFile.title : null;
  const initialStatus = initialFile ? "success" : "idle";

  const [fileName, setFileName] = useState<string | null>(initialFileName);
  const [fileUrl, setFileUrl] = useState<string | null>(
    initialFile?.url || null
  );
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<"idle" | "error" | "success">(
    initialStatus as "idle" | "error" | "success"
  );
  const [message, setMessage] = useState<string | null>(
    initialFile ? "File attached." : null
  );

  // Effect to handle external changes to initialFile (e.g., when parent state changes)
  useEffect(() => {
    if (initialFile && initialFile.url) {
      setTitle(initialFile.title);
      setFileName(initialFile.title);
      setFileUrl(initialFile.url);
      setStatus("success");
      setMessage("File attached.");
    } else {
      // Clear state if initialFile is removed or empty
      setTitle("");
      setFile(null);
      setFileName(null);
      setFileUrl(null);
      setStatus("idle");
      setMessage(null);
    }
  }, [initialFile]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setStatus("idle");
    setMessage(null);
    if (f.size > maxSizeMB * 1024 * 1024) {
      setStatus("error");
      setMessage(`File exceeds ${maxSizeMB} MB limit.`);
      e.target.value = "";
      return;
    }
    setFile(f);
    setFileName(f.name);
    // If a new file is selected, clear the old URL until the new one is uploaded
    setFileUrl(null);
    if (!title) {
      setTitle(f.name.replace(/\.[^/.]+$/, "")); // Set title from filename if not already set
    }
  }

  async function handleUpload() {
    if (!file) {
      setStatus("error");
      setMessage("No file selected.");
      return;
    }

    setUploading(true);
    setStatus("idle");
    setMessage(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/upload", {
        method: "POST",

        body: formData,
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();

      const uploadedUrl = data.path || data.url;

      if (!uploadedUrl) throw new Error("Invalid upload response.");

      setFileUrl(uploadedUrl);
      setStatus("success");
      setMessage("Uploaded successfully.");
      onUploadComplete({ title: title || file.name, url: uploadedUrl });
    } catch (err: any) {
      setStatus("error");
      setMessage("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  function handleRemove() {
    setFile(null);
    setFileName(null);
    setFileUrl(null);
    setTitle("");
    setStatus("idle");
    setMessage("File removed.");
    // Notify parent component that the file has been cleared
    onUploadComplete({ title: "", url: "" });
  }

  const isUploaded = status === "success" && fileUrl !== null;
  const displayTitle =
    title ||
    (fileName && fileName.replace(/\.[^/.]+$/, "")) ||
    "Document title";

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        {/* Title Input and Max Size Message Container (takes full width on small screens) */}
        <div className="flex-1 w-full space-y-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={displayTitle}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
            disabled={uploading} // Disable only during active upload
          />
          {/* Display Max Size Message */}
          <p className="text-xs text-gray-500 ml-1">
            Max file size: {maxSizeMB} MB
          </p>
        </div>

        {/* File Selection/Display and Action Buttons Container 
            This container stacks buttons/selectors on smaller screens if necessary, 
            but keeps them grouped. */}
        <div className="flex gap-2 w-full sm:w-auto">
          {!file && !isUploaded ? ( // Show file selection only if no file is chosen or uploaded
            <label className="flex-1 sm:flex-none px-3 py-2 border border-gray-300 rounded-lg text-sm cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-colors text-center">
              Select File
              <input
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploading}
              />
            </label>
          ) : (
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 flex-1 sm:flex-none">
              <span className="truncate text-sm text-gray-700 max-w-[80px] sm:max-w-[120px]">
                {fileName || displayTitle}
              </span>
              {/* If a local file is selected but not yet uploaded, allow clearing it */}
              {!isUploaded && (
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={uploading}
                  className="text-red-600 hover:text-red-700"
                  title="Cancel selection"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          )}

          {!isUploaded ? (
            <button
              type="button"
              onClick={handleUpload}
              disabled={!file || uploading || !title} // Require file and title to upload
              className={`flex items-center justify-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto ${
                uploading
                  ? "bg-gray-200 text-gray-500 cursor-wait"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
            >
              {uploading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4" />
              )}
              {uploading ? "Uploading..." : "Upload"}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleRemove}
              className="flex items-center justify-center gap-1 px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          )}
        </div>
      </div>

      {fileUrl && (
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-600 hover:underline block truncate mt-1 sm:mt-0"
        >
          View File: {title || fileUrl}
        </a>
      )}

      {message && (
        <p
          className={`text-xs ${
            status === "error" ? "text-red-600" : "text-green-600"
          } mt-1 sm:mt-0`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
