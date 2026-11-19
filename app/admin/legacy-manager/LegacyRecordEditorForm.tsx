"use client";

import React, { useEffect, useState, useTransition } from "react";
import { PlusCircle, Save, Upload } from "lucide-react";
import { uploadFile } from "@/lib/uploader";
import type { LegacyWebsite } from "@/db/schema";
import type { ParsedLegacyOption } from "@/constants/legacy-select-options";
import {
  createLegacyWebsiteRecord,
  updateLegacyWebsiteRecord,
} from "@/lib/actions/legacy-website";

interface LegacyRecordEditorFormProps {
  selectedOption: ParsedLegacyOption;
  existingRecord?: LegacyWebsite | null;
  onSuccess: (message: string) => void;
  onError: (message: string) => void;
}

interface FormState {
  name: string;
  image: string;
  company: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  contactNo: string;
  email: string;
  webSite: string;
  advertisement: string;
  video: string;
  type: string;
  approve: boolean;
}

function recordToFormState(record?: LegacyWebsite | null): FormState {
  if (!record) {
    return {
      name: "",
      image: "",
      company: "",
      description: "",
      address: "",
      city: "",
      state: "",
      country: "",
      contactNo: "",
      email: "",
      webSite: "",
      advertisement: "",
      video: "",
      type: "",
      approve: false,
    };
  }

  const raw = record as Record<string, unknown>;
  return {
    name: String(record.name ?? ""),
    image: String(record.image ?? ""),
    company: String(record.company ?? ""),
    description: String(record.description ?? ""),
    address: String(record.address ?? ""),
    city: String(record.city ?? ""),
    state: String(record.state ?? ""),
    country: String(record.country ?? ""),
    contactNo: String(raw.contactNo ?? raw.contact_no ?? ""),
    email: String(record.email ?? ""),
    webSite: String(raw.webSite ?? raw.website ?? ""),
    advertisement: String(record.advertisement ?? ""),
    video: String(record.video ?? ""),
    type: String(record.type ?? ""),
    approve: Boolean(raw.approve),
  };
}

