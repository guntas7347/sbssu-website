"use client";

import { useEffect, useState, useCallback } from "react";
import DocumentUploader from "../forms/DocumentUploader";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "boolean"
  | "select"
  | "image"
  | "file"
  | "array"
  | "array-string"; // 1. ADDED: New type for simple string arrays

// Structure for file/image fields
export type MediaFile = {
  title: string;
  url: string;
};

export type FieldSchema = {
  type: FieldType;
  label?: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // for select
  item?: { fields: Record<string, FieldSchema> }; // for array
};

export type PageSchema = {
  fields: Record<string, FieldSchema>;
};
// --- END: Schema and Types ---

// --- START: New Component for simple string arrays ---
function ArrayStringField({
  label,
  value,
  onChange,
  errors,
}: {
  label: string;
  value: string[];
  onChange: (v: string[]) => void;
  errors?: string[];
}) {
  const arr: string[] = value || [];

  const updateItem = useCallback(
    (idx: number, newValue: string) => {
      const copy = [...arr];
      copy[idx] = newValue;
      onChange(copy);
    },
    [arr, onChange]
  );

  const removeItem = useCallback(
    (idx: number) => {
      const copy = [...arr];
      copy.splice(idx, 1);
      onChange(copy);
    },
    [arr, onChange]
  );

  const addItem = useCallback(() => {
    onChange([...arr, ""]); // Add an empty string item
  }, [arr, onChange]);

  const moveItem = useCallback(
    (idx: number, direction: "up" | "down") => {
      const fromIndex = idx;
      const toIndex = direction === "up" ? idx - 1 : idx + 1;

      if (toIndex < 0 || toIndex >= arr.length) return;

      const copy = [...arr];
      const [item] = copy.splice(fromIndex, 1);
      copy.splice(toIndex, 0, item);
      onChange(copy);
    },
    [arr, onChange]
  );

  // Modern input styling base
  const inputBaseClasses =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow duration-150 ease-in-out placeholder:text-gray-400";
  const errorClasses = errors && errors.length > 0 ? "border-red-500" : "";

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-300">
        <label className="block text-lg font-bold text-gray-800">
          {label}
          <span className="text-base font-medium ml-2 text-orange-600">
            ({arr.length} items)
          </span>
        </label>
        <button
          type="button"
          onClick={addItem}
          className="text-sm px-4 py-1.5 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors shadow-md flex items-center"
        >
          ➕ Add Value
        </button>
      </div>

      {errors?.map((e, i) => (
        <p key={i} className="text-sm text-red-600 font-medium mb-3">
          🚨 {e}
        </p>
      ))}

      <div className="space-y-3">
        {arr.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center space-x-2 p-3 bg-white border border-gray-200 rounded-lg shadow-sm"
          >
            <input
              type="text"
              value={item ?? ""}
              onChange={(e) => updateItem(idx, e.target.value)}
              placeholder="Enter string value"
              className={`${inputBaseClasses} ${errorClasses} flex-grow`}
            />

            {/* Move Buttons */}
            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => moveItem(idx, "up")}
                disabled={idx === 0}
                className="text-xs p-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-30 transition-colors shadow-sm"
                title="Move Up"
              >
                ⬆️
              </button>
              <button
                type="button"
                onClick={() => moveItem(idx, "down")}
                disabled={idx === arr.length - 1}
                className="text-xs p-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-30 transition-colors shadow-sm"
                title="Move Down"
              >
                ⬇️
              </button>
            </div>

            <button
              type="button"
              onClick={() => removeItem(idx)}
              className="text-xs p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors shadow-sm"
              title="Remove Item"
            >
              🗑️
            </button>
          </div>
        ))}
        {arr.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-5 bg-white rounded-lg border border-dashed">
            No values added yet. Click 'Add Value' to begin.
          </p>
        )}
      </div>
    </div>
  );
}
// --- END: New Component for simple string arrays ---

