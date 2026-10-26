import { useState, ChangeEvent } from "react";

type FormValues = Record<string, any>;

export function useForm<T extends FormValues>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const target = e.target;
    const name = target.name;
    const value =
      target.type === "checkbox" && target instanceof HTMLInputElement
        ? target.checked
        : target.value;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function setField<K extends keyof T>(field: K, value: T[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function resetForm(newValues?: Partial<T>) {
    setValues({ ...initialValues, ...newValues } as T);
  }

  return { values, handleChange, setField, resetForm };
}