export function LegacyRecordEditorForm({
  selectedOption,
  existingRecord,
  onSuccess,
  onError,
}: LegacyRecordEditorFormProps) {
  const isEditing = Boolean(existingRecord);
  const [isPending, startTransition] = useTransition();
  const [uploadingField, setUploadingField] = useState<
    "image" | "company" | "video" | null
  >(null);
  const [form, setForm] = useState<FormState>(() =>
    recordToFormState(existingRecord),
  );

  useEffect(() => {
    setForm(recordToFormState(existingRecord));
  }, [existingRecord, selectedOption.id, selectedOption.mode]);

  const fixedCategoryValue = isEditing
    ? existingRecord?.category !== null &&
      existingRecord?.category !== undefined
      ? String(existingRecord.category)
      : "Unassigned"
    : selectedOption.mode === "category"
      ? String(selectedOption.id)
      : "";

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleAttachmentUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    targetField: "image" | "company" | "video",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingField(targetField);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const result = await uploadFile(formData);
      if (result.success && result.path) {
        setField(targetField, result.path);
      } else {
        onError(result.error || "File upload failed.");
      }
    } catch (err) {
      onError(err instanceof Error ? err.message : "File upload failed.");
    } finally {
      setUploadingField(null);
      e.target.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      const parsedCategory =
        fixedCategoryValue !== "" && !Number.isNaN(Number(fixedCategoryValue))
          ? Number(fixedCategoryValue)
          : null;

      const res =
        isEditing && existingRecord
          ? await updateLegacyWebsiteRecord({
              id: String((existingRecord as Record<string, unknown>).id),
              category: parsedCategory,
              ...form,
            })
          : await createLegacyWebsiteRecord({
              category: parsedCategory,
              ...form,
            });

      if (res.ok) {
        if (!isEditing) {
          setForm(recordToFormState(null));
        }
        onSuccess(res.message);
      } else {
        onError(res.message);
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
            {isEditing
              ? `Edit Record — ${String((existingRecord as Record<string, unknown>).id)}`
              : `Add Record — ${selectedOption.label}`}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isEditing
              ? "Updating existing record in place."
              : "UUID primary key is generated automatically on save."}
          </p>
        </div>

        <button
          type="submit"
          disabled={isPending || uploadingField !== null}
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800 disabled:opacity-50 dark:bg-green-500 dark:text-slate-950 dark:hover:bg-green-400"
        >
          {isEditing ? (
            <Save className="h-4 w-4" />
          ) : (
            <PlusCircle className="h-4 w-4" />
          )}
          {isPending
            ? isEditing
              ? "Updating..."
              : "Saving..."
            : isEditing
              ? "Update Record"
              : "Save Record"}
        </button>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Category: Fixed & Disabled */}
        <div>
          <label
            htmlFor="fixed-category"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Category Number (Fixed)
          </label>
          <input
            id="fixed-category"
            type="text"
            value={fixedCategoryValue || "N/A"}
            disabled
            readOnly
            className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-100 px-3.5 py-2.5 font-mono text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
          />
        </div>

        {/* Approve: Boolean Toggle */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-950/60">
          <div>
            <span className="block text-xs font-bold tracking-wider text-slate-700 uppercase dark:text-slate-200">
              Approve
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {form.approve ? "Approved (true)" : "Not Approved (false)"}
            </span>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={form.approve}
            aria-label="Toggle Approve"
            onClick={() => setField("approve", !form.approve)}
            className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${
              form.approve
                ? "bg-green-600 dark:bg-green-500"
                : "bg-slate-300 dark:bg-slate-700"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                form.approve ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* Remaining fields */}
        <div>
          <label
            htmlFor="field-name"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Name
          </label>
          <input
            id="field-name"
            type="text"
            value={form.name}
            onChange={(e) => setField("name", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="field-type"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Type
          </label>
          <input
            id="field-type"
            type="text"
            value={form.type}
            onChange={(e) => setField("type", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="field-image"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Image / Attachment 1
          </label>
          <div className="flex items-center gap-2">
            <input
              id="field-image"
              type="text"
              value={form.image}
              onChange={(e) => setField("image", e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <label className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <Upload className="h-3.5 w-3.5" />
              {uploadingField === "image" ? "..." : "Upload"}
              <input
                type="file"
                className="sr-only"
                onChange={(e) => handleAttachmentUpload(e, "image")}
              />
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="field-company"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Company / Attachment 2
          </label>
          <div className="flex items-center gap-2">
            <input
              id="field-company"
              type="text"
              value={form.company}
              onChange={(e) => setField("company", e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <label className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <Upload className="h-3.5 w-3.5" />
              {uploadingField === "company" ? "..." : "Upload"}
              <input
                type="file"
                className="sr-only"
                onChange={(e) => handleAttachmentUpload(e, "company")}
              />
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="field-video"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Video / Media Attachment
          </label>
          <div className="flex items-center gap-2">
            <input
              id="field-video"
              type="text"
              value={form.video}
              onChange={(e) => setField("video", e.target.value)}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
            <label className="inline-flex shrink-0 cursor-pointer items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-orange-500 hover:text-orange-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              <Upload className="h-3.5 w-3.5" />
              {uploadingField === "video" ? "..." : "Upload"}
              <input
                type="file"
                className="sr-only"
                onChange={(e) => handleAttachmentUpload(e, "video")}
              />
            </label>
          </div>
        </div>

        <div>
          <label
            htmlFor="field-contactNo"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Contact No
          </label>
          <input
            id="field-contactNo"
            type="text"
            value={form.contactNo}
            onChange={(e) => setField("contactNo", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="field-email"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Email
          </label>
          <input
            id="field-email"
            type="text"
            value={form.email}
            onChange={(e) => setField("email", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="field-webSite"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Website
          </label>
          <input
            id="field-webSite"
            type="text"
            value={form.webSite}
            onChange={(e) => setField("webSite", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="field-address"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Address
          </label>
          <input
            id="field-address"
            type="text"
            value={form.address}
            onChange={(e) => setField("address", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="field-city"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            City
          </label>
          <input
            id="field-city"
            type="text"
            value={form.city}
            onChange={(e) => setField("city", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="field-state"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            State
          </label>
          <input
            id="field-state"
            type="text"
            value={form.state}
            onChange={(e) => setField("state", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label
            htmlFor="field-country"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Country
          </label>
          <input
            id="field-country"
            type="text"
            value={form.country}
            onChange={(e) => setField("country", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="field-advertisement"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Advertisement
          </label>
          <input
            id="field-advertisement"
            type="text"
            value={form.advertisement}
            onChange={(e) => setField("advertisement", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="field-description"
            className="mb-1.5 block text-xs font-bold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Description (HTML / Text)
          </label>
          <textarea
            id="field-description"
            rows={5}
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>
      </div>
    </form>
  );
}