// Generic field renderer
function FieldRenderer({
  name,
  schema,
  value,
  onChange,
  errors,
}: {
  name: string;
  schema: FieldSchema;
  value: any;
  onChange: (v: any) => void;
  errors?: string[];
}) {
  const label = schema.label || name;

  // Modern input/select/textarea styling base
  const inputBaseClasses =
    "w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow duration-150 ease-in-out placeholder:text-gray-400";
  const errorClasses = errors && errors.length > 0 ? "border-red-500" : "";

  // Common label component
  const Label = () => (
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {label}
      {schema.required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  // Common error component
  const Errors = () => (
    <>
      {errors?.map((e, i) => (
        <p key={i} className="text-xs text-red-600 mt-1 font-medium">
          {e}
        </p>
      ))}
    </>
  );

  switch (schema.type) {
    case "text":
      return (
        <div>
          <Label />
          <input
            value={value ?? ""}
            placeholder={schema.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputBaseClasses} ${errorClasses}`}
          />
          <Errors />
        </div>
      );

    case "textarea":
      return (
        <div>
          <Label />
          <textarea
            value={value ?? ""}
            placeholder={schema.placeholder}
            onChange={(e) => onChange(e.target.value)}
            rows={4} // Slightly reduced rows for modern look
            className={`${inputBaseClasses} ${errorClasses}`}
          />
          <Errors />
        </div>
      );

    case "number":
      return (
        <div>
          <Label />
          <input
            type="number"
            value={value === null || value === undefined ? "" : value} // Changed to allow empty string for clearer input UX
            placeholder={schema.placeholder}
            onChange={(e) =>
              onChange(e.target.value === "" ? null : Number(e.target.value))
            }
            className={`${inputBaseClasses} ${errorClasses}`}
          />
          <Errors />
        </div>
      );

    case "boolean":
      return (
        <div className="flex items-center pt-2">
          <input
            id={`checkbox-${name}`}
            type="checkbox"
            checked={!!value}
            onChange={(e) => onChange(e.target.checked)}
            className="w-5 h-5 text-orange-600 bg-gray-100 border-gray-300 rounded focus:ring-orange-500"
          />
          <label
            htmlFor={`checkbox-${name}`}
            className="ml-3 text-sm font-semibold text-gray-700"
          >
            {label}
          </label>
          <Errors />
        </div>
      );

    case "select":
      return (
        <div>
          <Label />
          <select
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className={`${inputBaseClasses} appearance-none cursor-pointer bg-white ${errorClasses}`}
          >
            <option value="" disabled>
              Select an option
            </option>
            {(schema.options || []).map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <Errors />
        </div>
      );

    case "image":
    case "file":
      return (
        <div>
          <Label />
          <DocumentUploader
            // Pass the current field value as the initial file data
            initialFile={value as MediaFile | undefined}
            onUploadComplete={(fileInfo) => onChange(fileInfo)}
          />
          <Errors />
        </div>
      );

    case "array":
      return (
        <ArrayField
          label={schema.label || name}
          value={value || []}
          itemSchema={schema.item!.fields}
          onChange={onChange}
          errors={errors}
        />
      );

    case "array-string": // 2. ADDED: New case for array-string
      return (
        <ArrayStringField
          label={schema.label || name}
          value={value || []}
          onChange={onChange}
          errors={errors}
        />
      );

    default:
      return null;
  }
}

// Array item renderer with collapse/expand and Move Up/Down functionality
function ArrayItemRenderer({
  item,
  idx,
  itemSchema,
  setAt,
  removeAt,
  arrayLength,
  moveItem,
}: {
  item: any;
  idx: number;
  itemSchema: Record<string, FieldSchema>;
  setAt: (idx: number, newItem: any) => void;
  removeAt: (idx: number) => void;
  arrayLength: number;
  moveItem: (idx: number, direction: "up" | "down") => void;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Attempt to generate a title for the collapsed state
  const fieldKeys = Object.keys(itemSchema);
  let titlePreview = "";
  // Find the first 'text' field to use as a preview title
  for (const key of fieldKeys) {
    if (itemSchema[key].type === "text" && item[key]) {
      titlePreview =
        String(item[key]).substring(0, 40) +
        (String(item[key]).length > 40 ? "..." : "");
      break;
    }
  }

  return (
    <div
      className={`relative transition-all duration-300 ease-in-out border rounded-xl shadow-lg
        ${isCollapsed ? "bg-white" : "bg-gray-50 border-orange-100 shadow-xl"}`}
    >
      {/* Header with Collapse/Expand and Actions button */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center text-left text-base font-semibold text-gray-800 transition-colors hover:text-orange-600 focus:outline-none"
        >
          {isCollapsed ? "▶" : "▼"}
          <span className="ml-3">
            Item {idx + 1}
            {titlePreview && (
              <span className="ml-3 text-sm font-normal text-gray-500">
                ({titlePreview})
              </span>
            )}
          </span>
        </button>

        {/* Action Buttons: Move Up, Move Down, Remove */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => moveItem(idx, "up")}
            disabled={idx === 0}
            className="text-xs p-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-30 transition-colors shadow-sm"
            title="Move Up"
          >
            ⬆️
          </button>
          <button
            type="button"
            onClick={() => moveItem(idx, "down")}
            disabled={idx === arrayLength - 1}
            className="text-xs p-1.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-30 transition-colors shadow-sm"
            title="Move Down"
          >
            ⬇️
          </button>
          <button
            type="button"
            onClick={() => removeAt(idx)}
            className="text-xs px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md"
            title="Remove Item"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Content Area - conditional rendering for collapse */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isCollapsed ? "max-h-0 p-0" : "max-h-[2000px] p-4"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.keys(itemSchema).map((key) => (
            <div key={key}>
              <FieldRenderer
                name={key}
                schema={itemSchema[key]}
                value={item?.[key]}
                onChange={(v: any) => setAt(idx, { ...item, [key]: v })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Array editor
function ArrayField({
  label,
  value,
  itemSchema,
  onChange,
  errors,
}: {
  label: string;
  value: any;
  itemSchema: Record<string, FieldSchema>;
  onChange: (v: any) => void;
  errors?: string[];
}) {
  const arr: any[] = value || [];

  const setAt = useCallback(
    (idx: number, newItem: any) => {
      const copy = [...arr];
      copy[idx] = newItem;
      onChange(copy);
    },
    [arr, onChange]
  );

  const pushEmpty = useCallback(() => {
    const empty: any = {};
    // Initialize fields based on type
    Object.keys(itemSchema).forEach((k) => {
      const type = itemSchema[k].type;
      if (type === "array") {
        empty[k] = [];
      } else if (type === "boolean") {
        empty[k] = false;
      } else if (type === "array-string") {
        // ADDED: Initialize array-string as empty array
        empty[k] = [];
      } else {
        empty[k] = null;
      }
    });
    onChange([...arr, empty]);
  }, [arr, itemSchema, onChange]);

  const removeAt = useCallback(
    (idx: number) => {
      const copy = [...arr];
      copy.splice(idx, 1);
      onChange(copy);
    },
    [arr, onChange]
  );

  // Function to reorder the array using buttons
  const moveItem = useCallback(
    (idx: number, direction: "up" | "down") => {
      const fromIndex = idx;
      const toIndex = direction === "up" ? idx - 1 : idx + 1;

      // Check bounds
      if (toIndex < 0 || toIndex >= arr.length) return;

      const copy = [...arr];
      const [item] = copy.splice(fromIndex, 1); // Remove item
      copy.splice(toIndex, 0, item); // Insert item
      onChange(copy);
    },
    [arr, onChange]
  );

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-300">
        <label className="block text-lg font-bold text-gray-800">
          {label}
          <span className="text-base font-medium ml-2 text-orange-600">
            ({arr.length} items)
          </span>
        </label>
        <button
          type="button"
          onClick={pushEmpty}
          className="text-sm px-4 py-1.5 bg-orange-600 text-white font-semibold rounded-lg hover:bg-orange-700 transition-colors shadow-md flex items-center"
        >
          ➕ Add Item
        </button>
      </div>

      {errors?.map((e, i) => (
        <p key={i} className="text-sm text-red-600 font-medium mb-3">
          🚨 {e}
        </p>
      ))}

      <div className="space-y-4">
        {arr.map((item, idx) => (
          <ArrayItemRenderer
            key={idx}
            item={item}
            idx={idx}
            itemSchema={itemSchema}
            setAt={setAt}
            removeAt={removeAt}
            // Move button props:
            arrayLength={arr.length}
            moveItem={moveItem}
          />
        ))}
        {arr.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-5 bg-white rounded-lg border border-dashed">
            No items added yet. Click 'Add Item' to begin.
          </p>
        )}
      </div>
    </div>
  );
}

// Validator - Updated for 'array-string'
function validate(schema: PageSchema, data: any): Record<string, string[]> {
  const errors: Record<string, string[]> = {};

  for (const key of Object.keys(schema.fields)) {
    const f = schema.fields[key];
    const val = data?.[key];

    if (f.required) {
      if (f.type === "array" || f.type === "array-string") {
        // UPDATED: Check for both array types
        // Check if array is defined and has at least one item
        if (!Array.isArray(val) || val.length === 0) {
          errors[key] = [`${f.label || key} requires at least one item.`];
        }
        // Additional check for array-string: ensure no empty strings
        if (f.type === "array-string" && Array.isArray(val)) {
          const emptyStrings = val.some(
            (item) => item === "" || item === null || item === undefined
          );
          if (emptyStrings) {
            if (!errors[key]) errors[key] = [];
            errors[key].push(`${f.label || key} cannot contain empty values.`);
          }
        }
      } else if (f.type === "file" || f.type === "image") {
        // Check if file/image value is an object with a 'url' property
        if (typeof val !== "object" || val === null || !val.url) {
          errors[key] = [`${f.label || key} is required.`];
        }
      } else if (val === undefined || val === null || val === "") {
        errors[key] = [`${f.label || key} is required.`];
      }
    }

    // Array item validation (only for complex 'array' type)
    if (f.type === "array" && Array.isArray(val) && f.item) {
      const itemErrors: string[] = [];
      val.forEach((it: any, idx: number) => {
        for (const subKey of Object.keys(f.item!.fields)) {
          const sf = f.item!.fields[subKey];
          const subVal = it?.[subKey];

          if (sf.required) {
            let isInvalid = false;

            // Nested array-string check
            if (sf.type === "array-string") {
              // ADDED: nested array-string validation
              if (!Array.isArray(subVal) || subVal.length === 0) {
                isInvalid = true; // Array itself is required and empty
              } else if (
                subVal.some(
                  (item: any) =>
                    item === "" || item === null || item === undefined
                )
              ) {
                itemErrors.push(
                  `Item ${idx + 1}: '${
                    sf.label || subKey
                  }' cannot contain empty values.`
                );
                continue; // Skip the simple 'isInvalid = true' for better message
              }
            } else if (sf.type === "file" || sf.type === "image") {
              // Check for MediaFile structure
              if (
                typeof subVal !== "object" ||
                subVal === null ||
                !subVal.url
              ) {
                isInvalid = true;
              }
            } else if (
              subVal === undefined ||
              subVal === null ||
              subVal === ""
            ) {
              isInvalid = true;
            }

            if (isInvalid) {
              itemErrors.push(
                `Item ${idx + 1}: '${sf.label || subKey}' is required.`
              );
            }
          }
        }
      });
      // Important: Only set errors for the array field if there are item errors
      if (itemErrors.length) errors[key] = itemErrors;
    }
  }

  return errors;
}

// Main component
export default function UniversalEditor({
  slug,
  schema,
  initialData,
}: {
  slug: string;
  schema: PageSchema;
  initialData?: any;
}) {
  const [data, setData] = useState<any>(initialData || {});
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  // Sync data with initialData when it changes
  useEffect(() => setData(initialData || {}), [initialData]);

  async function handleSave() {
    setServerError(null);
    const v = validate(schema, data);
    setErrors(v);

    if (Object.keys(v).length) {
      setServerError("Validation failed. Please correct the errors.");
      // Scroll to the first error
      const firstErrorField = Object.keys(v)[0];
      document
        .querySelector(`[data-field-name="${firstErrorField}"]`)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setSaving(true);
    try {
      const ask = confirm(`Save changes for ${slug}?`);
      if (!ask) return;

      const res = await fetch(`/api/admin/central/pages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data, slug }),
      });
      if (!res.ok) throw new Error(`Save failed ${res.status}`);
      alert(`Saved ${slug}!`);
    } catch (err: any) {
      setServerError(err.message || "Save failed: Unknown error.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto w-full m-5 font-sans">
      <div className="bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 transition-all duration-300">
        <h2 className="text-3xl font-extrabold mb-8 text-gray-800 border-b pb-4">
          Editor: {slug}
        </h2>

        <div className="space-y-6">
          {Object.keys(schema.fields).map((key) => (
            <div
              key={key}
              data-field-name={key} // Added for scrolling to error
              className="p-5 border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-lg transition-shadow duration-200"
            >
              <FieldRenderer
                name={key}
                schema={schema.fields[key]}
                value={data?.[key]}
                onChange={(val) => setData((d: any) => ({ ...d, [key]: val }))}
                errors={errors[key]} // Pass errors down
              />
            </div>
          ))}
        </div>

        {serverError && (
          <p className="text-base text-red-700 font-semibold mt-6 p-3 bg-red-100 border-l-4 border-red-500 rounded">
            🚨 Server Error: {serverError}
          </p>
        )}

        <div className="flex items-center justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="px-8 py-3 bg-orange-600 text-white font-bold text-lg rounded-xl hover:bg-orange-700 disabled:opacity-50 disabled:cursor-wait transition-all duration-300 shadow-lg shadow-orange-200/50"
          >
            {saving ? "⏳ Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* JSON Data Preview - Light mode */}
      <div className="mt-8 bg-gray-50 text-gray-800 rounded-2xl shadow-xl border border-gray-200 p-6">
        <h3 className="text-xl font-bold mb-4 border-b border-gray-300 pb-2 flex items-center">
          📊 JSON Data Preview
        </h3>
        <pre className="text-xs sm:text-sm bg-white border border-gray-300 p-4 rounded-lg overflow-auto h-72 shadow-inner text-gray-700 whitespace-pre-wrap break-all">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    </div>
  );
}
